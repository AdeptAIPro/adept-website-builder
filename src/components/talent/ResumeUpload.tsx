
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, User, CircleUser } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { CustomLabel } from '../ui/custom-label';

const ResumeUpload: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };

  const handleResumeSubmit = () => {
    if (!resumeFile) {
      toast({
        title: "Error",
        description: "Please upload a resume first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Resume Submitted",
      description: "Your resume has been submitted for AI analysis.",
    });
  };

  return (
    <Card className="h-full shadow-lg overflow-hidden border-accent/20 transition-all hover:shadow-accent/10">
      <CardHeader className="bg-accent/10 border-b border-accent/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
            <CircleUser className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-xl">For Job Seekers</CardTitle>
            <CardDescription className="text-muted-foreground">
              Get discovered by top employers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <CustomLabel htmlFor="resume" className="font-medium">Upload Resume</CustomLabel>
            <div className="flex items-center gap-2">
              <Input 
                id="resume" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
                className="border-accent/20 focus-visible:ring-accent bg-background/80"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>
          <Button 
            onClick={handleResumeSubmit} 
            disabled={!resumeFile} 
            className="group transition-all" 
            variant="outline"
            size="lg"
          >
            <Upload className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
            Submit Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
