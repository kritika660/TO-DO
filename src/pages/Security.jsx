import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiDatabase, FiLock } from 'react-icons/fi';

function Security() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto pt-10 pb-20 px-4"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Privacy & Security</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Your data is yours. Learn how Taskify protects your privacy by design.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel flex flex-col md:flex-row gap-6 items-start md:items-center p-8"
        >
          <div className="text-4xl text-emerald-500 bg-emerald-100 p-4 rounded-xl">
            <FiDatabase />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Local Storage Architecture</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We don't use remote databases to store your tasks. All your to-dos, categories, and settings are saved securely and locally inside your device's browser using LocalStorage. This means zero server latency and total control over your own data.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel flex flex-col md:flex-row gap-6 items-start md:items-center p-8"
        >
          <div className="text-4xl text-indigo-500 bg-indigo-100 p-4 rounded-xl border border-indigo-200">
            <FiLock />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">No Tracking</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Taskify does not employ hidden Google Analytics, marketing cookies, or third-party pixel tracking. Your productivity habits are your business alone.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel flex flex-col md:flex-row gap-6 items-start md:items-center p-8"
        >
          <div className="text-4xl text-orange-500 bg-orange-100 p-4 rounded-xl">
            <FiShield />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Enterprise-Grade Hosting</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our front-end application code is hosted on secure, modern CDNs enforcing strict HTTPS everywhere, guaranteeing that the application you download cannot be intercepted or tampered with by malicious actors on your network.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Security;
