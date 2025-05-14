
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, Clock, Save, Check, AlertCircle, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { employeeApi } from '@/services/api/employee';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { TimesheetGrid } from '@/components/payroll/TimesheetGrid';
import { TimesheetApprovalTable } from '@/components/payroll/TimesheetApprovalTable';
import { toast } from '@/hooks/use-toast';

const Timesheets: React.FC = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('current');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timesheetData, setTimesheetData] = useState<any>(null);

  // Fetch employees for dropdown
  const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['employees', 'active'],
    queryFn: () => employeeApi.getEmployees('active'),
  });

  // Fetch timesheet data
  const { data: timesheetsData, isLoading: isLoadingTimesheets, refetch } = useQuery({
    queryKey: ['timesheets', employeeId, dateRange],
    queryFn: () => timeTrackingApi.getTimesheets(employeeId, dateRange),
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

  // Approve timesheet mutation
  const approveTimesheetMutation = useMutation({
    mutationFn: (timesheetId: string) => timeTrackingApi.approveTimesheet(timesheetId),
    onSuccess: () => {
      toast({
        title: 'Timesheet Approved',
        description: 'The timesheet has been successfully approved.',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to approve timesheet',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const handleSaveTimesheet = () => {
    if (timesheetData) {
      saveTimesheetMutation.mutate(timesheetData);
    }
  };

  const handleTimesheetChange = (data: any) => {
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

  const handleApproveTimesheet = (timesheetId: string) => {
    approveTimesheetMutation.mutate(timesheetId);
  };

  // Filter timesheets based on search term
  const filteredTimesheets = timesheetsData?.timesheets?.filter((timesheet: any) => 
    timesheet.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    timesheet.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          </TabsContent>

          <TabsContent value="approval" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Timesheet Approvals</CardTitle>
                    <CardDescription>Review and approve employee timesheets</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={dateRange}
                      onValueChange={(value) => setDateRange(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Week</SelectItem>
                        <SelectItem value="previous">Previous Week</SelectItem>
                        <SelectItem value="twoWeeks">Last Two Weeks</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative w-[220px]">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search employees..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredTimesheets.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/20 p-8 text-center">
                    <Clock className="mb-2 h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No timesheets found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm 
                        ? "Try adjusting your search terms"
                        : "No pending timesheets for approval"
                      }
                    </p>
                  </div>
                ) : (
                  <TimesheetApprovalTable 
                    timesheets={filteredTimesheets} 
                    onApprove={handleApproveTimesheet}
                    isApproving={approveTimesheetMutation.isPending}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Timesheets;
