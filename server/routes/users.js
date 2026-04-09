const express = require('express');
const router = express.Router();
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

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get current user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.params.id !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get users by role
router.get('/role/:role', async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).select('-password');
    res.json(users);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Search users by location
router.post('/search/nearby', async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.body;

    const users = await User.find({
      latitude: { $gte: latitude - maxDistance, $lte: latitude + maxDistance },
      longitude: { $gte: longitude - maxDistance, $lte: longitude + maxDistance }
    }).select('-password');

    res.json(users);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
