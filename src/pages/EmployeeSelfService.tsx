
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  CreditCard,
  User,
  Clock,
  Download,
  ExternalLink,
  Calendar,
  DollarSign,
  BarChart,
  CheckCircle,
  X,
  Search,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { payrollApi } from '@/services/api/payroll';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const EmployeeSelfService: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch employee self-service data
  const { data, isLoading } = useQuery({
    queryKey: ['employeeSelfService'],
    queryFn: () => payrollApi.getEmployeeSelfServiceData(),
  });

  const filteredPayslips = data?.payslips.filter(
    (payslip: any) => payslip.payPeriod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Employee Self-Service</h1>
            <p className="text-muted-foreground">
              Manage your personal information, payslips, and tax forms
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-5 w-28 rounded-md bg-muted"></div>
                  <div className="h-4 w-36 rounded-md bg-muted"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-12 w-full rounded-md bg-muted"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Year-to-Date Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${data?.ytdEarnings.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Available PTO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.availablePto} hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Next Pay Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.nextPayDate}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="taxForms">Tax Forms</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      View and update your personal details
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={data?.profile.avatar} alt={data?.profile.name} />
                      <AvatarFallback>{data?.profile.initials}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Full Name</h4>
                        <p className="text-sm">{data?.profile.name}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Email</h4>
                        <p className="text-sm">{data?.profile.email}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Phone</h4>
                        <p className="text-sm">{data?.profile.phone}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Date of Birth</h4>
                        <p className="text-sm">{data?.profile.dateOfBirth}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">SSN</h4>
                        <p className="text-sm">{data?.profile.ssn}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium">Employee ID</h4>
                        <p className="text-sm">{data?.profile.employeeId}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Address</h4>
                      <p className="text-sm">{data?.profile.address.street}</p>
                      <p className="text-sm">
                        {data?.profile.address.city}, {data?.profile.address.state} {data?.profile.address.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium">{data?.employment.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Position</span>
                    <span className="text-sm font-medium">{data?.employment.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Manager</span>
                    <span className="text-sm font-medium">{data?.employment.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="text-sm font-medium">{data?.employment.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Employee Type</span>
                    <span className="text-sm font-medium">{data?.employment.employeeType}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Direct Deposit</CardTitle>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.directDeposit.accounts.map((account: any) => (
                      <div key={account.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{account.bankName}</p>
                              <p className="text-xs text-muted-foreground">
                                {account.accountType} •••• {account.accountLast4}
                              </p>
                            </div>
                          </div>
                          <Badge>{account.routingPercent}%</Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payslips" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payslips</CardTitle>
                    <CardDescription>
                      Access your historical pay statements
                    </CardDescription>
                  </div>
                  <div className="relative w-60">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payslips..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {filteredPayslips?.map((payslip: any) => (
                    <div key={payslip.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{payslip.payPeriod}</p>
                          <p className="text-xs text-muted-foreground">
                            Paid on {payslip.payDate} • Net Pay: ${payslip.netPay}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pay Summary</CardTitle>
                <CardDescription>Year-to-date earnings and deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Earnings</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Regular Earnings</span>
                        <span className="text-sm font-medium">${data?.paySummary.regularEarnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Overtime Earnings</span>
                        <span className="text-sm font-medium">${data?.paySummary.overtimeEarnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Bonuses</span>
                        <span className="text-sm font-medium">${data?.paySummary.bonuses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Other Earnings</span>
                        <span className="text-sm font-medium">${data?.paySummary.otherEarnings.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Gross Earnings</span>
                        <span className="text-sm font-bold">${data?.paySummary.totalGross.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Deductions & Taxes</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Federal Income Tax</span>
                        <span className="text-sm font-medium">${data?.paySummary.federalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">State Income Tax</span>
                        <span className="text-sm font-medium">${data?.paySummary.stateTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Social Security</span>
                        <span className="text-sm font-medium">${data?.paySummary.socialSecurity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Medicare</span>
                        <span className="text-sm font-medium">${data?.paySummary.medicare.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Retirement 401(k)</span>
                        <span className="text-sm font-medium">${data?.paySummary.retirement.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Health Insurance</span>
                        <span className="text-sm font-medium">${data?.paySummary.healthInsurance.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Deductions</span>
                        <span className="text-sm font-bold">${data?.paySummary.totalDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                <span className="text-sm font-medium">Net Pay YTD</span>
                <span className="text-lg font-bold">${data?.paySummary.netPayYtd.toLocaleString()}</span>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="taxForms" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tax Forms</CardTitle>
                <CardDescription>
                  Access and download your tax documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {data?.taxForms.map((form: any) => (
                    <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{form.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {form.year} • Generated: {form.generatedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Withholding</CardTitle>
                <CardDescription>Update your tax withholding preferences (W-4)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Federal W-4 Form</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Last updated: {data?.taxWithholding.federalW4LastUpdated}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Filing Status</h4>
                      <p className="text-sm">{data?.taxWithholding.filingStatus}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Allowances</h4>
                      <p className="text-sm">{data?.taxWithholding.allowances}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Additional Withholding</h4>
                      <p className="text-sm">${data?.taxWithholding.additionalWithholding}/paycheck</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Tax Exempt</h4>
                      <p className="text-sm">{data?.taxWithholding.taxExempt ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">State Tax Withholding</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        State: {data?.taxWithholding.state}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Health Insurance</CardTitle>
                  <CardDescription>Medical, dental, and vision</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Medical Plan</p>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {data?.benefits.healthPlan.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span>Coverage: {data?.benefits.healthPlan.coverage}</span>
                      <span>${data?.benefits.healthPlan.costPerPaycheck}/paycheck</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${data?.benefits.dentalPlan ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className="text-sm">Dental Plan</span>
                      </div>
                      <span className="text-xs">${data?.benefits.dentalPlan?.costPerPaycheck || '0'}/paycheck</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${data?.benefits.visionPlan ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className="text-sm">Vision Plan</span>
                      </div>
                      <span className="text-xs">${data?.benefits.visionPlan?.costPerPaycheck || '0'}/paycheck</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Retirement</CardTitle>
                  <CardDescription>401(k) plan details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Current Contribution</p>
                        <p className="text-sm font-medium">{data?.benefits.retirement.contributionPercent}%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Employer Match</p>
                        <p className="text-sm font-medium">{data?.benefits.retirement.employerMatchPercent}%</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">YTD Contribution</p>
                        <p className="text-sm font-medium">${data?.benefits.retirement.ytdContribution}</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Total Balance</p>
                        <p className="text-lg font-bold">${data?.benefits.retirement.balance}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Last updated: {data?.benefits.retirement.lastUpdated}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    Update Contribution
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Time Off</CardTitle>
                  <CardDescription>PTO and leave tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">PTO Balance</p>
                      <p className="text-lg font-bold">{data?.benefits.timeOff.ptoBalance} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sick Leave Balance</p>
                      <p className="text-lg font-bold">{data?.benefits.timeOff.sickLeaveBalance} hours</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Upcoming Time Off</h4>
                    {data?.benefits.timeOff.upcoming.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No upcoming time off scheduled</p>
                    ) : (
                      <div className="space-y-2">
                        {data?.benefits.timeOff.upcoming.map((timeOff: any) => (
                          <div key={timeOff.id} className="rounded-lg border p-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{timeOff.type}</p>
                                <p className="text-xs">{timeOff.dates}</p>
                              </div>
                              <Badge variant="outline">{timeOff.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    Request Time Off
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Additional Benefits</CardTitle>
                <CardDescription>Other available employee benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {data?.benefits.additionalBenefits.map((benefit: any) => (
                    <div key={benefit.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            {benefit.enrolled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{benefit.name}</p>
                            <p className="text-xs text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {benefit.enrolled ? 'Manage' : 'Enroll'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeSelfService;
