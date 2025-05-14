
import { ApiResponse } from "../core";

export interface PayrollEmployee {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  position: string;
  employeeType: string;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  otherDeductions: number;
  netPay: number;
}

export interface PayrollTotals {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  otherDeductions: number;
  netPay: number;
  totalTaxes: number;
}

export interface PayrollData {
  payrollData: {
    month: string;
    year: string;
    employees: PayrollEmployee[];
    totals: PayrollTotals;
  }
}

export const payrollProcessingApi = {
  getPayrollData: async (month: string, year: string): Promise<PayrollData> => {
    // In a real app, this would call the API with the month and year
    // For demo purposes, we'll return mock data
    return Promise.resolve({
      payrollData: {
        month,
        year,
        employees: [
          {
            id: "emp1",
            firstName: "John",
            lastName: "Smith",
            avatar: "",
            position: "Software Engineer",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 5,
            grossPay: 6250,
            federalTax: 1250,
            stateTax: 500,
            socialSecurity: 387.5,
            medicare: 90.63,
            otherDeductions: 150,
            netPay: 3871.87
          },
          {
            id: "emp2",
            firstName: "Sarah",
            lastName: "Johnson",
            avatar: "",
            position: "Product Manager",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 0,
            grossPay: 7500,
            federalTax: 1500,
            stateTax: 600,
            socialSecurity: 465,
            medicare: 108.75,
            otherDeductions: 200,
            netPay: 4626.25
          },
          {
            id: "emp3",
            firstName: "Michael",
            lastName: "Brown",
            avatar: "",
            position: "Designer",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 2,
            grossPay: 5300,
            federalTax: 1060,
            stateTax: 424,
            socialSecurity: 328.6,
            medicare: 76.85,
            otherDeductions: 150,
            netPay: 3260.55
          }
        ],
        totals: {
          grossPay: 19050,
          federalTax: 3810,
          stateTax: 1524,
          socialSecurity: 1181.10,
          medicare: 276.23,
          otherDeductions: 500,
          netPay: 11758.67,
          totalTaxes: 6791.33
        }
      }
    });
  },

  processPayrun: async (payrunData: any) => {
    // In a real app, this would send the payrun data to the API
    // For demo, we'll just return a mock response with a payrun ID
    return Promise.resolve({
      payrunId: "pay_" + Math.random().toString(36).substr(2, 9)
    });
  },
};
