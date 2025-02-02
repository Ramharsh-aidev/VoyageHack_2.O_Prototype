import React, { useState } from 'react';
import axios from 'axios';

const SightseeingBooking = ({ blockedSightseeing, onBookingConfirmation }) => {
    const [passengerDetails, setPassengerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        // ... other passenger details as required by API
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setPassengerDetails({ ...passengerDetails, [e.target.name]: e.target.value });
    };

    const handleBookSightseeing = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // **REPLACE WITH ACTUAL ENDPOINT FROM TBO POSTMAN COLLECTION**
            const apiUrl = `${process.env.REACT_APP_SIGHTSEEING_API_BASE_URL}/SightseeingBook`; // Example Endpoint - REPLACE

            const requestData = {
                BlockId: blockedSightseeing.BlockId, // Assuming blockedSightseeing has BlockId from blocking step - ADJUST
                PassengerInfo: passengerDetails,
                // ... other booking parameters based on API docs
                // Example Placeholders (REPLACE):
                // NumberOfPassengers: 1,
                // TotalPrice: blockedSightseeing.price,
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
                // **ADJUST onBookingConfirmation and response.data.SightseeingBookingResult to match ACTUAL RESPONSE STRUCTURE**
                onBookingConfirmation(response.data.SightseeingBookingResult); // Example - adjust based on actual response
            } else {
                setError(`Booking failed. Status: ${response.status}, Message: ${response.statusText}`);
            }
        } catch (err) {
            setError(`Error during booking: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-6">Confirm Booking</h2>
            <h3 className="block text-gray-700 text-lg font-semibold mb-4">Sightseeing: {blockedSightseeing.SightseeingName}</h3> {/* Assuming blockedSightseeing has SightseeingName - ADJUST */}
            {/* Display details of blocked sightseeing using Tailwind classes for styling */}

            <form onSubmit={handleBookSightseeing} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={passengerDetails.firstName}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={passengerDetails.lastName}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={passengerDetails.email}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={passengerDetails.phone}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* ... other passenger details input fields with Tailwind classes */}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? 'Booking...' : 'Book Now'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SightseeingBooking;