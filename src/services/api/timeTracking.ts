
import { fetchFromApi } from "./core";

export interface TimeEntry {
  date: string;
  regularHours: number;
  overtimeHours: number;
  holidayHours?: number;
  breakTime: number;
  notes: string;
}

export interface PayrollCalculation {
  regularPay: number;
  overtimePay: number;
  holidayPay: number;
  stipend: number;
  grossPay: number;
  taxes: {
    federal: number;
    state: number;
    medicare: number;
    socialSecurity: number;
    other: number;
    total: number;
  };
  deductions: {
    retirement: number;
    health: number;
    other: number;
    total: number;
  };
  netPay: number;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  weekStarting: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  entries: TimeEntry[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalHolidayHours?: number;
  totalHours: number;
  payrollCalculation?: PayrollCalculation;
}

export const timeTrackingApi = {
  getTimesheets: async (employeeId: string = 'all', dateRange: string = 'current') => {
    const response = await fetchFromApi<{ timesheets: Timesheet[]; currentTimesheet: Timesheet }>(`/timesheets?employeeId=${employeeId}&dateRange=${dateRange}`);
    return response.data;
  },
  
  getTimesheet: async (timesheetId: string) => {
    const response = await fetchFromApi<{ timesheet: Timesheet }>(`/timesheets/${timesheetId}`);
    return response.data;
  },
  
  saveTimesheet: async (timesheetData: any) => {
    const response = await fetchFromApi<{ timesheet: Timesheet; id: string }>(
      "/timesheets", 
      {
        method: "POST",
        body: JSON.stringify(timesheetData)
      }
    );
    return response.data;
  },
  
  submitTimesheet: async (timesheetId: string) => {
    const response = await fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/submit`, 
      {
        method: "POST"
      }
    );
    return response.data;
  },
  
  approveTimesheet: async (timesheetId: string) => {
    const response = await fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/approve`, 
      {
        method: "POST"
      }
    );
    return response.data;
  },
  
  rejectTimesheet: async (timesheetId: string, reason: string) => {
    const response = await fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/reject`, 
      {
        method: "POST",
        body: JSON.stringify({ reason })
      }
    );
    return response.data;
  },
  
  calculatePayroll: async (timesheetId: string) => {
    const response = await fetchFromApi<{ calculation: PayrollCalculation }>(
      `/payroll/calculate/${timesheetId}`,
      {
        method: "POST"
      }
    );
    return response.data;
  }
};
