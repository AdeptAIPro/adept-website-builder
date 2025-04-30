
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, ShoppingCart, Code } from 'lucide-react';

interface SolutionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SolutionCard: React.FC<SolutionProps> = ({ title, description, icon, color }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-lg border hover:bg-card transition-colors">
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center gap-1 group">
          Learn more
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

const Solutions: React.FC = () => {
  const solutions = [
    {
      title: "Enterprise Intelligence",
      description: "Transform operational efficiency with AI-powered insights that optimize workflows and resource allocation across your organization.",
      icon: <Building className="h-6 w-6 text-white" />,
      color: "bg-primary"
    },
    {
      title: "Customer Experience",
      description: "Enhance customer interactions with intelligent systems that understand preferences and provide personalized experiences.",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-accent"
    },
    {
      title: "Retail & E-Commerce",
      description: "Optimize inventory, personalize recommendations, and predict trends to stay ahead of market demands.",
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      color: "bg-primary"
    },
    {
      title: "Developer Tools",
      description: "Accelerate development with our AI-assisted coding tools that help your team write better code faster.",
      icon: <Code className="h-6 w-6 text-white" />,
      color: "bg-accent"
    }
  ];

  return (
    <section id="solutions" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Solutions for Every Industry</h2>
          <p className="text-lg text-muted-foreground">
            Discover how our advanced AI technology can be tailored to meet the specific needs of your industry 
            and drive tangible business results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              color={solution.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
