
import { fetchFromApi } from "./core";

export const integrationsApi = {
  getAvailableIntegrations: async () => {
    return fetchFromApi<{ integrations: any[] }>("/integrations/available");
  },
  
  connectIntegration: async (integrationId: string, authData: any) => {
    return fetchFromApi<{ success: boolean }>(
      `/integrations/${integrationId}/connect`, 
      {
        method: "POST",
        body: JSON.stringify(authData)
      }
    );
  }
};
