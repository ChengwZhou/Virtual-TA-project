import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import './App.css'; 

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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
