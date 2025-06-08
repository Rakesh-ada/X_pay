export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  publicKey: string;
}

export interface Wallet {
  id: string;
  currency: string;
  symbol: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  address?: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'group';
  amount: number;
  currency: string;
  fromUser: User;
  toUser: User;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  groupId?: string;
}

export interface PaymentRequest {
  id: string;
  fromUser: User;
  toUser: User;
  amount: number;
  currency: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdBy: User;
  createdAt: Date;
  totalSpent: number;
  avatar?: string;
}

export interface Expense {
  id: string;
  circleId: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: User;
  splitBetween: User[];
  timestamp: Date;
  category: string;
}