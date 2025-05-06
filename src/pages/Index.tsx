
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import Industries from '@/components/Industries';
import TalentMatchmakingPreview from '@/components/TalentMatchmakingPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Solutions />
        <TalentMatchmakingPreview />
        <Industries />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
