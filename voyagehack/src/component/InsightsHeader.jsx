import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const Header = ({ onPlaceChanged, onLoad }) => {
  return (
    <header className="bg-indigo-700 text-white py-4"> {/* Changed navbar color to blue-700 (a darker blue) */}
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <h5 className="text-xl font-semibold"> {/* Changed font-bold to font-semibold for less bold HOME */}
           <a href="/" className="-m-1.5 p-1.5">
              <span>HOME</span>
            </a>
        </h5>
        <div className="flex items-center space-x-4">
          <h6 className="text-lg">
            Explore new places
          </h6>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 block w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </Autocomplete>
        </div>
      </nav>
    </header>
  );
};

export default Header;