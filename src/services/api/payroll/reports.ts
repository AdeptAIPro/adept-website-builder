
import { ApiResponse } from "../core";

export interface ReportSummary {
  totalGrossPay: number;
  totalTaxes: number;
  totalNetPay: number;
  payPeriods: number;
}

export interface ChartDataPoint {
  name: string;
  grossPay: number;
  taxes: number;
  netPay: number;
}

export interface DepartmentBreakdown {
  id: string;
  name: string;
  employees: number;
  grossPay: number;
  taxes: number;
  benefits: number;
  netPay: number;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  generatedDate: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  createdDate: string;
  lastRunDate: string | null;
}

export interface ReportsData {
  summary: ReportSummary;
  chartData: ChartDataPoint[];
  departmentBreakdown: DepartmentBreakdown[];
  reports: Report[];
  savedReportTemplates: ReportTemplate[];
}

export const reportsApi = {
  getReportsData: async (year: string, quarter: string): Promise<ReportsData> => {
    return Promise.resolve({
      summary: {
        totalGrossPay: 650000,
        totalTaxes: 190000,
        totalNetPay: 460000,
        payPeriods: quarter === "0" ? 24 : 6
      },
      chartData: [
        {
          name: "Jan",
          grossPay: 100000,
          taxes: 30000,
          netPay: 70000
        },
        {
          name: "Feb",
          grossPay: 105000,
          taxes: 31500,
          netPay: 73500
        },
        {
          name: "Mar",
          grossPay: 110000,
          taxes: 33000,
          netPay: 77000
        },
        {
          name: "Apr",
          grossPay: 108000,
          taxes: 32400,
          netPay: 75600
        },
        {
          name: "May",
          grossPay: 112000,
          taxes: 33600,
          netPay: 78400
        },
        {
          name: "Jun",
          grossPay: 115000,
          taxes: 34500,
          netPay: 80500
        }
      ],
      departmentBreakdown: [
        {
          id: "dept1",
          name: "Engineering",
          employees: 15,
          grossPay: 225000,
          taxes: 67500,
          benefits: 22500,
          netPay: 135000
        },
        {
          id: "dept2",
          name: "Sales",
          employees: 10,
          grossPay: 180000,
          taxes: 54000,
          benefits: 18000,
          netPay: 108000
        },
        {
          id: "dept3",
          name: "Marketing",
          employees: 8,
          grossPay: 120000,
          taxes: 36000,
          benefits: 12000,
          netPay: 72000
        },
        {
          id: "dept4",
          name: "Operations",
          employees: 7,
          grossPay: 95000,
          taxes: 28500,
          benefits: 9500,
          netPay: 57000
        },
        {
          id: "dept5",
          name: "Human Resources",
          employees: 4,
          grossPay: 60000,
          taxes: 18000,
          benefits: 6000,
          netPay: 36000
        }
      ],
      reports: [
        {
          id: "report1",
          title: "Payroll Summary Report",
          description: "Summary of all payroll transactions",
          category: "Summary",
          generatedDate: "May 1, 2025"
        },
        {
          id: "report2",
          title: "Tax Liability Report",
          description: "Breakdown of all tax liabilities",
          category: "Tax",
          generatedDate: "May 1, 2025"
        },
        {
          id: "report3",
          title: "Employee Earnings Report",
          description: "Detailed earnings by employee",
          category: "Detail",
          generatedDate: "May 1, 2025"
        },
        {
          id: "report4",
          title: "Department Expense Report",
          description: "Payroll expenses by department",
          category: "Summary",
          generatedDate: "May 1, 2025"
        },
        {
          id: "report5",
          title: "Benefits Expense Report",
          description: "Breakdown of all benefit costs",
          category: "Benefits",
          generatedDate: "May 1, 2025"
        }
      ],
      savedReportTemplates: [
        {
          id: "template1",
          name: "Monthly Department Summary",
          type: "Summary",
          createdDate: "January 15, 2025",
          lastRunDate: "May 1, 2025"
        },
        {
          id: "template2",
          name: "Employee YTD Earnings",
          type: "Detail",
          createdDate: "February 20, 2025",
          lastRunDate: "May 1, 2025"
        },
        {
          id: "template3",
          name: "Quarterly Tax Analysis",
          type: "Tax",
          createdDate: "March 10, 2025",
          lastRunDate: null
        }
      ]
    });
  },
};
