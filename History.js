import React, { useEffect, useState } from 'react';

function History() {
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions");
        const data = await res.json();

        const grouped = {};

        data.forEach(({ date, amount }) => {
          const dt = new Date(date);
          if (isNaN(dt)) return; // skip invalid dates

          const monthKey = dt.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          });

          if (!grouped[monthKey]) {
            grouped[monthKey] = 0;
          }

          grouped[monthKey] += amount;
        });

        setMonthlyTotals(grouped);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Monthly Spending Summary</h2>

      {loading ? (
        <p>Loading transactions...</p>
      ) : Object.keys(monthlyTotals).length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(monthlyTotals).map(([month, total]) => (
            <li key={month} style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              fontSize: '18px'
            }}>
              <strong>{month}:</strong> ₹{total.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
