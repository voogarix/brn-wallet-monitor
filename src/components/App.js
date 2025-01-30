// src/App.js
import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { getTransactions } from './services/api';  // Service to fetch transactions

function App() {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address) {
      try {
        const data = await getTransactions(address);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  };

  return (
    <div>
      <h1>BRN Wallet Transaction Monitor</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your BRN wallet address"
        />
        <Button type="submit">Monitor Wallet</Button>
      </form>
      <div>
        <h2>Transactions</h2>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
