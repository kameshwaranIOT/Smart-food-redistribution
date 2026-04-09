const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const FoodListing = require('../models/FoodListing');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Find matches for a food listing
router.post('/find/:listingId', async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.listingId).populate('donor');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Find potential recipients
    const recipients = await User.find({ role: 'recipient' });

    // Calculate match scores
    const matches = recipients.map(recipient => {
      const distance = calculateDistance(
        listing.pickupLocation.latitude,
        listing.pickupLocation.longitude,
        recipient.latitude,
        recipient.longitude
      );

      // Simple matching score based on distance (closer = better)
      const matchScore = Math.max(0, 100 - distance);

      return {
        foodListing: listing._id,
        donor: listing.donor._id,
        recipient: recipient._id,
        distance: Math.round(distance * 10) / 10,
        matchScore: Math.round(matchScore)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches.slice(0, 10)); // Return top 10 matches
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a match
router.post('/', verifyToken, async (req, res) => {
  try {
    const { foodListingId, recipientId } = req.body;

    const listing = await FoodListing.findById(foodListingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const match = new Match({
      foodListing: foodListingId,
      donor: listing.donor,
      recipient: recipientId,
      status: 'pending'
    });

    await match.save();
    res.status(201).json(match);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's matches
router.get('/user/:userId', async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ donor: req.params.userId }, { recipient: req.params.userId }]
    }).populate('foodListing').populate('donor', 'name').populate('recipient', 'name');

    res.json(matches);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update match status
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { status, pickupDateTime } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: { status, pickupDateTime } },
      { new: true }
    );

    if (status === 'completed') {
      match.completedAt = new Date();
      await match.save();
    }

    res.json(match);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
