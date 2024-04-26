// Login.js
import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './Login.css';
import { TextField, Button, Typography, Container, Box } from '@mui/material';


function Login() {
  const [username, setUsername] = useState('');  // State Hook
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        navigate('/');
    } else {
        console.error('Sorry, your username and password do not match. ');
    }
  };

  return (
    <div className="login-container">
        <Link to="/" className="home-link">HOME</Link> 
        <h2>Welcome. Please sign in to continue.</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control"
                />
            </div>
            <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="signup-prompt">
            Do not have an account? <Link to="/register" className="signup-link">Sign Up</Link>
        </p>
    </div>

  );
}


export default Login;
