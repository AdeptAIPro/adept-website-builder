
import { ApiResponse } from "../core";

export interface TaxForm {
  id: string;
  formName: string;
  dueDate: string;
  period: string;
  status: string;
}

export interface TaxEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: string;
  status?: string;
}

export interface TaxLiabilities {
  federal: number;
  state: number;
  total: number;
  breakdown: {
    federalIncomeTax: number;
    socialSecurityTax: number;
    medicareTax: number;
    futa: number;
    suta: number;
  }
}

export interface TaxFilingData {
  taxForms: TaxForm[];
  taxDeadlines: TaxEvent[];
  taxLiabilities: TaxLiabilities;
}

export const taxFilingApi = {
  getTaxFilingData: async (year: string, quarter: string): Promise<TaxFilingData> => {
    return Promise.resolve({
      taxForms: [
        {
          id: "form1",
          formName: "Form 941 - Quarterly Tax Return",
          dueDate: "July 31, 2025",
          period: `${year} Q${quarter}`,
          status: "pending"
        },
        {
          id: "form2",
          formName: "State Withholding Return",
          dueDate: "July 31, 2025",
          period: `${year} Q${quarter}`,
          status: "pending"
        },
        {
          id: "form3",
          formName: "W-2 Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending"
        },
        {
          id: "form4",
          formName: "1099-NEC Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending"
        }
      ],
      taxDeadlines: [
        {
          id: "deadline1",
          date: "2025-07-31",
          title: "Form 941 Due",
          description: "Federal quarterly tax return",
          type: "federal",
          status: "pending"
        },
        {
          id: "deadline2",
          date: "2025-07-31",
          title: "State Withholding Due",
          description: "State quarterly tax return",
          type: "state",
          status: "pending"
        },
        {
          id: "deadline3",
          date: "2025-07-15",
          title: "Estimated Tax Payment",
          description: "Second quarter estimated tax",
          type: "federal",
          status: "pending"
        }
      ],
      taxLiabilities: {
        federal: 125000,
        state: 45000,
        total: 170000,
        breakdown: {
          federalIncomeTax: 85000,
          socialSecurityTax: 31000,
          medicareTax: 9000,
          futa: 7000,
          suta: 38000
        }
      }
    });
  },

  uploadTaxForm: async (formData: FormData) => {
    return Promise.resolve({
      success: true,
      formId: "form_" + Math.random().toString(36).substr(2, 9)
    });
  },
};
