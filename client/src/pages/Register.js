import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch(err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Smart Food Redistribution</h1>
        <h2>Create Account</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="donor">Donor (Sharing Food)</option>
              <option value="recipient">Recipient (Receiving Food)</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                step="0.000001"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="0.000001"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
