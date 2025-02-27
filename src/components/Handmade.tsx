import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import ImageUpload from './ImageUpload';
import { Loader2 } from 'lucide-react';
import WorkshopForm from './WorkshopForm';

interface HandmadeProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

const demoProducts: HandmadeProduct[] = [
  {
    id: '1',
    title: 'Handmade Necklace',
    price: 25.00,
    description: 'Beautiful handcrafted necklace made with natural materials.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: '2',
    title: 'Dozen Eggs',
    price: 7.00,
    description: 'Farm fresh eggs from free-range chickens.',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: '3',
    title: 'Handmade Furnace',
    price: 45.00,
    description: 'Custom-built furnace for artisanal crafts.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
];

export default function Handmade() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price') as string),
        images,
        category: 'handmade',
        seller_id: (await supabase.auth.getUser()).data.user?.id
      };

      const { error: insertError } = await supabase
        .from('products')
        .insert(productData);

      if (insertError) throw insertError;

      form.reset();
      setImages([]);
      // Optional: Show success message or redirect
    } catch (err) {
      console.error('Error creating handmade product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center text-white text-center py-20">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Handmade Marketplace</h2>
          <p className="text-lg mb-6">Discover unique, locally crafted items from talented artisans</p>
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">Available Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProducts.map((product) => (
            <div key={product.id} className="bg-white shadow rounded overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{product.title}</h4>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Listing Section */}
      <section className="container mx-auto py-12 px-4 bg-gray-50">
        <h3 className="text-2xl font-semibold text-center mb-6">List Your Handmade Items</h3>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                Photo:
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Handmade Necklace"
                required
                className="border rounded w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Describe your product"
                className="border rounded w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-600">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="border rounded w-full py-2 pl-8 pr-3 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Workshop Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">List a New Item</h2>
            <WorkshopForm onSuccess={() => setShowForm(false)} />
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