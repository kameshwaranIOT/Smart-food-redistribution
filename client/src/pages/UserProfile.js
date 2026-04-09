import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(response.data);
    } catch(err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  if (!user) {
    return <div className="container"><p>User not found</p></div>;
  }

  return (
    <div className="user-profile">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="role-badge">{user.role}</p>
              {user.organization && <p><strong>Organization:</strong> {user.organization}</p>}
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.round(user.rating || 5))}</span>
                ({user.rating || 5}/5 - {user.isVerified ? 'Verified' : 'Unverified'})
              </div>
            </div>
          </div>

          <div className="profile-details">
            <h2>Contact Information</h2>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            {user.phone && (
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="detail-row">
                <span className="label">Address:</span>
                <span className="value">{user.address}</span>
              </div>
            )}
            {user.latitude && user.longitude && (
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{user.latitude}, {user.longitude}</span>
              </div>
            )}
          </div>

          {user.bio && (
            <div className="profile-bio">
              <h2>About</h2>
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-actions">
            <button className="btn-primary">
              <i className="fas fa-envelope"></i> Send Message
            </button>
            <button className="btn-secondary">
              <i className="fas fa-phone"></i> Contact
            </button>
          </div>
        </div>

        <div className="user-stats">
          <h2>Activity Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Member Since</h3>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="stat">
              <h3>Verification Status</h3>
              <p>{user.isVerified ? '✓ Verified' : '✗ Unverified'}</p>
            </div>
            <div className="stat">
              <h3>Rating</h3>
              <p>{user.rating || 5}/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
