
import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Clock, Eye, X } from 'lucide-react';

interface TimesheetEmployee {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  position: string;
  department: string;
}

interface Timesheet {
  id: string;
  employee: TimesheetEmployee;
  weekStarting: string;
  submittedDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalHours: number;
}

interface TimesheetApprovalTableProps {
  timesheets: Timesheet[];
  onApprove: (timesheetId: string) => void;
  isApproving: boolean;
}

export const TimesheetApprovalTable: React.FC<TimesheetApprovalTableProps> = ({
  timesheets,
  onApprove,
  isApproving,
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Week Starting</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Regular Hours</TableHead>
          <TableHead>Overtime</TableHead>
          <TableHead>Total Hours</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timesheets.map((timesheet) => (
          <TableRow key={timesheet.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={timesheet.employee.avatar} alt={`${timesheet.employee.firstName} ${timesheet.employee.lastName}`} />
                  <AvatarFallback>{getInitials(timesheet.employee.firstName, timesheet.employee.lastName)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`${timesheet.employee.firstName} ${timesheet.employee.lastName}`}</div>
                  <div className="text-xs text-muted-foreground">{timesheet.employee.position}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{format(new Date(timesheet.weekStarting), 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(new Date(timesheet.submittedDate), 'MMM d, yyyy')}</TableCell>
            <TableCell>{getStatusBadge(timesheet.status)}</TableCell>
            <TableCell>{timesheet.totalRegularHours}</TableCell>
            <TableCell>{timesheet.totalOvertimeHours}</TableCell>
            <TableCell className="font-medium">{timesheet.totalHours}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                {timesheet.status === 'submitted' && (
                  <>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onApprove(timesheet.id)}
                      disabled={isApproving}
                    >
                      {isApproving ? (
                        <Clock className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="mr-1 h-4 w-4" />
                      )}
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
