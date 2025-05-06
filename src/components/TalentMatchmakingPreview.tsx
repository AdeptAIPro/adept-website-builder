
import React, { useState } from 'react';
import JobDescriptionInput from './talent/JobDescriptionInput';
import ResumeUpload from './talent/ResumeUpload';
import CandidateResults from './talent/CandidateResults';
import FeatureHighlights from './talent/FeatureHighlights';
import { toast } from "@/hooks/use-toast";

const TalentMatchmakingPreview: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showLimited, setShowLimited] = useState<boolean>(false);

  // Sample mock data for candidates
  const mockCandidates = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Senior Software Engineer",
      experience: "8 years",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      matchScore: 92,
      location: "Remote",
      education: "MS Computer Science",
      availability: "2 weeks"
    },
    {
      id: "2",
      name: "Sarah Williams",
      position: "Full Stack Developer",
      experience: "6 years",
      skills: ["JavaScript", "React", "Python", "Django"],
      matchScore: 88,
      location: "New York",
      education: "BS Computer Science",
      availability: "Immediately"
    },
    {
      id: "3",
      name: "Michael Chen",
      position: "DevOps Engineer",
      experience: "5 years",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      matchScore: 85,
      location: "San Francisco",
      education: "BS Information Systems",
      availability: "1 month"
    },
    {
      id: "4",
      name: "Priya Patel",
      position: "Backend Developer",
      experience: "4 years",
      skills: ["Java", "Spring Boot", "MongoDB", "Microservices"],
      matchScore: 82,
      location: "Remote",
      education: "BS Computer Engineering",
      availability: "2 weeks"
    },
    {
      id: "5",
      name: "David Wilson",
      position: "Frontend Developer",
      experience: "3 years",
      skills: ["React", "Next.js", "CSS", "UI/UX"],
      matchScore: 79,
      location: "Austin",
      education: "BS Web Development",
      availability: "Immediately"
    }
  ];

  const handleAnalyzeClick = async () => {
    setIsAnalyzing(true);
    
    try {
      // In production, this would call the actual API
      // const response = await talentApi.matchJobDescription(jobDescription);
      
      // For demo, use mock data with a simulated delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCandidates(mockCandidates);
      setShowLimited(true);
      
      toast({
        title: "Analysis Complete",
        description: "Found 5 matching candidates for your job description",
      });
    } catch (error) {
      console.error("Error analyzing job description:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze job description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="talent-matching" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Talent Matchmaking</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the power of our AI talent matching engine. Paste a job description to find matching candidates or upload your resume to be discovered by employers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Job Description Input Section */}
          <div className="md:col-span-2">
            <JobDescriptionInput 
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyzeClick}
            />
          </div>
          
          {/* Resume Upload Section */}
          <div>
            <ResumeUpload />
          </div>
        </div>
        
        {/* Results Section */}
        <CandidateResults 
          candidates={candidates}
          showLimited={showLimited}
        />
        
        {/* Features/Benefits Section */}
        <FeatureHighlights />
      </div>
    </section>
  );
};

export default TalentMatchmakingPreview;
