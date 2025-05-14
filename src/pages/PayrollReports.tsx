
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Loader2,
  Download,
  BarChart,
  Calendar,
  DollarSign,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PayrollSummaryChart } from '@/components/payroll/PayrollSummaryChart';
import { payrollApi } from '@/services/api/payroll';
import { format } from 'date-fns';

const PayrollReports: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.floor((new Date().getMonth() / 3) + 1)
  );
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch reports data
  const { data, isLoading, error } = useQuery({
    queryKey: ['payrollReports', selectedYear, selectedQuarter],
    queryFn: () => payrollApi.getReportsData(selectedYear.toString(), selectedQuarter.toString()),
  });

  const handleDownload = (reportId: string, fileFormat: 'pdf' | 'csv' | 'excel') => {
    // In a real app, this would trigger a download from the API
    console.log(`Downloading report ${reportId} in ${fileFormat} format`);
  };

  const filteredReports = data?.reports.filter(
    (report: any) => report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Failed to load reports data. Please try again.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard/payroll')} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Payroll Reports</h1>
            <p className="text-muted-foreground">
              Access and export detailed payroll reports
            </p>
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="reports">Available Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                  <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
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
                  <option value={0}>Full Year</option>
                </select>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Summary
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Gross Pay</p>
                      <p className="text-2xl font-bold">${data?.summary.totalGrossPay.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Taxes</p>
                      <p className="text-2xl font-bold">${data?.summary.totalTaxes.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Net Pay</p>
                      <p className="text-2xl font-bold">${data?.summary.totalNetPay.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pay Periods</p>
                      <p className="text-2xl font-bold">{data?.summary.payPeriods}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Trends</CardTitle>
                <CardDescription>Gross pay, taxes, and net pay over time</CardDescription>
              </CardHeader>
              <CardContent>
                {data?.chartData && <PayrollSummaryChart data={data.chartData} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Payroll costs by department</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Gross Pay</TableHead>
                      <TableHead>Taxes</TableHead>
                      <TableHead>Benefits</TableHead>
                      <TableHead>Net Pay</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.departmentBreakdown.map((dept: any) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.employees}</TableCell>
                        <TableCell>${dept.grossPay.toLocaleString()}</TableCell>
                        <TableCell>${dept.taxes.toLocaleString()}</TableCell>
                        <TableCell>${dept.benefits.toLocaleString()}</TableCell>
                        <TableCell>${dept.netPay.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {selectedYear}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedYear(new Date().getFullYear() - 1)}>
                      {new Date().getFullYear() - 1}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedYear(new Date().getFullYear())}>
                      {new Date().getFullYear()}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>
                  Standard and generated payroll reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports?.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/20 p-8 text-center">
                    <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No reports found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm 
                        ? "Try adjusting your search terms"
                        : "No reports available for the selected period"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredReports?.map((report: any) => (
                      <div key={report.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <h3 className="text-sm font-medium">{report.title}</h3>
                              {report.category && (
                                <Badge variant="outline">{report.category}</Badge>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {report.description} • Generated: {report.generatedDate}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDownload(report.id, 'pdf')}>
                                  PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, 'csv')}>
                                  CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, 'excel')}>
                                  Excel
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Create tailored reports with specific data points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reportName">Report Name</Label>
                      <Input
                        id="reportName"
                        placeholder="Enter report name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportType">Report Type</Label>
                      <select
                        id="reportType"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="payroll">Payroll Summary</option>
                        <option value="employee">Employee Detail</option>
                        <option value="tax">Tax Summary</option>
                        <option value="department">Department Analysis</option>
                        <option value="custom">Custom Report</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-xs text-muted-foreground">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          defaultValue={format(new Date(), 'yyyy-MM-01')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate" className="text-xs text-muted-foreground">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          defaultValue={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Fields</Label>
                    <div className="rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {['Employee Name', 'Employee ID', 'Department', 'Position', 'Pay Rate', 'Regular Hours', 'Overtime Hours', 'Gross Pay', 'Federal Tax', 'State Tax', 'Social Security', 'Medicare', 'Benefits', 'Net Pay', 'Pay Date'].map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`field-${field.replace(/\s+/g, '-').toLowerCase()}`}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={`field-${field.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Grouping & Sorting</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="groupBy" className="text-xs text-muted-foreground">Group By</Label>
                        <select
                          id="groupBy"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="none">No Grouping</option>
                          <option value="department">Department</option>
                          <option value="pay_period">Pay Period</option>
                          <option value="employee_type">Employee Type</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sortBy" className="text-xs text-muted-foreground">Sort By</Label>
                        <select
                          id="sortBy"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="employee_name">Employee Name</option>
                          <option value="department">Department</option>
                          <option value="gross_pay">Gross Pay</option>
                          <option value="net_pay">Net Pay</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Save Report Template</Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saved Report Templates</CardTitle>
                <CardDescription>Custom reports you've saved for reuse</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.savedReportTemplates.map((template: any) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>{template.createdDate}</TableCell>
                        <TableCell>{template.lastRunDate || 'Never'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Run Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PayrollReports;
