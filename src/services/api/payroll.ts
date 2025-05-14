
import { fetchFromApi } from "./core";

export const payrollApi = {
  // Dashboard
  getDashboardData: async () => {
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
  },

  // Payroll Processing
  getPayrollData: async (month: string, year: string) => {
    // In a real app, this would call the API with the month and year
    // For demo purposes, we'll return mock data
    return Promise.resolve({
      payrollData: {
        month,
        year,
        employees: [
          {
            id: "emp1",
            firstName: "John",
            lastName: "Smith",
            avatar: "",
            position: "Software Engineer",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 5,
            grossPay: 6250,
            federalTax: 1250,
            stateTax: 500,
            socialSecurity: 387.5,
            medicare: 90.63,
            otherDeductions: 150,
            netPay: 3871.87
          },
          {
            id: "emp2",
            firstName: "Sarah",
            lastName: "Johnson",
            avatar: "",
            position: "Product Manager",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 0,
            grossPay: 7500,
            federalTax: 1500,
            stateTax: 600,
            socialSecurity: 465,
            medicare: 108.75,
            otherDeductions: 200,
            netPay: 4626.25
          },
          {
            id: "emp3",
            firstName: "Michael",
            lastName: "Brown",
            avatar: "",
            position: "Designer",
            employeeType: "W2",
            regularHours: 80,
            overtimeHours: 2,
            grossPay: 5300,
            federalTax: 1060,
            stateTax: 424,
            socialSecurity: 328.6,
            medicare: 76.85,
            otherDeductions: 150,
            netPay: 3260.55
          }
        ],
        totals: {
          grossPay: 19050,
          federalTax: 3810,
          stateTax: 1524,
          socialSecurity: 1181.10,
          medicare: 276.23,
          otherDeductions: 500,
          netPay: 11758.67,
          totalTaxes: 6791.33
        }
      }
    });
  },

  processPayrun: async (payrunData: any) => {
    // In a real app, this would send the payrun data to the API
    // For demo, we'll just return a mock response with a payrun ID
    return Promise.resolve({
      payrunId: "pay_" + Math.random().toString(36).substr(2, 9)
    });
  },

  // Direct Deposit
  getDirectDepositData: async () => {
    return Promise.resolve({
      pendingPayouts: [
        {
          id: "pout1",
          employeeId: "emp1",
          employeeName: "John Smith",
          paymentDate: "May 15, 2025",
          amount: 3871.87,
          bankName: "Chase Bank",
          accountLast4: "4567",
          status: "pending"
        },
        {
          id: "pout2",
          employeeId: "emp2",
          employeeName: "Sarah Johnson",
          paymentDate: "May 15, 2025",
          amount: 4626.25,
          bankName: "Bank of America",
          accountLast4: "8912",
          status: "pending"
        },
        {
          id: "pout3",
          employeeId: "emp3",
          employeeName: "Michael Brown",
          paymentDate: "May 15, 2025",
          amount: 3260.55,
          bankName: "Wells Fargo",
          accountLast4: "3456",
          status: "pending"
        }
      ],
      bankAccounts: [
        {
          id: "acct1",
          bankName: "Chase Bank",
          accountName: "Company Payroll",
          accountType: "checking",
          routingNumber: "021000021",
          accountNumber: "XXXX7890",
          isVerified: true
        }
      ]
    });
  },

  processBulkPayouts: async (payoutIds: string[]) => {
    return Promise.resolve({
      success: true,
      processedCount: payoutIds.length
    });
  },

  addBankAccount: async (accountData: any) => {
    return Promise.resolve({
      success: true,
      account: {
        id: "acct_" + Math.random().toString(36).substr(2, 9),
        ...accountData
      }
    });
  },

  // Tax Filing
  getTaxFilingData: async (year: string, quarter: string) => {
    return Promise.resolve({
      taxForms: [
        {
          id: "form1",
          formName: "Form 941 - Quarterly Tax Return",
          dueDate: "July 31, 2025",
          period: `${year} Q${quarter}`,
          status: "pending"
        },
        {
          id: "form2",
          formName: "State Withholding Return",
          dueDate: "July 31, 2025",
          period: `${year} Q${quarter}`,
          status: "pending"
        },
        {
          id: "form3",
          formName: "W-2 Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending"
        },
        {
          id: "form4",
          formName: "1099-NEC Forms",
          dueDate: "January 31, 2026",
          period: year,
          status: "pending"
        }
      ],
      taxDeadlines: [
        {
          id: "deadline1",
          date: "2025-07-31",
          title: "Form 941 Due",
          description: "Federal quarterly tax return",
          type: "federal"
        },
        {
          id: "deadline2",
          date: "2025-07-31",
          title: "State Withholding Due",
          description: "State quarterly tax return",
          type: "state"
        },
        {
          id: "deadline3",
          date: "2025-07-15",
          title: "Estimated Tax Payment",
          description: "Second quarter estimated tax",
          type: "federal"
        }
      ],
      taxLiabilities: {
        federal: 125000,
        state: 45000,
        total: 170000,
        breakdown: {
          federalIncomeTax: 85000,
          socialSecurityTax: 31000,
          medicareTax: 9000,
          futa: 7000,
          suta: 38000
        }
      }
    });
  },

  uploadTaxForm: async (formData: FormData) => {
    return Promise.resolve({
      success: true,
      formId: "form_" + Math.random().toString(36).substr(2, 9)
    });
  },

  // Reports
  getReportsData: async (year: string, quarter: string) => {
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

  // Employee Self-Service
  getEmployeeSelfServiceData: async () => {
    return Promise.resolve({
      ytdEarnings: 35000,
      availablePto: 64,
      nextPayDate: "May 15, 2025",
      profile: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567",
        avatar: "",
        initials: "JS",
        dateOfBirth: "January 15, 1990",
        ssn: "XXX-XX-1234",
        employeeId: "EMP-12345",
        address: {
          street: "123 Main Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102"
        }
      },
      employment: {
        department: "Engineering",
        position: "Senior Software Engineer",
        manager: "Jane Wilson",
        startDate: "March 10, 2022",
        employeeType: "W-2 Employee"
      },
      directDeposit: {
        accounts: [
          {
            id: "dd1",
            bankName: "Chase Bank",
            accountType: "Checking",
            accountLast4: "4567",
            routingPercent: 100
          }
        ]
      },
      payslips: [
        {
          id: "ps1",
          payPeriod: "April 16-30, 2025",
          payDate: "May 5, 2025",
          grossPay: "3,500.00",
          netPay: "2,456.78"
        },
        {
          id: "ps2",
          payPeriod: "April 1-15, 2025",
          payDate: "April 20, 2025",
          grossPay: "3,500.00",
          netPay: "2,456.78"
        },
        {
          id: "ps3",
          payPeriod: "March 16-31, 2025",
          payDate: "April 5, 2025",
          grossPay: "3,500.00",
          netPay: "2,456.78"
        },
        {
          id: "ps4",
          payPeriod: "March 1-15, 2025",
          payDate: "March 20, 2025",
          grossPay: "3,500.00",
          netPay: "2,456.78"
        }
      ],
      taxForms: [
        {
          id: "tf1",
          name: "W-2 (Wage and Tax Statement)",
          year: "2024",
          generatedDate: "January 31, 2025"
        },
        {
          id: "tf2",
          name: "1095-C (Health Insurance Coverage)",
          year: "2024",
          generatedDate: "January 31, 2025"
        }
      ],
      taxWithholding: {
        federalW4LastUpdated: "January 15, 2025",
        filingStatus: "Single",
        allowances: "2",
        additionalWithholding: "50.00",
        taxExempt: false,
        state: "California"
      },
      paySummary: {
        regularEarnings: 31500,
        overtimeEarnings: 1750,
        bonuses: 1500,
        otherEarnings: 250,
        totalGross: 35000,
        federalTax: 5250,
        stateTax: 2100,
        socialSecurity: 2170,
        medicare: 507.5,
        retirement: 1750,
        healthInsurance: 900,
        totalDeductions: 12677.5,
        netPayYtd: 22322.5
      },
      benefits: {
        healthPlan: {
          name: "Premium PPO Plan",
          coverage: "Employee + Family",
          costPerPaycheck: 150
        },
        dentalPlan: {
          name: "Dental Plus",
          coverage: "Employee + Family",
          costPerPaycheck: 25
        },
        visionPlan: {
          name: "Vision Complete",
          coverage: "Employee + Family",
          costPerPaycheck: 10
        },
        retirement: {
          contributionPercent: 5,
          employerMatchPercent: 4,
          ytdContribution: 1750,
          balance: 27500,
          lastUpdated: "May 1, 2025"
        },
        timeOff: {
          ptoBalance: 64,
          sickLeaveBalance: 40,
          upcoming: [
            {
              id: "pto1",
              type: "Vacation",
              dates: "June 15-19, 2025",
              status: "Approved"
            }
          ]
        },
        additionalBenefits: [
          {
            id: "ben1",
            name: "Life Insurance",
            description: "2x annual salary coverage",
            enrolled: true
          },
          {
            id: "ben2",
            name: "Disability Insurance",
            description: "Short and long-term coverage",
            enrolled: true
          },
          {
            id: "ben3",
            name: "Flexible Spending Account",
            description: "Pre-tax healthcare expenses",
            enrolled: false
          },
          {
            id: "ben4",
            name: "Commuter Benefits",
            description: "Pre-tax transit expenses",
            enrolled: false
          }
        ]
      }
    });
  }
};
