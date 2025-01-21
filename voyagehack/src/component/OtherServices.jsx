import React from 'react';
import { motion } from 'framer-motion';

export default function OtherServices() {
  return (
    <div className="mt-10 px-4">
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold text-indigo-500 mb-8 relative inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Book Your Trip
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-200 to-indigo-600 rounded-lg"></span>
        </motion.h2>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Flights</h3>
          <p className="text-gray-500 mb-4">Book your flight with the best deals available!</p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Book Flights
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Transportation</h3>
          <p className="text-gray-500 mb-4">Rent a car or book transportation services for your trip!</p>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Book Transportation
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Hotels</h3>
          <p className="text-gray-500 mb-4">Find the best hotels at amazing prices!</p>
          <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Book Hotels
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tours</h3>
          <p className="text-gray-500 mb-4">Discover the best tours and sightseeing experiences!</p>
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Book Tours
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Excursions</h3>
          <p className="text-gray-500 mb-4">Explore exciting excursions and adventure activities during your trip!</p>
          <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            Book Excursions
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Places Tikets</h3>
          <p className="text-gray-500 mb-4">Explore Discounts on prebooking of Popular palces in your tour</p>
          <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
