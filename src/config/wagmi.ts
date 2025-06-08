import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { mainnet, sepolia, polygon, optimism, arbitrum, base } from 'viem/chains';
import { createConfig } from 'wagmi';

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'Crypto Wallet App',
    projectId: 'demo-project-id', // Temporary ID for development - replace with your own from https://cloud.walletconnect.com
    chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
    },
    ssr: false,
  })
);

export const chains = [mainnet, sepolia, polygon, optimism, arbitrum, base]; 