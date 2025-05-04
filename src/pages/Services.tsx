
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/ServiceHero';
import ServiceOfferingList from '@/components/ServiceOfferingList';
import ProcessSteps from '@/components/ProcessSteps';
import ServiceBenefits from '@/components/ServiceBenefits';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import ServiceCTA from '@/components/ServiceCTA';

const Services: React.FC = () => {
  // Title updated via ServiceHero component
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServiceHero />
        <ServiceOfferingList />
        <ProcessSteps />
        <ServiceBenefits />
        <Industries />
        <Testimonials />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
