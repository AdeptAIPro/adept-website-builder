
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, User } from 'lucide-react';
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
    <Card className="h-full shadow-lg border-accent/10 overflow-hidden">
      <CardHeader className="bg-accent/5 border-b border-accent/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="h-4 w-4 text-accent" />
          </div>
          <div>
            <CardTitle>For Job Seekers</CardTitle>
            <CardDescription>
              Get discovered by top employers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <CustomLabel htmlFor="resume">Upload Resume</CustomLabel>
            <div className="flex items-center gap-2">
              <Input 
                id="resume" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
                className="border-accent/20 focus-visible:ring-accent"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>
          <Button 
            onClick={handleResumeSubmit} 
            disabled={!resumeFile} 
            className="group" 
            variant="outline"
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
