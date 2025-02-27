import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, ShoppingBag, Hammer, Calendar, Star, BookOpen, LayoutDashboard, Wallet } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Main navigation items
  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/marketplace', label: 'Market', icon: ShoppingBag },
    { path: '/handmade', label: 'Handmade', icon: Hammer },
    { path: '/workshops', label: 'Workshops', icon: Calendar },
    { path: '/featured', label: 'Community', icon: Star },
    { path: '/resources', label: 'Guide', icon: BookOpen },
  ];

  // User-specific navigation items
  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <Home className="w-6 h-6" />
            Fieldsy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Navigation */}
            <div className="flex space-x-6">
              {mainNavItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-gray-600 hover:text-green-600 transition-colors ${
                    location.pathname === path ? 'text-green-600 font-medium' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* User Navigation */}
            <div className="flex items-center space-x-4">
              {userNavItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {/* User Navigation First */}
              {userNavItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    location.pathname === path
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-gray-200 my-2"></div>

              {/* Main Navigation */}
              {mainNavItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    location.pathname === path
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}