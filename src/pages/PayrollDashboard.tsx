
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle, UserPlus, Calendar, FileText } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PayrollKpiCards } from '@/components/payroll/PayrollKpiCards';
import { PayrollQuickLinks } from '@/components/payroll/PayrollQuickLinks';
import { PayrollUpcomingEvents } from '@/components/payroll/PayrollUpcomingEvents';
import { PayrollRecentActivity } from '@/components/payroll/PayrollRecentActivity';
import { payrollApi } from '@/services/api/payroll';
import { DashboardData } from '@/services/api/payroll';

const PayrollDashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['payrollDashboard'],
    queryFn: () => payrollApi.getDashboardData(),
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
            Failed to load payroll dashboard data. Please try again.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Payroll Dashboard</h1>
            <p className="text-muted-foreground">
              Manage payroll, taxes, and employee compensation
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Run Payroll
            </Button>
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              New Employee
            </Button>
          </div>
        </div>

        <PayrollKpiCards dashboardData={data as DashboardData} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PayrollQuickLinks />
          <PayrollUpcomingEvents events={data?.upcomingEvents} />
          <PayrollRecentActivity activities={data?.recentActivities} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PayrollDashboard;
