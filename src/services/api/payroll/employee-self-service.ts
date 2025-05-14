
import { ApiResponse } from "../core";

export interface EmployeeProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  initials: string;
  dateOfBirth: string;
  ssn: string;
  employeeId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface EmploymentDetails {
  department: string;
  position: string;
  manager: string;
  startDate: string;
  employeeType: string;
}

export interface DirectDepositAccount {
  id: string;
  bankName: string;
  accountType: string;
  accountLast4: string;
  routingPercent: number;
}

export interface Payslip {
  id: string;
  payPeriod: string;
  payDate: string;
  grossPay: string;
  netPay: string;
}

export interface TaxFormDocument {
  id: string;
  name: string;
  year: string;
  generatedDate: string;
}

export interface TaxWithholding {
  federalW4LastUpdated: string;
  filingStatus: string;
  allowances: string;
  additionalWithholding: string;
  taxExempt: boolean;
  state: string;
}

export interface PaySummary {
  regularEarnings: number;
  overtimeEarnings: number;
  bonuses: number;
  otherEarnings: number;
  totalGross: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  retirement: number;
  healthInsurance: number;
  totalDeductions: number;
  netPayYtd: number;
}

export interface EmployeeBenefits {
  healthPlan: {
    name: string;
    coverage: string;
    costPerPaycheck: number;
  };
  dentalPlan: {
    name: string;
    coverage: string;
    costPerPaycheck: number;
  };
  visionPlan: {
    name: string;
    coverage: string;
    costPerPaycheck: number;
  };
  retirement: {
    contributionPercent: number;
    employerMatchPercent: number;
    ytdContribution: number;
    balance: number;
    lastUpdated: string;
  };
  timeOff: {
    ptoBalance: number;
    sickLeaveBalance: number;
    upcoming: {
      id: string;
      type: string;
      dates: string;
      status: string;
    }[];
  };
  additionalBenefits: {
    id: string;
    name: string;
    description: string;
    enrolled: boolean;
  }[];
}

export interface EmployeeSelfServiceData {
  ytdEarnings: number;
  availablePto: number;
  nextPayDate: string;
  profile: EmployeeProfile;
  employment: EmploymentDetails;
  directDeposit: {
    accounts: DirectDepositAccount[];
  };
  payslips: Payslip[];
  taxForms: TaxFormDocument[];
  taxWithholding: TaxWithholding;
  paySummary: PaySummary;
  benefits: EmployeeBenefits;
}

export const employeeSelfServiceApi = {
  getEmployeeSelfServiceData: async (): Promise<EmployeeSelfServiceData> => {
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
