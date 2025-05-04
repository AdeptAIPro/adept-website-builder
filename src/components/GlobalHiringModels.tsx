
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Users, Briefcase, Handshake } from 'lucide-react';

interface HiringModelProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const HiringModel: React.FC<HiringModelProps> = ({ icon, title, description, benefits }) => (
  <Card className="border-border/50 hover:border-primary/50 transition-colors h-full">
    <CardHeader>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="mt-1 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            <span className="text-sm text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const GlobalHiringModels: React.FC = () => {
  const hiringModels = [
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Permanent Placement",
      description: "Build your core team with permanent full-time employees globally",
      benefits: [
        "Access to global talent pools without geographical constraints",
        "Full compliance with local employment laws and regulations",
        "Competitive compensation strategies tailored to regional markets",
        "Long-term workforce stability and institutional knowledge retention",
        "Seamless onboarding and cultural integration support"
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Contract Staffing",
      description: "Flexible workforce solutions for project-based needs worldwide",
      benefits: [
        "Rapid deployment of specialized talent for time-sensitive projects",
        "Scalable team size based on changing project requirements",
        "Cost-effective global staffing without long-term commitments",
        "Access to niche skills not available in local markets",
        "Simplified global payroll and contractor management"
      ]
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Contract-to-Hire",
      description: "Test-before-you-commit hiring approach with international talent",
      benefits: [
        "Evaluate cultural fit and technical abilities in real work scenarios",
        "Reduce hiring risks through extended evaluation periods",
        "Smooth transition from contractor to employee status",
        "Flexibility to adjust terms before permanent commitment",
        "Accelerated productivity with pre-trained and tested talent"
      ]
    }
  ];

  return (
    <section id="global-hiring" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Hiring Models</h2>
          <p className="text-lg text-muted-foreground">
            Flexible talent acquisition solutions tailored to your organization's global workforce needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hiringModels.map((model, index) => (
            <HiringModel
              key={index}
              icon={model.icon}
              title={model.title}
              description={model.description}
              benefits={model.benefits}
            />
          ))}
        </div>

        <div className="mt-16 bg-background rounded-2xl p-8 border border-border/50 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Global Workforce Capabilities</h3>
              <p className="mb-6 text-muted-foreground">
                Our extensive international network enables you to source exceptional talent across 
                borders, accessing specialized skills regardless of geographic limitations.
              </p>
              <ul className="space-y-3">
                {[
                  "Operations in 30+ countries across 6 continents",
                  "Multilingual recruitment teams with local expertise",
                  "Complete international compliance and legal support",
                  "Regional salary benchmarking and compensation analysis",
                  "24/7 support across global time zones"
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Global IT workforce collaboration across multiple locations"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 h-16 w-16 bg-accent/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalHiringModels;
