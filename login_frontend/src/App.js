import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './Home';
import BotsPage from './components/BotsPage/BotsPage';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <Router>
      <div>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bots" element={<BotsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

