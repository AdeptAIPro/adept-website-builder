
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, Globe, Search, FileText } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <Card className="border-border/50 hover:border-primary/50 transition-colors">
    <CardHeader>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const ServiceOfferingList: React.FC = () => {
  const services = [
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Contract Staffing",
      description: "Flexible IT talent solutions for project-based needs, providing specialized expertise for short to long-term assignments without permanent hiring commitments."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Direct Placement",
      description: "End-to-end permanent recruitment services for critical technical roles, leveraging our vast network to find the perfect match for your team."
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Executive Search",
      description: "Identifying and securing top-tier leadership talent in technology with comprehensive assessment and vetting processes for C-level and director positions."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Managed Services",
      description: "Outsourced IT function management with dedicated teams handling specific technology operations, complete with SLAs and outcome-based metrics."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "SOW Project Delivery",
      description: "Fixed-scope technology projects delivered by specialist teams under clear statements of work with defined deliverables and milestones."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Team Augmentation",
      description: "Seamlessly scale your development capabilities with skilled professionals who integrate with your existing teams and tools."
    },
  ];

  return (
    <section id="offerings" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Staffing Services</h2>
          <p className="text-lg text-muted-foreground">
            We provide a comprehensive suite of IT staffing solutions tailored to your organization's unique needs and challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferingList;
