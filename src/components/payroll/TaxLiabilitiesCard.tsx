
import React from 'react';
import { format } from 'date-fns';
import { FileWarning, Loader2 } from 'lucide-react';
import { TaxLiabilities, TaxPayment } from '@/services/api/payroll/tax-filing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TaxLiabilitiesCardProps {
  liabilities?: TaxLiabilities;
  payments?: TaxPayment[];
  isLoading: boolean;
}

export const TaxLiabilitiesCard: React.FC<TaxLiabilitiesCardProps> = ({ liabilities, payments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!liabilities) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <FileWarning className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg">No Tax Liabilities Found</h3>
        <p className="text-muted-foreground max-w-md">
          There are no tax liabilities to display for the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">${liabilities.federal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Federal Taxes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">${liabilities.state.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">State Taxes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                ${(liabilities.breakdown.socialSecurityTax + liabilities.breakdown.medicareTax).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">FICA (SS & Medicare)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">${liabilities.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total Liabilities</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {payments && payments.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-medium">{payment.taxType}</div>
                    <div className="text-xs text-muted-foreground">{payment.period}</div>
                  </TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(payment.dueDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={payment.paid ? 'outline' : 'secondary'}>
                      {payment.paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!payment.paid && (
                      <Button variant="ghost" size="sm">
                        Pay Now
                      </Button>
                    )}
                    {payment.paid && (
                      <Button variant="ghost" size="sm">
                        View Receipt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
