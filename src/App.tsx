import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Auth from './components/Auth';
import Map from './components/Map';
import Marketplace from './components/Marketplace';
import Workshops from './components/Workshops';
import Handmade from './components/Handmade';
import Featured from './components/Featured';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';

const Rewards = () => <div className="h-screen bg-gray-100 p-4">Rewards Coming Soon</div>;
const Profile = () => <div className="h-screen bg-gray-100 p-4">Profile Coming Soon</div>;

function App() {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/handmade" element={<Handmade />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;