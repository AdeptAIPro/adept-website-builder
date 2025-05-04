
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/ServiceHero';
import ServiceOfferingList from '@/components/ServiceOfferingList';
import ProcessSteps from '@/components/ProcessSteps';
import GlobalHiringModels from '@/components/GlobalHiringModels';
import WhyChooseAdeptAI from '@/components/WhyChooseAdeptAI';
import ServiceBenefits from '@/components/ServiceBenefits';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import ServiceCTA from '@/components/ServiceCTA';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServiceHero />
        <ServiceOfferingList />
        <GlobalHiringModels />
        <ProcessSteps />
        <WhyChooseAdeptAI />
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
