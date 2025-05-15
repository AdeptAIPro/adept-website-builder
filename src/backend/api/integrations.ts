
/**
 * Integrations-related API requests
 */

import { fetchFromApi } from "./core";
import { API_ENDPOINTS } from "../config";

interface IntegrationsResponse {
  integrations: any[];
}

interface ConnectResponse {
  success: boolean;
}

export const integrationsApi = {
  /**
   * Get available integrations
   * @returns Promise with list of available integrations
   */
  getAvailableIntegrations: async () => {
    return fetchFromApi<IntegrationsResponse>(API_ENDPOINTS.integrations.available);
  },
  
  /**
   * Connect to an integration
   * @param integrationId The ID of the integration to connect
   * @param authData Authentication data for the integration
   * @returns Promise with connection result
   */
  connectIntegration: async (integrationId: string, authData: any) => {
    return fetchFromApi<ConnectResponse>(
      API_ENDPOINTS.integrations.connect(integrationId), 
      {
        method: "POST",
        body: JSON.stringify(authData)
      }
    );
  }
};
