import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateListing.css';

function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: 'vegetables',
    description: '',
    quantity: { value: '', unit: 'kg' },
    expiryDate: '',
    pickupLocation: {
      address: '',
      latitude: '',
      longitude: ''
    },
    availableFrom: '',
    availableUntil: '',
    restrictions: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [child]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/food-listings', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/listings');
    } catch(err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing">
      <div className="container">
        <div className="form-wrapper">
          <h1>Share Your Food</h1>
          {error && <div className="alert alert-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Food Details</h2>
              
              <div className="form-group">
                <label>Food Type *</label>
                <select name="foodType" value={formData.foodType} onChange={handleChange} required>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="bakery">Bakery</option>
                  <option value="prepared">Prepared Meals</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the food (e.g., 'Fresh organic tomatoes, non-GMO')"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity.value}
                    onChange={(e) => handleNestedChange('quantity', 'value', e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select value={formData.quantity.unit} onChange={(e) => handleNestedChange('quantity', 'unit', e.target.value)}>
                    <option value="kg">Kilograms</option>
                    <option value="lbs">Pounds</option>
                    <option value="pieces">Pieces</option>
                    <option value="liters">Liters</option>
                    <option value="gallons">Gallons</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Pickup Location</h2>
              
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  value={formData.pickupLocation.address}
                  onChange={(e) => handleNestedChange('pickupLocation', 'address', e.target.value)}
                  placeholder="123 Main Street, City"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.pickupLocation.latitude}
                    onChange={(e) => handleNestedChange('pickupLocation', 'latitude', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.pickupLocation.longitude}
                    onChange={(e) => handleNestedChange('pickupLocation', 'longitude', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Availability</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Available From</label>
                  <input
                    type="datetime-local"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Available Until</label>
                  <input
                    type="datetime-local"
                    name="availableUntil"
                    value={formData.availableUntil}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary btn-large" disabled={loading}>
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
