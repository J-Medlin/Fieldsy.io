import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <p>© 2025 Fieldsy. All Rights Reserved.</p>
      <p>
        <Link to="/terms" className="hover:underline">Terms</Link>
        {' | '}
        <Link to="/privacy" className="hover:underline">Privacy</Link>
      </p>
    </footer>
  );
}