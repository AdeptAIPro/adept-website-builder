
import { payrollDashboardApi } from './dashboard';
import { payrollProcessingApi } from './processing';
import { directDepositApi } from './direct-deposit';
import { taxFilingApi } from './tax-filing';
import { reportsApi } from './reports';
import { employeeSelfServiceApi } from './employee-self-service';

// Combine all payroll-related APIs into a single exported object
export const payrollApi = {
  // Dashboard
  getDashboardData: payrollDashboardApi.getDashboardData,

  // Payroll Processing
  getPayrollData: payrollProcessingApi.getPayrollData,
  processPayrun: payrollProcessingApi.processPayrun,

  // Direct Deposit
  getDirectDepositData: directDepositApi.getDirectDepositData,
  processBulkPayouts: directDepositApi.processBulkPayouts,
  addBankAccount: directDepositApi.addBankAccount,

  // Tax Filing
  getTaxFilingData: taxFilingApi.getTaxFilingData,
  uploadTaxForm: taxFilingApi.uploadTaxForm,

  // Reports
  getReportsData: reportsApi.getReportsData,

  // Employee Self-Service
  getEmployeeSelfServiceData: employeeSelfServiceApi.getEmployeeSelfServiceData
};

// Export type definitions
export type { DashboardData } from './dashboard';
export type {
  PayrollEmployee,
  PayrollTotals,
  PayrollData
} from './processing';
export type {
  PendingPayout,
  BankAccount,
  DirectDepositData
} from './direct-deposit';
export type {
  TaxForm,
  TaxEvent,
  TaxLiabilities,
  TaxFilingData
} from './tax-filing';
export type {
  ReportSummary,
  ChartDataPoint,
  DepartmentBreakdown,
  Report,
  ReportTemplate,
  ReportsData
} from './reports';
export type {
  EmployeeProfile,
  EmploymentDetails,
  DirectDepositAccount,
  Payslip,
  TaxFormDocument,
  TaxWithholding,
  PaySummary,
  EmployeeBenefits,
  EmployeeSelfServiceData
} from './employee-self-service';
