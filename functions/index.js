const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const realtimeDb = admin.database();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes from server
const authRoutes = require("../server/routes/auth");
const foodListingRoutes = require("../server/routes/foodListings");
const userRoutes = require("../server/routes/users");
const matchingRoutes = require("../server/routes/matching");
const messagesRoutes = require("../server/routes/messages");
const analyticsRoutes = require("../server/routes/analytics");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/food-listings", foodListingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/analytics", analyticsRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Smart Food Redistribution API 🚀");
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal server error", 
    error: process.env.NODE_ENV === "production" ? "Server error" : err.message 
  });
});

// Export the Express app as a Cloud Function
exports.api = functions
  .region("asia-southeast1")
  .https.onRequest(app);

// Optional: Export Firestore trigger for analytics
exports.updateAnalyticsOnFoodListing = functions
  .region("asia-southeast1")
  .firestore.document("foodListings/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    // Update analytics
    await realtimeDb.ref("analytics/total_listings").transaction(current => {
      return (current || 0) + 1;
    });
    
    console.log("New food listing created:", {
      id: context.params.docId,
      donor: data.donorName,
      quantity: data.quantity,
      timestamp: new Date()
    });
    
    return null;
  });

// Optional: Export Firestore trigger for user activity
exports.trackUserActivity = functions
  .region("asia-southeast1")
  .firestore.document("users/{docId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    
    if (newData.activeListing !== previousData.activeListing) {
      console.log(`User ${context.params.docId} activity updated`);
    }
    
    return null;
  });
