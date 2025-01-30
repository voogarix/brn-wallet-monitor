export const processTransactions = (transactions) => {
    const dailyData = transactions.reduce((acc, tx) => {
      const date = new Date(tx.timestamp).toISOString().split('T')[0];
      
      if (!acc[date]) {
        acc[date] = {
          success: 0,
          failed: 0,
          balanceChange: 0
        };
      }
  
      tx.status === 'success' ? acc[date].success++ : acc[date].failed++;
      acc[date].balanceChange += tx.amount;
  
      return acc;
    }, {});
  
    const successRate = (
      (Object.values(dailyData).reduce((sum, day) => sum + day.success, 0) /
      transactions.length) * 100
    ).toFixed(2);
  
    return {
      dailyBalance: Object.entries(dailyData).reduce((acc, [date, data]) => {
        acc[date] = data.balanceChange;
        return acc;
      }, {}),
      totalTransactions: transactions.length,
      successRate: isNaN(successRate) ? 0 : successRate
    };
  };