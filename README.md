# Smart Food Redistribution Platform

A modern web application designed to connect food donors with recipients, enabling efficient and sustainable food redistribution in communities.

## Features

✓ **Food Listings** - Donors can easily list available food with details like type, quantity, and expiry date
✓ **Smart Matching** - Advanced algorithm matches donors with nearby recipients based on location and preferences
✓ **Real-time Messaging** - Built-in messaging system with Socket.IO for instant communication
✓ **Location Tracking** - GPS-based location features to connect nearby users
✓ **User Profiles** - Complete user profiles with ratings and verification status
✓ **Analytics Dashboard** - Comprehensive insights for organizers and administrators
✓ **Multiple User Roles** - Support for Donors, Recipients, and Organizers

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB
- Socket.IO (Real-time communication)
- JWT Authentication
- Bcrypt (Password hashing)

**Frontend:**
- React 18
- React Router v6
- Axios (API calls)
- CSS3 (Responsive design)

## Project Structure

```
smart-food-redistribution/
├── server/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── FoodListing.js
│   │   ├── Message.js
│   │   ├── Match.js
│   │   └── Analytics.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── foodListings.js
│   │   ├── users.js
│   │   ├── matching.js
│   │   ├── messages.js
│   │   └── analytics.js
│   ├── server.js            # Main server file
│   └── package.json
│
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/      # React components
    │   │   └── Navbar.js
    │   ├── pages/          # Page components
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── FoodListings.js
    │   │   ├── CreateListing.js
    │   │   ├── UserProfile.js
    │   │   ├── Messages.js
    │   │   └── Analytics.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-food-redistribution
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-food-redistribution
   JWT_SECRET=your_super_secret_key_change_this
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

   Start the server:
   ```bash
   npm start          # Production
   npm run dev        # Development with nodemon
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

   The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Food Listings
- `GET /api/food-listings/available` - Get all available listings
- `GET /api/food-listings/:id` - Get listing details
- `POST /api/food-listings` - Create new listing (requires auth)
- `PUT /api/food-listings/:id` - Update listing (requires auth)
- `DELETE /api/food-listings/:id` - Delete listing (requires auth)

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/` - Get current user profile (requires auth)
- `PUT /api/users/:id` - Update user profile (requires auth)

### Matching
- `POST /api/matching/find/:listingId` - Find matches for a listing
- `POST /api/matching` - Create a match (requires auth)
- `GET /api/matching/user/:userId` - Get user's matches

### Messages
- `POST /api/messages` - Send message (requires auth)
- `GET /api/messages/conversation/:userId` - Get conversation
- `GET /api/messages/inbox` - Get inbox (requires auth)
- `PUT /api/messages/:id/read` - Mark message as read

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/history` - Get historical data
- `POST /api/analytics/record` - Save daily analytics

## Usage

### As a Food Donor
1. Register with role "Donor"
2. Add your location (address and GPS coordinates)
3. Click "Share Food" to create a food listing
4. Fill in food details: type, quantity, expiry date, pickup location
5. Wait for recipients to reach out via messages
6. Arrange pickup with interested recipients

### As a Food Recipient
1. Register with role "Recipient"
2. Browse available food listings
3. Filter by food type or location
4. Message donors to arrange pickup
5. Accept matches for food deliveries

### As an Organizer
1. Register with role "Organizer"
2. Access the Analytics Dashboard
3. View comprehensive metrics and insights
4. Monitor platform performance and success rates

## Key Features Explained

### Smart Matching Algorithm
The system uses the Haversine formula to calculate distances between donors and recipients based on GPS coordinates. Matches are scored based on proximity and other factors.

### Real-time Messaging
Socket.IO enables instant messaging between users without page refresh. Messages are persisted in MongoDB for history.

### User Ratings
Users can be rated (1-5 stars) based on their transactions, building trust within the community.

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Protected API endpoints requiring authentication
- CORS enabled for cross-origin requests

## Future Enhancements

- [ ] Photo uploads for food listings
- [ ] Payment/Donation system
- [ ] Notification system (email/SMS)
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)
- [ ] Integration with food banks
- [ ] Environmental impact tracking
- [ ] Gamification (badges, achievements)
- [ ] Admin dashboard
- [ ] Report and feedback system

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Contact & Support

For questions and support, please reach out through:
- Email: support@smartfoodredistribution.com
- GitHub Issues: [Create an issue](https://github.com/yourrepo/issues)

## Acknowledgments

- Built with modern web technologies
- Inspired by food waste reduction efforts
- Community-driven development

---

**Happy Food Sharing! 🥬🍎🍉**
