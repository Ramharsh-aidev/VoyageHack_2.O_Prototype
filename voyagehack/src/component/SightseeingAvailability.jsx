import React, { useState } from 'react';
import axios from 'axios';

const SightseeingAvailability = ({ sightseeingOption, onAvailabilityResults, onBlockSightseeing }) => {
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckAvailability = async () => {
        setLoading(true);
        setError('');

        try {
            // **REPLACE WITH ACTUAL ENDPOINT FROM TBO POSTMAN COLLECTION**
            const apiUrl = `${process.env.REACT_APP_SIGHTSEEING_API_BASE_URL}/SightseeingAvailability`; // Example Endpoint - REPLACE

            const requestData = {
                SightseeingId: sightseeingOption.SightseeingId, // Assuming sightseeingOption has SightseeingId - ADJUST
                // ... other availability parameters based on API docs
                // Example Placeholders (REPLACE):
                // TravelDate: "2024-08-20",
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Username': process.env.REACT_APP_SIGHTSEEING_USERNAME,
                    'Password': process.env.REACT_APP_SIGHTSEEING_PASSWORD,
                    'ClientId': process.env.REACT_APP_SIGHTSEEING_CLIENT_ID,
                    // ... other headers
                },
            });

            if (response.status === 200) {
                // **ADJUST response.data.SightseeingAvailabilityResult to match ACTUAL RESPONSE STRUCTURE**
                setAvailability(response.data.SightseeingAvailabilityResult); // Example - adjust based on actual response
                onAvailabilityResults(response.data.SightseeingAvailabilityResult);
            } else {
                setError(`Availability check failed. Status: ${response.status}, Message: ${response.statusText}`);
            }
        } catch (err) {
            setError(`Error checking availability: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = (availabilityDetail) => {
        onBlockSightseeing(availabilityDetail);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="block text-gray-700 text-xl font-bold mb-6">Availability for: {sightseeingOption.SightseeingName}</h3> {/* Assuming sightseeingOption has SightseeingName - ADJUST */}
            <div className="mb-4">
                <button
                    onClick={handleCheckAvailability}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                    {loading ? 'Checking Availability...' : 'Check Availability'}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {availability && availability.length > 0 ? (
                <div className="mt-6">
                    <h4 className="block text-gray-700 text-lg font-bold mb-4">Available Options:</h4>
                    <ul className="list-disc pl-5">
                        {availability.map((item, index) => (
                            <li key={index} className="mb-4">
                                <div className="p-4 border rounded">
                                    {/* Display availability details - ADJUST based on API response */}
                                    <p><span className="font-semibold">Date:</span> {item.Date}</p> {/* Example - adjust based on actual response */}
                                    <p><span className="font-semibold">Time:</span> {item.Time}</p> {/* Example - adjust based on actual response */}
                                    <p><span className="font-semibold">Price:</span> {item.Price}</p> {/* Example - adjust based on actual response */}
                                    <button
                                        onClick={() => handleBlock(item)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                                    >
                                        Block
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : availability ? (
                <p className="mt-4">No availability found for this sightseeing option.</p>
            ) : null}
        </div>
    );
};

export default SightseeingAvailability;