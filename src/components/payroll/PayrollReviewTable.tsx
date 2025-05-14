
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface PayrollEmployee {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  position: string;
  employeeType: string;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  otherDeductions: number;
  netPay: number;
}

interface PayrollReviewTableProps {
  employees: PayrollEmployee[];
}

export const PayrollReviewTable: React.FC<PayrollReviewTableProps> = ({ employees }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Gross Pay</TableHead>
            <TableHead>Federal Tax</TableHead>
            <TableHead>State Tax</TableHead>
            <TableHead>SS & Medicare</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead className="text-right">Details</TableHead>
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
                <div>{employee.regularHours}</div>
                {employee.overtimeHours > 0 && (
                  <div className="text-xs text-muted-foreground">+{employee.overtimeHours} OT</div>
                )}
              </TableCell>
              <TableCell>${employee.grossPay.toLocaleString()}</TableCell>
              <TableCell>${employee.federalTax.toLocaleString()}</TableCell>
              <TableCell>${employee.stateTax.toLocaleString()}</TableCell>
              <TableCell>
                <div>${(employee.socialSecurity + employee.medicare).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  SS: ${employee.socialSecurity.toLocaleString()} / Med: ${employee.medicare.toLocaleString()}
                </div>
              </TableCell>
              <TableCell className="font-medium">${employee.netPay.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
