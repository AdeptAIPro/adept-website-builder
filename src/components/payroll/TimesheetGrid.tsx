
import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface TimesheetEntry {
  date: string;
  regularHours: number;
  overtimeHours: number;
  breakTime: number;
  notes: string;
}

interface Timesheet {
  id: string;
  employeeId: string;
  weekStarting: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  entries: TimesheetEntry[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalHours: number;
}

interface TimesheetGridProps {
  selectedDate: Date;
  employeeId: string;
  timesheetData?: Timesheet;
  onTimesheetChange: (timesheet: Timesheet) => void;
}

export const TimesheetGrid: React.FC<TimesheetGridProps> = ({
  selectedDate,
  employeeId,
  timesheetData,
  onTimesheetChange,
}) => {
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  
  // Initialize the week dates based on the selected date
  useEffect(() => {
    if (timesheetData) {
      setTimesheet(timesheetData);
    } else {
      // Generate a new timesheet if none exists
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
      const entries = Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(weekStart, index);
        return {
          date: format(date, 'yyyy-MM-dd'),
          regularHours: 0,
          overtimeHours: 0,
          breakTime: 0,
          notes: '',
        };
      });

      const newTimesheet: Timesheet = {
        id: 'new',
        employeeId,
        weekStarting: format(weekStart, 'yyyy-MM-dd'),
        status: 'draft',
        entries,
        totalRegularHours: 0,
        totalOvertimeHours: 0,
        totalHours: 0,
      };

      setTimesheet(newTimesheet);
      onTimesheetChange(newTimesheet);
    }
  }, [selectedDate, employeeId, timesheetData, onTimesheetChange]);

  const handleChange = (index: number, field: keyof TimesheetEntry, value: any) => {
    if (!timesheet) return;

    const updatedEntries = [...timesheet.entries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: field === 'notes' ? value : parseFloat(value) || 0,
    };

    // Calculate totals
    const totalRegularHours = updatedEntries.reduce((sum, entry) => sum + entry.regularHours, 0);
    const totalOvertimeHours = updatedEntries.reduce((sum, entry) => sum + entry.overtimeHours, 0);
    const totalHours = totalRegularHours + totalOvertimeHours;

    const updatedTimesheet = {
      ...timesheet,
      entries: updatedEntries,
      totalRegularHours,
      totalOvertimeHours,
      totalHours,
    };

    setTimesheet(updatedTimesheet);
    onTimesheetChange(updatedTimesheet);
  };

  if (!timesheet) {
    return <div>Loading timesheet data...</div>;
  }

  const getDayLabel = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Week Starting: {format(new Date(timesheet.weekStarting), 'MMMM d, yyyy')}</h3>
          <p className="text-xs text-muted-foreground">
            Enter hours worked for each day of the week
          </p>
        </div>
        <div>
          {getStatusBadge(timesheet.status)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Day</th>
              <th className="border px-4 py-2 text-left">Regular Hours</th>
              <th className="border px-4 py-2 text-left">Overtime Hours</th>
              <th className="border px-4 py-2 text-left">Break (min)</th>
              <th className="border px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {timesheet.entries.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                <td className="border px-4 py-2">
                  {getDayLabel(entry.date)}
                </td>
                <td className="border px-4 py-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.regularHours || ''}
                    onChange={(e) => handleChange(index, 'regularHours', e.target.value)}
                    className="h-9"
                    disabled={timesheet.status === 'approved'}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.overtimeHours || ''}
                    onChange={(e) => handleChange(index, 'overtimeHours', e.target.value)}
                    className="h-9"
                    disabled={timesheet.status === 'approved'}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Input
                    type="number"
                    min="0"
                    step="5"
                    value={entry.breakTime || ''}
                    onChange={(e) => handleChange(index, 'breakTime', e.target.value)}
                    className="h-9"
                    disabled={timesheet.status === 'approved'}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Input
                    type="text"
                    value={entry.notes || ''}
                    onChange={(e) => handleChange(index, 'notes', e.target.value)}
                    className="h-9"
                    placeholder="Add notes here"
                    disabled={timesheet.status === 'approved'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-medium">
              <td className="border px-4 py-2">Total</td>
              <td className="border px-4 py-2">{timesheet.totalRegularHours}</td>
              <td className="border px-4 py-2">{timesheet.totalOvertimeHours}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 rounded-lg bg-muted p-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <Label className="text-sm">Total Regular Hours</Label>
            <p className="mt-1 text-lg font-medium">{timesheet.totalRegularHours}</p>
          </div>
          <div>
            <Label className="text-sm">Total Overtime Hours</Label>
            <p className="mt-1 text-lg font-medium">{timesheet.totalOvertimeHours}</p>
          </div>
          <div>
            <Label className="text-sm">Total Hours</Label>
            <p className="mt-1 text-lg font-medium">{timesheet.totalHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
