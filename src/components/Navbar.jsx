import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiCheckSquare, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'App', path: '/app' },
    { name: 'Contact', path: '/contact' },
    { name: 'Security', path: '/security' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-indigo-500 font-bold text-2xl">
          <FiCheckSquare className="text-3xl" />
          <span className="tracking-tight text-primary-color">Taskify</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-medium transition-colors hover:text-indigo-400 ${
                location.pathname === link.path ? 'text-indigo-500' : 'text-[var(--text-secondary)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--input-bg)] text-[var(--text-primary)] hover:bg-indigo-500 hover:text-white transition-all shadow-sm block"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-sm font-semibold text-[var(--text-primary)]">
                Hi, {user?.name || 'User'}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 font-medium text-[var(--text-secondary)] hover:text-red-500 transition-colors text-sm"
              >
                <FiLogOut />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block font-medium text-[var(--text-secondary)] hover:text-indigo-500 transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
