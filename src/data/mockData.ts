import { User, Wallet, Transaction, Circle, Expense, PaymentRequest } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  username: '@alexjohnson',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  publicKey: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
};

export const wallets: Wallet[] = [
  {
    id: '1',
    currency: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.2847,
    usdValue: 12847.92,
    change24h: 2.34,
    icon: '₿'
  },
  {
    id: '2',
    currency: 'Ethereum',
    symbol: 'ETH',
    balance: 2.8394,
    usdValue: 7459.83,
    change24h: -1.23,
    icon: 'Ξ'
  },
  {
    id: '3',
    currency: 'Solana',
    symbol: 'SOL',
    balance: 45.92,
    usdValue: 2847.12,
    change24h: 5.67,
    icon: '◎'
  },
  {
    id: '4',
    currency: 'Cardano',
    symbol: 'ADA',
    balance: 1247.83,
    usdValue: 892.45,
    change24h: -0.89,
    icon: '₳'
  }
];

export const contacts: User[] = [
  {
    id: '2',
    name: 'Sarah Wilson',
    username: '@sarahw',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    publicKey: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  },
  {
    id: '3',
    name: 'Mike Chen',
    username: '@mikechen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    publicKey: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
  },
  {
    id: '4',
    name: 'Emma Davis',
    username: '@emmad',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    publicKey: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
  }
];

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 0.025,
    currency: 'BTC',
    fromUser: currentUser,
    toUser: contacts[0],
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    description: 'Coffee payment'
  },
  {
    id: '2',
    type: 'receive',
    amount: 1.5,
    currency: 'ETH',
    fromUser: contacts[1],
    toUser: currentUser,
    timestamp: new Date('2024-01-14T15:45:00'),
    status: 'completed',
    description: 'Freelance work payment'
  },
  {
    id: '3',
    type: 'group',
    amount: 25.0,
    currency: 'SOL',
    fromUser: currentUser,
    toUser: contacts[2],
    timestamp: new Date('2024-01-13T20:15:00'),
    status: 'pending',
    description: 'Dinner split',
    groupId: '1'
  }
];

export const circles: Circle[] = [
  {
    id: '1',
    name: 'Weekend Squad',
    description: 'Friends group for weekend activities',
    members: [currentUser, contacts[0], contacts[1], contacts[2]],
    createdBy: currentUser,
    createdAt: new Date('2024-01-01'),
    totalSpent: 1247.83,
    avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Work Team',
    description: 'Office lunch and coffee expenses',
    members: [currentUser, contacts[1], contacts[2]],
    createdBy: contacts[1],
    createdAt: new Date('2024-01-05'),
    totalSpent: 634.29,
    avatar: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const paymentRequests: PaymentRequest[] = [
  {
    id: '1',
    fromUser: contacts[0],
    toUser: currentUser,
    amount: 50,
    currency: 'USDC',
    description: 'Concert tickets',
    timestamp: new Date('2024-01-15T09:00:00'),
    status: 'pending'
  },
  {
    id: '2',
    fromUser: contacts[2],
    toUser: currentUser,
    amount: 0.1,
    currency: 'BTC',
    description: 'Gas money',
    timestamp: new Date('2024-01-14T18:30:00'),
    status: 'pending'
  }
];