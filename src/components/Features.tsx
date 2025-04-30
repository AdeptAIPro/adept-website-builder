
import React from 'react';
import { Brain, LineChart, ShieldCheck, Zap } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Advanced Machine Learning",
      description: "Our proprietary algorithms adapt and learn from your data to provide increasingly accurate insights and predictions.",
      icon: <Brain className="h-6 w-6 text-primary" />
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights with our real-time data processing capabilities, allowing for quick and informed decision-making.",
      icon: <LineChart className="h-6 w-6 text-primary" />
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols ensure your data remains protected and confidential at all times.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />
    },
    {
      title: "Lightning Fast Performance",
      description: "Optimized infrastructure delivers results at unprecedented speeds, even with large and complex datasets.",
      icon: <Zap className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cutting-Edge Features</h2>
          <p className="text-lg text-muted-foreground">
            Our AI platform is packed with powerful features designed to transform your business operations
            and drive meaningful results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
