import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, listingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/dashboard'),
        axios.get('http://localhost:5000/api/food-listings/available')
      ]);
      setStats(analyticsRes.data);
      setRecentListings(listingsRes.data.slice(0, 6));
    } catch(err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {user?.name}!</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Listings</h3>
            <p className="stat-number">{stats?.totalListings || 0}</p>
            <small>Active food listings</small>
          </div>
          <div className="stat-card">
            <h3>Matches</h3>
            <p className="stat-number">{stats?.totalMatches || 0}</p>
            <small>Food matched with recipients</small>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{stats?.completedMatches || 0}</p>
            <small>Successful deliveries</small>
          </div>
          <div className="stat-card">
            <h3>Success Rate</h3>
            <p className="stat-number">{stats?.successRate || 0}%</p>
            <small>Completion rate</small>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Food Listings</h2>
            <Link to="/listings" className="btn-secondary">View All</Link>
          </div>
          <div className="listings-grid">
            {recentListings.map(listing => (
              <div key={listing._id} className="listing-card">
                <h3>{listing.description}</h3>
                <p><strong>Type:</strong> {listing.foodType}</p>
                <p><strong>Quantity:</strong> {listing.quantity?.value} {listing.quantity?.unit}</p>
                <p><strong>Location:</strong> {listing.pickupLocation?.address}</p>
                <p><strong>Donor:</strong> {listing.donor?.name}</p>
                {listing.expiryDate && (
                  <p><strong>Expires:</strong> {new Date(listing.expiryDate).toLocaleDateString()}</p>
                )}
                <span className={`status ${listing.status}`}>
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/create-listing" className="btn-primary">
            <i className="fas fa-plus"></i> Share Food
          </Link>
          <Link to="/listings" className="btn-primary">
            <i className="fas fa-search"></i> Find Food
          </Link>
          <Link to="/messages" className="btn-primary">
            <i className="fas fa-envelope"></i> Messages
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
