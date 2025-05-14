
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { 
  ArrowLeft, 
  Calendar, 
  Loader2, 
  Check, 
  AlertCircle, 
  CheckCircle2,
  User,
  DollarSign,
  FileText,
  Lock 
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { payrollApi } from '@/services/api/payroll';
import { toast } from '@/hooks/use-toast';
import { PayrollReviewTable } from '@/components/payroll/PayrollReviewTable';
import { PayrollSummary } from '@/components/payroll/PayrollSummary';

const formSchema = z.object({
  payPeriodStart: z.date({
    required_error: 'Pay period start date is required.',
  }),
  payPeriodEnd: z.date({
    required_error: 'Pay period end date is required.',
  }),
  payDate: z.date({
    required_error: 'Pay date is required.',
  }),
  confirmPayroll: z.boolean().refine((value) => value === true, {
    message: 'You must confirm the payroll details before proceeding.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const RunPayroll: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'review' | 'confirmation'>('setup');
  const [payrollData, setPayrollData] = useState<any>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payPeriodStart: new Date(),
      payPeriodEnd: addDays(new Date(), 13), // Default to biweekly
      payDate: addDays(new Date(), 15),
      confirmPayroll: false,
    },
  });

  const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['employees', 'active'],
    queryFn: () => employeeApi.getEmployees('active'),
    enabled: step === 'setup',
  });

  const calculatePayrollMutation = useMutation({
    mutationFn: (data: FormValues) => payrollApi.getPayrollData(
      format(data.payPeriodStart, 'yyyy-MM-dd'),
      format(data.payPeriodEnd, 'yyyy-MM-dd')
    ),
    onSuccess: (data) => {
      setPayrollData(data);
      setStep('review');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to calculate payroll',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const runPayrollMutation = useMutation({
    mutationFn: () => payrollApi.processPayrun({
      ...payrollData,
      payDate: format(form.getValues().payDate, 'yyyy-MM-dd'),
    }),
    onSuccess: () => {
      setStep('confirmation');
      toast({
        title: 'Payroll Processed',
        description: 'The payroll has been successfully processed.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to process payroll',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const onSetupSubmit = (data: FormValues) => {
    calculatePayrollMutation.mutate(data);
  };

  const onReviewSubmit = () => {
    runPayrollMutation.mutate();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard/payroll')} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Run Payroll</h1>
            <p className="text-muted-foreground">
              Process payroll for your employees
            </p>
          </div>
        </div>

        {step === 'setup' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSetupSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Period</CardTitle>
                  <CardDescription>
                    Define the period for this payroll run
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="payPeriodStart"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Period Start</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payPeriodEnd"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Period End</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Pay Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">
                          {isLoadingEmployees
                            ? 'Loading employees...'
                            : `${employeesData?.employees?.length || 0} active employees included`}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          All active employees will be included in this payroll run
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/payroll')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={calculatePayrollMutation.isPending}>
                  {calculatePayrollMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    'Continue to Review'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 'review' && payrollData && (
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
                      {format(form.getValues().payPeriodStart, 'PP')} - {format(form.getValues().payPeriodEnd, 'PP')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Pay Date</h3>
                    <p className="text-sm">
                      {format(form.getValues().payDate, 'PP')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Amount</h3>
                    <p className="text-sm font-bold">
                      ${payrollData.totals.netPay.toLocaleString()}
                    </p>
                  </div>
                </div>

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
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('setup')}
              >
                Back
              </Button>
              <Button
                onClick={onReviewSubmit}
                disabled={!form.getValues().confirmPayroll || runPayrollMutation.isPending}
              >
                {runPayrollMutation.isPending ? (
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
        )}

        {step === 'confirmation' && (
          <Card className="border-green-500">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-green-500/20 p-3">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Payroll Successfully Processed</h2>
                <p className="text-muted-foreground">
                  The payroll has been processed and will be disbursed on {format(form.getValues().payDate, 'PPP')}
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
                    onClick={() => navigate('/dashboard/payroll/reports')}
                  >
                    Generate Payroll Reports
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/dashboard/payroll')}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RunPayroll;
