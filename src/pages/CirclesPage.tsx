import React, { useState } from 'react';
import { Plus, Users, DollarSign } from 'lucide-react';
import CircleCard from '@/components/CircleCard';
import { circles } from '@/data/mockData';

const CirclesPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-head text-foreground">Payment Circles</h1>
          <p className="text-muted-foreground">Manage group expenses and split bills</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="retro-button p-3 bg-primary text-primary-foreground rounded-lg"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="retro-card bg-accent p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={20} className="text-accent-foreground" />
            <span className="text-accent-foreground font-medium">Active Circles</span>
          </div>
          <p className="text-2xl font-head text-accent-foreground">{circles.length}</p>
        </div>
        <div className="retro-card bg-primary p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign size={20} className="text-primary-foreground" />
            <span className="text-primary-foreground font-medium">Total Spent</span>
          </div>
          <p className="text-2xl font-head text-primary-foreground">
            ${circles.reduce((sum, circle) => sum + circle.totalSpent, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Your Circles */}
      <div>
        <h3 className="text-lg font-head text-foreground mb-4">Your Circles</h3>
        <div className="space-y-4">
          {circles.map(circle => (
            <CircleCard key={circle.id} circle={circle} />
          ))}
        </div>
      </div>

      {/* Create Circle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="retro-card bg-card rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-head text-card-foreground mb-4">Create New Circle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Circle Name
                </label>
                <input
                  type="text"
                  placeholder="Weekend Squad, Work Team, etc."
                  className="retro-input w-full px-4 py-3 bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of this circle"
                  rows={3}
                  className="retro-input w-full px-4 py-3 bg-background rounded-lg resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="retro-button flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="retro-button flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  Create Circle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CirclesPage;