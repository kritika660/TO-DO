import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare } from 'react-icons/fi';

function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto pt-10 pb-20 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Have a question about Taskify Tasks or want to suggest a new feature? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiMessageSquare className="text-indigo-500" /> Send a Message
          </h2>
          
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1 block">Your Name</label>
              <input type="text" className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1 block">Email Address</label>
              <input type="email" className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1 block">Message</label>
              <textarea rows="4" className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
            </div>
            <button type="submit" className="btn-primary mt-2 justify-center py-3">Send Message</button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-full">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-2xl mb-4">
              <FiMail />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-[var(--text-secondary)] mb-4">Contact our support team directly for fast resolution.</p>
            <a href="mailto:support@taskify.example.com" className="text-indigo-500 font-semibold hover:underline">
              support@taskify.example.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
