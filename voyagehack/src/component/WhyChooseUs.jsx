import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: 'AI-Powered Suggestions', description: 'Get tailored destination recommendations based on your preferences and budget.' },
  { title: 'Seamless Booking Integration', description: 'Book hotels, flights, and activities in one place for a smooth travel experience.' },
  { title: 'Budget Tracker', description: 'Keep track of your travel expenses and ensure your trip stays within budget.' },
  { title: 'Local Insights', description: 'Get insider tips on local attractions, dining, and culture at your travel destination.' },
];

const WhyChooseUs = () => {
    return (
      <div className="px-10 py-36 text-center">
        <motion.h2
          className="text-4xl font-bold text-indigo-500 mb-8 px-4 py-2 transition-all duration-300 relative inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us ?
          {/* Gradient Underline */}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-200 to-indigo-600 rounded-lg"></span>
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              className="bg-white shadow-xl rounded-lg p-6 min-h-[300px] flex flex-col justify-center"
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

export default WhyChooseUs;
