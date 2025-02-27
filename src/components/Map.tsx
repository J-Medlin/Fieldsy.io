import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Workshop } from '../types';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarker {
  id: string;
  type: 'product' | 'workshop';
  title: string;
  price: number;
  location: [number, number];
}

// Component to handle location and zoom updates
function LocationUpdater({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) {
  const map = useMap();

  useEffect(() => {
    // Default to a central US location
    const defaultLocation: [number, number] = [39.8283, -98.5795];
    
    try {
      map.locate({ setView: true, maxZoom: 13 });

      map.on('locationfound', (e) => {
        onLocationFound(e.latlng.lat, e.latlng.lng);
      });

      map.on('locationerror', () => {
        console.log('Using default location');
        onLocationFound(defaultLocation[0], defaultLocation[1]);
        map.setView(defaultLocation, 4);
      });
    } catch (error) {
      console.error('Map error:', error);
      onLocationFound(defaultLocation[0], defaultLocation[1]);
      map.setView(defaultLocation, 4);
    }
  }, [map, onLocationFound]);

  return null;
}

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([39.8283, -98.5795]); // Default to US center

  // 50 miles in meters (approximately)
  const RADIUS = 80467.2;

  const loadMarkers = async (lat: number, lng: number) => {
    try {
      setError(null);
      
      // Use PostGIS to query items within 50 miles radius
      const [productsRes, workshopsRes] = await Promise.all([
        supabase.rpc('get_nearby_products', {
          user_lat: lat,
          user_lng: lng,
          radius_meters: RADIUS
        }),
        supabase.rpc('get_nearby_workshops', {
          user_lat: lat,
          user_lng: lng,
          radius_meters: RADIUS
        })
      ]);

      if (productsRes.error) throw productsRes.error;
      if (workshopsRes.error) throw workshopsRes.error;

      const products = productsRes.data || [];
      const workshops = workshopsRes.data || [];

      const mapMarkers: MapMarker[] = [
        ...products.map((p: any) => ({
          id: p.id,
          type: 'product' as const,
          title: p.title,
          price: p.price,
          location: p.location?.coordinates || [lat, lng]
        })),
        ...workshops.map((w: any) => ({
          id: w.id,
          type: 'workshop' as const,
          title: w.title,
          price: w.price,
          location: w.location?.coordinates || [lat, lng]
        }))
      ];

      setMarkers(mapMarkers);
    } catch (error) {
      console.error('Error loading markers:', error);
      setError('Failed to load nearby locations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    loadMarkers(lat, lng);
  };

  const createCustomIcon = (type: 'product' | 'workshop') => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-6 h-6 rounded-full ${
        type === 'product' ? 'bg-green-500' : 'bg-blue-500'
      } border-2 border-white shadow-md"></div>`,
      iconSize: [24, 24],
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      {error && (
        <div className="absolute top-4 left-4 right-4 flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg z-[1000]">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <MapContainer
        center={userLocation}
        zoom={11}
        className="w-full h-full"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationUpdater onLocationFound={handleLocationFound} />
        
        {/* User location marker and radius circle */}
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
        <Circle
          center={userLocation}
          radius={RADIUS}
          pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.1 }}
        />

        {/* Product and workshop markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location}
            icon={createCustomIcon(marker.type)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{marker.title}</h3>
                <p className="text-sm text-gray-600">
                  {marker.type === 'product' ? 'Product' : 'Workshop'}
                </p>
                <p className="text-sm font-medium">${marker.price.toFixed(2)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;