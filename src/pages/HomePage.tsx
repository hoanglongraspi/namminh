import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import ContactCTA from '../components/home/ContactCTA';

const HomePage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'NamMinhMed - Thiết bị Y tế Chất lượng Cao';
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <LatestNews />
      <ContactCTA />
    </>
  );
};

export default HomePage;