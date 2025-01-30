// src/utils/transactionUtils.js
import { parseISO, differenceInDays } from 'date-fns';

export const calculateMetrics = (transactions) => {
  const dailyStats = {
    total: 0,
    success: 0,
    failed: 0,
    balanceChanges: [],
  };

  transactions.forEach((tx) => {
    const txDate = parseISO(tx.timestamp);
    const currentDay = differenceInDays(new Date(), txDate);
    if (currentDay === 0) {
      if (tx.status === 'success') {
        dailyStats.success += 1;
      } else {
        dailyStats.failed += 1;
      }
      dailyStats.balanceChanges.push(tx.amount);
    }
  });

  dailyStats.total = dailyStats.success + dailyStats.failed;
  return dailyStats;
};
