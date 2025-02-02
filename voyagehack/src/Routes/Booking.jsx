import React, { useState } from 'react';
import SightseeingSearchForm from '../component/SightseeingSearchForm';
import SightseeingAvailability from '../component/SightseeingAvailability';
import SightseeingBooking from '../component/SightseeingBooking';
import SightseeingConfirmation from '../component/SightseeingConfirmation';
import HotelSearchForm from '../component/HotelSearchForm'; // Import Hotel Search Form

const Booking = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [selectedSightseeing, setSelectedSightseeing] = useState(null);
    const [availabilityResults, setAvailabilityResults] = useState(null);
    const [blockedSightseeing, setBlockedSightseeing] = useState(null);
    const [bookingConfirmation, setBookingConfirmation] = useState(null);
    const [hotelSearchResults, setHotelSearchResults] = useState(null); // State for Hotel Search Results


    const handleSearchResults = (results) => {
        setSearchResults(results);
        setSelectedSightseeing(null);
        setAvailabilityResults(null);
        setBlockedSightseeing(null);
        setBookingConfirmation(null);
    };

    const handleSightseeingSelection = (sightseeing) => {
        setSelectedSightseeing(sightseeing);
        setAvailabilityResults(null);
        setBlockedSightseeing(null);
        setBookingConfirmation(null);
    };

    const handleAvailabilityResults = (results) => {
        setAvailabilityResults(results);
        setBlockedSightseeing(null);
        setBookingConfirmation(null);
    };

    const handleBlockSightseeing = (availabilityDetail) => {
        // **IMPLEMENT BLOCK API CALL HERE - For now, simulate blocking**
        setBlockedSightseeing({ ...selectedSightseeing, availabilityDetail });
        setBookingConfirmation(null);
    };

    const handleBookingConfirmation = (confirmation) => {
        setBookingConfirmation(confirmation);
    };

    // Hotel Search Handlers
    const handleHotelSearchResults = (hotelResults) => {
        setHotelSearchResults(hotelResults);
        // ... Reset other sightseeing related states if needed when showing hotel results
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Booking Services</h1>

            <div className="mb-8">
                <SightseeingSearchForm onSearchResults={handleSearchResults} />
            </div>

            {searchResults && searchResults.length > 0 && (
                <div className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Sightseeing Search Results</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map((sightseeing, index) => (
                            <li key={index} className="p-4 border rounded">
                                <h3 className="text-lg font-semibold text-gray-700">{sightseeing.SightseeingName}</h3> {/* Assuming sightseeing has SightseeingName - ADJUST */}
                                {/* Display other sightseeing details from search results with Tailwind classes */}
                                <p className="text-gray-600">Duration: {sightseeing.Duration}</p> {/* Example - adjust */}
                                <button
                                    onClick={() => handleSightseeingSelection(sightseeing)}
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    View Availability
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedSightseeing && (
                <div className="mb-8">
                    <SightseeingAvailability
                        sightseeingOption={selectedSightseeing}
                        onAvailabilityResults={handleAvailabilityResults}
                        onBlockSightseeing={handleBlockSightseeing}
                    />
                </div>
            )}

            {blockedSightseeing && (
                <div className="mb-8">
                    <SightseeingBooking
                        blockedSightseeing={blockedSightseeing}
                        onBookingConfirmation={handleBookingConfirmation}
                    />
                </div>
            )}

            {bookingConfirmation && (
                <div className="mb-8">
                    <SightseeingConfirmation bookingDetails={bookingConfirmation} />
                </div>
            )}

            {/* Hotel Search Form */}
            <div className="mb-8">
                <HotelSearchForm onHotelSearchResults={handleHotelSearchResults} />
            </div>

            {hotelSearchResults && hotelSearchResults.length > 0 && (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Hotel Search Results (Example - To be Implemented)</h2>
                    {/* Display Hotel search results here using Tailwind classes - to be implemented */}
                    <p className="text-gray-700">Hotel search results will be displayed here once Hotel Availability and Booking components are implemented.</p>
                </div>
            )}


        </div>
    );
};

export default Booking;