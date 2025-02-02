import React, { useState, useEffect, createRef } from 'react';
import PlaceDetails from './PlaceDetails';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className="container p-6">
      <h4 className="text-2xl font-semibold mb-4">Food & Dining around you</h4>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex space-x-4">
            <div className="relative">
              <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
                <option value="attractions">Attractions</option>
              </select>
            </div>

            <div className="relative">
              <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">All</option>
                <option value="3">Above 3.0</option>
                <option value="4">Above 4.0</option>
                <option value="4.5">Above 4.5</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[75vh]">
            {places?.map((place, i) => (
              <div ref={elRefs[i]} key={i} className="w-full">
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;