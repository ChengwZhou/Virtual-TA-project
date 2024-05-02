import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMain from './components/HomeMain';
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
      
      
      <div>
        {/* <h3>Chat with virtual TA here!</h3> */}
        <HomeMain />
      </div>
    </div>
  );
}

export default Home;
