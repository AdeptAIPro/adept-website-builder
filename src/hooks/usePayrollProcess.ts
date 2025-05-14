
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { payrollProcessingApi } from '@/services/api/payroll/processing';
import { employeeApi } from '@/services/api/employee';
import { PayrollFormValues } from '@/components/payroll/PayrollSetupStep';

export const usePayrollProcess = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'review' | 'confirmation'>('setup');
  const [payrollData, setPayrollData] = useState<any>(null);
  const [formValues, setFormValues] = useState<PayrollFormValues>({
    payPeriodStart: new Date(),
    payPeriodEnd: new Date(),
    payDate: new Date(),
    confirmPayroll: false,
  });

  const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['employees', 'active'],
    queryFn: () => employeeApi.getEmployees('active'),
    enabled: step === 'setup',
  });

  const calculatePayrollMutation = useMutation({
    mutationFn: (data: PayrollFormValues) => payrollProcessingApi.getPayrollData(
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
    mutationFn: () => payrollProcessingApi.processPayrun({
      ...payrollData,
      payDate: format(formValues.payDate, 'yyyy-MM-dd'),
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

  const handleSetupSubmit = (data: PayrollFormValues) => {
    setFormValues(data);
    calculatePayrollMutation.mutate(data);
  };

  const handleReviewSubmit = () => {
    runPayrollMutation.mutate();
  };

  return {
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
  };
};
