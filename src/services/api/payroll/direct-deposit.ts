
import { ApiResponse } from "../core";

export interface PendingPayout {
  id: string;
  employeeId: string;
  employeeName: string;
  paymentDate: string;
  amount: number;
  bankName: string;
  accountLast4: string;
  status: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountType: string;
  routingNumber: string;
  accountNumber: string;
  isVerified: boolean;
}

export interface DirectDepositData {
  pendingPayouts: PendingPayout[];
  bankAccounts: BankAccount[];
}

export const directDepositApi = {
  getDirectDepositData: async (): Promise<DirectDepositData> => {
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
};
