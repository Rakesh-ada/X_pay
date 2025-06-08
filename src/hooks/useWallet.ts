import { useState, useCallback, useEffect } from 'react';
import { 
  useAccount, 
  useBalance, 
  useChainId,
  useWriteContract,
  useSendTransaction
} from 'wagmi';
import { parseEther, formatEther } from 'viem';

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get native token balance (ETH, MATIC, etc.)
  const { data: balanceData } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
    }
  });

  // Function to send native tokens (ETH, MATIC, etc.)
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();
  
  const sendTransaction = useCallback(async (
    to: string, 
    amount: string, 
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    if (!address || !isConnected) {
      setError('Wallet not connected');
      onError?.(new Error('Wallet not connected'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert amount to wei
      const value = parseEther(amount);
      
      // Send native token transaction (ETH, MATIC, etc.)
      const hash = await sendTransactionAsync({
        to: to as `0x${string}`,
        value,
      });
      
      onSuccess?.();
      return hash;
    } catch (err) {
      console.error('Transaction error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      onError?.(err instanceof Error ? err : new Error('Transaction failed'));
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, sendTransactionAsync]);

  // Function to send ERC20 tokens
  const sendToken = useCallback(async (
    tokenAddress: string,
    to: string,
    amount: string,
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    if (!address || !isConnected) {
      setError('Wallet not connected');
      onError?.(new Error('Wallet not connected'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert amount to wei
      const value = parseEther(amount);
      
      // Send ERC20 token
      const hash = await writeContractAsync({
        abi: [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'value', type: 'uint256' }
            ],
            outputs: [{ type: 'bool' }]
          }
        ],
        address: tokenAddress as `0x${string}`,
        functionName: 'transfer',
        args: [to as `0x${string}`, value]
      });
      
      onSuccess?.();
      return hash;
    } catch (err) {
      console.error('Token transfer error:', err);
      setError(err instanceof Error ? err.message : 'Token transfer failed');
      onError?.(err instanceof Error ? err : new Error('Token transfer failed'));
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, writeContractAsync]);

  return {
    address,
    isConnected,
    chainId,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol,
    isLoading,
    error,
    sendTransaction,
    sendToken
  };
};

export default useWallet; 