
/**
 * Configuration file for backend services
 * Contains API endpoints and keys configuration
 */

// API Keys - Replace these with your actual keys
// IMPORTANT: In production, these should be stored in environment variables
export const API_KEYS = {
  // Add your API keys here
  // Example: COMPLIANCE_API_KEY: "your-api-key-here"
};

// API endpoints configuration
export const API_ENDPOINTS = {
  compliance: {
    status: "/compliance/status",
    documents: "/compliance/documents"
  },
  dashboard: {
    stats: "/dashboard/stats",
    activities: "/dashboard/activities",
    actions: "/dashboard/actions"
  },
  integrations: {
    available: "/integrations/available",
    connect: (integrationId: string) => `/integrations/${integrationId}/connect`
  },
  ai: {
    insights: "/ai/insights",
    agents: "/ai/agents"
  }
};

// Base URL for API requests
export const BASE_URL = "https://api.adeptai.com/v1";
