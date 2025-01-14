import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "John Doe",
    text: "This platform made planning our group trip effortless. From booking flights to finding activities, everything was handled smoothly. Highly recommend for group travel!",
    role: "Travel Agent, XYZ Tours",
    location: "New York, USA",
    img: "https://th.bing.com/th/id/OIP.hT0vhd2BoSOrC5HCQkT5YgAAAA?rs=1&pid=ImgDetMain", // Replace with actual images if needed
  },
  {
    name: "Michael Johnson",
    text: "What I loved the most was the ability to customize itineraries in real-time. My team loved the flexibility, and the platform’s integration with booking tools made everything so much easier.",
    role: "Group Tour Leader, Europe Tours",
    location: "London, UK",
    img: "https://images.marinelink.com/images/maritime/michael-g-johnson-sea-machines-105903.jpg",
  },
  {
    name: "Emily Davis",
    text: "Planning a family vacation can be stressful, but this platform made it enjoyable. The trip planning feature is a game-changer. We had a blast without worrying about the details!",
    role: "Family Traveler",
    location: "Miami, USA",
    img: "https://www.famousbirthdays.com/headshots/emily-davis-3.jpg", 
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-white-50 py-16">
      <div className="container mx-auto text-center">
        <motion.h2
            className="text-4xl font-semibold text-indigo-500 mb-8 px-4 py-2 transition-all duration-300 relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            What Our Clients Say
            {/* Gradient Underline */}
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg"></span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 2, scale: 1.025 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img src={review.img} alt={review.name} className="rounded-full w-24 h-24 mb-4 object-cover" />
              <p className="text-lg text-gray-600 italic">"{review.text}"</p>
              <p className="mt-4 text-xl font-semibold">{review.name}</p>
              <p className="text-gray-500">{review.role}</p>
              <p className="text-gray-400">{review.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
