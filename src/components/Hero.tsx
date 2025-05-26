
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="animate-fade-up text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI-Powered <span className="gradient-text">Workforce Intelligence</span> Platform
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Connect top talent with leading companies through our advanced AI matching technology. 
              Whether you're hiring or looking for your next opportunity, we make perfect matches.
            </p>
            
            {/* Dual Path CTAs */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Employer Side */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">For Employers</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Find pre-vetted candidates 90% faster with AI-powered matching
                </p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Access 10,000+ qualified candidates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>95% match accuracy with AI screening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Reduce hiring time by 70%</span>
                  </div>
                </div>
                <Button className="w-full gap-2 group">
                  <Link to="/dashboard/talent" className="flex items-center gap-2">
                    Hire Top Talent
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Candidate Side */}
              <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-6 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">For Job Seekers</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Get discovered by top companies and accelerate your career
                </p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Average 40% salary increase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>95% placement success rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Get matched in 48 hours</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 group">
                  <span 
                    onClick={() => document.getElementById('talent-matching')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Upload Resume Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>GDPR Compliant & Secure</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30"></div>
              <span>Trusted by 500+ Companies</span>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30"></div>
              <span>10,000+ Successful Placements</span>
            </div>
          </div>
          
          <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto relative animate-fade-in">
            <div className="aspect-video rounded-lg shadow-xl overflow-hidden border bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium">AI Talent Matching in Action</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
