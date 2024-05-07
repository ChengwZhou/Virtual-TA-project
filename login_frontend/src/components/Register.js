import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './Register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    });

    if (response.ok) {
      setMessage('Successfully registered!');
      navigate('/login');  
    } else {
      const error = await response.text();
      setMessage(error || 'Failed, please try again!');
    }
  };

  return (
    <div className="register-container">
      <Link to="/" className="home-link">HOME</Link> 
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p className="signin-prompt">
            Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
