
/**
 * Export all API modules for easy imports
 */

export { fetchFromApi } from "./core";
export { complianceApi } from "./compliance";
export { dashboardApi } from "./dashboard";
export { aiApi } from "./ai";
export { integrationsApi } from "./integrations";

// Export types
export type { ApiResponse } from "../types/common";
export type { ComplianceStatus, Document } from "../types/compliance";
