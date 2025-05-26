
import React from 'react';
import { Shield, Award, Users, TrendingUp } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const companies = [
    { name: "TechCorp", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "DataFlow", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "InnovateLabs", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "CloudTech", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "AI Systems", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "DevCorp", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" }
  ];

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Candidates",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Placement Success",
      color: "text-accent"
    },
    {
      icon: Award,
      value: "500+",
      label: "Partner Companies",
      color: "text-primary"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Data Security",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-background shadow-sm flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-80 transition-opacity">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center h-12">
                <div className="bg-background rounded border px-4 py-2 shadow-sm">
                  <span className="text-sm font-medium text-muted-foreground">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Your data is secure and never shared without permission</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
