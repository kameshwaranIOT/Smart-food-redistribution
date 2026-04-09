# Smart Food Redistribution - Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel Account (free) - https://vercel.com
- GitHub Account with push access

### Step-by-Step Deployment

1. **Visit Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import from GitHub**
   - Select "Continue with GitHub"
   - Search for: `Smart-food-redistribution`
   - Click "Import"

3. **Configure Project**
   - **Project Name:** smart-food-redistribution (or custom)
   - **Framework Preset:** Create React App
   - **Root Directory:** `./client`
   - Leave other settings as default

4. **Environment Variables**
   - Click "Environment Variables"
   - Add the following:
   
   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `http://localhost:5000` (development) or your backend URL |

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a live URL: `https://your-project.vercel.app`

### Vercel Auto-Deployment
- Any push to `main` branch will automatically redeploy
- Vercel shows build status and logs

---

## Backend Deployment (Choose One)

### Option 1: Render (Recommended - Free Tier Available)

1. **Visit Render Dashboard**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Select your GitHub repository
   - Connect to `Smart-food-redistribution`

3. **Configure Service**
   - **Name:** smart-food-api
   - **Environment:** Node
   - **Region:** Choose closest to users
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `npm start`

4. **Environment Variables**
   Add in Render dashboard:
   ```
   FIREBASE_PROJECT_ID=smart-food-redistributio-a1ad7
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRqtLvd2XM4Ia3\npBO/T+uQYDlhsnwsXh0iuOBZOPCaFTsiFhd03eGy2b+p1IJlqFHwl8g+QFd3ooEX\ngsLKrbu17rbmdujYjCjxT10NBuWqzQuB3kI7AepmGFLm+BIhqEdcUntsEtJ7FjgJ\nFWiFa1IK3cF3vx2/T2HIjXqkeQ2CZC5FYmjRHU9lKjdLASVDSciYFlJC6XjR63gV\n2SRXKtUcPqucDXi0eJGdkgCqCxa2WPEgBddT8Toh8K4/QloxIUcuR9mftvFpmiOv\nXKIt55GBTeIU99A2I7G36LKq1m9W28Zt+w1AmouXkQ1oGEE30hSfOo8SgUlXimQm\ncZQgyB+HAgMBAAECggEAQdl7zDfcoh72UKDYjuJj4oFGJFfxReH9FpWn6H3ImywF\n2WvEzDCPnSNkXctfdNwLeBvDiUGd9vXzw1WPJiawaLBjgzhfYvuKNFevqtK6uQ0T\nCyOp+2xbmNsU1nOdBjMaznUdTFERCBVvXfL6U8TkDIOfKqO8jQQ6eslsdlGKm6OX\ni0/cww5YJk0CRx/5WTEX2UsXFjKJZuMavXcLt5UffRCVrYWi2H4+o5bIamLw+FJ7\na7FjDBwlCZbPsWz4ij8osNoqhr4+9oOZazstd14LzjR0wx5Wuh+7mfJ9yt0/BCVY\nTld3G/MFyUNmYMMHjQ1N2kxed9SLe0aV0zhhHJ3++QKBgQDuOEPpFfIw5bvAKXS4\nNpylYcFfqkiqCmtO5LR2Nz/OoGcEyvSPdnGj8trfGsc9MeABYfNE0nFir1Hedi6g\nwBQmeZRHbTeNFfpDSLUQfK/2e68ooIm4EmaV2KL9KQKINAWd2h1W5XaG8bs1Kkuh\nkIsO7fT/VtyBo2HNHPXTiSUOqwKBgQDhUP9nh2PYAbln/jXq6hg/k8ZvQ/76BN+G\nAWxnmLZp/lKftrN91+O9v1gFmR+dbcsWyzvXzReAg2Z9y3tNyvPxVNw5cdtYegyb\nBuqGDnRSsfAHR/1jV9VdhV+OqRrPbOjVfKXv7H7aJT4DReDq7IGN1nT51Zm4JY/4\nA6XPx0vClQKBgQCRGeaLoFmAXT7KYrX8yw8JUY0G52MRZ/1K9dXSN/7+rgdyDOmA\nRSYdNf0JbnczmCCY1v/lyMVV1fJpLdVjBvx/HwkppKX0oxFoUG4xl7Fa0qWzem3I\nmDSyS12kFIm9Suqs5sF+P5C9y5o7XQLqa2+4bUsRCOiRcmJNHLnD2sKetwKBgGRh\n/8gSK8t6yS2ptj/Y18DLh6betmSRczxyuedVxD9ozUrWzRUN8CsDaqXj2I/88HRR\nS3ITr5rT7/+vflnkR9aHJi55qW27wo33ANmE6xJEsFmuGxf9c9PcrfwTHxy2uu0S\nQaOoy8NIwF4Y7eH8SKP2ndsI7Rl7sq6egWsWsYwZAoGBAKQ64OfRIRniZS+1scqR\ndDOA3OP+QNHV5r4nt6WhDFH/DOttLzS84TRFTT0DxW0EVeLGB++OSFp6g6OjJKuC\n4MIblHZPZsT7nSGWok4p1tRVzdIWDPMex+UnOcetCCqghccd8MQ5YzbOJ5p0D2I1\nqvge+0rlgPHBqdCr9sr3nIIv\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@smart-food-redistributio-a1ad7.iam.gserviceaccount.com
   FIREBASE_DATABASE_URL=https://smart-food-redistributio-a1ad7-default-rtdb.asia-southeast1.firebasedatabase.app/
   JWT_SECRET=your_secure_jwt_secret_key_here
   PORT=10000
   CLIENT_URL=https://your-vercel-domain.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Get your backend URL: `https://smart-food-api.onrender.com`

### Option 2: Railway

1. Go to https://railway.app
2. Click "Start New Project" → "Deploy from GitHub"
3. Select your repository
4. Configure root directory: `server`
5. Add environment variables
6. Deploy

---

## Connect Frontend to Backend

Once both are deployed:

1. **Copy Backend URL** (e.g., `https://smart-food-api.onrender.com`)

2. **Update Vercel Environment Variable:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Update `REACT_APP_API_URL` to your backend URL
   - Click "Save and Redeploy"

3. **Verify Connection:**
   - Go to your Vercel URL
   - Try to register
   - Check that API calls work

---

## Final Checklist

- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Render/Railway
- ✅ Environment variables configured
- ✅ Database (Firebase Realtime DB) configured
- ✅ API URL connected in frontend

## Live URLs

- Frontend: `https://your-project.vercel.app`
- Backend: `https://smart-food-api.onrender.com`
- GitHub: `https://github.com/kameshwaranIOT/Smart-food-redistribution`

---

## Troubleshooting

**Frontend errors?**
- Check "Deployments" tab in Vercel for build logs
- Verify `REACT_APP_API_URL` environment variable is set

**Backend errors?**
- Check deployment logs in Render/Railway
- Verify all environment variables are correctly set
- Check Firebase credentials are valid

**API connection issues?**
- Ensure `CLIENT_URL` in backend matches your Vercel URL
- Check CORS is enabled in backend

---

Need help? Check your GitHub Actions or deployment provider logs!
