
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
  
  // New method for matching job descriptions directly
  matchJobDescription: async (jobDescription: string) => {
    return fetchFromApi<{ candidates: any[] }>(
      "/talent/match-description", 
      {
        method: "POST",
        body: JSON.stringify({ jobDescription })
      }
    );
  },
  
  // New method for submitting resumes
  submitResume: async (formData: FormData) => {
    return fetchFromApi<{ success: boolean; message: string }>(
      "/talent/submit-resume", 
      {
        method: "POST",
        body: formData
      }
    );
  }
};
