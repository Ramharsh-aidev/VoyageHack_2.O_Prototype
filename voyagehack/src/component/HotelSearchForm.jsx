import React, { useState } from 'react';
import axios from 'axios';

const HotelSearchForm = ({ onHotelSearchResults }) => {
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // **REPLACE with ACTUAL Hotel Search API Endpoint from TBO Hotel API Docs/Postman**
            const apiUrl = `${process.env.REACT_APP_HOTEL_API_BASE_URL}/HotelSearch`; // Example Endpoint - REPLACE

            // **ADJUST requestData to match the REQUIRED BODY STRUCTURE for Hotel Search API**
            const requestData = {
                Destination: destination, // Adjust key based on API docs
                CheckInDate: checkInDate, // Adjust key based on API docs
                CheckOutDate: checkOutDate, // Adjust key based on API docs
                // ... other required Hotel Search parameters - PLACEHOLDERS
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Username': process.env.REACT_APP_HOTEL_USERNAME, // Use Hotel API credentials from .env
                    'Password': process.env.REACT_APP_HOTEL_PASSWORD, // Use Hotel API credentials from .env
                    // **Add ClientId header if required for Hotel API - check Hotel API docs/Postman**
                },
            });

            if (response.status === 200) {
                // **ADJUST onHotelSearchResults and response data handling based on Hotel API response structure**
                onHotelSearchResults(response.data.HotelSearchResult); // Example - adjust based on actual response
            } else {
                setError(`Hotel Search failed. Status: ${response.status}, Message: ${response.statusText}`);
            }
        } catch (err) {
            setError(`Error during hotel search: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-6">Search Hotels</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="hotelDestination" className="block text-gray-700 text-sm font-bold mb-2">
                        Destination:
                    </label>
                    <input
                        type="text"
                        id="hotelDestination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Check-in Date:
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Check-out Date:
                    </label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? 'Search Hotels...' : 'Search Hotels'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default HotelSearchForm;