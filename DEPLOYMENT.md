# Deploying Chat App to Render

This guide will help you deploy your MERN stack chat application to Render.

## Prerequisites

1. **MongoDB Atlas Database**: Set up a MongoDB Atlas cluster
2. **Cloudinary Account**: For image uploads
3. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Prepare Your Environment Variables

### Backend Environment Variables

You'll need to set these environment variables in Render:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `NODE_ENV`: Set to "production"

### Frontend Environment Variables

- `VITE_API_URL`: Your backend service URL (e.g., https://chat-app-backend.onrender.com)

## Step 2: Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file and create the services

### Option 2: Manual Deployment

#### Deploy Backend

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `chat-app-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or specify if needed)

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

6. Click "Create Web Service"

#### Deploy Frontend

1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `chat-app-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Root Directory**: Leave empty

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend service URL

6. Click "Create Static Site"

## Step 3: Update CORS Configuration

After deployment, update the CORS origins in `backend/src/index.js` with your actual frontend domain:

```javascript
origin: process.env.NODE_ENV === "production" 
  ? ["https://your-frontend-domain.onrender.com"]
  : "http://localhost:5173"
```

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Test user registration and login
3. Test sending messages
4. Test image uploads

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your frontend domain is added to the CORS origins
2. **Database Connection**: Verify your MongoDB URI is correct
3. **Environment Variables**: Ensure all required variables are set in Render
4. **Build Failures**: Check the build logs for missing dependencies

### Logs

- Check Render logs for both services
- Backend logs will show API requests and errors
- Frontend logs will show build issues

## Security Notes

- Never commit `.env` files to your repository
- Use strong, unique JWT secrets
- Keep your MongoDB and Cloudinary credentials secure
- Consider using Render's environment variable encryption

## Cost Optimization

- Both services are deployed on Render's free tier
- Free tier has limitations but is sufficient for development/testing
- Consider upgrading for production use with higher traffic 