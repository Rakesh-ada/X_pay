import React, { useState } from 'react';
import { Filter, Search, Calendar } from 'lucide-react';
import TransactionCard from '@/components/TransactionCard';
import { transactions } from '@/data/mockData';

const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.fromUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.toUser.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-head text-foreground">Transaction History</h1>
        <p className="text-muted-foreground">View all your payment activities</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="retro-input w-full pl-10 pr-4 py-3 bg-card rounded-lg"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`retro-button px-4 py-2 rounded-lg font-medium ${
              selectedFilter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('send')}
            className={`retro-button px-4 py-2 rounded-lg font-medium ${
              selectedFilter === 'send'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Sent
          </button>
          <button
            onClick={() => setSelectedFilter('receive')}
            className={`retro-button px-4 py-2 rounded-lg font-medium ${
              selectedFilter === 'receive'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setSelectedFilter('group')}
            className={`retro-button px-4 py-2 rounded-lg font-medium ${
              selectedFilter === 'group'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="retro-card bg-secondary text-secondary-foreground p-6 rounded-lg">
        <h3 className="text-lg font-head mb-4">This Month</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-head">12</p>
            <p className="text-muted text-sm">Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-head">$2,847</p>
            <p className="text-muted text-sm">Sent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-head">$1,923</p>
            <p className="text-muted text-sm">Received</p>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-head text-foreground">Recent Transactions</h3>
          <button className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors">
            <Calendar size={16} />
            <span className="text-sm font-medium">Filter by date</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;