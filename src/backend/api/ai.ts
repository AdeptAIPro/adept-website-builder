
/**
 * AI-related API requests
 */

import { fetchFromApi } from "./core";
import { API_ENDPOINTS } from "../config";

interface InsightsResponse {
  insights: any;
}

interface AgentsResponse {
  agents: any[];
}

export const aiApi = {
  /**
   * Generate AI insights from provided data
   * @param data The data to analyze
   * @returns Promise with generated insights
   */
  generateInsights: async (data: any) => {
    return fetchFromApi<InsightsResponse>(
      API_ENDPOINTS.ai.insights, 
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );
  },
  
  /**
   * Get available AI agents
   * @returns Promise with list of AI agents
   */
  getAIAgents: async () => {
    return fetchFromApi<AgentsResponse>(API_ENDPOINTS.ai.agents);
  }
};
