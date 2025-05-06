
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Briefcase } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  isAnalyzing: boolean;
  onAnalyze: () => Promise<void>;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription,
  isAnalyzing,
  onAnalyze
}) => {
  const handleAnalyzeClick = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive"
      });
      return;
    }
    
    await onAnalyze();
  };

  return (
    <Card className="h-full shadow-lg border-primary/10 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Find Top Talent</CardTitle>
            <CardDescription>
              Let our AI find the perfect candidates for your needs
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-4">
          <Textarea 
            placeholder="Paste your job description here. Include details about required skills, experience level, and job responsibilities..."
            className="min-h-[200px] mb-4 border-primary/20 focus-visible:ring-primary"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button 
            onClick={handleAnalyzeClick} 
            disabled={isAnalyzing || !jobDescription.trim()} 
            className="w-full group transition-all"
          >
            <Brain className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            {isAnalyzing ? "Analyzing with AI..." : "Find Matching Candidates"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
