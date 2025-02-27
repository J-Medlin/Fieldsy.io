import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Leaf, HandshakeIcon, Star, Trophy, Heart, ArrowRight, ThumbsUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Spotlight {
  id: string;
  name: string;
  achievement: string;
  metric: string;
  image: string;
  badge: string;
  story: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  avatar: string;
}

export default function Featured() {
  const [activeTab, setActiveTab] = useState('sellers');
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Demo data - replace with actual data from Supabase
  const demoSpotlights: Spotlight[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      achievement: 'Top Seller',
      metric: '200 items sold this month',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      badge: 'Market Master',
      story: 'Started with just a small herb garden, now supplying restaurants across the county.'
    },
    {
      id: '2',
      name: 'Mike Chen',
      achievement: 'Eco-Warrior',
      metric: 'Saved 50kg CO2 through paperless trades',
      image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      badge: 'Green Guardian',
      story: 'Transformed traditional farming practices to zero-waste methods.'
    },
    {
      id: '3',
      name: 'Lisa Martinez',
      achievement: 'Barter Leader',
      metric: '25 successful trades this week',
      image: 'https://images.unsplash.com/photo-1592991538534-00972b6f59ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      badge: 'Barter Boss',
      story: 'Built a thriving community network through skill-sharing and produce swaps.'
    }
  ];

  const demoLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Emma Wilson',
      points: 1200,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '2',
      name: 'James Lee',
      points: 980,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      points: 850,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
    }
  ];

  useEffect(() => {
    setSpotlights(demoSpotlights);
    setLeaderboard(demoLeaderboard);
    setLoading(false);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getIcon = (achievement: string) => {
    switch (achievement) {
      case 'Top Seller':
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 'Eco-Warrior':
        return <Leaf className="w-8 h-8 text-green-500" />;
      case 'Barter Leader':
        return <HandshakeIcon className="w-8 h-8 text-blue-500" />;
      default:
        return <Star className="w-8 h-8 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Community Spotlight
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Celebrating our exceptional farmers, artisans, and homesteaders
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-6 py-3 rounded-full">
              <Trophy className="w-5 h-5" />
              <span>Top Sellers</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-6 py-3 rounded-full">
              <Leaf className="w-5 h-5" />
              <span>Eco-Warriors</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-6 py-3 rounded-full">
              <HandshakeIcon className="w-5 h-5" />
              <span>Barter Leaders</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spotlights Grid */}
      <section ref={ref} className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlights.map((spotlight, index) => (
            <motion.div
              key={spotlight.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative h-48">
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  {getIcon(spotlight.achievement)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{spotlight.name}</h3>
                    <p className="text-green-600 font-medium">{spotlight.badge}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{spotlight.metric}</p>
                <p className="text-gray-700 italic">&ldquo;{spotlight.story}&rdquo;</p>
                <div className="mt-6 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <ThumbsUp className="w-5 h-5" />
                    <span>Congratulate</span>
                  </button>
                  <span className="text-gray-500 text-sm">Seen by 1.2k</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Weekly Leaderboard</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="flex items-center gap-4 p-4 border-b last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{entry.name}</h3>
                  <p className="text-gray-600 text-sm">{entry.points} points</p>
                </div>
                <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Want to be featured?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Complete sales, make eco-friendly trades, or share your success story to earn your spot in the Community Spotlight.
        </p>
        <button className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2">
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}