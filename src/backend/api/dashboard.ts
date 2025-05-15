
/**
 * Dashboard-related API requests
 */

import { fetchFromApi } from "./core";
import { API_ENDPOINTS } from "../config";

interface DashboardStats {
  activeProjects: number;
  totalCandidates: number;
  matchRate: string;
}

interface Activity {
  type: string;
  description: string;
  time: string;
}

interface ActivitiesResponse {
  activities: Activity[];
}

interface ActionsResponse {
  actions: string[];
}

export const dashboardApi = {
  /**
   * Get dashboard statistics
   * @returns Promise with dashboard stats
   */
  getStats: async () => {
    return fetchFromApi<DashboardStats>(API_ENDPOINTS.dashboard.stats);
  },
  
  /**
   * Get recent activity data
   * @returns Promise with recent activities
   */
  getRecentActivity: async () => {
    return fetchFromApi<ActivitiesResponse>(API_ENDPOINTS.dashboard.activities);
  },
  
  /**
   * Get recommended actions
   * @returns Promise with recommended actions
   */
  getRecommendedActions: async () => {
    return fetchFromApi<ActionsResponse>(API_ENDPOINTS.dashboard.actions);
  }
};
