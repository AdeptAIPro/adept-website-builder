
import React from 'react';
import { Users, Calendar, FileText, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PayrollKpiCardsProps {
  dashboardData: any;
}

export const PayrollKpiCards: React.FC<PayrollKpiCardsProps> = ({ dashboardData }) => {
  if (!dashboardData) return null;

  const {
    totalEmployees,
    activeEmployees,
    nextPayrollDate,
    nextPayrollAmount,
    pendingTaxForms,
    pendingApprovals,
  } = dashboardData;

  const kpiCards = [
    {
      title: 'Employees',
      value: totalEmployees,
      description: `${activeEmployees} active`,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Next Payroll',
      value: nextPayrollDate,
      description: `$${nextPayrollAmount.toLocaleString()} estimated`,
      icon: <Calendar className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Pending Filings',
      value: pendingTaxForms,
      description: 'Tax forms need attention',
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals,
      description: 'Timesheets to review',
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiCards.map((card, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
