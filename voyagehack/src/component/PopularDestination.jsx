import React, { useState } from 'react';
import { motion } from 'framer-motion';

const destinations = [
    {
      name: 'Ram Mandir Ayodhya, India',
      description: 'A sacred and historic site, the Ram Mandir in Ayodhya is an iconic religious and cultural landmark.',
      img: 'https://www.livemint.com/lm-img/img/2024/01/22/600x338/Ayodhya_Ram_Temple_1705904632561_1705905143354.jpg',
      link: '#rammandir',
    },
    {
      name: 'Tokyo, Japan',
      description: "A blend of ancient traditions and modern wonders, Tokyo offers glimpses of Japan's rich history and the majestic Mount Fuji.",
      img: 'https://img.freepik.com/premium-photo/generative-ai-mount-fuji-chureito-pagoda-autumn_28914-24091.jpg',
      link: '#tokyo',
    },
    {
      name: 'Rajasthan, India',
      description: 'Known for its majestic palaces, grand forts, and rich cultural heritage, Rajasthan is a land of vibrant colors and royal history.',
      img: 'https://www.travelsiteindia.com/images/rajasthan-banner-1.jpg',
      link: '#rajasthan',
    },
    {
      name: 'Goa, India',
      description: 'Famous for its beautiful beaches, vibrant nightlife, and Portuguese-influenced architecture, Goa is a tropical paradise on India\'s western coast.',
      img: 'https://th.bing.com/th/id/R.30c05a57cae01bca2681a6c5dc8ae25d?rik=eamUNa8GbRXRNw&riu=http%3a%2f%2fwww.thomascook.in%2fimages%2fstatic%2fhoneymoon-pages%2fgoa_banner.jpg&ehk=Io4bRyCAJfH4R13A5I3HQUmOwyhbNTVcl8XQM0kxMyI%3d&risl=&pid=ImgRaw&r=0',
      link: '#goa',
    },
  ];
  

const PopularDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length
    );
  };

  const destination = destinations[currentIndex];

  return (
    <div className="px-6 py-32 text-center bg-white-50">
      <motion.h2
            className="text-4xl font-bold text-indigo-500 mb-8 px-4 py-2 transition-all duration-300 relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Popular destinations
            {/* Gradient Underline */}
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-200 to-indigo-600 rounded-lg"></span>
      </motion.h2>

      <div className="relative">
        {/* Destination Image and Details */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <a href={destination.link} className="block">
            <img
              src={destination.img}
              alt={destination.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
            />
          </a>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="text-center text-white px-4">
              <h3 className="text-2xl font-semibold">{destination.name}</h3>
              <p className="mt-2 text-lg">{destination.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer" onClick={goToPrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={goToNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
