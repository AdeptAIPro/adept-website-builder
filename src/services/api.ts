
// This file serves as our central API client
// It routes all API requests to AWS Lambda functions instead of directly connecting to databases
// This enforces the pattern of Frontend → Backend → Database

import { toast } from "@/hooks/use-toast";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// API base URLs would come from environment variables in a real setup
const API_BASE_URL = "https://api.adeptai.com/v1"; // Would be replaced with AWS API Gateway URL

export async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    // Add tenant identification to all requests (multi-tenancy)
    const tenantId = localStorage.getItem("tenantId") || "";
    
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
      "X-Tenant-ID": tenantId, // Multi-tenant identifier
      ...(options?.headers || {})
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API request failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown API error";
    toast({
      title: "Request Failed",
      description: errorMessage,
      variant: "destructive",
    });
    return { error: errorMessage };
  }
}

// Authentication APIs
export const authApi = {
  login: async (email: string, password: string) => {
    // In production, this would call an AWS Lambda function via API Gateway
    const response = await fetchFromApi<{ token: string; user: any }>(
      "/auth/login", 
      {
        method: "POST",
        body: JSON.stringify({ email, password })
      }
    );
    
    // For development/demo purposes only
    // In production this would be handled by the Lambda function
    if (!response.error) {
      localStorage.setItem("authToken", response.data?.token || "demo-token");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      
      // Extract tenant ID from user data for multi-tenancy
      const tenantId = response.data?.user?.companyId || "default";
      localStorage.setItem("tenantId", tenantId);
    }
    
    return response;
  },
  
  socialLogin: async (provider: 'google' | 'facebook' | 'linkedin') => {
    // In production, this would call an AWS Lambda function
    const response = await fetchFromApi<{ token: string; user: any; tenantId: string }>(
      `/auth/${provider}/login`, 
      {
        method: "POST",
      }
    );
    
    // For development/demo purposes only
    // Simulate successful login with mock data
    if (!response.data && !response.error) {
      // Simulate successful response for demo
      return { data: { token: "social-demo-token", user: { email: `demo.${provider}@example.com` } } };
    }
    
    return response;
  },
  
  signup: async (email: string, password: string, companyName: string) => {
    // In production, this would call an AWS Lambda function
    const response = await fetchFromApi<{ token: string; user: any; tenantId: string }>(
      "/auth/signup", 
      {
        method: "POST",
        body: JSON.stringify({ email, password, companyName })
      }
    );
    
    // For development/demo purposes only
    if (!response.error) {
      localStorage.setItem("authToken", response.data?.token || "demo-token");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("companyName", companyName);
      
      // In actual implementation, backend would create a new tenant and return the ID
      localStorage.setItem("tenantId", response.data?.tenantId || companyName);
    }
    
    return response;
  },
  
  logout: async () => {
    // In production, this might call a Lambda to invalidate token
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("companyName");
    localStorage.removeItem("tenantId");
    return { data: { success: true } };
  }
};

// Dashboard data APIs
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

// Talent Matchmaking APIs
export const talentApi = {
  getCandidates: async (filters?: any) => {
    return fetchFromApi<{ candidates: any[] }>("/talent/candidates", {
      method: "POST",
      body: JSON.stringify(filters || {})
    });
  },
  
  getJobs: async () => {
    return fetchFromApi<{ jobs: any[] }>("/talent/jobs");
  },
  
  matchCandidateToJob: async (candidateId: string, jobId: string) => {
    return fetchFromApi<{ score: number; insights: string[] }>(
      "/talent/match", 
      {
        method: "POST",
        body: JSON.stringify({ candidateId, jobId })
      }
    );
  }
};

// Payroll APIs
export const payrollApi = {
  getPayrollData: async (month: string, year: string) => {
    return fetchFromApi<{ payrollData: any }>(`/payroll/data?month=${month}&year=${year}`);
  },
  
  processPayrun: async (payrunData: any) => {
    return fetchFromApi<{ payrunId: string }>(
      "/payroll/process", 
      {
        method: "POST",
        body: JSON.stringify(payrunData)
      }
    );
  }
};

// Compliance APIs
export const complianceApi = {
  getComplianceStatus: async () => {
    return fetchFromApi<{ status: any }>("/compliance/status");
  },
  
  getRequiredDocuments: async () => {
    return fetchFromApi<{ documents: any[] }>("/compliance/documents");
  }
};

// Integrations APIs
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

// AI Platform APIs
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
