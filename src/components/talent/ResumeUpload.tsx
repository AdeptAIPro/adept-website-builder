
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CircleUser } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { CustomLabel } from '../ui/custom-label';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  resume: z.instanceof(FileList).refine(files => files.length > 0, {
    message: "Resume is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ResumeUpload: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: undefined,
    },
  });

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

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Resume Submitted",
        description: "Your resume has been submitted for AI analysis.",
      });
    }, 1500);
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
                className="border-accent/20 focus-visible:ring-accent bg-background/80 w-full p-2 text-sm"
                aria-label="Upload resume"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum file size: 5MB
            </p>
          </div>
          <Button 
            onClick={handleResumeSubmit} 
            disabled={!resumeFile || isSubmitting}
            className="group transition-all w-full sm:w-auto" 
            variant="outline"
            size="lg"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                Submit Resume
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
