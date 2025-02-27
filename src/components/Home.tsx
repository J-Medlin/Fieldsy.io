import React from 'react';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

export default function Home() {
  const navigate = useNavigate();

  const featuredWorkshops = [
    {
      id: 1,
      title: "Organic Farming Basics",
      description: "Learn sustainable farming techniques from expert farmers.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 2,
      title: "Artisanal Cheese Making",
      description: "Master the art of crafting homemade cheeses.",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 3,
      title: "Beekeeping Workshop",
      description: "Start your journey into beekeeping and honey production.",
      image: "https://images.unsplash.com/photo-1587049352847-4f6a7f6c7a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 4,
      title: "Herb Garden Design",
      description: "Design and maintain your own productive herb garden.",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 5,
      title: "Traditional Bread Baking",
      description: "Learn to bake artisanal sourdough and rustic breads.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 6,
      title: "Natural Dyeing Workshop",
      description: "Create beautiful textiles using natural plant dyes.",
      image: "https://images.unsplash.com/photo-1576513580460-f3e7a4ed6cb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative text-center backdrop-blur-sm bg-black/20 p-8 rounded-lg max-w-2xl mx-4">
          <h2 className="text-4xl font-bold mb-4">Support Local, Shop Smart</h2>
          <p className="mt-2 text-lg">Join local Farmers & Artisans on Fieldsy.</p>
          <button 
            onClick={() => navigate('/marketplace')}
            className="mt-4 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Leaderboard & Achievements */}
      <section className="container mx-auto my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">🔥 Leaderboard & Achievements</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
          <div className="bg-white shadow-lg p-6 rounded md:w-1/3 text-center">
            <h4 className="font-semibold text-lg">Top Seller of the Month 🏆</h4>
            <p className="text-gray-600">John Doe - 150 Transactions</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded md:w-1/3 text-center">
            <h4 className="font-semibold text-lg">Your Next Achievement 🚀</h4>
            <p className="text-gray-600">Complete 10 sales to unlock 50 Fieldsy Credits</p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">🌟 Featured Listings</h3>
        <div className="flex overflow-x-auto space-x-6 px-6 pb-4">
          {featuredWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-white shadow-lg p-4 rounded w-80 min-w-[250px] flex-shrink-0">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="font-semibold text-lg mt-2">{workshop.title}</h4>
              <p className="text-gray-600">{workshop.description}</p>
              <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Local Listings Map */}
      <section className="container mx-auto my-12 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">📍 Listings Near You</h3>
        <div className="h-[400px] rounded shadow-lg overflow-hidden">
          <Map />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="container mx-auto my-12 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">🔔 Recent Activity</h3>
        <div className="bg-white shadow-lg p-6 rounded text-center">
          <p className="text-gray-600">Jane Doe just purchased Handmade Candles from "Artisan Candles Co." 🎉</p>
        </div>
      </section>
    </div>
  );
}