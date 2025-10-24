import React from 'react';
import { motion } from "framer-motion";

function Videos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Video Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Educational videos and tutorials to support learning at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="text-gray-400 text-8xl mb-8">🎬</div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're working on curating helpful educational videos to support your child's learning journey. 
            Check back soon for engaging content that makes learning fun and accessible.
          </p>
          <div className="mt-8">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="inline-block bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What to Expect</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Reading comprehension activities</li>
                <li>• Math concept explanations</li>
                <li>• Interactive learning games</li>
                <li>• Parent guidance tutorials</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Videos;