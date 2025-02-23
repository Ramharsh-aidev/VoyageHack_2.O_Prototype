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
        setHotelSearchResults(null); // Clear hotel results when sightseeing search is performed
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
        setSearchResults(null); // Clear sightseeing results when hotel search is performed
        setSelectedSightseeing(null);
        setAvailabilityResults(null);
        setBlockedSightseeing(null);
        setBookingConfirmation(null);
    };


    return (
        <div className="container mx-auto p-6 md:p-8"> {/* Increased container padding for better spacing */}
            {/* BudgetTracker Navbar - Full Width */}
            <header className="bg-indigo-700 shadow mb-10"> {/* Added mb-10 for more space below navbar */}
                <div className="px-4 py-3 flex justify-between items-center"> {/* Removed max-w-6xl mx-auto */}
                    <div>
                        <a href="/" className="text-white font-bold text-xl">Home</a>
                    </div>
                    <div className="space-x-4">
                        <button className="text-white hover:text-indigo-200">Log In</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Sign Up</button>
                    </div>
                </div>
            </header>

            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 font-serif"> {/* Increased font size, bold, serif font, more margin */}
                Explore and Book
                <span className="text-indigo-600 ml-2">Experiences</span> {/* Colored span for emphasis */}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"> {/* Increased gap and margin below forms */}
                {/* Sightseeing Search Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 hover:border-indigo-300 flex flex-col h-full"> {/* Increased padding, rounded corners, shadow, border, flex and h-full for equal height */}
                        <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center font-sans text-indigo-700"> {/* Styled heading - font-sans, indigo color */}
                            Find Sightseeing
                        </h2>
                        <SightseeingSearchForm onSearchResults={handleSearchResults} />
                    </div>
                </div>

                {/* Hotel Search Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 hover:border-indigo-300 flex flex-col h-full"> {/* Increased padding, rounded corners, shadow, border, flex and h-full for equal height - same as above */}
                        <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center font-sans text-indigo-700"> {/* Styled heading - font-sans, indigo color - same as above */}
                            Search Hotels
                        </h2>
                        <HotelSearchForm onHotelSearchResults={handleHotelSearchResults} />
                    </div>
                </div>
            </div>


            {searchResults && searchResults.length > 0 && (
                <div className="mb-10 bg-white shadow-md rounded-xl px-8 pt-8 pb-8"> {/* Increased margin, rounded corners, padding */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-700 font-serif text-indigo-800"> {/* Styled heading - font-serif, indigo color */}
                        Sightseeing Search Results
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
                        {searchResults.map((sightseeing, index) => (
                            <li key={index} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"> {/* Increased padding, rounded corners, shadow on list items */}
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">{sightseeing.SightseeingName}</h3> {/* Slightly more spacing below heading */}
                                {/* Display other sightseeing details from search results with Tailwind classes */}
                                <p className="text-gray-600 mb-3">Duration: {sightseeing.Duration}</p> {/* Added margin below paragraph */}
                                {/* Rounded button */}
                                <button
                                    onClick={() => handleSightseeingSelection(sightseeing)}
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                >
                                    View Availability
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {hotelSearchResults && hotelSearchResults.length > 0 && (
                <div className="mb-10 bg-white shadow-md rounded-xl px-8 pt-8 pb-8"> {/* Increased margin, rounded corners, padding - same as sightseeing results */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-700 font-serif text-indigo-800"> {/* Styled heading - font-serif, indigo color - same as sightseeing results */}
                        Hotel Search Results (Example - To be Implemented)
                    </h2>
                    {/* Display Hotel search results here using Tailwind classes - to be implemented */}
                    <p className="text-gray-700">Hotel search results will be displayed here once Hotel Availability and Booking components are implemented.</p>
                </div>
            )}


            {selectedSightseeing && (
                <div className="mb-10"> {/* Increased margin */}
                    <SightseeingAvailability
                        sightseeingOption={selectedSightseeing}
                        onAvailabilityResults={handleAvailabilityResults}
                        onBlockSightseeing={handleBlockSightseeing}
                    />
                </div>
            )}

            {blockedSightseeing && (
                <div className="mb-10"> {/* Increased margin */}
                    <SightseeingBooking
                        blockedSightseeing={blockedSightseeing}
                        onBookingConfirmation={handleBookingConfirmation}
                    />
                </div>
            )}

            {bookingConfirmation && (
                <div className="mb-10"> {/* Increased margin */}
                    <SightseeingConfirmation bookingDetails={bookingConfirmation} />
                </div>
            )}


        </div>
    );
};

export default Booking;