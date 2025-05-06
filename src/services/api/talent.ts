
import { fetchFromApi } from "./core";

export const talentApi = {
  getCandidates: async (filters?: any) => {
    return fetchFromApi<{ candidates: any[] }>("/talent/candidates", {
      method: "POST",
      body: JSON.stringify(filters || {})
    });
  },
  
  getJobs: async () => {
    return fetchFromApi<{ jobs: any[] }>("/talent/jobs");
  },
  
  matchCandidateToJob: async (candidateId: string, jobId: string) => {
    return fetchFromApi<{ score: number; insights: string[] }>(
      "/talent/match", 
      {
        method: "POST",
        body: JSON.stringify({ candidateId, jobId })
      }
    );
  },
  
  // Enhanced method for matching job descriptions directly with improved analytics
  matchJobDescription: async (jobDescription: string) => {
    return fetchFromApi<{ candidates: any[]; analytics: any }>(
      "/talent/match-description", 
      {
        method: "POST",
        body: JSON.stringify({ 
          jobDescription,
          includeAnalytics: true 
        })
      }
    );
  },
  
  // Enhanced method for submitting resumes with additional options
  submitResume: async (formData: FormData) => {
    return fetchFromApi<{ success: boolean; message: string; candidateId?: string }>(
      "/talent/submit-resume", 
      {
        method: "POST",
        body: formData
      }
    );
  },
  
  // New method to get skill insights
  getSkillInsights: async (skills: string[]) => {
    return fetchFromApi<{ insights: any; trends: any[] }>(
      "/talent/skill-insights",
      {
        method: "POST",
        body: JSON.stringify({ skills })
      }
    );
  }
};
