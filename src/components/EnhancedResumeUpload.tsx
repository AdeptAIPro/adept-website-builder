
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CircleUser, Brain, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { CustomLabel } from './ui/custom-label';
import { Progress } from './ui/progress';

const EnhancedResumeUpload: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [profileStrength, setProfileStrength] = useState(0);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setAnalysisComplete(false);
      toast({
        title: "Resume Uploaded",
        description: "Click 'Analyze Resume' to get your AI-powered profile insights.",
      });
    }
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      toast({
        title: "Error",
        description: "Please upload a resume first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProfileStrength(i);
    }

    // Mock extracted data
    setExtractedSkills(["JavaScript", "React", "Node.js", "Python", "AWS", "Leadership"]);
    setAnalysisComplete(true);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "Your resume has been analyzed. See insights below.",
    });
  };

  return (
    <Card className="h-full shadow-lg overflow-hidden border-accent/20 transition-all hover:shadow-accent/10">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-accent/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
            <CircleUser className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-xl">Get Discovered by Top Employers</CardTitle>
            <CardDescription className="text-muted-foreground">
              AI-powered resume analysis & instant job matching
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <CustomLabel htmlFor="resume" className="font-medium flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Your Resume
            </CustomLabel>
            <Input 
              id="resume" 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
              className="border-accent/20 focus-visible:ring-accent bg-background/80 w-full p-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX • Max 5MB • Your data is secure
            </p>
          </div>

          <Button 
            onClick={handleAnalyzeResume} 
            disabled={!resumeFile || isAnalyzing}
            className="w-full gap-2 group"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Get Free AI Analysis
              </>
            )}
          </Button>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm">AI analyzing your resume...</span>
            </div>
            <Progress value={profileStrength} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Extracting skills, experience, and match potential
            </p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisComplete && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Analysis Complete!</span>
            </div>
            
            {/* Profile Strength */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Profile Strength</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-bold text-lg">{profileStrength}%</span>
                </div>
              </div>
              <Progress value={profileStrength} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Strong profile! You're likely to get matched quickly.
              </p>
            </div>

            {/* Extracted Skills */}
            <div>
              <h4 className="text-sm font-medium mb-2">Detected Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map(skill => (
                  <span 
                    key={skill} 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm">What's Next?</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Your profile is now in our talent database</li>
                <li>• Employers can discover you through AI matching</li>
                <li>• You'll get notified of relevant opportunities</li>
                <li>• Average response time: 48 hours</li>
              </ul>
            </div>
          </div>
        )}

        {/* Value Props */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="font-medium text-sm">Why candidates choose us:</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <span>40% average salary increase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <span>Access to hidden job opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <span>Direct contact with hiring managers</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedResumeUpload;
