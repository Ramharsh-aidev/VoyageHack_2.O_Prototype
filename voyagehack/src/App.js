import React from 'react';
import Header from './component/Header';
import HomePage from './component/HomePageBanner';
import WhyChooseUs from './component/WhyChooseUs';
import ReviewSection from './component/ReviewSection';
// import Footer from './components/Footer';
import PopularDestinations from './component/PopularDestination';
// import TripPlanner from './components/TripPlanner';
// import TicketBooking from './components/TicketBooking';
// import './styles.css';

function App() {
  return (
    <div>
      <Header className="container mx-auto" ></Header><br></br>
      <main className="container mx-auto">

        {/* <TripPlanner />
        <TicketBooking /> */}
        <HomePage/>
        <WhyChooseUs/>
        <ReviewSection/>
        <PopularDestinations />

      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
