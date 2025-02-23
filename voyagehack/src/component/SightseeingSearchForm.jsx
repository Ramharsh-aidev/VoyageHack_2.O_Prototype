import React, { useState } from 'react';
import axios from 'axios';

const SightseeingSearchForm = ({ onSearchResults }) => {
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // **REPLACE WITH ACTUAL ENDPOINT FROM TBO POSTMAN COLLECTION**
            const apiUrl = `${process.env.REACT_APP_SIGHTSEEING_API_BASE_URL}/SightseeingSearch`; // Example Endpoint - REPLACE

            // **ADJUST requestData to match the REQUIRED BODY STRUCTURE from TBO API DOCS/POSTMAN**
            const requestData = {
                CityCode: destination, // Assuming 'destination' is CityCode - ADJUST
                TravelDate: date,       // Assuming 'date' is TravelDate - ADJUST
                // Add other required parameters for Sightseeing Search API as per documentation
                // Example Placeholders (REPLACE):
                // AdultCount: 2,
                // ChildCount: 0,
                // Currency: "USD",
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Username': process.env.REACT_APP_SIGHTSEEING_USERNAME,
                    'Password': process.env.REACT_APP_SIGHTSEEING_PASSWORD,
                    'ClientId': process.env.REACT_APP_SIGHTSEEING_CLIENT_ID,
                    // Add any other headers REQUIRED by TBO API Search endpoint from Postman
                },
            });

            if (response.status === 200) {
                // **ADJUST response.data.SightseeingSearchResult to match ACTUAL RESPONSE STRUCTURE**
                onSearchResults(response.data.SightseeingSearchResult); // Example - adjust based on actual response
            } else {
                setError(`Search failed. Status: ${response.status}, Message: ${response.statusText}`);
            }
        } catch (err) {
            setError(`Error during search: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-6">Search Sightseeing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
                        Destination City:
                    </label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        placeholder="e.g., DXB, PAR, LON"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        Travel Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SightseeingSearchForm;