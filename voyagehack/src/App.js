import React from 'react';
import Header from './component/Header';
import HomePage from './component/HomePageBanner';
// import Footer from './components/Footer';
// import PopularDestinations from './components/PopularDestinations';
// import TripPlanner from './components/TripPlanner';
// import TicketBooking from './components/TicketBooking';
// import './styles.css';

function App() {
  return (
    <div>
      <Header />
      <main className="container mx-auto">
{/* 
        <PopularDestinations />
        <TripPlanner />
        <TicketBooking /> */}
        <HomePage></HomePage>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
