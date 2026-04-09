# Smart Food Redistribution - Setup Checklist

## Initial Setup

### 1. MongoDB Setup
- [ ] Install MongoDB Community Edition or use MongoDB Atlas
- [ ] Create database: `smart-food-redistribution`
- [ ] Update `MONGODB_URI` in `.env`

### 2. Backend Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Update `JWT_SECRET` with a strong random key
- [ ] Verify `PORT` is set to 5000
- [ ] Install dependencies: `cd server && npm install`
- [ ] Start server: `npm run dev`

### 3. Frontend Configuration
- [ ] Update API base URL if needed (default: http://localhost:5000)
- [ ] Install dependencies: `cd client && npm install`
- [ ] Start client: `npm start`

## Testing the Platform

### Create Test Users
1. **Register a Donor**
   - Name: John Smith
   - Email: donor@example.com
   - Role: Donor
   - Address: 123 Main St, City
   - Lat/Long: 40.7128, -74.0060

2. **Register a Recipient**
   - Name: Jane Doe
   - Email: recipient@example.com
   - Role: Recipient
   - Address: 456 Oak Ave, City
   - Lat/Long: 40.7580, -73.9855

3. **Register an Organizer**
   - Name: Admin User
   - Email: admin@example.com
   - Role: Organizer

### Test Features
- [ ] Login with each user role
- [ ] Create food listings as donor
- [ ] Browse listings as recipient
- [ ] Send messages between users
- [ ] Check matching algorithm
- [ ] View analytics dashboard

## Production Deployment

### Environment Variables to Change
```
JWT_SECRET=generate_new_secret_key
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
CLIENT_URL=your_production_domain
```

### Recommended Deployments
- **Backend**: Heroku, AWS, DigitalOcean, Render
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: MongoDB Atlas, AWS DocumentDB

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Check if port 5000 is available

### Frontend won't connect to API
- Verify backend is running on port 5000
- Check CORS settings in `server.js`
- Check browser console for errors

### Messages not working
- Verify Socket.IO is initialized
- Check WebSocket connection in browser DevTools
- Ensure CORS origins allow client URL

## Common Commands

```bash
# Backend
npm install          # Install dependencies
npm start           # Start production server
npm run dev         # Start with nodemon

# Frontend
npm install         # Install dependencies
npm start           # Start development server
npm run build       # Create production build
```

## Database Models

### User
- name, email, password, phone, role, organization
- address, latitude, longitude
- rating, profileImage, bio, isVerified

### FoodListing
- donor, foodType, description
- quantity (value, unit), expiryDate
- pickupLocation, availableFrom, availableUntil
- status, restrictions, matchedWith

### Message
- sender, receiver, content, listingId
- isRead, createdAt

### Match
- foodListing, donor, recipient
- distance, matchScore, status
- pickupDateTime, completedAt

---

For detailed instructions, see README.md
