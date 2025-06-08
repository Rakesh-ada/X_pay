import React, { useEffect, useState } from 'react';
import { Plus, Bell, Eye, EyeOff, Wallet as WalletIcon } from 'lucide-react';
import WalletCard from '@/components/WalletCard';
import TransactionCard from '@/components/TransactionCard';
import PaymentRequestCard from '@/components/PaymentRequestCard';
import ConnectWallet from '@/components/ConnectWallet';
import { wallets as mockWallets, transactions, currentUser, paymentRequests } from '@/data/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useWallet from '@/hooks/useWallet';
import { formatEther } from 'viem';

interface HomePageProps {
  onTabChange: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  const [showBalance, setShowBalance] = useLocalStorage('showBalance', true);
  const { isConnected, address, balance, symbol, chainId } = useWallet();
  const [wallets, setWallets] = useState(mockWallets);
  
  // Calculate total balance including connected wallet
  const mockTotalBalance = mockWallets.reduce((sum, wallet) => sum + wallet.usdValue, 0);
  const [totalBalance, setTotalBalance] = useState(mockTotalBalance);
  
  const recentTransactions = transactions.slice(0, 3);
  const pendingRequests = paymentRequests.filter(req => req.status === 'pending');

  // Update wallets when connected wallet changes
  useEffect(() => {
    if (isConnected && address && balance) {
      // Create a wallet object for the connected wallet
      const connectedWallet = {
        id: address,
        name: 'Web3 Wallet',
        currency: symbol || 'ETH',
        symbol: symbol || 'ETH',
        balance: parseFloat(balance),
        usdValue: parseFloat(balance) * 3000, // Mock price, in a real app you'd fetch the current price
        change24h: 2.5, // Mock change, in a real app you'd calculate this
        icon: 'ETH',
        address: address
      };

      // Add connected wallet to the list, replacing any existing wallet with the same address
      const updatedWallets = [
        connectedWallet,
        ...mockWallets.filter(w => w.address !== address).slice(0, 1)
      ];
      
      setWallets(updatedWallets);
      
      // Update total balance
      const newTotalBalance = updatedWallets.reduce((sum, wallet) => sum + wallet.usdValue, 0);
      setTotalBalance(newTotalBalance);
    } else {
      setWallets(mockWallets);
      setTotalBalance(mockTotalBalance);
    }
  }, [isConnected, address, balance, symbol, mockTotalBalance]);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border-2 border-border"
          />
          <div>
            <h1 className="text-lg md:text-xl font-head text-foreground">Welcome back!</h1>
            <p className="text-sm md:text-base text-muted-foreground">{currentUser.name}</p>
          </div>
        </div>
        <button className="retro-button p-2 md:p-3 bg-card rounded-lg">
          <Bell size={18} className="md:size-20 text-card-foreground" />
        </button>
      </div>

      {/* Total Balance */}
      <div className="retro-card bg-secondary text-secondary-foreground p-4 md:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base md:text-lg font-medium">Total Balance</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="retro-button p-1.5 md:p-2 bg-primary text-primary-foreground rounded-lg"
          >
            {showBalance ? <Eye size={18} className="md:size-20" /> : <EyeOff size={18} className="md:size-20" />}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-3xl md:text-4xl font-head">
            {showBalance ? `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••'}
          </p>
          <p className="text-muted text-xs md:text-sm">Available balance</p>
        </div>
        {isConnected ? (
          <div className="flex space-x-3">
            <button
              onClick={() => onTabChange('qr')}
              className="retro-button flex-1 bg-primary text-primary-foreground rounded-lg py-2 md:py-3 px-3 md:px-4 text-sm md:text-base font-medium"
            >
              Send
            </button>
            <button
              onClick={() => onTabChange('qr')}
              className="retro-button flex-1 bg-accent text-accent-foreground rounded-lg py-2 md:py-3 px-3 md:px-4 text-sm md:text-base font-medium"
            >
              Receive
            </button>
          </div>
        ) : (
          <ConnectWallet showBalance={false} />
        )}
      </div>

      {/* Payment Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-head text-foreground">Payment Requests</h3>
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded border-2 border-border">
              {pendingRequests.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingRequests.map(request => (
              <PaymentRequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {/* Your Wallets */}
      <div>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-head text-foreground">Your Wallets</h3>
          <button className="retro-button p-1.5 md:p-2 bg-primary text-primary-foreground rounded-lg">
            <Plus size={14} className="md:size-16" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wallets.slice(0, 2).map(wallet => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-head text-foreground">Recent Activity</h3>
          <button
            onClick={() => onTabChange('history')}
            className="text-primary text-sm md:text-base font-medium hover:text-primary-hover transition-colors"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;