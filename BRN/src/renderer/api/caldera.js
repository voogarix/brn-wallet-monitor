export const fetchTransactions = async (address) => {
    const response = await fetch(
      `https://api.calderaexplorer.com/v1/address/${address}/transactions`,
      {
        headers: {
          'X-API-Key': process.env.CALDERA_API_KEY
        }
      }
    );
  
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  };