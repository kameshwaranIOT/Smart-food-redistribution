const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Initialize Firebase
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();
const realtimeDb = admin.database();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

console.log('✅ Firebase initialized successfully');

// Import routes
const authRoutes = require('./routes/auth');
const foodListingRoutes = require('./routes/foodListings');
const userRoutes = require('./routes/users');
const matchingRoutes = require('./routes/matching');
const messagesRoutes = require('./routes/messages');
const analyticsRoutes = require('./routes/analytics');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/food-listings', foodListingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Socket.IO for real-time messaging
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io, db, realtimeDb };
