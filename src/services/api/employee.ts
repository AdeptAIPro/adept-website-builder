
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
  overtimeRate?: number;
  holidayRate?: number;
  stipend?: number;
  ssn?: string;
  bankAccount?: {
    bankName: string;
    accountType: string;
    accountLast4: string;
    routingNumber: string;
    verified: boolean;
  };
  taxForms?: {
    w4?: string;
    i9?: string;
    w2?: string;
    w3?: string;
    form941?: string;
    form940?: string;
    form1099NEC?: string;
    form1096?: string;
  };
  taxWithholding?: {
    filingStatus: 'single' | 'married' | 'marriedSeparate' | 'headOfHousehold';
    allowances: number;
    additionalWithholding: number;
    taxExempt: boolean;
    state: string;
    lastUpdated: string;
  };
}

export interface EmployeeResponse {
  employees: Employee[];
}

export const employeeApi = {
  getEmployees: async (employeeType: string = 'all') => {
    const response = await fetchFromApi<EmployeeResponse>(`/employees?type=${employeeType}`);
    return response.data;
  },
  
  getEmployee: async (employeeId: string) => {
    const response = await fetchFromApi<{ employee: Employee }>(`/employees/${employeeId}`);
    return response.data;
  },
  
  createEmployee: async (employeeData: any) => {
    const response = await fetchFromApi<{ employee: Employee; id: string }>(
      "/employees", 
      {
        method: "POST",
        body: JSON.stringify(employeeData)
      }
    );
    return response.data;
  },
  
  updateEmployee: async (employeeId: string, employeeData: any) => {
    const response = await fetchFromApi<{ employee: Employee }>(
      `/employees/${employeeId}`, 
      {
        method: "PUT",
        body: JSON.stringify(employeeData)
      }
    );
    return response.data;
  },
  
  deleteEmployee: async (employeeId: string) => {
    const response = await fetchFromApi<{ success: boolean }>(
      `/employees/${employeeId}`, 
      {
        method: "DELETE"
      }
    );
    return response.data;
  },
  
  uploadEmployeeDocument: async (employeeId: string, formData: FormData) => {
    const response = await fetchFromApi<{ documentId: string }>(
      `/employees/${employeeId}/documents`,
      {
        method: "POST",
        body: formData,
        headers: {
          // No Content-Type header for multipart/form-data
        }
      }
    );
    return response.data;
  },
  
  generateTaxForm: async (employeeId: string, formType: string, year: string) => {
    const response = await fetchFromApi<{ formUrl: string }>(
      `/forms/generate`,
      {
        method: "POST", 
        body: JSON.stringify({
          employeeId,
          formType,
          year
        })
      }
    );
    return response.data;
  },
  
  downloadTaxForm: async (employeeId: string, formType: string) => {
    const response = await fetchFromApi<{ downloadUrl: string }>(
      `/forms/download?employeeId=${employeeId}&form=${formType}`
    );
    return response.data;
  },
  
  initiateTaxFormSigning: async (employeeId: string, formType: string) => {
    const response = await fetchFromApi<{ signUrl: string }>(
      `/forms/sign`,
      {
        method: "POST", 
        body: JSON.stringify({
          employeeId,
          formType
        })
      }
    );
    return response.data;
  }
};
