import React from 'react';
import { Home, QrCode, Users, History, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'qr', icon: QrCode, label: 'QR Pay' },
    { id: 'circles', icon: Users, label: 'Circles' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-2 md:px-4 py-2 z-50">
      <div className="flex justify-around items-center w-full md:max-w-4xl lg:max-w-5xl mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center space-y-1 py-1 md:py-2 px-2 md:px-3 rounded-lg transition-all duration-200 retro-button ${
              activeTab === id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon size={18} className="md:size-20" />
            <span className="text-[10px] md:text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;