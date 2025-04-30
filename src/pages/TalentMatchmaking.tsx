
import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { talentApi } from '@/services/api';
import { Brain, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  skills: string[];
  matchScore: number;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

const TalentMatchmaking: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, checkUsageLimit } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // For free tier users, check usage limits
      if (!isAuthenticated) {
        const canProceed = await checkUsageLimit();
        if (!canProceed) {
          navigate('/pricing');
          return;
        }
      }
      
      try {
        // These calls would go to AWS Lambda in production
        const [candidatesResponse, jobsResponse] = await Promise.all([
          talentApi.getCandidates(),
          talentApi.getJobs()
        ]);
        
        if (candidatesResponse.data) {
          setCandidates(candidatesResponse.data.candidates || []);
        }
        
        if (jobsResponse.data) {
          setJobs(jobsResponse.data.jobs || []);
        }
      } catch (error) {
        console.error("Failed to load talent data:", error);
        toast({
          title: "Error loading data",
          description: "Failed to load talent data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated, checkUsageLimit, navigate]);
  
  const handleMatch = async (candidateId: string, jobId: string) => {
    try {
      const response = await talentApi.matchCandidateToJob(candidateId, jobId);
      if (response.data) {
        toast({
          title: "Match Analysis Complete",
          description: `Match score: ${response.data.score}%`,
        });
      }
    } catch (error) {
      toast({
        title: "Matching Failed",
        description: "Unable to complete the matching process. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Simulated candidate data for development purposes
  const demoData: Candidate[] = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Senior Developer',
      experience: '8 years',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      matchScore: 92
    },
    {
      id: '2',
      name: 'Sarah Jones',
      position: 'UX Designer',
      experience: '5 years',
      skills: ['Figma', 'UI Design', 'User Research'],
      matchScore: 87
    },
    {
      id: '3',
      name: 'Michael Chen',
      position: 'Data Scientist',
      experience: '3 years',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      matchScore: 78
    }
  ];
  
  // Simulated job data for development purposes
  const demoJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'San Francisco',
      type: 'Full-time'
    },
    {
      id: '3',
      title: 'Machine Learning Engineer',
      department: 'Data Science',
      location: 'New York',
      type: 'Full-time'
    }
  ];
  
  // Use demo data if API hasn't returned results yet
  const displayCandidates = filteredCandidates.length > 0 ? filteredCandidates : demoData;
  const displayJobs = jobs.length > 0 ? jobs : demoJobs;

  // Show usage information for free tier
  const renderUsageInfo = () => {
    if (!isAuthenticated) {
      const usageCount = parseInt(localStorage.getItem('freeUsageCount') || '0', 10);
      return (
        <div className="bg-primary/10 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium mb-1">Free Tier Usage</h3>
          <p className="text-xs text-muted-foreground">
            You have used {usageCount} of 5 free matches. 
            <Button variant="link" className="p-0 h-auto text-xs" onClick={() => navigate('/pricing')}>
              Upgrade now
            </Button> for unlimited access.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Talent Matchmaking</h1>
          <p className="text-muted-foreground">AI-powered candidate-job matching</p>
        </div>
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Run AI Matching
        </Button>
      </div>
      
      {renderUsageInfo()}
      
      <div className="flex mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name or skills..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="candidates">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="jobs">Open Positions</TabsTrigger>
        </TabsList>
        <TabsContent value="candidates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading candidates...</p>
            ) : (
              <>
                {displayCandidates.map(candidate => (
                  <Card key={candidate.id}>
                    <CardHeader>
                      <CardTitle>{candidate.name}</CardTitle>
                      <CardDescription>{candidate.position}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Experience: {candidate.experience}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map(skill => (
                              <span 
                                key={skill} 
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Match Score</span>
                          <span className="text-sm font-bold">{candidate.matchScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${candidate.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="jobs" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading jobs...</p>
            ) : (
              <>
                {displayJobs.map(job => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.department}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Location: {job.location}</p>
                        <p className="text-sm text-muted-foreground">Type: {job.type}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => handleMatch(displayCandidates[0]?.id || '1', job.id)}
                        >
                          Find Matches
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentMatchmaking;
