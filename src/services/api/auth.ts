
import { fetchFromApi } from "./core";

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
