import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet as WalletIcon, Leaf, CreditCard, ArrowUpRight, ArrowDownRight, Gift, Trees as Tree, ShoppingBag, HandshakeIcon, ChevronRight, Plus, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'points' | 'eco';
  description: string;
  amount: number;
  timestamp: string;
  isEco?: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  type: 'discount' | 'eco' | 'premium';
}

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Demo data
  const demoTransactions: Transaction[] = [
    {
      id: '1',
      type: 'sale',
      description: 'Sold organic tomatoes',
      amount: 25.00,
      timestamp: new Date().toISOString(),
      isEco: true
    },
    {
      id: '2',
      type: 'points',
      description: 'Eco-friendly delivery bonus',
      amount: 50,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isEco: true
    },
    {
      id: '3',
      type: 'purchase',
      description: 'Bought handmade soap',
      amount: -15.00,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const demoRewards: Reward[] = [
    {
      id: '1',
      title: '$10 Market Credit',
      description: 'Get $10 off your next purchase',
      pointsCost: 500,
      image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      type: 'discount'
    },
    {
      id: '2',
      title: 'Plant a Tree',
      description: 'We\'ll plant a tree in your name',
      pointsCost: 1000,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      type: 'eco'
    },
    {
      id: '3',
      title: 'Premium Listing',
      description: 'Feature your items for 1 week',
      pointsCost: 750,
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
      type: 'premium'
    }
  ];

  useEffect(() => {
    setTransactions(demoTransactions);
    setRewards(demoRewards);
    setLoading(false);
  }, []);

  const stats = {
    points: 1250,
    balance: 157.50,
    co2Saved: 25,
    greenTransactions: 15
  };

  const getTransactionIcon = (type: Transaction['type'], isEco?: boolean) => {
    switch (type) {
      case 'sale':
        return <ShoppingBag className={`w-5 h-5 ${isEco ? 'text-green-500' : 'text-blue-500'}`} />;
      case 'purchase':
        return <CreditCard className="w-5 h-5 text-purple-500" />;
      case 'points':
        return <Gift className="w-5 h-5 text-yellow-500" />;
      case 'eco':
        return <Leaf className="w-5 h-5 text-green-500" />;
      default:
        return <WalletIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600">Manage your earnings and eco-impact</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <WalletIcon className="w-8 h-8 text-green-500" />
                  <span className="text-green-500 flex items-center text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    8%
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold">${stats.balance.toFixed(2)}</h3>
                    <p className="text-gray-600">Available Balance</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600">{stats.points} pts</h3>
                    <p className="text-gray-600">Reward Points</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <Leaf className="w-8 h-8 text-green-500" />
                  <span className="text-green-500 flex items-center text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    12%
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold">{stats.co2Saved}kg</h3>
                    <p className="text-gray-600">CO2 Saved</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600">{stats.greenTransactions}</h3>
                    <p className="text-gray-600">Green Transactions</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Transaction History</h3>
                  <select className="text-sm border rounded-lg px-3 py-2">
                    <option>All Transactions</option>
                    <option>Points Only</option>
                    <option>Eco Transactions</option>
                  </select>
                </div>
              </div>
              <div className="divide-y">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type, transaction.isEco)}
                      <div className="flex-1">
                        <p className="text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(transaction.timestamp), 'MMM d, h:mm a')}
                        </p>
                      </div>
                      <span className={`font-medium ${
                        transaction.type === 'points' 
                          ? 'text-yellow-600' 
                          : transaction.amount > 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                      }`}>
                        {transaction.type === 'points' ? `+${transaction.amount} pts` : `$${Math.abs(transaction.amount).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => setShowPurchaseModal(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-green-500" />
                    <span>Buy Points</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>Add Payment Method</span>
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

            {/* Rewards Store */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Rewards Store</h3>
              </div>
              <div className="p-4 space-y-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{reward.title}</h4>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        <p className="text-sm font-medium text-green-600 mt-1">
                          {reward.pointsCost} points
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Redeem
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco-Payment Options */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Eco-Payment Options</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span>Paperless Payments</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tree className="w-5 h-5 text-green-500" />
                    <span>Carbon Offset</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Eco-Bonus:</span> Earn 20 extra points for each green payment!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Point Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Buy Points</h3>
              <div className="space-y-4">
                <button className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span>100 points</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                </button>
                <button className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span>250 points</span>
                    <span className="font-medium">$10.00</span>
                  </div>
                </button>
                <button className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span>500 points</span>
                    <span className="font-medium">$20.00</span>
                  </div>
                </button>
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}