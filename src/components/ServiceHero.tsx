
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceHero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              IT <span className="gradient-text">Staffing Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-muted-foreground font-light">
              Skilled Talent at Scale – On-Time, On-Target.
            </p>
            <p className="text-lg mb-8 text-muted-foreground">
              Navigate the complex landscape of IT talent acquisition with AdeptAI's industry-leading staffing solutions. 
              We connect your business with highly qualified professionals who drive innovation and support your strategic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 group" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#offerings">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <img
              src="/lovable-uploads/db746c80-f54e-4d46-8af3-0691f33be2c8.png"
              alt="IT Staffing Solutions"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-accent/20 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 h-16 w-16 bg-primary/20 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
