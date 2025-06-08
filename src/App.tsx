import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import QRPage from '@/pages/QRPage';
import CirclesPage from '@/pages/CirclesPage';
import HistoryPage from '@/pages/HistoryPage';
import ProfilePage from '@/pages/ProfilePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={setActiveTab} />;
      case 'qr':
        return <QRPage />;
      case 'circles':
        return <CirclesPage />;
      case 'history':
        return <HistoryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="w-full md:max-w-4xl lg:max-w-5xl mx-auto bg-card min-h-screen border-x-0 md:border-x-2 border-border">
        <div className="p-4 md:p-6 pt-6 md:pt-8">
          {renderCurrentPage()}
        </div>
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;