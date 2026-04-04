import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login({ email, name: email.split('@')[0] });
    navigate('/app');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center w-full min-h-[70vh]"
    >
      <div className="glass-panel w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" className="w-4 h-4 accent-indigo-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary justify-center mt-4 py-3 text-lg">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-[var(--text-secondary)]">
          Don't have an account? <Link to="/register" className="text-indigo-500 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </motion.div> 
  );
}

export default Login;
