
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, UserPlus, Search, Filter, User } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { employeeApi } from '@/services/api/employee';
import { EmployeeTable } from '@/components/payroll/EmployeeTable';

const EmployeeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeType, setEmployeeType] = useState('all');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['employees', employeeType],
    queryFn: () => employeeApi.getEmployees(employeeType),
  });

  // Filter employees based on search term
  const filteredEmployees = data?.employees?.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          <AlertDescription>Failed to load employees. Please try again.</AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Employee Management</h1>
            <p className="text-muted-foreground">
              Manage your workforce and employee details
            </p>
          </div>
          <Button onClick={() => navigate('/dashboard/payroll/employees/new')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Badge 
                  variant={employeeType === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setEmployeeType('all')}
                >
                  All
                </Badge>
                <Badge 
                  variant={employeeType === 'W2' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setEmployeeType('W2')}
                >
                  W-2
                </Badge>
                <Badge 
                  variant={employeeType === '1099' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setEmployeeType('1099')}
                >
                  1099
                </Badge>
              </div>
            </div>

            <div className="mt-6">
              {filteredEmployees.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/20 p-8 text-center">
                  <User className="mb-2 h-8 w-8 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No employees found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm 
                      ? "Try adjusting your search terms"
                      : "Add employees to get started with payroll"
                    }
                  </p>
                </div>
              ) : (
                <EmployeeTable employees={filteredEmployees} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
