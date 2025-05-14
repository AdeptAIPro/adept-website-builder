
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { TimeEntryTab } from '@/components/payroll/TimeEntryTab';
import { ApprovalTab } from '@/components/payroll/ApprovalTab';

const Timesheets: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('current');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Fetch timesheet data - used to check if data is loading
  const { isLoading: isLoadingTimesheets, data: timesheetsData } = useQuery({
    queryKey: ['timesheets', employeeId, dateRange],
    queryFn: () => timeTrackingApi.getTimesheets(employeeId, dateRange),
  });

  if (isLoadingTimesheets && !timesheetsData) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Timesheets</h1>
            <p className="text-muted-foreground">
              Manage employee working hours and overtime
            </p>
          </div>
        </div>

        <Tabs defaultValue="entry" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="entry">Time Entry</TabsTrigger>
            <TabsTrigger value="approval">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="pt-4">
            <TimeEntryTab 
              employeeId={employeeId}
              setEmployeeId={setEmployeeId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </TabsContent>

          <TabsContent value="approval" className="pt-4">
            <ApprovalTab 
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Timesheets;
