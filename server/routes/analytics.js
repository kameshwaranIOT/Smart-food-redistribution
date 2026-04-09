const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const FoodListing = require('../models/FoodListing');
const Match = require('../models/Match');
const User = require('../models/User');

// Get analytics dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalListings = await FoodListing.countDocuments();
    const totalMatches = await Match.countDocuments();
    const completedMatches = await Match.countDocuments({ status: 'completed' });
    const activeUsers = await User.countDocuments();

    const matchesByFoodType = await FoodListing.aggregate([
      { $facet: {
        vegetables: [{ $match: { foodType: 'vegetables' } }, { $count: 'count' }],
        fruits: [{ $match: { foodType: 'fruits' } }, { $count: 'count' }],
        grains: [{ $match: { foodType: 'grains' } }, { $count: 'count' }],
        dairy: [{ $match: { foodType: 'dairy' } }, { $count: 'count' }],
        meat: [{ $match: { foodType: 'meat' } }, { $count: 'count' }],
        bakery: [{ $match: { foodType: 'bakery' } }, { $count: 'count' }],
        prepared: [{ $match: { foodType: 'prepared' } }, { $count: 'count' }],
        other: [{ $match: { foodType: 'other' } }, { $count: 'count' }]
      }}
    ]);

    const successRate = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;

    const analytics = {
      totalListings,
      totalMatches,
      completedMatches,
      activeUsers,
      successRate: Math.round(successRate),
      byFoodType: matchesByFoodType[0]
    };

    res.json(analytics);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get historical analytics
router.get('/history', async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 }).limit(30);
    res.json(analytics);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Save daily analytics
router.post('/record', async (req, res) => {
  try {
    const totalListings = await FoodListing.countDocuments();
    const totalMatches = await Match.countDocuments();
    const completedMatches = await Match.countDocuments({ status: 'completed' });
    const activeUsers = await User.countDocuments();

    const analytics = new Analytics({
      totalListings,
      totalMatches,
      completedMatches,
      activeUsers,
      successRate: totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0
    });

    await analytics.save();
    res.status(201).json(analytics);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
