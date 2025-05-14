
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, MoreHorizontal, Trash, FileText, CreditCard, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  position: string;
  department: string;
  employeeType: 'W2' | '1099';
  status: 'active' | 'inactive' | 'onboarding';
  startDate: string;
  salary?: number;
  hourlyRate?: number;
}

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'onboarding':
        return <Badge className="bg-amber-500">Onboarding</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Compensation</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                  <AvatarFallback>{getInitials(employee.firstName, employee.lastName)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`${employee.firstName} ${employee.lastName}`}</div>
                  <div className="text-xs text-muted-foreground">{employee.position}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{employee.employeeType}</Badge>
            </TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{new Date(employee.startDate).toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(employee.status)}</TableCell>
            <TableCell>
              {employee.salary
                ? `$${employee.salary.toLocaleString()}/year`
                : employee.hourlyRate
                ? `$${employee.hourlyRate.toFixed(2)}/hour`
                : '-'}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/payroll/employees/${employee.id}`)}>
                    <User className="mr-2 h-4 w-4" /> View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/payroll/employees/${employee.id}/edit`)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/payroll/employees/${employee.id}/taxes`)}>
                    <FileText className="mr-2 h-4 w-4" /> Tax Forms
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/payroll/employees/${employee.id}/bank`)}>
                    <CreditCard className="mr-2 h-4 w-4" /> Direct Deposit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
