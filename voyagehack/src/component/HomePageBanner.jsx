import React from 'react';
import { motion } from 'framer-motion';

const HomePageBanner = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative z-1 text-center text-white py-32">
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
      {/* 3D Image Banner with border radius */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src="https://www.travelboutiqueonline.com/new-design/images/ceobg.jpg" // Replace with your travel image URL
          alt="Travel Banner"
          className="object-cover w-full h-full rounded-lg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default HomePageBanner;
