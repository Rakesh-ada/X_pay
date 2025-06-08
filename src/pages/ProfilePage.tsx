import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  Users, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User,
  Camera
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

const ProfilePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    {
      icon: User,
      title: 'Edit Profile',
      description: 'Update your personal information',
      action: () => {}
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Manage passwords and 2FA',
      action: () => {}
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage your wallets and cards',
      action: () => {}
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alerts and updates',
      action: () => {}
    },
    {
      icon: Users,
      title: 'Privacy',
      description: 'Control your data and visibility',
      action: () => {}
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      action: () => {}
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header */}
      <div className="retro-card bg-secondary text-secondary-foreground p-6 rounded-lg">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-border"
            />
            <button className="retro-button absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-head">{currentUser.name}</h1>
            <p className="text-muted">{currentUser.username}</p>
            <p className="text-sm text-muted mt-1">Member since Jan 2024</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-head">47</p>
            <p className="text-muted text-sm">Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-head">4</p>
            <p className="text-muted text-sm">Wallets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-head">2</p>
            <p className="text-muted text-sm">Circles</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="retro-card bg-card p-4 rounded-lg text-left">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-3 border-2 border-border">
            <Shield className="text-accent-foreground" size={20} />
          </div>
          <h3 className="font-head text-card-foreground">Security Score</h3>
          <p className="text-sm text-muted-foreground">Very Strong</p>
        </button>
        <button className="retro-card bg-card p-4 rounded-lg text-left">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3 border-2 border-border">
            <Bell className="text-primary-foreground" size={20} />
          </div>
          <h3 className="font-head text-card-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">3 new alerts</p>
        </button>
      </div>

      {/* Settings Menu */}
      <div className="retro-card bg-card rounded-lg overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b-2 border-border' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                <item.icon size={20} className="text-muted-foreground" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* App Settings */}
      <div className="retro-card bg-card p-4 rounded-lg">
        <h3 className="font-head text-card-foreground mb-4">App Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`retro-button relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-card rounded-full transition-transform border-2 border-border ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive payment alerts</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`retro-button relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-card rounded-full transition-transform border-2 border-border ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button className="retro-button w-full bg-destructive text-destructive-foreground p-4 flex items-center justify-center space-x-2 rounded-lg font-medium">
        <LogOut size={20} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default ProfilePage;