
import React from 'react';
import { format } from 'date-fns';
import { TaxFilingHistory as TaxHistory } from '@/services/api/payroll/tax-filing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TaxFilingHistoryProps {
  history: TaxHistory[];
  isLoading: boolean;
}

export const TaxFilingHistory: React.FC<TaxFilingHistoryProps> = ({ history, isLoading }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Filed Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="font-medium">{item.formName}</div>
                <div className="text-xs text-muted-foreground">{item.formId}</div>
              </TableCell>
              <TableCell>{item.period}</TableCell>
              <TableCell>
                {item.filedDate ? format(new Date(item.filedDate), 'MMM d, yyyy') : 'Not Filed'}
              </TableCell>
              <TableCell>
                <Badge variant={
                  item.status === 'accepted' ? 'outline' : 
                  item.status === 'pending' ? 'secondary' : 'destructive'
                }>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  {item.filedDate ? 'Download' : 'File Now'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
