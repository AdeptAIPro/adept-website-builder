
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  skills: string[];
  matchScore: number;
  location: string;
  education: string;
  availability: string;
}

interface CandidateResultsProps {
  candidates: Candidate[];
  showLimited: boolean;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({ candidates, showLimited }) => {
  const { isAuthenticated } = useAuth();

  if (!showLimited || candidates.length === 0) {
    return null;
  }

  return (
    <div className="px-8 py-6 border-t border-primary/10">
      <Card className="shadow-lg overflow-hidden border-primary/10 animate-fade-in">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Top Matching Candidates</CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-matched candidates based on your job description
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex border-primary/20 hover:bg-primary/10 hover:text-primary">
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
                  <TableRow key={candidate.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell>
                      <div className="flex flex-col items-center">
                        <span className={cn(
                          "text-lg font-bold",
                          candidate.matchScore > 90 ? "text-accent" : "text-primary"
                        )}>{candidate.matchScore}%</span>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div 
                            className={cn(
                              "h-2 rounded-full", 
                              candidate.matchScore > 90 ? "bg-accent" : "bg-primary"
                            )}
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
                            className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              candidate.matchScore > 90 
                                ? "bg-accent/10 text-accent" 
                                : "bg-primary/10 text-primary"
                            )}
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
                          <span className={cn(
                            "text-lg font-bold",
                            candidate.matchScore > 90 ? "text-accent" : "text-primary"
                          )}>{candidate.matchScore}%</span>
                          <div className="w-full bg-muted rounded-full h-2 mt-1">
                            <div 
                              className={cn(
                                "h-2 rounded-full", 
                                candidate.matchScore > 90 ? "bg-accent" : "bg-primary"
                              )}
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
                              className={cn(
                                "text-xs px-2 py-1 rounded-full",
                                candidate.matchScore > 90 
                                  ? "bg-accent/10 text-accent" 
                                  : "bg-primary/10 text-primary"
                              )}
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
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="text-center p-8 bg-card shadow-xl rounded-lg border border-accent/20 max-w-md">
                  <div className="h-16 w-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-2xl mb-2 gradient-text">Unlock All Matches</h3>
                  <p className="text-sm mb-6 text-muted-foreground">Get full access to all candidate profiles, detailed skills analysis, and direct contact options</p>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
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
            <Button variant="outline" asChild className="w-full border-primary/20 hover:bg-primary/10 hover:text-primary">
              <Link to="/dashboard/talent">
                View All Insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateResults;
