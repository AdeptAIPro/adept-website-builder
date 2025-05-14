
import React from 'react';
import { format } from 'date-fns';
import { Loader2, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PayrollFormValues, payrollFormSchema } from './PayrollSetupStep';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField } from '@/components/ui/form';
import { PayrollReviewTable } from '@/components/payroll/PayrollReviewTable';
import { PayrollSummary } from '@/components/payroll/PayrollSummary';

interface PayrollReviewStepProps {
  formValues: PayrollFormValues;
  payrollData: any;
  onBack: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export const PayrollReviewStep: React.FC<PayrollReviewStepProps> = ({
  formValues,
  payrollData,
  onBack,
  onSubmit,
  isProcessing,
}) => {
  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: {
      ...formValues
    },
  });

  return (
    <div className="space-y-8">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="detail">Employee Details</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary</CardTitle>
              <CardDescription>
                Review the payroll totals before processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayrollSummary data={payrollData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
              <CardDescription>
                Review individual employee payroll data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayrollReviewTable employees={payrollData.employees} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Confirmation</CardTitle>
          <CardDescription>
            Please review and confirm the payroll details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Pay Period</h3>
              <p className="text-sm">
                {format(formValues.payPeriodStart, 'PP')} - {format(formValues.payPeriodEnd, 'PP')}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Pay Date</h3>
              <p className="text-sm">
                {format(formValues.payDate, 'PP')}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Amount</h3>
              <p className="text-sm font-bold">
                ${payrollData.totals.netPay.toLocaleString()}
              </p>
            </div>
          </div>

          <Form {...form}>
            <FormField
              control={form.control}
              name="confirmPayroll"
              render={({ field }) => (
                <div className="rounded-lg border p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmPayroll"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="confirmPayroll"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm that the payroll information is correct
                      </label>
                      <p className="text-xs text-muted-foreground">
                        By checking this box, you confirm that you have reviewed all payroll data and authorize the system to process payments.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!form.getValues().confirmPayroll || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Process Payroll
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
