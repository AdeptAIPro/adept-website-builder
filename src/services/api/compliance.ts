
import { fetchFromApi } from "./core";

export const complianceApi = {
  getComplianceStatus: async () => {
    return fetchFromApi<{ status: any }>("/compliance/status");
  },
  
  getRequiredDocuments: async () => {
    return fetchFromApi<{ documents: any[] }>("/compliance/documents");
  }
};
