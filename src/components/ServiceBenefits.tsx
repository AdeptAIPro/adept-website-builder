
import React from 'react';
import { Check } from 'lucide-react';

interface BenefitProps {
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ title, description }) => (
  <div className="border border-border/50 rounded-lg p-6 hover:border-primary/30 hover:shadow-sm transition-all">
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">
        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const ServiceBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Time & Cost Efficiency",
      description: "Reduce your time-to-hire by up to 40% and eliminate costly hiring mistakes with our pre-vetted talent pool and accelerated recruitment process."
    },
    {
      title: "Technical Expertise",
      description: "Access recruiters who understand complex technical requirements and can effectively evaluate candidates' capabilities in specialized domains."
    },
    {
      title: "Scalable Solutions",
      description: "Quickly scale your technical teams up or down based on project demands and business cycles without administrative overhead."
    },
    {
      title: "Quality Assurance",
      description: "Every candidate undergoes rigorous screening including technical assessments, ensuring only the most qualified professionals reach your interview stage."
    },
    {
      title: "Market Insights",
      description: "Benefit from our up-to-date knowledge of salary trends, skill availability, and emerging technologies to inform your hiring strategies."
    },
    {
      title: "Retention Focus",
      description: "Our emphasis on cultural fit and career aspirations leads to higher retention rates and more successful long-term placements."
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AdeptAI</h2>
          <p className="text-lg text-muted-foreground">
            Our IT staffing services deliver exceptional value through these key advantages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
