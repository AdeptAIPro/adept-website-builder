
import React from 'react';
import { Brain, FileCode, Briefcase } from 'lucide-react';

const FeatureHighlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <div className="flex flex-col items-center text-center p-6 bg-card border border-primary/10 rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">AI-Powered Matching</h3>
        <p className="text-muted-foreground">
          Our advanced AI analyzes job descriptions and candidate profiles to find the perfect match based on skills, experience, and cultural fit.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 bg-card border border-primary/10 rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <FileCode className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Deep Skill Analysis</h3>
        <p className="text-muted-foreground">
          Beyond keyword matching, our system understands the context and relationships between different technologies and frameworks.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 bg-card border border-primary/10 rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Global Talent Pool</h3>
        <p className="text-muted-foreground">
          Access our database of over 100,000 pre-vetted IT professionals across all specializations worldwide.
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlights;
