
import { fetchFromApi } from "./core";

export type TaxFormType = 
  'w4' | 'i9' | 'w2' | 'w3' | 'form941' | 
  'form940' | 'form1099NEC' | 'form1096' | 'stateWithholding';

export interface TaxForm {
  id: string;
  employeeId: string;
  formType: TaxFormType;
  year: string;
  status: 'pending' | 'completed' | 'e-filed';
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const taxFormsApi = {
  listForms: async (employeeId?: string, formType?: string, year?: string) => {
    let query = '';
    if (employeeId) query += `employeeId=${employeeId}&`;
    if (formType) query += `formType=${formType}&`;
    if (year) query += `year=${year}&`;
    
    const response = await fetchFromApi<{ forms: TaxForm[] }>(
      `/forms?${query}`
    );
    return response.data;
  },
  
  generateForm: async (employeeId: string, formType: TaxFormType, year: string) => {
    const response = await fetchFromApi<{ form: TaxForm }>(
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
  
  downloadForm: async (formId: string) => {
    const response = await fetchFromApi<{ downloadUrl: string }>(
      `/forms/download/${formId}`
    );
    return response.data;
  },
  
  bulkGenerate: async (formType: TaxFormType, year: string, employeeIds?: string[]) => {
    const response = await fetchFromApi<{ batchId: string; count: number }>(
      `/forms/bulk-generate`,
      {
        method: "POST",
        body: JSON.stringify({
          formType,
          year,
          employeeIds
        })
      }
    );
    return response.data;
  },
  
  initiateESign: async (formId: string) => {
    const response = await fetchFromApi<{ signUrl: string }>(
      `/forms/e-sign/${formId}`,
      {
        method: "POST"
      }
    );
    return response.data;
  },
  
  uploadSignedForm: async (formId: string, formData: FormData) => {
    const response = await fetchFromApi<{ form: TaxForm }>(
      `/forms/upload/${formId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          // No Content-Type header for multipart/form-data
        }
      }
    );
    return response.data;
  }
};
