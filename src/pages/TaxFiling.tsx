
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, FileCheck, FileWarning, Loader2 } from 'lucide-react';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TaxCalendar } from '@/components/payroll/TaxCalendar';
import { TaxFormUploader } from '@/components/payroll/TaxFormUploader';
import { taxFilingApi } from '@/services/api/payroll/tax-filing';
import { TaxEvent, TaxForm } from '@/services/api/payroll/tax-filing';

const TaxFiling = () => {
  // State for calendar date selection
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedQuarter, setSelectedQuarter] = useState<string>('Q2 2023');
  const [selectedYear, setSelectedYear] = useState<string>('2023');

  // Fetch tax filing data
  const { data: taxFilingData, isLoading } = useQuery({
    queryKey: ['taxFiling', selectedQuarter, selectedYear],
    queryFn: () => taxFilingApi.getTaxFilingData(selectedQuarter, selectedYear),
  });

  // Function to determine badge variant based on status
  const getBadgeVariant = (status: 'completed' | 'pending' | 'overdue') => {
    switch (status) {
      case 'completed':
        return 'outline';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (formType: string, file: File) => {
    console.log(`Uploading ${formType} file:`, file);
    try {
      // In real implementation, this would call the API to upload the file
      await taxFilingApi.uploadTaxForm({
        formType,
        file,
        year: selectedYear,
        quarter: selectedQuarter
      });
      
      // Success message and refetch data would be here
    } catch (error) {
      console.error('Error uploading file:', error);
      // Error handling would be here
    }
  };

  // Handle quarter change
  const handleQuarterChange = (quarter: string) => {
    setSelectedQuarter(quarter);
  };

  // Handle year change
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tax Filing</h1>
          <p className="text-muted-foreground">
            Manage your tax forms, filings, and deadlines
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Tax Calendar</CardTitle>
              <CardDescription>Upcoming tax deadlines and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  components={{
                    DayContent: (props) => {
                      // This would normally check if the day has a tax event
                      const hasEvent = taxFilingData?.events?.some(
                        (event) => format(new Date(event.date), 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
                      );
                      
                      return (
                        <div className="relative flex h-8 w-8 items-center justify-center">
                          {props.children}
                          {hasEvent && (
                            <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <TaxCalendar events={taxFilingData?.events || []} />
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Tax Forms</CardTitle>
                  <CardDescription>Upload and manage your tax forms</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedQuarter} / {selectedYear}
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="forms" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="forms">Required Forms</TabsTrigger>
                  <TabsTrigger value="history">Filing History</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="forms" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {taxFilingData?.forms?.map((form: TaxForm) => (
                      <div key={form.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{form.name}</h3>
                            <p className="text-sm text-muted-foreground">{form.description}</p>
                          </div>
                          <Badge variant={getBadgeVariant(form.status)}>
                            {form.status === 'completed' ? 'Filed' : form.status === 'pending' ? 'Due Soon' : 'Overdue'}
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Due: {format(new Date(form.dueDate), 'MMMM d, yyyy')}</span>
                            </div>
                          </div>
                          {form.status === 'completed' ? (
                            <Button variant="outline" size="sm" className="ml-auto">
                              <FileCheck className="mr-2 h-4 w-4" />
                              View Filed Form
                            </Button>
                          ) : (
                            <TaxFormUploader formType={form.id} onUpload={handleFileUpload} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
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
                        {taxFilingData?.history?.map((item) => (
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
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Liabilities</CardTitle>
            <CardDescription>Your current tax liabilities and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : taxFilingData?.liabilities ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${taxFilingData.liabilities.federal.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Federal Taxes</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${taxFilingData.liabilities.state.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">State Taxes</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${taxFilingData.liabilities.fica.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">FICA (SS & Medicare)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${taxFilingData.liabilities.total.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total Liabilities</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
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
                      {taxFilingData.payments.map((payment) => (
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
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <FileWarning className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">No Tax Liabilities Found</h3>
                <p className="text-muted-foreground max-w-md">
                  There are no tax liabilities to display for the selected period.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TaxFiling;
