import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingBag, Calendar, Award, UserCircle } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center">
          <Link to="/map" className="flex flex-col items-center text-gray-600 hover:text-green-600">
            <MapPin className="h-6 w-6" />
            <span className="text-xs mt-1">Map</span>
          </Link>
          <Link to="/marketplace" className="flex flex-col items-center text-gray-600 hover:text-green-600">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Market</span>
          </Link>
          <Link to="/workshops" className="flex flex-col items-center text-gray-600 hover:text-green-600">
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Workshops</span>
          </Link>
          <Link to="/rewards" className="flex flex-col items-center text-gray-600 hover:text-green-600">
            <Award className="h-6 w-6" />
            <span className="text-xs mt-1">Rewards</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-green-600">
            <UserCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;