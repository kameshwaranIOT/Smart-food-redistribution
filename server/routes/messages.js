const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
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

// Send message
router.post('/', verifyToken, async (req, res) => {
  try {
    const { receiverId, content, listingId } = req.body;

    const message = new Message({
      sender: req.userId,
      receiver: receiverId,
      content,
      listingId
    });

    await message.save();
    await message.populate(['sender', 'receiver']);

    res.status(201).json(message);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get conversation between two users
router.get('/conversation/:userId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.userId }
      ]
    }).sort({ createdAt: 1 })
      .populate('sender', 'name profileImage')
      .populate('receiver', 'name profileImage');

    res.json(messages);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's inbox
router.get('/inbox', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.userId })
      .sort({ createdAt: -1 })
      .populate('sender', 'name profileImage')
      .distinct('sender');

    res.json(messages);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark message as read
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: { isRead: true } },
      { new: true }
    );

    res.json(message);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
