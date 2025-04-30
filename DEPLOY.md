# Deploying WorldExplorer to Netlify

This guide explains how to deploy your WorldExplorer MERN stack application to Netlify using Netlify Functions for the backend.

## Pre-Deployment Steps

1. Ensure your MongoDB Atlas database is set up:
   - Create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
   - Create a new cluster
   - Set up network access (allow connections from anywhere)
   - Create a database user
   - Get your connection string

2. Update your environment variables:
   - The frontend environment variable is set in `frontend/.env.production`
   - Backend environment variables will need to be set in Netlify

## Deploying to Netlify

### Option 1: Deploy via Netlify UI

1. Sign up/login to [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure the build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`
   - **Important:** Set the site name to include "WorldExplorer"
     - Go to "Site settings" after initial deploy
     - Click "Change site name" 
     - Enter "worldexplorer" or "world-explorer" (with your preferred prefix/suffix)
     - Example: "worldexplorer-app.netlify.app" or "your-world-explorer.netlify.app"
5. Add required environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secret key for JWT token generation
   - `JWT_EXPIRE`: Token expiration time (e.g., "30d")
6. Click "Deploy site"

### Option 2: Deploy with Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Link your repository:
   ```bash
   netlify init
   ```
   
   **Important:** When prompted to configure a custom domain, choose a site name that includes "WorldExplorer"
   Example: "worldexplorer-app" or "my-world-explorer"

4. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

5. Set up environment variables:
   ```bash
   netlify env:set MONGO_URI your_mongodb_connection_string
   netlify env:set JWT_SECRET your_jwt_secret
   netlify env:set JWT_EXPIRE 30d
   ```

## Testing Your Deployment

1. Once deployed, visit your Netlify URL
2. Test user registration and login
3. Verify country data is being fetched correctly
4. Check the Network tab for any API request errors

## Troubleshooting

If you encounter issues:

1. Check Netlify function logs in the Netlify dashboard (Functions → API → Logs)
2. Verify environment variables are set correctly
3. Make sure MongoDB connection string is valid and the IP is whitelisted
4. Check that all necessary dependencies are installed in the functions directory

## Local Development After Deployment Setup

To run the application locally after setting up for Netlify:

1. Install Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. Run the development server:
   ```bash
   netlify dev
   ```

This will run both your frontend and Netlify Functions locally. 