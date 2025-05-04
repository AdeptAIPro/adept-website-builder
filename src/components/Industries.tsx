
import React from 'react';

const Industries: React.FC = () => {
  const industries = [
    "Healthcare & Life Sciences",
    "Financial Services",
    "Technology & SaaS",
    "E-commerce & Retail",
    "Manufacturing",
    "Insurance",
    "Education & EdTech",
    "Telecommunications",
    "Energy & Utilities",
    "Government & Public Sector",
    "Media & Entertainment",
    "Transportation & Logistics"
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground">
            Our specialized IT staffing solutions cater to diverse sectors with industry-specific expertise
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-4 text-center border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <p className="font-medium">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
