// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  membership: 'Gold' | 'Silver' | 'Platinum';
  verified: boolean;
}

export interface Wallet {
  balance: number;
  currency: string;
  transactions: Transaction[];
  totalEarned: number;
  totalSpent: number;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'referral' | 'purchase' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

export interface Referral {
  id: string;
  code: string;
  totalEarnings: number;
  totalReferrals: number;
  pendingAmount: number;
  referrals: ReferredUser[];
  campaign: {
    name: string;
    commissionRate: number;
    minWithdrawal: number;
    expirationDate: string;
  };
}

export interface ReferredUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'pending' | 'inactive';
  earnedAmount: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
  }[];
}