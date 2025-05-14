
import React, { useState } from 'react';
import { Loader2, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { employeeApi } from '@/services/api/employee';
import { TimesheetGrid } from '@/components/payroll/TimesheetGrid';
import { toast } from '@/hooks/use-toast';
import type { Timesheet } from '@/types/timesheet';

interface TimeEntryTabProps {
  employeeId: string;
  setEmployeeId: (id: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const TimeEntryTab: React.FC<TimeEntryTabProps> = ({
  employeeId,
  setEmployeeId,
  selectedDate,
  setSelectedDate
}) => {
  const [timesheetData, setTimesheetData] = useState<Timesheet | null>(null);

  // Fetch employees for dropdown
  const { data: employeesData } = useQuery({
    queryKey: ['employees', 'active'],
    queryFn: () => employeeApi.getEmployees('active'),
  });

  // Fetch timesheet data
  const { data: timesheetsData, refetch } = useQuery({
    queryKey: ['timesheets', employeeId, 'current'],
    queryFn: () => timeTrackingApi.getTimesheets(employeeId, 'current'),
  });

  // Save timesheet mutation
  const saveTimesheetMutation = useMutation({
    mutationFn: (data: any) => timeTrackingApi.saveTimesheet(data),
    onSuccess: () => {
      toast({
        title: 'Timesheet Saved',
        description: 'The timesheet has been successfully saved.',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to save timesheet',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const handleSaveTimesheet = () => {
    if (timesheetData) {
      saveTimesheetMutation.mutate(timesheetData);
    }
  };

  const handleTimesheetChange = (data: Timesheet) => {
    setTimesheetData(data);
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Weekly Timesheet</CardTitle>
            <CardDescription>Enter hours worked for each day</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select
              value={employeeId}
              onValueChange={(value) => setEmployeeId(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employeesData?.employees?.map((employee: any) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TimesheetGrid
          selectedDate={selectedDate}
          employeeId={employeeId}
          timesheetData={timesheetsData?.currentTimesheet}
          onTimesheetChange={handleTimesheetChange}
        />

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSaveTimesheet}
            disabled={saveTimesheetMutation.isPending || !timesheetData}
          >
            {saveTimesheetMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Timesheet
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
