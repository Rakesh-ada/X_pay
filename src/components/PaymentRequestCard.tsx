import React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { PaymentRequest } from '@/types';

interface PaymentRequestCardProps {
  request: PaymentRequest;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

const PaymentRequestCard: React.FC<PaymentRequestCardProps> = ({ 
  request, 
  onAccept, 
  onDecline 
}) => {
  return (
    <div className="retro-card bg-accent p-3 md:p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <img
            src={request.fromUser.avatar}
            alt={request.fromUser.name}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover border-2 border-border"
          />
          <div>
            <h4 className="font-head text-sm md:text-base text-accent-foreground">{request.fromUser.name}</h4>
            <p className="text-xs md:text-sm text-muted-foreground">{request.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Clock size={14} className="md:size-16" />
          <span className="text-xs md:text-sm font-medium">Pending</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-base md:text-lg font-head text-accent-foreground">
          {request.amount} {request.currency}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onDecline?.(request.id)}
            className="retro-button p-1.5 md:p-2 bg-destructive text-destructive-foreground rounded-lg"
          >
            <X size={14} className="md:size-16" />
          </button>
          <button
            onClick={() => onAccept?.(request.id)}
            className="retro-button p-1.5 md:p-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Check size={14} className="md:size-16" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestCard;