import React, { useState, useEffect } from 'react';
import { QrCode, Scan, Copy, Share, ArrowRight, AlertCircle } from 'lucide-react';
import QRGenerator from '@/components/QRGenerator';
import ConnectWallet from '@/components/ConnectWallet';
import { currentUser, wallets as mockWallets } from '@/data/mockData';
import useWallet from '@/hooks/useWallet';

const QRPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'generate' | 'scan'>('generate');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [description, setDescription] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const { 
    isConnected, 
    address, 
    balance, 
    symbol, 
    sendTransaction, 
    sendToken, 
    isLoading, 
    error 
  } = useWallet();

  // Update selected currency when wallet is connected
  useEffect(() => {
    if (isConnected && symbol) {
      setSelectedCurrency(symbol);
    }
  }, [isConnected, symbol]);

  const generatePaymentData = () => {
    return JSON.stringify({
      address: address || currentUser.publicKey,
      amount: amount || '0',
      currency: selectedCurrency,
      description: description || 'Payment request',
      user: currentUser.name
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address || currentUser.publicKey);
  };

  const handleSendTransaction = async () => {
    if (!isConnected) {
      setTransactionStatus('error');
      setStatusMessage('Please connect your wallet first');
      return;
    }

    if (!recipientAddress) {
      setTransactionStatus('error');
      setStatusMessage('Please enter a recipient address');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setTransactionStatus('error');
      setStatusMessage('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    setTransactionStatus('pending');
    setStatusMessage('Processing transaction...');

    try {
      // For now we only handle native token (ETH, MATIC, etc.)
      // In a real app, you'd handle different tokens
      const hash = await sendTransaction(
        recipientAddress,
        amount,
        () => {
          setTransactionStatus('success');
          setStatusMessage('Transaction sent successfully!');
          setAmount('');
          setRecipientAddress('');
        },
        (err) => {
          setTransactionStatus('error');
          setStatusMessage(err.message || 'Transaction failed');
        }
      );
      
      console.log('Transaction hash:', hash);
    } catch (err) {
      console.error('Send transaction error:', err);
      setTransactionStatus('error');
      setStatusMessage(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-head text-foreground">QR Payments</h1>
      </div>

      {/* Connect Wallet Prompt if not connected */}
      {!isConnected && (
        <div className="retro-card bg-accent p-4 rounded-lg mb-4">
          <p className="text-accent-foreground mb-3">Connect your wallet to send and receive crypto</p>
          <ConnectWallet />
        </div>
      )}

      {/* Mode Toggle */}
      <div className="retro-card bg-muted rounded-lg p-1 flex">
        <button
          onClick={() => setActiveMode('generate')}
          className={`retro-button flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium ${
            activeMode === 'generate'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground'
          }`}
        >
          <QrCode size={20} />
          <span>Generate QR</span>
        </button>
        <button
          onClick={() => setActiveMode('scan')}
          className={`retro-button flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium ${
            activeMode === 'scan'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground'
          }`}
        >
          <Scan size={20} />
          <span>Scan QR</span>
        </button>
      </div>

      {activeMode === 'generate' ? (
        <div className="space-y-6">
          {/* QR Code Display */}
          <div className="retro-card bg-card rounded-lg p-8">
            <QRGenerator value={generatePaymentData()} size={250} />
            <div className="mt-6 text-center">
              <p className="text-lg font-head text-card-foreground mb-2">
                {currentUser.name}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {isConnected ? address?.slice(0, 6) + '...' + address?.slice(-4) : currentUser.username}
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="retro-button flex items-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg"
                >
                  <Copy size={16} />
                  <span>Copy Address</span>
                </button>
                <button className="retro-button flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                  <Share size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="retro-card bg-card rounded-lg p-6">
            <h3 className="text-lg font-head text-card-foreground mb-4">Payment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="retro-input w-full px-4 py-3 bg-background rounded-lg"
                  />
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="absolute right-3 top-3 bg-transparent border-none focus:ring-0 font-medium text-foreground"
                  >
                    {isConnected && symbol ? (
                      <option value={symbol}>{symbol}</option>
                    ) : (
                      mockWallets.map(wallet => (
                        <option key={wallet.id} value={wallet.symbol}>
                          {wallet.symbol}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this payment for?"
                  className="retro-input w-full px-4 py-3 bg-background rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Transaction Status */}
          {transactionStatus !== 'idle' && (
            <div className={`retro-card p-4 rounded-lg ${
              transactionStatus === 'success' 
                ? 'bg-accent text-accent-foreground' 
                : transactionStatus === 'error'
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <div className="flex items-center space-x-2">
                {transactionStatus === 'error' && <AlertCircle size={20} />}
                <p>{statusMessage}</p>
              </div>
            </div>
          )}

          {/* Manual Entry */}
          <div className="retro-card bg-card rounded-lg p-6">
            <h3 className="text-lg font-head text-card-foreground mb-4">Send {selectedCurrency}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter wallet address or scan QR code"
                  className="retro-input w-full px-4 py-3 bg-background rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="retro-input w-full px-4 py-3 bg-background rounded-lg"
                  />
                  <div className="absolute right-3 top-3 font-medium text-foreground">
                    {selectedCurrency}
                  </div>
                </div>
                {isConnected && balance && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {balance} {symbol}
                  </p>
                )}
              </div>

              <button 
                onClick={handleSendTransaction}
                disabled={isSubmitting || !isConnected}
                className={`retro-button w-full py-3 flex items-center justify-center space-x-2 ${
                  isConnected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                } rounded-lg font-medium`}
              >
                <span>Send {selectedCurrency}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* QR Scanner - Placeholder */}
          <div className="retro-card bg-card rounded-lg p-8">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-border">
              <div className="absolute inset-4 border-2 border-primary rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
              </div>
              <div className="text-center">
                <Scan size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Position QR code within the frame</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Scan any cryptocurrency payment QR code
              </p>
              <button className="retro-button px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                Enable Camera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRPage;