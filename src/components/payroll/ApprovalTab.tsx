
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { TimesheetApprovalTable } from '@/components/payroll/TimesheetApprovalTable';
import { toast } from '@/hooks/use-toast';

interface ApprovalTabProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const ApprovalTab: React.FC<ApprovalTabProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch timesheet data
  const { data: timesheetsData, refetch } = useQuery({
    queryKey: ['timesheets', 'all', dateRange],
    queryFn: () => timeTrackingApi.getTimesheets('all', dateRange),
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

  const handleApproveTimesheet = (timesheetId: string) => {
    approveTimesheetMutation.mutate(timesheetId);
  };

  // Filter timesheets based on search term
  const filteredTimesheets = timesheetsData?.timesheets?.filter((timesheet: any) => 
    timesheet.employee?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    timesheet.employee?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
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
  );
};
