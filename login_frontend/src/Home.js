import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming the CSS is stored here

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Assuming the token is stored in localStorage; adjust if using another method
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Optionally reset any global state (if using something like Redux or Context API)
    // Redirect to login or home page
    navigate('/login');
  }
  
  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">HOME</Link>
        <span className="nav-divider">|</span>
        {token ? (
          <>
            <span className="welcome-message">Welcome, {username || 'Guest'}</span>
            <span>|</span>
            <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>Log out</span>
          </>
        ) : (
          <Link to="/login" className="nav-link">Log in</Link>
        )}
      </nav>
      <div className="content">
        <h1>Welcome to the Home Page</h1>
        {username && <p>Hello, {username}!</p>}
      </div>
    </div>
  );
}

export default Home;
