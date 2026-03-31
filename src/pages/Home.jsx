import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock, FiLock } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function Home() {
  return (
    <div className="flex flex-col items-center w-full pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center pt-24 pb-32 px-4 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
          Master Your Day With <span className="text-indigo-500">Taskify</span>.
        </h1>
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          The premium, beautifully designed productivity workspace that brings clarity to your tasks and focus to your mind.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/app" className="btn-primary text-lg px-8 py-4">
            Open Dashboard <FiArrowRight className="ml-2" />
          </Link>
          <Link to="/register" className="glass-panel text-lg px-8 py-4 hover:shadow-lg transition-shadow text-[var(--text-primary)] font-medium">
            Sign Up Free
          </Link>
        </div>
      </motion.section>

      {/* Feature Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
      >
        <motion.div variants={fadeIn} className="glass-panel text-center p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mb-6">
            <FiCheckCircle />
          </div>
          <h3 className="text-xl font-bold mb-3">Intuitive Tasks</h3>
          <p className="text-[var(--text-secondary)]">Drag and drop, prioritize, and categorize your work with a seamlessly smooth interface.</p>
        </motion.div>

        <motion.div variants={fadeIn} className="glass-panel text-center p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl mb-6">
            <FiClock />
          </div>
          <h3 className="text-xl font-bold mb-3">Built-in Pomodoro</h3>
          <p className="text-[var(--text-secondary)]">Stay in the flow state with our integrated 25-minute focus timer right inside your dashboard.</p>
        </motion.div>

        <motion.div variants={fadeIn} className="glass-panel text-center p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-6">
            <FiLock />
          </div>
          <h3 className="text-xl font-bold mb-3">Local Privacy</h3>
          <p className="text-[var(--text-secondary)]">Everything is stored right in your browser. No accounts required to start, full privacy guaranteed.</p>
        </motion.div>
      </motion.section>

      {/* Call to Action Triggered by Scroll */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="glass-panel w-full max-w-4xl text-center p-12 md:p-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to regain your focus?</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">Join thousands utilizing the Taskify method to achieve their goals.</p>
        <Link to="/app" className="btn-primary text-xl px-10 py-4 mx-auto w-max">
          Launch App Now
        </Link>
      </motion.section>

    </div>
  );
}

export default Home;
