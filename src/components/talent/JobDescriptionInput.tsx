
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Briefcase, Search, SearchCheck } from 'lucide-react';
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
    <Card className="h-full shadow-lg overflow-hidden border-primary/20 transition-all hover:shadow-primary/10">
      <CardHeader className="bg-primary/10 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <SearchCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Find Top Talent</CardTitle>
            <CardDescription className="text-muted-foreground">
              Let our AI find the perfect candidates for your needs
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-4">
          <Textarea 
            placeholder="Paste your job description here. Include details about required skills, experience level, and job responsibilities..."
            className="min-h-[200px] mb-4 border-primary/20 focus-visible:ring-primary bg-background/80"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button 
            onClick={handleAnalyzeClick} 
            disabled={isAnalyzing || !jobDescription.trim()} 
            className="w-full group transition-all bg-primary/90 hover:bg-primary"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="mr-2 h-5 w-5 animate-pulse" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Find Matching Candidates
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
