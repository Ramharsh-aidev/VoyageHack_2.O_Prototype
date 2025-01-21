// Home.jsx
import React from 'react';
import Header from '../component/Header';
import HomePageBanner from '../component/HomePageBanner';
import WhyChooseUs from '../component/WhyChooseUs';
import PopularDestinations from '../component/PopularDestination';
import ReviewSection from '../component/ReviewSection';
import Footer from '../component/Footer';
import OtherServices from '../component/OtherServices';

const Home = () => {
  return (
    <div>
      {/* Header is part of Home page */}
      <Header />
      <br></br>
      {/* Main content of the home page */}
      <main className="container mx-auto">
        <HomePageBanner />
        <OtherServices></OtherServices>
        <PopularDestinations />
        <WhyChooseUs />
        <ReviewSection />
      </main>
      
      {/* Footer is part of Home page */}
      <Footer />
    </div>
  );
};

export default Home;
