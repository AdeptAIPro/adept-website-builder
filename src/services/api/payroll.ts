
import { fetchFromApi } from "./core";

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
