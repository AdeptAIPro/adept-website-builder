
import React from 'react';
import { Briefcase, Network, FileCode, Building2, Globe, FileCheck } from 'lucide-react';

interface IndustryCardProps {
  icon: React.ReactNode;
  name: string;
  technologies: string[];
}

const IndustryCard: React.FC<IndustryCardProps> = ({ icon, name, technologies }) => (
  <div className="bg-background rounded-lg p-6 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
        {icon}
      </div>
      <h3 className="font-medium text-lg">{name}</h3>
    </div>
    <div className="flex flex-wrap gap-2 mt-3">
      {technologies.map((tech, index) => (
        <span key={index} className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const Industries: React.FC = () => {
  const industries = [
    {
      icon: <Building2 className="h-5 w-5 text-primary" />,
      name: "Healthcare & Life Sciences",
      technologies: ["HIPAA Compliance", "EHR Systems", "Telemedicine", "Healthcare Analytics"]
    },
    {
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      name: "Financial Services",
      technologies: ["Fintech", "Blockchain", "Payment Processing", "Fraud Detection"]
    },
    {
      icon: <FileCode className="h-5 w-5 text-primary" />,
      name: "Technology & SaaS",
      technologies: ["Cloud Engineering", "DevOps", "Microservices", "API Development"]
    },
    {
      icon: <Network className="h-5 w-5 text-primary" />,
      name: "E-commerce & Retail",
      technologies: ["CRM", "Inventory Management", "Payment Gateways", "Mobile Commerce"]
    },
    {
      icon: <FileCheck className="h-5 w-5 text-primary" />,
      name: "Manufacturing",
      technologies: ["IoT", "Supply Chain", "ERP Systems", "Automation"]
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      name: "Insurance",
      technologies: ["Risk Management", "Claims Processing", "Underwriting Systems", "InsurTech"]
    },
    {
      icon: <FileCode className="h-5 w-5 text-primary" />,
      name: "Education & EdTech",
      technologies: ["LMS", "Assessment Tools", "Virtual Classrooms", "Analytics"]
    },
    {
      icon: <Network className="h-5 w-5 text-primary" />,
      name: "Telecommunications",
      technologies: ["5G", "Network Security", "SDN/NFV", "OSS/BSS"]
    }
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground">
            Our specialized IT workforce solutions cater to diverse sectors with industry-specific expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              icon={industry.icon}
              name={industry.name}
              technologies={industry.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
