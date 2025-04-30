
import { fetchFromApi } from "./core";

export const dashboardApi = {
  getStats: async () => {
    return fetchFromApi<{
      activeProjects: number;
      totalCandidates: number;
      matchRate: string;
    }>("/dashboard/stats");
  },
  
  getRecentActivity: async () => {
    return fetchFromApi<{
      activities: Array<{
        type: string;
        description: string;
        time: string;
      }>;
    }>("/dashboard/activities");
  },
  
  getRecommendedActions: async () => {
    return fetchFromApi<{
      actions: string[];
    }>("/dashboard/actions");
  }
};
