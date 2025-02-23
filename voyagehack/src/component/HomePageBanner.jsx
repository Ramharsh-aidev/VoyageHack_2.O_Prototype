import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePageBanner = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();

  // Handle button click with delay
  const handleClick = () => {
    setLoading(true); // Set loading to true when the button is clicked
    
    setTimeout(() => {
      navigate('/ai-trip-planner'); // After delay, navigate to ai-trip-planner
    }, 1000); // Adjust the delay as needed (1000ms = 1 second)
  };

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
        <button
          onClick={handleClick} // Add onClick handler to the button
          className="mt-8 px-6 py-2 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow-lg hover:bg-indigo-100"
        >
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

      {/* Loading animation */}
      {loading && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-20 opacity-80">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageBanner;
