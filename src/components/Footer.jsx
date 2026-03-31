import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-10 py-8 text-center text-[var(--text-secondary)] border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="font-medium text-sm">© {new Date().getFullYear()} Taskify. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-sm">
          <Link to="/security" className="hover:text-indigo-500 transition-colors">Privacy & Security</Link>
          <Link to="/contact" className="hover:text-indigo-500 transition-colors">Contact Us</Link>
          <Link to="/" className="hover:text-indigo-500 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
