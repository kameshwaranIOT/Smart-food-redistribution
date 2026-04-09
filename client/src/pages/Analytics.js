import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/dashboard');
      setAnalytics(response.data);
    } catch(err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  if (!analytics) {
    return <div className="container"><p>No data available</p></div>;
  }

  return (
    <div className="analytics">
      <div className="container">
        <h1>Analytics Dashboard</h1>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <h3>Total Listings</h3>
            <p className="metric-value">{analytics.totalListings}</p>
            <small>Active food listings</small>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🤝</div>
            <h3>Matches Made</h3>
            <p className="metric-value">{analytics.totalMatches}</p>
            <small>Donor-recipient connections</small>
          </div>

          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <h3>Completed</h3>
            <p className="metric-value">{analytics.completedMatches}</p>
            <small>Successful deliveries</small>
          </div>

          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <h3>Active Users</h3>
            <p className="metric-value">{analytics.activeUsers}</p>
            <small>Platform members</small>
          </div>

          <div className="metric-card success-rate">
            <div className="metric-icon">📈</div>
            <h3>Success Rate</h3>
            <p className="metric-value">{analytics.successRate}%</p>
            <small>Match completion rate</small>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <h3>Efficiency</h3>
            <p className="metric-value">
              {analytics.totalMatches > 0 ? ((analytics.completedMatches / analytics.totalMatches) * 100).toFixed(1) : '0'}%
            </p>
            <small>Operational efficiency</small>
          </div>
        </div>

        <div className="details-section">
          <h2>Food Distribution by Type</h2>
          <div className="food-types-grid">
            {analytics.byFoodType && Object.entries(analytics.byFoodType).map(([type, data]) => (
              <div key={type} className="food-type-card">
                <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                <p className="count">{data[0]?.count || 0}</p>
                <small>listings</small>
              </div>
            ))}
          </div>
        </div>

        <div className="insights-section">
          <h2>Key Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Performance</h4>
              <p>
                {analytics.successRate >= 80 ? '✓ Excellent' : '⚠ Good'} success rate with {analytics.completedMatches} successful deliveries
              </p>
            </div>
            <div className="insight-card">
              <h4>Engagement</h4>
              <p>
                {analytics.activeUsers} active users are participating in food redistribution efforts
              </p>
            </div>
            <div className="insight-card">
              <h4>Impact</h4>
              <p>
                {analytics.totalMatches} matches have been made, connecting donors with recipients
              </p>
            </div>
            <div className="insight-card">
              <h4>Activity</h4>
              <p>
                {analytics.totalListings} active listings available for recipients to discover
              </p>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="btn-primary" onClick={fetchAnalytics}>
            <i className="fas fa-sync"></i> Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
