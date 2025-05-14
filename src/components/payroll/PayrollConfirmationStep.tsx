
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, DollarSign, FileText, User } from 'lucide-react';
import { PayrollFormValues } from './PayrollSetupStep';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PayrollConfirmationStepProps {
  formValues: PayrollFormValues;
  payrollData: any;
  onGenerateReports: () => void;
  onReturnToDashboard: () => void;
}

export const PayrollConfirmationStep: React.FC<PayrollConfirmationStepProps> = ({
  formValues,
  payrollData,
  onGenerateReports,
  onReturnToDashboard,
}) => {
  return (
    <Card className="border-green-500">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-green-500/20 p-3">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Payroll Successfully Processed</h2>
          <p className="text-muted-foreground">
            The payroll has been processed and will be disbursed on {format(formValues.payDate, 'PPP')}
          </p>

          <div className="grid w-full gap-4 pt-6 md:grid-cols-3">
            <Card className="flex flex-col items-center justify-center p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-2 text-lg font-medium">{payrollData?.employees?.length || 0}</h3>
              <p className="text-xs text-muted-foreground">Employees Paid</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-2 text-lg font-medium">${payrollData?.totals?.netPay.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground">Total Disbursed</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-2 text-lg font-medium">${payrollData?.totals?.totalTaxes.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground">Taxes Withheld</p>
            </Card>
          </div>

          <div className="mt-6 w-full space-y-4 pt-4">
            <Button
              className="w-full"
              onClick={onGenerateReports}
            >
              Generate Payroll Reports
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onReturnToDashboard}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
