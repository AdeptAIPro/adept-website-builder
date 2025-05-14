
import { toast } from "@/hooks/use-toast";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// API base URLs would come from environment variables in a real setup
export const API_BASE_URL = "https://api.adeptai.com/v1"; // Would be replaced with AWS API Gateway URL

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

    const responseData = await response.json();
    return { data: responseData };
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
