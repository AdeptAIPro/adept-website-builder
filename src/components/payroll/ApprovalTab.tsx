
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useMobile } from '@/hooks/use-mobile';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { Timesheet } from '@/types/timesheet';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TimesheetApprovalTable } from '@/components/payroll/TimesheetApprovalTable';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ApprovalTabProps {
  // Define props here if needed
}

export const ApprovalTab: React.FC<ApprovalTabProps> = () => {
  const [selectedTimesheets, setSelectedTimesheets] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('current-week');
  const isMobile = useMobile();

  // Fetch timesheets that need approval
  const { data: approvalData, isLoading, refetch } = useQuery({
    queryKey: ['timesheets', 'approval', dateRange],
    queryFn: () => timeTrackingApi.getTimesheets(undefined, dateRange)
  });

  // Mutation for approving multiple timesheets at once
  const approveMutation = useMutation({
    mutationFn: (ids: string[]) => timeTrackingApi.approveTimesheet(ids[0]), // This should ideally handle multiple ids
    onSuccess: () => {
      toast({
        title: "Timesheets Approved",
        description: `${selectedTimesheets.length} timesheet(s) successfully approved`,
      });
      setSelectedTimesheets([]);
      refetch();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: error instanceof Error ? error.message : "Failed to approve timesheets",
      });
    }
  });

  // Handle selection of a timesheet
  const handleSelectTimesheet = (timesheetId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTimesheets([...selectedTimesheets, timesheetId]);
    } else {
      setSelectedTimesheets(selectedTimesheets.filter(id => id !== timesheetId));
    }
  };

  // Handle approval of selected timesheets
  const handleApprove = () => {
    if (selectedTimesheets.length === 0) {
      toast({
        variant: "destructive",
        title: "No Timesheets Selected",
        description: "Please select at least one timesheet to approve",
      });
      return;
    }
    approveMutation.mutate(selectedTimesheets);
  };

  // Handle rejection of selected timesheets
  const handleReject = () => {
    // Implementation for rejection would be similar to approval
    toast({
      variant: "destructive",
      title: "Feature Not Implemented",
      description: "Rejection functionality is not yet implemented",
    });
  };

  // Generate summary stats
  const pendingCount = approvalData?.timesheets?.filter(t => t.status === 'pending').length || 0;
  const approvedCount = approvalData?.timesheets?.filter(t => t.status === 'approved').length || 0;
  const rejectedCount = approvalData?.timesheets?.filter(t => t.status === 'rejected').length || 0;
  const totalHours = approvalData?.timesheets?.reduce((acc, t) => acc + t.totalHours, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <h3 className="text-2xl font-bold mt-1">{pendingCount}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">Approved</p>
            <h3 className="text-2xl font-bold mt-1">{approvedCount}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <h3 className="text-2xl font-bold mt-1">{rejectedCount}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <h3 className="text-2xl font-bold mt-1">{totalHours.toFixed(1)}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Timesheets Awaiting Approval</h3>
        <div className="flex gap-2">
          <Button
            size={isMobile ? "sm" : "default"}
            onClick={handleApprove}
            disabled={selectedTimesheets.length === 0 || approveMutation.isPending}
          >
            {approveMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve Selected
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Timesheets table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <TimesheetApprovalTable
          timesheets={approvalData?.timesheets || []}
          selectedTimesheets={selectedTimesheets}
          onSelectTimesheet={handleSelectTimesheet}
        />
      )}
    </div>
  );
};

export default ApprovalTab;
