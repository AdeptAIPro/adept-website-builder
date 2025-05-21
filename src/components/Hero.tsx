
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="animate-fade-up text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Advanced <span className="gradient-text">AI Solutions</span> for Enterprise Success
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Unlock the power of artificial intelligence with Adept's cutting-edge technology. 
              Streamline operations, enhance decision-making, and drive innovation across your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 group" asChild>
                <Link to="/dashboard">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard/talent">
                  Hire Top Talent
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto relative animate-fade-in">
            <div className="aspect-video rounded-lg shadow-xl overflow-hidden border bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium">AI Platform Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
