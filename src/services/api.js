// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://brn.explorer.caldera.xyz/api';

export const getTransactions = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/address/${address}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const startPolling = (address, callback) => {
    setInterval(async () => {
      try {
        const data = await getTransactions(address);
        callback(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }, 30000); // Poll every 30 seconds
  };