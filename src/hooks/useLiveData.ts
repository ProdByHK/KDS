'use client';

import { useState, useEffect } from 'react';

interface NetworkMetrics {
  transactions: number;
  users: number;
  volume: number;
  uptime: number;
  alerts: number;
}

export function useLiveData() {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    transactions: 245800,
    users: 12490,
    volume: 84200000,
    uptime: 99.99,
    alerts: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        // Transactions naturally go up rapidly
        const transactionJump = Math.floor(Math.random() * 50) + 10;
        
        // Volume fluctuates more wildly (buying/selling)
        const volumeShift = (Math.random() - 0.45) * 50000;
        
        // Occasional user growth or slight drop
        const userShift = Math.floor(Math.random() * 5) - 1;

        return {
          ...prev,
          transactions: prev.transactions + transactionJump,
          volume: prev.volume + volumeShift,
          users: prev.users + userShift,
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Formatters for display
  const formatters = {
    formatCompactNumber: (num: number) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
      return num.toString();
    },
    formatCurrency: (num: number) => {
      if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return '$' + (num / 1000).toFixed(1) + 'k';
      return '$' + num.toString();
    },
    formatNumberLocale: (num: number) => {
      return num.toLocaleString();
    }
  };

  return { metrics, formatters };
}
