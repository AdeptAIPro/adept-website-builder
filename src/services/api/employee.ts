
import { fetchFromApi } from "./core";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  position: string;
  department: string;
  employeeType: 'W2' | '1099';
  status: 'active' | 'inactive' | 'onboarding';
  startDate: string;
  salary?: number;
  hourlyRate?: number;
}

export interface EmployeeResponse {
  employees: Employee[];
}

export const employeeApi = {
  getEmployees: async (employeeType: string = 'all') => {
    return fetchFromApi<EmployeeResponse>(`/employees?type=${employeeType}`);
  },
  
  getEmployee: async (employeeId: string) => {
    return fetchFromApi<{ employee: Employee }>(`/employees/${employeeId}`);
  },
  
  createEmployee: async (employeeData: any) => {
    return fetchFromApi<{ employee: Employee; id: string }>(
      "/employees", 
      {
        method: "POST",
        body: JSON.stringify(employeeData)
      }
    );
  },
  
  updateEmployee: async (employeeId: string, employeeData: any) => {
    return fetchFromApi<{ employee: Employee }>(
      `/employees/${employeeId}`, 
      {
        method: "PUT",
        body: JSON.stringify(employeeData)
      }
    );
  },
  
  deleteEmployee: async (employeeId: string) => {
    return fetchFromApi<{ success: boolean }>(
      `/employees/${employeeId}`, 
      {
        method: "DELETE"
      }
    );
  },
  
  uploadEmployeeDocument: async (employeeId: string, formData: FormData) => {
    return fetchFromApi<{ documentId: string }>(
      `/employees/${employeeId}/documents`,
      {
        method: "POST",
        body: formData,
        headers: {
          // No Content-Type header for multipart/form-data
        }
      }
    );
  }
};
