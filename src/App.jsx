import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Security from './pages/Security';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('taskify_dark_mode') === 'true' ? 'dark' : 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem('taskify_dark_mode', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('taskify_dark_mode', 'false');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <AuthProvider>
      <div className="relative min-h-screen flex flex-col pt-20"> 
        {/* Animated Background Layout */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>

        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
