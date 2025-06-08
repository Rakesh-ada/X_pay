import React from 'react';
import { Users, DollarSign } from 'lucide-react';
import { Circle } from '@/types';

interface CircleCardProps {
  circle: Circle;
  onClick?: () => void;
}

const CircleCard: React.FC<CircleCardProps> = ({ circle, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="retro-card bg-card p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center border-2 border-border">
          {circle.avatar ? (
            <img src={circle.avatar} alt={circle.name} className="w-full h-full rounded-lg object-cover" />
          ) : (
            <Users className="text-primary-foreground" size={20} />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-head text-card-foreground">{circle.name}</h3>
          <p className="text-sm text-muted-foreground">{circle.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Users size={14} />
          <span>{circle.members.length} members</span>
        </div>
        <div className="flex items-center space-x-1 text-sm font-head text-primary-foreground bg-primary px-2 py-1 rounded border-2 border-border">
          <DollarSign size={14} />
          <span>${circle.totalSpent.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CircleCard;