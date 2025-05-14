
import React from 'react';
import { UserPlus, FileText, Calendar, CreditCard, FileSearch, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const PayrollQuickLinks: React.FC = () => {
  const quickLinks = [
    {
      title: 'Add Employee',
      description: 'Create a new employee profile',
      icon: <UserPlus className="h-5 w-5" />,
      href: '/dashboard/payroll/employees/new',
    },
    {
      title: 'Run Payroll',
      description: 'Process next payroll cycle',
      icon: <Calendar className="h-5 w-5" />,
      href: '/dashboard/payroll/run',
    },
    {
      title: 'View Reports',
      description: 'Access financial summaries',
      icon: <FileSearch className="h-5 w-5" />,
      href: '/dashboard/payroll/reports',
    },
    {
      title: 'Direct Deposit',
      description: 'Manage payment methods',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/payroll/direct-deposit',
    },
    {
      title: 'Tax Forms',
      description: 'View and submit tax documents',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/payroll/tax-filing',
    },
    {
      title: 'Settings',
      description: 'Configure payroll preferences',
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/payroll/settings',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>Frequently used payroll actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.href}
              className="flex flex-col items-center justify-center rounded-md border border-border p-3 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="mb-2 rounded-full bg-primary/10 p-2">
                {link.icon}
              </div>
              <div className="text-sm font-medium">{link.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{link.description}</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
