import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
      <Box>
        {/* <Link to="/" style={{ marginRight: 4 }}>HOME</Link>
        <Link to="/bots" style={{ marginRight: 4 }}>Bots</Link> */}
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
            HOME
        </Link>
        <Link underline="hover" color="inherit" href="/bots">
            Bots
        </Link>
        
        </Breadcrumbs>
      </Box>
      <Box>
        {token ? (
          <>
            <span style={{ marginRight: 4 }}>Welcome, {username || 'Guest'}</span>
            <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Log out</span>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
