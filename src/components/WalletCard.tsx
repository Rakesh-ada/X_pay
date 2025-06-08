import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Wallet } from '@/types';

interface WalletCardProps {
  wallet: Wallet;
  onClick?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, onClick }) => {
  const isPositive = wallet.change24h >= 0;

  return (
    <div
      onClick={onClick}
      className="retro-card bg-card p-3 md:p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-head text-base md:text-lg border-2 border-border">
            {wallet.icon}
          </div>
          <div>
            <h3 className="font-head text-sm md:text-base text-card-foreground">{wallet.currency}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{wallet.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-[10px] md:text-xs font-medium border-2 border-border ${
          isPositive ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'
        }`}>
          {isPositive ? <TrendingUp size={10} className="md:size-12" /> : <TrendingDown size={10} className="md:size-12" />}
          <span>{Math.abs(wallet.change24h)}%</span>
        </div>
      </div>
      
      <div className="space-y-0.5 md:space-y-1">
        <p className="text-xl md:text-2xl font-head text-card-foreground">
          {wallet.balance.toFixed(4)} {wallet.symbol}
        </p>
        <p className="text-xs md:text-sm text-muted-foreground">
          ${wallet.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default WalletCard;