
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Clock } from 'lucide-react';

const CandidateSuccessStories: React.FC = () => {
  const successStories = [
    {
      name: "Sarah Chen",
      beforeRole: "Junior Developer",
      afterRole: "Senior Full-Stack Engineer",
      company: "TechCorp Inc.",
      salaryIncrease: "+65%",
      timeToHire: "12 days",
      location: "Remote",
      skills: ["React", "Node.js", "AWS"],
      testimonial: "AdeptAI's platform matched me with my dream job. The AI understood my skills perfectly and connected me with a company that values my expertise.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      beforeRole: "Data Analyst",
      afterRole: "Machine Learning Engineer",
      company: "DataFlow Systems",
      salaryIncrease: "+55%",
      timeToHire: "8 days",
      location: "San Francisco",
      skills: ["Python", "TensorFlow", "SQL"],
      testimonial: "I was struggling to transition into ML. AdeptAI's AI matching found companies looking for someone with my exact background and growth potential.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      beforeRole: "UX Designer",
      afterRole: "Lead Product Designer",
      company: "Innovation Labs",
      salaryIncrease: "+45%",
      timeToHire: "15 days",
      location: "New York",
      skills: ["Figma", "User Research", "Prototyping"],
      testimonial: "The platform highlighted my leadership potential that I didn't even know I had. Now I'm leading a team of 8 designers!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-3 py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real People, Real <span className="gradient-text">Career Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how our AI-powered platform has transformed careers and connected talent with opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-accent/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-accent/20">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">{story.name}</CardTitle>
                <CardDescription className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {story.beforeRole} → <span className="font-semibold text-foreground">{story.afterRole}</span>
                  </div>
                  <div className="text-sm font-medium text-primary">{story.company}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-accent" />
                    </div>
                    <div className="text-sm font-bold text-accent">{story.salaryIncrease}</div>
                    <div className="text-xs text-muted-foreground">Salary</div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <div className="text-sm font-bold text-primary">{story.timeToHire}</div>
                    <div className="text-xs text-muted-foreground">Hired</div>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MapPin className="h-3 w-3 text-secondary-foreground" />
                    </div>
                    <div className="text-sm font-bold text-secondary-foreground">{story.location}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-sm font-medium mb-2">Key Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {story.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-accent/30 pl-3">
                  "{story.testimonial}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CandidateSuccessStories;
