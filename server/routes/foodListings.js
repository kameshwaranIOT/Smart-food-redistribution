const express = require('express');
const router = express.Router();
const FoodListing = require('../models/FoodListing');
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

// Create food listing
router.post('/', verifyToken, async (req, res) => {
  try {
    const { foodType, description, quantity, expiryDate, pickupLocation, availableFrom, availableUntil, restrictions } = req.body;

    const listing = new FoodListing({
      donor: req.userId,
      foodType,
      description,
      quantity,
      expiryDate,
      pickupLocation,
      availableFrom,
      availableUntil,
      restrictions
    });

    await listing.save();
    await listing.populate('donor', 'name phone address');

    res.status(201).json(listing);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all available listings
router.get('/available', async (req, res) => {
  try {
    const listings = await FoodListing.find({ status: 'available' })
      .populate('donor', 'name phone address latitude longitude rating')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id)
      .populate('donor', 'name phone address email latitude longitude rating');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update listing
router.put('/:id', verifyToken, async (req, res) => {
  try {
    let listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.donor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    listing = await FoodListing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(listing);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete listing
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.donor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await FoodListing.findByIdAndRemove(req.params.id);

    res.json({ message: 'Listing deleted' });
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
