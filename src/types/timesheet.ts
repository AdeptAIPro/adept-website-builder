
export interface TimesheetEntry {
  date: string;
  regularHours: number;
  overtimeHours: number;
  holidayHours: number;
  breakTime: number;
  notes: string;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  weekStarting: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  entries: TimesheetEntry[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalHolidayHours: number;
  totalHours: number;
  employee?: {
    firstName: string;
    lastName: string;
    id: string;
  };
  submittedDate?: string;
}
