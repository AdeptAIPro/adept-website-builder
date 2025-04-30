
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
  }
};
