import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate(); // 🧭 Navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, amount }),
    });

    const data = await response.json();
    alert(data.message);
    setDate('');
    setAmount('');
  };

  const loGin = () => {
    navigate('/login'); // 🔁 Redirect to Login page
  };

  const signUp = () => {
    alert("Signup clicked");
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <a href="/Transactions">History</a>
          <a href="/Budget">Budget</a>
        </div>
        <div className="nav-right">
          <button className="logIn" onClick={loGin}>Log In</button>
          <button className="signUp" onClick={signUp}>Sign Up</button>
        </div>
      </nav>

      <h1>Enter the transactions that happened today</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Date">Enter the Date</label>
        <input
          type="date"
          id="Date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="transaction">Add the total amount you spent today</label>
        <input
          type="number"
          id="transaction"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;