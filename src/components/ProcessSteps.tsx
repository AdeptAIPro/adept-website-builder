
import React from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0">
      <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ProcessSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Requirements Analysis",
      description: "We begin with a deep dive into your organization's technical needs, culture, and long-term objectives to develop a comprehensive understanding of the perfect candidate profile."
    },
    {
      number: 2,
      title: "Talent Sourcing",
      description: "Our specialized recruiters leverage advanced AI tools, industry networks, and our extensive candidate database to identify qualified professionals who match your requirements."
    },
    {
      number: 3,
      title: "Rigorous Screening",
      description: "Candidates undergo a multi-stage evaluation process including technical assessments, behavioral interviews, and reference checks to ensure they meet our high standards."
    },
    {
      number: 4,
      title: "Client Presentation",
      description: "We present a curated shortlist of pre-vetted candidates with detailed profiles highlighting their skills, experience, and cultural fit for your organization."
    },
    {
      number: 5,
      title: "Onboarding Support",
      description: "Once you select your ideal candidate, we facilitate a smooth transition with comprehensive onboarding assistance and regular check-ins to ensure mutual satisfaction."
    }
  ];

  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Proven Process</h2>
          <p className="text-lg text-muted-foreground">
            We follow a streamlined, efficient methodology to connect you with exceptional talent.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
