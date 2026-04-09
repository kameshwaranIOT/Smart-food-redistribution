# Smart Food Redistribution - Complete Startup Guide

## Quick Start

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string

### Step 3: Setup Environment Variables

Create `.env` file in the `server` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-food-redistribution
JWT_SECRET=my-super-secret-key-12345-change-this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Step 4: Start Backend Server

```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Step 5: Install Frontend Dependencies

Open a **new terminal window** and run:

```bash
cd client
npm install
```

### Step 6: Start Frontend Application

```bash
cd client
npm start
```

This will automatically open http://localhost:3000 in your browser.

---

## Testing the Application

### 1. Create Test Accounts

#### Donor Account
- **Email**: donor@test.com
- **Password**: password123
- **Role**: Donor
- **Address**: 123 Main St, Downtown
- **Latitude**: 40.7128
- **Longitude**: -74.0060

#### Recipient Account
- **Email**: recipient@test.com
- **Password**: password123
- **Role**: Recipient
- **Address**: 456 Oak Ave, Uptown
- **Latitude**: 40.7580
- **Longitude**: -73.9855

### 2. Test Food Listing
1. Login as Donor
2. Click "Share Food" button
3. Fill in form:
   - Food Type: Vegetables
   - Description: Fresh organic tomatoes
   - Quantity: 5 kg
   - Address: 123 Main St, Downtown
4. Click "Create Listing"

### 3. Test Browsing
1. Login as Recipient
2. Click "Browse Food"
3. View available listings
4. Click "Message Donor"

### 4. Test Messaging
1. Login as either user
2. Click "Messages"
3. Select a conversation
4. Type and send messages

---

## Troubleshooting

### Frontend Not Starting

**Error: "Cannot find module 'react-scripts'"**
```bash
cd client
npm install react-scripts
npm start
```

**Error: "Port 3000 already in use"**
```bash
# Kill process on port 3000
# On Windows Command Prompt:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On PowerShell:
Get-Process | Where-Object {$_.Listening -and $_.LocalAddress -eq "127.0.0.1:3000"}
```

### Backend Not Starting

**Error: "Cannot find module 'express'"**
```bash
cd server
npm install
```

**Error: "MongoDB connection failed"**
- Make sure MongoDB is running
- Check MONGODB_URI in .env matches your setup
- If using Atlas, ensure IP whitelist includes your machine

### API Connection Errors

**Error: "Failed to fetch"**
1. Ensure backend is running on port 5000
2. Check browser console (F12) for error details
3. Verify CORS is enabled (it is by default)

**Error: "Network Error"**
- Check backend is actually running
- Verify API URL in browser DevTools Network tab
- Check firewall isn't blocking port 5000

---

## API Health Check

### Test Backend is Working

Open your browser and visit:
```
http://localhost:5000/api/auth/verify
```

Should return:
```json
{"message": "No token provided"}
```

This means the API is accessible.

---

## Full Project Structure

```
smart-food-redistribution/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── FoodListing.js
│   │   ├── Message.js
│   │   ├── Match.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── foodListings.js
│   │   ├── users.js
│   │   ├── matching.js
│   │   ├── messages.js
│   │   └── analytics.js
│   ├── server.js
│   ├── package.json
│   └── .env (create this)
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── FoodListings.js
│   │   │   ├── CreateListing.js
│   │   │   ├── UserProfile.js
│   │   │   ├── Messages.js
│   │   │   └── Analytics.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── *.css files
│   └── package.json
│
├── README.md
├── SETUP.md
├── STARTUP.md (this file)
└── .gitignore
```

---

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET | /api/food-listings/available | Get all listings |
| POST | /api/food-listings | Create listing |
| GET | /api/messages/inbox | Get messages |
| POST | /api/messages | Send message |
| GET | /api/analytics/dashboard | Get analytics |

---

## Useful Commands

```bash
# Backend
cd server
npm install          # Install dependencies
npm start           # Start production
npm run dev         # Start with auto-reload

# Frontend
cd client
npm install         # Install dependencies
npm start           # Start dev server
npm run build       # Create production build

# Database
# Start MongoDB (varies by OS)
# macOS: brew services start mongodb-community
# Windows: Use MongoDB Compass or services
```

---

## Browser DevTools Tips

Press **F12** to open Developer Tools:

**Console Tab**: Shows JavaScript errors
**Network Tab**: Shows API calls and responses
**Application Tab**: Shows localStorage (stored tokens)
**Elements Tab**: Shows HTML structure

---

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 3000
3. ✅ Create test accounts
4. ✅ Test all features
5. Deploy to production (see README.md)

---

## Still Having Issues?

Check these common problems:

- [ ] MongoDB is actually running
- [ ] .env file exists in server folder
- [ ] node_modules folders exist in both server and client
- [ ] Ports 3000 and 5000 are not blocked by firewall
- [ ] No leftover npm processes from previous attempts
- [ ] Check browser console for JavaScript errors (F12)
- [ ] Check terminal output for server errors

Good luck! 🚀
