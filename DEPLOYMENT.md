# Dish Agent Deployment Guide

This guide walks you through deploying the Dish Agent platform to production using Vercel (frontend) and Heroku (backend).

## Prerequisites

- Git repository with your code
- [Vercel](https://vercel.com) account
- [Heroku](https://heroku.com) account
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed

## Backend Deployment (Heroku)

### 1. Create Heroku App

```bash
# Login to Heroku
heroku login

# Create a new app (replace 'your-app-name' with a unique name)
heroku create your-dish-agent-backend

# Add buildpacks for Node.js
heroku buildpacks:add heroku/nodejs -a your-dish-agent-backend
```

### 2. Set Environment Variables

```bash
# Set production environment
heroku config:set NODE_ENV=production -a your-dish-agent-backend

# Set frontend URL (update after frontend deployment)
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app -a your-dish-agent-backend
```

### 3. Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Initialize git if not already done
git init
git add .
git commit -m "Initial backend deployment"

# Add Heroku remote
heroku git:remote -a your-dish-agent-backend

# Deploy
git push heroku main
```

### 4. Verify Deployment

```bash
# Check app status
heroku ps -a your-dish-agent-backend

# View logs
heroku logs --tail -a your-dish-agent-backend

# Test health endpoint
curl https://your-dish-agent-backend.herokuapp.com/api/health
```

## Frontend Deployment (Vercel)

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Select the `frontend` directory as the root directory

### 2. Configure Build Settings

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_URL=https://your-dish-agent-backend.herokuapp.com
```

### 4. Deploy

Vercel will automatically deploy on every push to your main branch.

## Sandbox Deployment (Optional)

You can deploy the sandbox as a separate Heroku app:

```bash
# Create sandbox app
heroku create your-dish-agent-sandbox

# Navigate to sandbox directory
cd sandbox

# Deploy
git init
git add .
git commit -m "Initial sandbox deployment"
heroku git:remote -a your-dish-agent-sandbox
git push heroku main
```

## Post-Deployment Configuration

### 1. Update Backend CORS

After frontend deployment, update the backend environment:

```bash
heroku config:set FRONTEND_URL=https://your-actual-frontend-url.vercel.app -a your-dish-agent-backend
```

### 2. Update Frontend API URL

Update the frontend environment variables in Vercel:

```
VITE_API_URL=https://your-dish-agent-backend.herokuapp.com
```

### 3. Test Full Stack

1. Visit your frontend URL
2. Upload a test image
3. Verify the analysis works end-to-end

## Domain Configuration (Optional)

### Custom Domain for Frontend

1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

### Custom Domain for Backend

1. In Heroku Dashboard → Settings
2. Add your custom domain
3. Configure DNS settings as instructed

## Monitoring and Maintenance

### Health Checks

Both services include health check endpoints:

- Frontend: Available at root URL
- Backend: `GET /api/health`

### Logs

```bash
# Backend logs
heroku logs --tail -a your-dish-agent-backend

# Vercel logs available in dashboard
```

### Environment Variables

Update environment variables as needed:

```bash
# Heroku
heroku config:set VARIABLE_NAME=value -a your-app-name

# Vercel - via dashboard or CLI
vercel env add VARIABLE_NAME
```

## Scaling

### Heroku Dynos

```bash
# Scale backend
heroku ps:scale web=2 -a your-dish-agent-backend
```

### Vercel

Vercel automatically scales based on traffic.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure FRONTEND_URL is correctly set
2. **Build Failures**: Check logs for missing dependencies
3. **Database Issues**: Verify SQLite files persist (consider external DB for production)

### Getting Help

- Check application logs
- Verify environment variables
- Test endpoints individually
- Review deployment configuration

## Security Considerations

1. Use HTTPS for all communications
2. Set proper CORS origins
3. Consider rate limiting
4. Monitor for security vulnerabilities
5. Use environment variables for sensitive data

---

For more detailed information, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Heroku Node.js Documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs)