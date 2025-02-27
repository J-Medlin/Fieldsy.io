import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Sprout,
  Bug,
  Leaf,
  Scissors,
  Wrench,
  Download,
  BookOpen,
  Sun,
  Moon,
  ThumbsUp,
  Share2,
  Plus,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

interface Guide {
  id: string;
  title: string;
  category: 'planting' | 'pests' | 'foraging' | 'tutorials' | 'hacks';
  description: string;
  content: string;
  image: string;
  points: number;
  readTime: number;
  downloadUrl?: string;
  sponsored?: boolean;
  sponsorName?: string;
}

interface DaylightInfo {
  sunrise: string;
  sunset: string;
  daylightHours: number;
  bestTasks: string[];
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<string>('planting');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [daylightInfo, setDaylightInfo] = useState<DaylightInfo | null>(null);
  const [userProgress, setUserProgress] = useState({ guidesRead: 0, totalPoints: 0 });
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Demo data - replace with actual data from Supabase
  const demoGuides: Guide[] = [
    {
      id: '1',
      title: 'Spring Tomato Planting Guide',
      category: 'planting',
      description: 'Master the art of tomato growing with our comprehensive guide.',
      content: 'Plant tomatoes when soil reaches 60°F...',
      image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      points: 25,
      readTime: 5,
      downloadUrl: '#',
      sponsored: true,
      sponsorName: 'Organic Acres'
    },
    {
      id: '2',
      title: 'Natural Pest Control',
      category: 'pests',
      description: 'Combat garden pests using organic methods.',
      content: 'Identify common garden pests and their natural predators...',
      image: 'https://images.unsplash.com/photo-1587242563816-3ad6b7a8a932?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      points: 20,
      readTime: 4
    },
    {
      id: '3',
      title: 'Spring Foraging Map',
      category: 'foraging',
      description: 'Discover local wild edibles in your area.',
      content: 'Learn where to find spring mushrooms and wild greens...',
      image: 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      points: 30,
      readTime: 6
    }
  ];

  const categories = [
    { id: 'planting', label: 'Planting Guides', icon: Sprout },
    { id: 'pests', label: 'Pest Alerts', icon: Bug },
    { id: 'foraging', label: 'Foraging Maps', icon: Leaf },
    { id: 'tutorials', label: 'Artisan Tutorials', icon: Scissors },
    { id: 'hacks', label: 'Homesteading Hacks', icon: Wrench }
  ];

  useEffect(() => {
    const mockDaylightInfo: DaylightInfo = {
      sunrise: '06:30',
      sunset: '19:45',
      daylightHours: 13.25,
      bestTasks: ['Plant leafy greens', 'Harvest herbs', 'Start seedlings']
    };

    setDaylightInfo(mockDaylightInfo);
    setGuides(demoGuides);
    setLoading(false);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleReadGuide = async (guideId: string) => {
    try {
      // Update user progress in Supabase
      const { data: guide } = await supabase
        .from('guides')
        .select('points')
        .eq('id', guideId)
        .single();

      if (guide) {
        setUserProgress(prev => ({
          guidesRead: prev.guidesRead + 1,
          totalPoints: prev.totalPoints + guide.points
        }));
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fieldsy Guide
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your practical toolkit for growing, crafting, and thriving. Learn from the community and earn rewards along the way.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeCategory === id
                    ? 'bg-green-600 text-white'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Today's Tips & Progress */}
      <section className="bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Daylight Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Today's Daylight</h3>
                <Sun className="w-6 h-6 text-yellow-500" />
              </div>
              {daylightInfo && (
                <>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Sunrise: {daylightInfo.sunrise}</span>
                    <span>Sunset: {daylightInfo.sunset}</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full mb-4">
                    <div
                      className="absolute h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(daylightInfo.daylightHours / 24) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {daylightInfo.daylightHours} hours of daylight
                  </p>
                </>
              )}
            </div>

            {/* Best Tasks */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Today's Best Tasks</h3>
              <ul className="space-y-2">
                {daylightInfo?.bestTasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Leaf className="w-4 h-4 text-green-500" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Guides Read</span>
                    <span>{userProgress.guidesRead}/10</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div
                      className="absolute h-full bg-green-500 rounded-full"
                      style={{ width: `${(userProgress.guidesRead / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Total Points: <span className="font-semibold">{userProgress.totalPoints}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section ref={ref} className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {guides
              .filter(guide => guide.category === activeCategory)
              .map((guide, index) => (
                <motion.div
                  key={guide.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform"
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="relative h-48">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                    {guide.sponsored && (
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                        Sponsored by {guide.sponsorName}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{guide.readTime} min read</span>
                      <span className="text-sm text-gray-500">• {guide.points} points</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleReadGuide(guide.id)}
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Read Guide
                      </button>
                      {guide.downloadUrl && (
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Knowledge</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Got farming wisdom or homesteading tips? Share them with the community and earn points!
          </p>
          <button className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Submit a Guide
          </button>
        </div>
      </section>
    </div>
  );
}