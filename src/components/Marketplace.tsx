import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isDemo?: boolean;
}

const demoProducts: Product[] = [
  {
    id: '1',
    title: 'Handmade Wooden Spoon',
    description: 'Locally crafted with premium wood.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    isDemo: true
  },
  {
    id: '2',
    title: 'Organic Honey',
    description: 'Raw, local, and unfiltered honey.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1587049352847-4f6a7f6c7a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    isDemo: true
  },
  {
    id: '3',
    title: 'Farm Fresh Eggs',
    description: '100% organic, free-range eggs from happy hens.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    isDemo: true
  },
  {
    id: '4',
    title: 'Handmade Beeswax Candles',
    description: 'Eco-friendly, handcrafted candles with a natural honey scent.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1602874801007-aa87920646cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    isDemo: true
  }
];

export default function Marketplace() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('newest');

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Search Bar & Filters */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex space-x-4 w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg flex-1 md:flex-none"
              >
                <option value="all">All Categories</option>
                <option value="handmade">Handmade</option>
                <option value="produce">Produce</option>
                <option value="equipment">Equipment</option>
              </select>
              
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg flex-1 md:flex-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Listings */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Premium Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demoProducts.map((product) => (
            <div key={product.id} className="relative bg-white rounded-lg overflow-hidden shadow-lg group">
              {/* Background Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {/* Circular Profile Image */}
                <div className="absolute -bottom-6 left-4">
                  <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(product.id)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80`}
                      alt="Seller"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {product.isDemo && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                    Demo
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4 pt-8">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-green-700 font-bold">${product.price.toFixed(2)}</p>
                  <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Product Grid */}
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-semibold mb-6">All Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {demoProducts.map((product) => (
            <div
              key={`regular-${product.id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 relative">
                {product.isDemo && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                    Demo
                  </span>
                )}
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-700 font-bold mt-2">${product.price.toFixed(2)}</p>
                <button className="mt-4 w-full bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 mt-8 flex justify-center">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 border rounded-lg mx-2 hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-4 py-2 border rounded-lg mx-2 hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Call-to-Action */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <h2 className="text-2xl font-semibold">Become a Seller</h2>
        <p className="text-gray-600 mt-2">Start listing your products today and reach local buyers.</p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create a Listing
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">List a New Item</h2>
            <ProductForm onSuccess={() => setShowForm(false)} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}