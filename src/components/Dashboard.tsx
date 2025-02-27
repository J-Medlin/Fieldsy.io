import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart as BarChartIcon,
  Award,
  Settings,
  Bell,
  ShoppingBag,
  HandshakeIcon,
  Leaf,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Edit2
} from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabase';

interface Activity {
  id: string;
  type: 'sale' | 'trade' | 'workshop' | 'points';
  description: string;
  timestamp: string;
  amount?: number;
  status?: 'completed' | 'pending';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
}

interface Stats {
  totalSales: number;
  totalTrades: number;
  totalPoints: number;
  rank: number;
  level: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState<Stats>({
    totalSales: 157,
    totalTrades: 23,
    totalPoints: 1250,
    rank: 12,
    level: 'Market Master'
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo data
  const salesData = [
    { name: 'Mon', sales: 4 },
    { name: 'Tue', sales: 3 },
    { name: 'Wed', sales: 6 },
    { name: 'Thu', sales: 4 },
    { name: 'Fri', sales: 8 },
    { name: 'Sat', sales: 10 },
    { name: 'Sun', sales: 7 }
  ];

  const demoActivities: Activity[] = [
    {
      id: '1',
      type: 'sale',
      description: 'Sold 10 jars of honey',
      timestamp: new Date().toISOString(),
      amount: 150,
      status: 'completed'
    },
    {
      id: '2',
      type: 'trade',
      description: 'Traded wool for fresh eggs',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed'
    },
    {
      id: '3',
      type: 'points',
      description: 'Earned 50 points for eco-friendly delivery',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      amount: 50
    }
  ];

  const demoBadges: Badge[] = [
    {
      id: '1',
      name: 'Market Master',
      description: 'Complete 100 sales',
      icon: 'shopping-bag',
      progress: 75,
      total: 100
    },
    {
      id: '2',
      name: 'Green Guardian',
      description: 'Save 100kg CO2 through eco-trades',
      icon: 'leaf',
      progress: 45,
      total: 100
    },
    {
      id: '3',
      name: 'Barter Pro',
      description: 'Complete 50 successful trades',
      icon: 'handshake',
      progress: 23,
      total: 50
    }
  ];

  useEffect(() => {
    setActivities(demoActivities);
    setBadges(demoBadges);
    setLoading(false);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return <ShoppingBag className="w-5 h-5 text-green-500" />;
      case 'trade':
        return <HandshakeIcon className="w-5 h-5 text-blue-500" />;
      case 'points':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userStats.level}!</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="w-8 h-8 text-green-500" />
                  <span className="text-green-500 flex items-center text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    12%
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{userStats.totalSales}</h3>
                <p className="text-gray-600">Total Sales</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <HandshakeIcon className="w-8 h-8 text-blue-500" />
                  <span className="text-green-500 flex items-center text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    8%
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{userStats.totalTrades}</h3>
                <p className="text-gray-600">Trades Made</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <span className="text-red-500 flex items-center text-sm">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    3%
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{userStats.totalPoints}</h3>
                <p className="text-gray-600">Points Earned</p>
              </motion.div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Sales Overview</h3>
                <select className="text-sm border rounded-lg px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="divide-y">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                        </p>
                      </div>
                      {activity.amount && (
                        <span className="text-gray-900 font-medium">
                          {activity.type === 'points' ? `+${activity.amount}` : `$${activity.amount}`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-50">
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-gray-600">Rank #{userStats.rank} • {userStats.level}</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Edit Profile
                </button>
                <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  View Public Profile
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Badges & Achievements</h3>
              </div>
              <div className="divide-y">
                {badges.map((badge) => (
                  <div key={badge.id} className="p-4">
                    <div className="flex items-center gap-4 mb-2">
                      <Award className="w-8 h-8 text-yellow-500" />
                      <div className="flex-1">
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{badge.progress}/{badge.total}</span>
                        <span>{Math.round((badge.progress / badge.total) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-green-500" />
                    <span>List New Item</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <HandshakeIcon className="w-5 h-5 text-blue-500" />
                    <span>Start Trade</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span>View Eco Impact</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}