
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Filter, X, Clock } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimesheetApprovalTable } from '@/components/payroll/TimesheetApprovalTable';
import { timeTrackingApi } from '@/services/api/timeTracking';
import { toast } from '@/hooks/use-toast';
import { Timesheet } from '@/types/timesheet';

interface ApprovalTabProps {}

export const ApprovalTab: React.FC<ApprovalTabProps> = () => {
  const [selectedTimesheets, setSelectedTimesheets] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  // Get timesheets data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['timesheets', 'approval'],
    queryFn: () => timeTrackingApi.getTimesheetsForApproval(),
  });

  // Filter timesheets by status
  const filteredTimesheets = data?.timesheets?.filter(timesheet => {
    if (filterStatus === 'all') return true;
    return timesheet.status === filterStatus;
  }) || [];

  // Handle bulk approval
  const handleBulkApprove = async () => {
    try {
      await timeTrackingApi.approveTimesheets(selectedTimesheets);
      toast({
        title: 'Timesheets approved',
        description: `${selectedTimesheets.length} timesheets have been approved.`,
      });
      setSelectedTimesheets([]);
      refetch();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Approval failed',
        description: 'There was an error approving the timesheets.',
      });
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTimesheets(filteredTimesheets.map(t => t.id));
    } else {
      setSelectedTimesheets([]);
    }
  };

  // Handle select individual
  const handleSelectTimesheet = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTimesheets(prev => [...prev, id]);
    } else {
      setSelectedTimesheets(prev => prev.filter(timesheetId => timesheetId !== id));
    }
  };

  // Group timesheets by date for the approval table
  const timesheetsByDate: Record<string, Timesheet[]> = {};
  
  filteredTimesheets.forEach(timesheet => {
    const dateKey = format(new Date(timesheet.weekEnding), 'yyyy-MM-dd');
    if (!timesheetsByDate[dateKey]) {
      timesheetsByDate[dateKey] = [];
    }
    timesheetsByDate[dateKey].push(timesheet);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Timesheet Approvals</h2>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="mr-2 h-4 w-4" />
                {filterStatus === 'all' ? 'All Statuses' : 
                  filterStatus === 'pending' ? 'Pending' : 'Approved'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('approved')}>
                  Approved
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedTimesheets.length > 0 && (
            <Button 
              size="sm" 
              className="h-8" 
              onClick={handleBulkApprove}
            >
              Approve Selected ({selectedTimesheets.length})
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredTimesheets.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-medium">No timesheets to display</h3>
          <p className="text-muted-foreground">
            {filterStatus === 'all' 
              ? 'There are no timesheets available for approval.' 
              : `There are no ${filterStatus} timesheets.`}
          </p>
          {filterStatus !== 'all' && (
            <Button variant="outline" onClick={() => setFilterStatus('all')}>
              Show All Timesheets
            </Button>
          )}
        </div>
      ) : (
        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="detail">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={
                          filteredTimesheets.length > 0 && 
                          selectedTimesheets.length === filteredTimesheets.length
                        } 
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Week Ending</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTimesheets.map((timesheet) => (
                    <TableRow key={timesheet.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedTimesheets.includes(timesheet.id)} 
                          onCheckedChange={(checked) => 
                            handleSelectTimesheet(timesheet.id, checked === true)
                          }
                          aria-label={`Select timesheet for ${timesheet.employee.firstName} ${timesheet.employee.lastName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{timesheet.employee.firstName} {timesheet.employee.lastName}</div>
                        <div className="text-xs text-muted-foreground">{timesheet.employee.position}</div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(timesheet.weekEnding), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{timesheet.totalHours.toFixed(1)}h</TableCell>
                      <TableCell>
                        <Badge variant={timesheet.status === 'approved' ? 'outline' : 'secondary'}>
                          {timesheet.status === 'approved' ? 'Approved' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {timesheet.submittedDate && 
                          format(new Date(timesheet.submittedDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        {timesheet.status !== 'approved' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              handleSelectTimesheet(timesheet.id, true);
                              handleBulkApprove();
                            }}
                          >
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="detail">
            <div className="space-y-10">
              {Object.entries(timesheetsByDate).map(([date, timesheets]) => (
                <div key={date} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Week Ending: {format(new Date(date), 'MMMM d, yyyy')}
                    </h3>
                    <Badge variant="outline">
                      {timesheets.length} timesheet{timesheets.length !== 1 && 's'}
                    </Badge>
                  </div>
                  <TimesheetApprovalTable 
                    timesheets={timesheets} 
                    onApprove={handleBulkApprove}
                    selectedTimesheets={selectedTimesheets}
                    onSelectTimesheet={handleSelectTimesheet}
                    onSelectAll={handleSelectAll}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
