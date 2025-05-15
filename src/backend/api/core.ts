
/**
 * Core API functionality for making HTTP requests
 */

import { toast } from "@/hooks/use-toast";
import { API_KEYS, BASE_URL } from "../config";
import { ApiResponse } from "../types/common";

// Helper to add authentication and tenant headers to all requests
const getHeaders = () => {
  const tenantId = localStorage.getItem("tenantId") || "";
  
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
    "X-Tenant-ID": tenantId // Multi-tenant identifier
  };
};

// Generic fetch function for API requests
export async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const headers = {
      ...getHeaders(),
      ...(options?.headers || {})
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
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
