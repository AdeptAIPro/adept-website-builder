
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { PayrollSetupStep } from '@/components/payroll/PayrollSetupStep';
import { PayrollReviewStep } from '@/components/payroll/PayrollReviewStep';
import { PayrollConfirmationStep } from '@/components/payroll/PayrollConfirmationStep';
import { usePayrollProcess } from '@/hooks/usePayrollProcess';

const RunPayroll: React.FC = () => {
  const {
    step,
    payrollData,
    formValues,
    employeesData,
    isLoadingEmployees,
    calculatePayrollMutation,
    runPayrollMutation,
    handleSetupSubmit,
    handleReviewSubmit,
    setStep,
    navigate,
  } = usePayrollProcess();

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
          <PayrollSetupStep
            onSubmit={handleSetupSubmit}
            isCalculating={calculatePayrollMutation.isPending}
            employeesCount={employeesData?.employees?.length}
            isLoadingEmployees={isLoadingEmployees}
            onCancel={() => navigate('/dashboard/payroll')}
          />
        )}

        {step === 'review' && payrollData && (
          <PayrollReviewStep
            formValues={formValues}
            payrollData={payrollData}
            onBack={() => setStep('setup')}
            onSubmit={handleReviewSubmit}
            isProcessing={runPayrollMutation.isPending}
          />
        )}

        {step === 'confirmation' && payrollData && (
          <PayrollConfirmationStep
            formValues={formValues}
            payrollData={payrollData}
            onGenerateReports={() => navigate('/dashboard/payroll/reports')}
            onReturnToDashboard={() => navigate('/dashboard/payroll')}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default RunPayroll;
