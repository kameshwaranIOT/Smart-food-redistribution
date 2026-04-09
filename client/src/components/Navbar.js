import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-apple-alt"></i> Smart Food
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/listings" className="nav-link">Browse Food</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-listing" className="nav-link">Share Food</Link>
          </li>
          <li className="nav-item">
            <Link to="/messages" className="nav-link">
              <i className="fas fa-envelope"></i> Messages
            </Link>
          </li>
          {user?.role === 'organizer' && (
            <li className="nav-item">
              <Link to="/analytics" className="nav-link">Analytics</Link>
            </li>
          )}
          <li className="nav-item">
            <Link to={`/profile/${user?.id}`} className="nav-link">
              <i className="fas fa-user"></i> {user?.name}
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
