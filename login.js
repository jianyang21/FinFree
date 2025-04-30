import './index.css';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
    } else {
      alert(`Logging in as: ${username}`);
      // Add backend login call here if needed
    }
  };

  return (
    <div>
      <div className="LogIN">
        <h4>Enter your Details</h4>
        <input
          type="text"
          placeholder="Enter your account name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="Login" onClick={validateLogin}>
          Log in
        </button>
        <a className="Forgot" href="#">
          Forgotten Password?
        </a>
      </div>
    </div>
  );
}

export default Login;


