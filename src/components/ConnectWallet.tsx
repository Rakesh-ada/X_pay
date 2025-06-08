import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface ConnectWalletProps {
  showBalance?: boolean;
  className?: string;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ 
  showBalance = true,
  className = ''
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className={className}
          >
            {(() => {
              if (!connected) {
                return (
                  <button 
                    onClick={openConnectModal} 
                    type="button"
                    className="retro-button bg-primary text-primary-foreground rounded-lg py-2 md:py-3 px-3 md:px-4 text-sm md:text-base font-medium w-full"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal} 
                    type="button"
                    className="retro-button bg-destructive text-destructive-foreground rounded-lg py-2 md:py-3 px-3 md:px-4 text-sm md:text-base font-medium w-full"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  {showBalance && (
                    <button
                      onClick={openChainModal}
                      className="retro-button bg-accent text-accent-foreground rounded-lg py-2 px-3 text-sm font-medium"
                      type="button"
                    >
                      {chain.name}
                    </button>
                  )}

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="retro-button bg-card text-card-foreground rounded-lg py-2 px-3 text-sm font-medium"
                  >
                    {account.displayName}
                    {showBalance && account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet; 