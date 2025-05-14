
import React from 'react';
import { Check, CircleCheck } from 'lucide-react';

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our advanced algorithms analyze skills, experience, and cultural fit"
    },
    {
      title: "High Accuracy",
      description: "93% of companies find suitable candidates within 48 hours"
    },
    {
      title: "Global Talent Pool",
      description: "Access to over 2 million pre-screened professionals worldwide"
    },
    {
      title: "Time Saving",
      description: "Reduce hiring time by up to 70% compared to traditional methods"
    }
  ];

  return (
    <div>
      <h3 className="text-center text-lg font-semibold mb-6 text-accent">Why Choose Our AI Talent Matching</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-card border border-accent/10 rounded-lg p-5 transition-all hover:shadow-md hover:border-accent/20"
          >
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                <CircleCheck className="h-5 w-5 text-accent" />
              </div>
              <h4 className="font-medium">{feature.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
