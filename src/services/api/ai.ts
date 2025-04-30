
import { fetchFromApi } from "./core";

export const aiApi = {
  generateInsights: async (data: any) => {
    return fetchFromApi<{ insights: any }>(
      "/ai/insights", 
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );
  },
  
  getAIAgents: async () => {
    return fetchFromApi<{ agents: any[] }>("/ai/agents");
  }
};
