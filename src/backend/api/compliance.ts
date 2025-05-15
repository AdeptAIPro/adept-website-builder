
/**
 * Compliance-related API requests
 */

import { fetchFromApi } from "./core";
import { API_ENDPOINTS } from "../config";
import { ComplianceResponse, DocumentsResponse } from "../types/compliance";

export const complianceApi = {
  /**
   * Fetch compliance status data
   * @returns Promise with compliance status information
   */
  getComplianceStatus: async () => {
    return fetchFromApi<ComplianceResponse>(API_ENDPOINTS.compliance.status);
  },
  
  /**
   * Fetch required compliance documents
   * @returns Promise with list of required documents
   */
  getRequiredDocuments: async () => {
    return fetchFromApi<DocumentsResponse>(API_ENDPOINTS.compliance.documents);
  }
};
