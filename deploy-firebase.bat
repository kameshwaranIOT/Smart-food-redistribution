@echo off
REM Firebase Deployment Script for Windows
REM Run with: deploy-firebase.bat

echo.
echo 🚀 Smart Food Redistribution - Firebase Deployment
echo ==================================================
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not installed
    exit /b 1
)

echo ✅ Prerequisites verified
echo.

REM Step 1: Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
cd ..

if errorlevel 1 (
    echo ❌ Client installation failed
    exit /b 1
)

echo ✅ Client dependencies installed
echo.

REM Step 2: Build frontend
echo 🔨 Building React app...
cd client
call npm run build
cd ..

if errorlevel 1 (
    echo ❌ Frontend build failed
    exit /b 1
)

echo ✅ Frontend built successfully
echo.

REM Step 3: Install functions dependencies
echo ⚙️  Setting up Cloud Functions...
cd functions
call npm install
cd ..

echo ✅ Cloud Functions dependencies installed
echo.

REM Step 4: Deploy to Firebase
echo 🚀 Deploying to Firebase...
call firebase deploy --project smart-food-redistributio-a1ad7

if errorlevel 1 (
    echo ❌ Deployment failed
    exit /b 1
)

echo.
echo ✅ Deployment successful!
echo.
echo 🔗 Live URLs:
echo    Frontend: https://smart-food-redistributio-a1ad7.web.app
echo    API: https://asia-southeast1-smart-food-redistributio-a1ad7.cloudfunctions.net/api
echo.
echo 📊 Monitor at: https://console.firebase.google.com/project/smart-food-redistributio-a1ad7
echo.
