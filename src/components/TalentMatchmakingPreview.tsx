
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Brain, Upload, User, Check, Briefcase, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { talentApi } from '@/services/api';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

const TalentMatchmakingPreview: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showLimited, setShowLimited] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { isAuthenticated } = useAuth();

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
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive"
      });
      return;
    }

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
          </div>
          
          {/* Resume Upload Section */}
          <div>
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
                    <Label htmlFor="resume">Upload Resume</Label>
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
          </div>
        </div>
        
        {/* Results Section */}
        {showLimited && (
          <div className="mt-12">
            <Card className="shadow-lg overflow-hidden border-primary/10">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Top Matching Candidates</CardTitle>
                      <CardDescription>
                        AI-matched candidates based on your job description
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" asChild className="hidden sm:flex">
                    <Link to="/dashboard/talent">
                      View All Insights
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="w-[90px]">Match</TableHead>
                        <TableHead>Candidate</TableHead>
                        <TableHead className="hidden md:table-cell">Experience</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead className="hidden md:table-cell">Availability</TableHead>
                        <TableHead className="w-[100px] text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidates.slice(0, 3).map((candidate) => (
                        <TableRow key={candidate.id} className="hover:bg-muted/20 transition-colors">
                          <TableCell>
                            <div className="flex flex-col items-center">
                              <span className="text-lg font-bold text-primary">{candidate.matchScore}%</span>
                              <div className="w-full bg-muted rounded-full h-2 mt-1">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${candidate.matchScore}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{candidate.name}</span>
                              <span className="text-xs text-muted-foreground">{candidate.position}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{candidate.experience}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {candidate.skills.slice(0, 2).map((skill: string, i: number) => (
                                <span 
                                  key={i} 
                                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                              {candidate.skills.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{candidate.skills.length - 2} more
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{candidate.availability}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                              {isAuthenticated ? (
                                <Link to={`/dashboard/talent/candidates/${candidate.id}`}>View</Link>
                              ) : (
                                <Link to="/pricing">Unlock</Link>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Blurred preview of remaining candidates */}
                <div className="relative overflow-hidden">
                  <div className={`${!isAuthenticated ? "blur-sm" : ""}`}>
                    <Table>
                      <TableBody>
                        {candidates.slice(3, 5).map((candidate) => (
                          <TableRow key={candidate.id} className="hover:bg-muted/20 transition-colors">
                            <TableCell>
                              <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-primary">{candidate.matchScore}%</span>
                                <div className="w-full bg-muted rounded-full h-2 mt-1">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${candidate.matchScore}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{candidate.name}</span>
                                <span className="text-xs text-muted-foreground">{candidate.position}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{candidate.experience}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {candidate.skills.slice(0, 2).map((skill: string, i: number) => (
                                  <span 
                                    key={i} 
                                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skills.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{candidate.skills.length - 2} more
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{candidate.availability}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                                <Link to="/pricing">Unlock</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {!isAuthenticated && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="text-center p-6 bg-card shadow-lg rounded-lg border border-primary/10 max-w-md">
                        <div className="h-12 w-12 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <ArrowRight className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Unlock All Matches</h3>
                        <p className="text-sm mb-4 text-muted-foreground">Get full access to all candidate profiles, detailed skills analysis, and direct contact options</p>
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <Link to="/pricing">
                            Upgrade Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Mobile CTA for smaller screens */}
                <div className="p-4 sm:hidden">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/talent">
                      View All Insights
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Features/Benefits Section */}
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
      </div>
    </section>
  );
};

export default TalentMatchmakingPreview;
