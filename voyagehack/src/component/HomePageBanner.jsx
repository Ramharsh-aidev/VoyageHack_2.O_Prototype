import React from 'react';
// import { useState } from 'react';
import { motion } from 'framer-motion'; // For animation

const HomePage = () => {
  return (
    <div>
      {/* Banner Section with 3D Effect */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 text-center text-white py-32">
          <motion.h1
            className="text-6xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Explore the World with AI
          </motion.h1>
          <motion.p
            className="text-xl mt-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          >
            Your personalized travel planner powered by AI and real-time insights
          </motion.p>
          <button className="mt-8 px-6 py-2 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow-lg hover:bg-indigo-100">
            Start Your Journey
          </button>
        </div>
        {/* 3D Image Banner */}
        <div className="absolute inset-0 -z-10">
          <motion.img
            src="https://www.travelboutiqueonline.com/new-design/images/ceobg.jpg" // Replace with your travel image URL
            alt="Travel Banner"
            className="object-cover w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-32 text-center">
        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="mt-12 flex justify-center gap-12">
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 w-64"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h3>
            <p className="text-gray-700">
              Get tailored destination recommendations based on your preferences and budget.
            </p>
          </motion.div>
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 w-64"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Seamless Booking Integration</h3>
            <p className="text-gray-700">
              Book hotels, flights, and activities in one place for a smooth travel experience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
