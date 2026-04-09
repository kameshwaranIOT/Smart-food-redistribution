import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FoodListings from './pages/FoodListings';
import CreateListing from './pages/CreateListing';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar user={currentUser} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard user={currentUser} /> : <Navigate to="/login" />} />
          <Route path="/listings" element={isAuthenticated ? <FoodListings /> : <Navigate to="/login" />} />
          <Route path="/create-listing" element={isAuthenticated ? <CreateListing /> : <Navigate to="/login" />} />
          <Route path="/profile/:userId" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/messages" element={isAuthenticated ? <Messages currentUserId={currentUser?.id} /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={isAuthenticated && currentUser?.role === 'organizer' ? <Analytics /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
