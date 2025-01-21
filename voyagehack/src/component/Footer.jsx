import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';  // Using react-icons for social media icons
import Logo from '../images/Website_Logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-16 px-6 mt-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 - Logo & About */}
        <div className="flex flex-col items-start">
          <img
            src={Logo} // Replace with your logo URL
            alt="Travel Lovers"
            className="h-12 mb-6"
          />
          <p className="text-sm text-gray-400 mb-4">
            Explore the world with AI-powered travel planning, offering personalized itineraries, insights, and seamless booking.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="text-sm text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a></li>
            <li><a href="#pricing" className="text-sm text-gray-400 hover:text-white">Pricing</a></li>
            <li><a href="#contact" className="text-sm text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#about" className="text-sm text-gray-400 hover:text-white">About</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="/blog" className="text-sm text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="/Help" className="text-sm text-gray-400 hover:text-white">Help Center</a></li>
            <li><a href="/T&C" className="text-sm text-gray-400 hover:text-white">Terms & Conditions</a></li>
            <li><a href="/PrivacyPolicy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-400 mb-4">Have any questions? Feel free to reach out to us!</p>
          <ul className="space-y-2">
            <li><p className="text-sm text-gray-400">📍 Nagpur, India, In</p></li>
            <li><p className="text-sm text-gray-400">✉️ support@travellovers.com</p></li>
            <li><p className="text-sm text-gray-400">📞 (123) 456-7890</p></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Travel Lovers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
