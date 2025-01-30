import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchTransactions } from '../api/caldera';
import { processTransactions } from '../utils/processor';
import { validateBRNAddress } from '../utils/validation';

export default function App() {
  const [address, setAddress] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!validateBRNAddress(address)) {
      setError('Invalid BRN address format');
      return;
    }

    try {
      const transactions = await fetchTransactions(address);
      setMetrics(processTransactions(transactions));
      setError('');
    } catch (err) {
      setError('Failed to fetch transactions');
    }
  };

  return (
    <div className="container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter BRN Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleSubmit}>Track Wallet</button>
        {error && <div className="error">{error}</div>}
      </div>

      {metrics && (
        <div className="dashboard">
          <div className="chart-container">
            <Line
              data={{
                labels: Object.keys(metrics.dailyBalance),
                datasets: [{
                  label: 'Balance History',
                  data: Object.values(metrics.dailyBalance),
                  borderColor: '#4CAF50',
                  tension: 0.1
                }]
              }}
            />
          </div>
          
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Total Transactions</h3>
              <p>{metrics.totalTransactions}</p>
            </div>
            <div className="stat-box">
              <h3>Success Rate</h3>
              <p>{metrics.successRate}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}