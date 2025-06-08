import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Transaction } from '@/types';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle size={14} className="md:size-16 text-accent-foreground" />;
      case 'pending':
        return <Clock size={14} className="md:size-16 text-muted-foreground" />;
      case 'failed':
        return <XCircle size={14} className="md:size-16 text-destructive" />;
    }
  };

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'send':
        return <ArrowUpRight size={16} className="md:size-20 text-destructive" />;
      case 'receive':
        return <ArrowDownLeft size={16} className="md:size-20 text-accent-foreground" />;
      case 'group':
        return <Users size={16} className="md:size-20 text-primary-foreground" />;
    }
  };

  const getAmountColor = () => {
    switch (transaction.type) {
      case 'send':
        return 'text-destructive';
      case 'receive':
        return 'text-accent-foreground';
      case 'group':
        return 'text-primary-foreground';
    }
  };

  const formatAmount = () => {
    const prefix = transaction.type === 'send' ? '-' : '+';
    return `${prefix}${transaction.amount} ${transaction.currency}`;
  };

  return (
    <div className="retro-card bg-card p-3 md:p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
            {getTypeIcon()}
          </div>
          <div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <h4 className="font-medium text-sm md:text-base text-card-foreground">
                {transaction.type === 'send' ? 'To' : 'From'} {
                  transaction.type === 'send' ? transaction.toUser.name : transaction.fromUser.name
                }
              </h4>
              {getStatusIcon()}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              {transaction.description || 'No description'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-head text-sm md:text-base ${getAmountColor()}`}>
            {formatAmount()}
          </p>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            {transaction.timestamp.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;