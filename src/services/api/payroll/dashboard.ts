
import { ApiResponse } from "../core";

export interface DashboardData {
  totalEmployees: number;
  activeEmployees: number;
  nextPayrollDate: string;
  nextPayrollAmount: number;
  pendingTaxForms: number;
  pendingApprovals: number;
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: "payroll" | "tax" | "benefits";
  }[];
  recentActivities: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    user: string;
  }[];
}

export const payrollDashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Mock data for demonstration
    return Promise.resolve({
      totalEmployees: 47,
      activeEmployees: 45,
      nextPayrollDate: "May 15, 2025",
      nextPayrollAmount: 125750,
      pendingTaxForms: 3,
      pendingApprovals: 8,
      upcomingEvents: [
        {
          id: "evt1",
          title: "Bi-weekly Payroll",
          date: "May 15, 2025",
          type: "payroll"
        },
        {
          id: "evt2",
          title: "Quarterly Tax Filing Due",
          date: "June 30, 2025",
          type: "tax"
        },
        {
          id: "evt3",
          title: "Benefits Enrollment Deadline",
          date: "June 15, 2025",
          type: "benefits"
        }
      ],
      recentActivities: [
        {
          id: "act1",
          title: "Payroll Processed",
          description: "Bi-weekly payroll completed for 45 employees",
          timestamp: "2025-05-01T14:30:00Z",
          user: "John Admin"
        },
        {
          id: "act2",
          title: "New Employee Added",
          description: "Sarah Johnson was added to the system",
          timestamp: "2025-04-28T10:15:00Z",
          user: "Maria HR"
        },
        {
          id: "act3",
          title: "Tax Forms Filed",
          description: "Quarterly tax forms submitted to IRS",
          timestamp: "2025-04-15T16:45:00Z",
          user: "John Admin"
        }
      ]
    });
  }
};
