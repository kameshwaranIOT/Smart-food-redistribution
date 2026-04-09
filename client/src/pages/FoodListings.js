import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FoodListings.css';

function FoodListings() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    foodType: '',
    status: 'available'
  });

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, filters]);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/food-listings/available');
      setListings(response.data);
    } catch(err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = listings;

    if (filters.foodType) {
      filtered = filtered.filter(l => l.foodType === filters.foodType);
    }

    if (filters.status) {
      filtered = filtered.filter(l => l.status === filters.status);
    }

    setFilteredListings(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="food-listings">
      <div className="container">
        <h1>Browse Available Food</h1>

        <div className="filters">
          <div className="filter-group">
            <label>Food Type</label>
            <select name="foodType" value={filters.foodType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="bakery">Bakery</option>
              <option value="prepared">Prepared</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <p className="results-count">Showing {filteredListings.length} listings</p>

        <div className="listings-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <div key={listing._id} className="listing-card-large">
                <div className="listing-header">
                  <h2>{listing.description}</h2>
                  <span className={`status ${listing.status}`}>{listing.status}</span>
                </div>

                <div className="listing-body">
                  <p><strong>Type:</strong> {listing.foodType}</p>
                  <p><strong>Quantity:</strong> {listing.quantity?.value} {listing.quantity?.unit}</p>
                  
                  {listing.expiryDate && (
                    <p><strong>Expires:</strong> {new Date(listing.expiryDate).toLocaleDateString()}</p>
                  )}

                  <div className="donor-info">
                    <h4>{listing.donor?.name}</h4>
                    <p><i className="fas fa-map-marker-alt"></i> {listing.pickupLocation?.address}</p>
                    <p><i className="fas fa-phone"></i> {listing.donor?.phone}</p>
                    <div className="rating">
                      <span className="stars">{'★'.repeat(Math.round(listing.donor?.rating || 5))}</span>
                      ({listing.donor?.rating || 5}/5)
                    </div>
                  </div>

                  {listing.restrictions && listing.restrictions.length > 0 && (
                    <div className="restrictions">
                      <strong>Restrictions:</strong>
                      <div className="tags">
                        {listing.restrictions.map((r, i) => (
                          <span key={i} className="tag">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="listing-footer">
                  <Link to={`/profile/${listing.donor?._id}`} className="btn-secondary">
                    View Donor
                  </Link>
                  <button className="btn-primary">Message Donor</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No listings match your filters</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodListings;
