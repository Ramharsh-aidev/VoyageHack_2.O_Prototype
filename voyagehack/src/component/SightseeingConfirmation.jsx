import React from 'react';

const SightseeingConfirmation = ({ bookingDetails }) => {
    if (!bookingDetails) {
        return <p className="text-gray-700">No booking confirmation yet.</p>;
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
            <h2 className="block text-gray-700 text-2xl font-bold mb-6">Booking Confirmed!</h2>
            <h3 className="block text-gray-700 text-lg font-semibold mb-4">Booking Reference: {bookingDetails.BookingReferenceNo}</h3> {/* Assuming bookingDetails has BookingReferenceNo - ADJUST */}
            {/* Display other booking confirmation details from API response using Tailwind classes */}
            <p className="text-gray-700 mb-4">Thank you for your booking!</p>
            {/* ... Display booking summary details with Tailwind classes */}
        </div>
    );
};

export default SightseeingConfirmation;