
import React from 'react';
import { Building2, Network, Clock, HandShake, FileCheck, Users } from 'lucide-react';

interface AdvantageProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Advantage: React.FC<AdvantageProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/30">
    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const WhyChooseAdeptAI: React.FC = () => {
  const advantages = [
    {
      icon: <Globe className="h-7 w-7 text-primary" />,
      title: "Global Presence",
      description: "With operations spanning 30+ countries, we provide truly worldwide talent acquisition capabilities and local market expertise."
    },
    {
      icon: <Users className="h-7 w-7 text-primary" />,
      title: "Experienced Leadership",
      description: "Our executive team brings 75+ combined years of industry experience in IT staffing and workforce management."
    },
    {
      icon: <Clock className="h-7 w-7 text-primary" />,
      title: "Rapid Delivery",
      description: "Our streamlined processes reduce time-to-hire by up to 40%, with most positions filled within 2-3 weeks."
    },
    {
      icon: <FileCheck className="h-7 w-7 text-primary" />,
      title: "Robust Processes",
      description: "ISO 9001-certified quality management system ensures consistent, reliable talent delivery across all engagements."
    },
    {
      icon: <Network className="h-7 w-7 text-primary" />,
      title: "Dedicated Talent Pool",
      description: "Pre-vetted database of 100,000+ IT professionals across all specializations, ready for immediate deployment."
    },
    {
      icon: <HandShake className="h-7 w-7 text-primary" />,
      title: "Client-Centric Approach",
      description: "Tailored solutions with dedicated account managers and 97% client satisfaction rate across engagements."
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AdeptAI</h2>
          <p className="text-lg text-muted-foreground">
            Our competitive advantages in delivering exceptional IT talent acquisition services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Advantage
              key={index}
              icon={advantage.icon}
              title={advantage.title}
              description={advantage.description}
            />
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-xl">
          <img 
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Technology innovation and digital transformation in IT staffing"
            className="w-full rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
            <div className="p-8 md:p-12 lg:max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Optimized Talent Acquisition Process
              </h3>
              <p className="text-white/90 mb-6">
                Our proprietary AI-enhanced recruitment methodology combines human expertise with cutting-edge technology to deliver the perfect match for your organization's needs.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Reduced Time-to-Hire", "Higher Retention", "Cultural Alignment", "Technical Excellence", "Cost Optimization"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAdeptAI;
