
import { fetchFromApi } from "./core";

export interface TimeEntry {
  date: string;
  regularHours: number;
  overtimeHours: number;
  breakTime: number;
  notes: string;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  weekStarting: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  entries: TimeEntry[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalHours: number;
}

export const timeTrackingApi = {
  getTimesheets: async (employeeId: string = 'all', dateRange: string = 'current') => {
    return fetchFromApi<{ timesheets: Timesheet[]; currentTimesheet: Timesheet }>(`/timesheets?employeeId=${employeeId}&dateRange=${dateRange}`);
  },
  
  getTimesheet: async (timesheetId: string) => {
    return fetchFromApi<{ timesheet: Timesheet }>(`/timesheets/${timesheetId}`);
  },
  
  saveTimesheet: async (timesheetData: any) => {
    return fetchFromApi<{ timesheet: Timesheet; id: string }>(
      "/timesheets", 
      {
        method: "POST",
        body: JSON.stringify(timesheetData)
      }
    );
  },
  
  submitTimesheet: async (timesheetId: string) => {
    return fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/submit`, 
      {
        method: "POST"
      }
    );
  },
  
  approveTimesheet: async (timesheetId: string) => {
    return fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/approve`, 
      {
        method: "POST"
      }
    );
  },
  
  rejectTimesheet: async (timesheetId: string, reason: string) => {
    return fetchFromApi<{ success: boolean }>(
      `/timesheets/${timesheetId}/reject`, 
      {
        method: "POST",
        body: JSON.stringify({ reason })
      }
    );
  }
};
