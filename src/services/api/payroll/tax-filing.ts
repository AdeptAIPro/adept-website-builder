
import { ApiResponse } from "../core";

export interface TaxForm {
  id: string;
  formName: string;
  dueDate: string;
  period: string;
  status: "completed" | "pending" | "overdue";
  description?: string;
}

export interface TaxEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "federal" | "state" | "local";
  status?: "completed" | "pending" | "overdue";
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

export interface TaxFilingHistory {
  id: string;
  formName: string;
  formId: string;
  period: string;
  filedDate?: string;
  status: "accepted" | "pending" | "rejected";
}

export interface TaxPayment {
  id: string;
  taxType: string;
  period: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export interface TaxFilingData {
  taxForms: TaxForm[];
  taxDeadlines: TaxEvent[];
  taxLiabilities: TaxLiabilities;
  history?: TaxFilingHistory[];
  payments?: TaxPayment[];
}

export interface FormUploadData {
  formType: string;
  file: File;
  year: string;
  quarter: string;
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
          status: "pending",
          description: "Federal quarterly tax return"
        },
        {
          id: "form2",
          formName: "State Withholding Return",
          dueDate: "July 31, 2025",
          period: `${year} Q${quarter}`,
          status: "pending",
          description: "State quarterly tax return"
        },
        {
          id: "form3",
          formName: "W-2 Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending",
          description: "Annual wage and tax statements"
        },
        {
          id: "form4",
          formName: "1099-NEC Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending",
          description: "Nonemployee compensation forms"
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
      },
      history: [
        {
          id: "hist1",
          formName: "Form 941",
          formId: "941-2023-Q1",
          period: "2023 Q1",
          filedDate: "2023-04-15",
          status: "accepted"
        },
        {
          id: "hist2",
          formName: "State Withholding",
          formId: "SW-2023-Q1",
          period: "2023 Q1",
          filedDate: "2023-04-10",
          status: "accepted"
        }
      ],
      payments: [
        {
          id: "payment1",
          taxType: "Federal Income Tax",
          period: "2023 Q2",
          amount: 45000,
          dueDate: "2023-07-31",
          paid: false
        },
        {
          id: "payment2",
          taxType: "FICA Taxes",
          period: "2023 Q2",
          amount: 32500,
          dueDate: "2023-07-31",
          paid: false
        },
        {
          id: "payment3",
          taxType: "State Withholding",
          period: "2023 Q2",
          amount: 22000,
          dueDate: "2023-07-31",
          paid: true
        }
      ]
    });
  },

  uploadTaxForm: async (formData: FormData): Promise<{success: boolean, formId: string}> => {
    return Promise.resolve({
      success: true,
      formId: "form_" + Math.random().toString(36).substr(2, 9)
    });
  },
};
