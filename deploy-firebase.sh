#!/bin/bash

# Firebase Deployment Script
# Run with: bash deploy-firebase.sh

set -e

echo "🚀 Smart Food Redistribution - Firebase Deployment"
echo "=================================================="

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not installed. Installing..."
    npm install -g firebase-tools
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed"
    exit 1
fi

echo "✅ Prerequisites verified"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
cd client
npm install
cd ..

echo "✅ Client dependencies installed"
echo ""

# Step 2: Build frontend
echo "🔨 Building React app..."
cd client
npm run build
cd ..

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi
echo ""

# Step 3: Install functions dependencies
echo "⚙️  Setting up Cloud Functions..."
cd functions
npm install
cd ..

echo "✅ Cloud Functions dependencies installed"
echo ""

# Step 4: Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --project smart-food-redistributio-a1ad7

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔗 Live URLs:"
    echo "   Frontend: https://smart-food-redistributio-a1ad7.web.app"
    echo "   API: https://asia-southeast1-smart-food-redistributio-a1ad7.cloudfunctions.net/api"
    echo ""
    echo "📊 Monitor at: https://console.firebase.google.com/project/smart-food-redistributio-a1ad7"
else
    echo "❌ Deployment failed"
    exit 1
fi