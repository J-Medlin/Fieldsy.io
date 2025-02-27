import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import ImageUpload from './ImageUpload';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  onSuccess?: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<[number, number] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Get current location if not set
      if (!location) {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation([pos.coords.longitude, pos.coords.latitude]);
      }

      const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price') as string),
        category_id: formData.get('category'),
        images,
        location: `POINT(${location![0]} ${location![1]})`,
        seller_id: (await supabase.auth.getUser()).data.user?.id
      };

      const { error: insertError } = await supabase
        .from('products')
        .insert(productData);

      if (insertError) throw insertError;

      form.reset();
      setImages([]);
      onSuccess?.();
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            required
            min="0"
            step="0.01"
            className="block w-full rounded-md border-gray-300 pl-7 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <ImageUpload
          type="products"
          onUpload={(url) => setImages([...images, url])}
          className="mb-2"
        />
        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((url, index) => (
              <div key={url} className="relative w-20 h-20">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Create Product'
        )}
      </button>
    </form>
  );
}