
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Loader2,
  Check,
  AlertCircle,
  FileText,
  Upload,
  Download,
  Clipboard,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TaxCalendar } from '@/components/payroll/TaxCalendar';
import { TaxFormUploader } from '@/components/payroll/TaxFormUploader';
import { payrollApi, TaxEvent } from '@/services/api/payroll';

const TaxFiling: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.floor((new Date().getMonth() / 3) + 1)
  );
  
  // Fetch tax filing data
  const { data, isLoading, error } = useQuery({
    queryKey: ['taxFiling', selectedYear, selectedQuarter],
    queryFn: () => payrollApi.getTaxFilingData(selectedYear.toString(), selectedQuarter.toString()),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load tax filing data. Please try again.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const { taxForms, taxDeadlines, taxLiabilities } = data || { taxForms: [], taxDeadlines: [], taxLiabilities: {} };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard/payroll')} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tax Filing</h1>
            <p className="text-muted-foreground">
              Manage tax forms, deadlines, and compliance
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
              <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
              <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
            </select>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(parseInt(e.target.value))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value={1}>Q1 (Jan-Mar)</option>
              <option value={2}>Q2 (Apr-Jun)</option>
              <option value={3}>Q3 (Jul-Sep)</option>
              <option value={4}>Q4 (Oct-Dec)</option>
            </select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Tax Form
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Tax Form</DialogTitle>
                <DialogDescription>
                  Select the form type and upload the corresponding document
                </DialogDescription>
              </DialogHeader>
              <TaxFormUploader />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Tax Calendar</TabsTrigger>
            <TabsTrigger value="forms">Tax Forms</TabsTrigger>
            <TabsTrigger value="liabilities">Tax Liabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tax Filing Calendar</CardTitle>
                <CardDescription>Upcoming tax deadlines and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <TaxCalendar 
                  events={taxDeadlines} 
                  year={selectedYear} 
                  quarter={selectedQuarter} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tax Forms</CardTitle>
                <CardDescription>View and manage tax form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {taxForms.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/20 p-8 text-center">
                    <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No tax forms</h3>
                    <p className="text-sm text-muted-foreground">
                      No tax forms are available for the selected period
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {taxForms.map((form: any) => (
                      <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(form.status)}
                            <div>
                              <h3 className="text-sm font-medium">{form.formName}</h3>
                              <p className="text-xs text-muted-foreground">
                                Due: {form.dueDate} • For period: {form.period}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(form.status)}
                            <Button variant="outline" size="sm">
                              <Download className="mr-1 h-4 w-4" />
                              {form.status === 'completed' ? 'View' : 'Template'}
                            </Button>
                            {form.status !== 'completed' && (
                              <Button size="sm">
                                <Upload className="mr-1 h-4 w-4" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liabilities" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tax Liabilities Summary</CardTitle>
                <CardDescription>Current tax payment obligations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Federal Taxes</p>
                            <p className="text-2xl font-bold">${taxLiabilities.federal?.toLocaleString()}</p>
                          </div>
                          <div className="rounded-full bg-primary/10 p-3">
                            <Clipboard className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">State Taxes</p>
                            <p className="text-2xl font-bold">${taxLiabilities.state?.toLocaleString()}</p>
                          </div>
                          <div className="rounded-full bg-primary/10 p-3">
                            <Clipboard className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Total Liabilities</p>
                            <p className="text-2xl font-bold">${taxLiabilities.total?.toLocaleString()}</p>
                          </div>
                          <div className="rounded-full bg-primary/10 p-3">
                            <Clipboard className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Quarterly Tax Breakdown</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Federal Income Tax Withholding</p>
                          <p className="text-xs text-muted-foreground">Form 941, Line 3</p>
                        </div>
                        <p className="text-sm font-medium">${taxLiabilities.breakdown?.federalIncomeTax?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Social Security Tax</p>
                          <p className="text-xs text-muted-foreground">Form 941, Line 5a</p>
                        </div>
                        <p className="text-sm font-medium">${taxLiabilities.breakdown?.socialSecurityTax?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Medicare Tax</p>
                          <p className="text-xs text-muted-foreground">Form 941, Line 5c</p>
                        </div>
                        <p className="text-sm font-medium">${taxLiabilities.breakdown?.medicareTax?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">State Unemployment Tax (SUTA)</p>
                          <p className="text-xs text-muted-foreground">State Form</p>
                        </div>
                        <p className="text-sm font-medium">${taxLiabilities.breakdown?.suta?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Federal Unemployment Tax (FUTA)</p>
                          <p className="text-xs text-muted-foreground">Form 940</p>
                        </div>
                        <p className="text-sm font-medium">${taxLiabilities.breakdown?.futa?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TaxFiling;
