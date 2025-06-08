import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { wagmiConfig, chains } from '@/config/wagmi';

import '@rainbow-me/rainbowkit/styles.css';

// Create a new query client
const queryClient = new QueryClient();

interface WalletProviderProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ 
  children, 
  isDarkMode = false 
}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={chains} 
          theme={isDarkMode ? darkTheme() : lightTheme({
            accentColor: '#ffdb33', // primary color
            accentColorForeground: '#000000',
            borderRadius: 'medium',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletProvider; 