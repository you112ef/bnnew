# Deployment Verification Checklist

After deploying your Dish Agent platform, use this checklist to verify everything is working correctly.

## Backend Verification (Heroku)

### 1. Health Check
```bash
curl https://your-backend-app.herokuapp.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Dish Agent Backend is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

### 2. CORS Configuration
Check browser console for CORS errors when frontend connects to backend.

### 3. File Upload Endpoint
Test the analyze endpoint with a sample image (requires multipart/form-data).

### 4. Database Connection
Check Heroku logs for successful database connection:
```bash
heroku logs --tail -a your-backend-app
```

## Frontend Verification (Vercel)

### 1. Page Load
- Visit your Vercel URL
- Verify the Dish Agent interface loads correctly
- Check browser console for JavaScript errors

### 2. Environment Variables
- Verify API calls are going to the correct backend URL
- Check Network tab in browser dev tools

### 3. Responsive Design
- Test on desktop and mobile devices
- Verify all UI components display correctly

## End-to-End Testing

### 1. Complete Flow Test
1. Open frontend application
2. Click "Start Analysis" button
3. Verify connection to backend
4. Test image upload (if implemented)
5. Check analysis results

### 2. API Integration Test
```javascript
// Test in browser console on frontend
fetch(`${window.location.origin.replace('frontend-domain', 'backend-domain')}/api/health`)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

## Common Issues and Solutions

### CORS Errors
- Verify `FRONTEND_URL` environment variable is set correctly on Heroku
- Check that the frontend URL matches exactly (no trailing slash issues)

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility

### Backend 503 Errors
- Check Heroku dyno status: `heroku ps -a your-app`
- Review application logs: `heroku logs --tail -a your-app`
- Verify environment variables are set

### Database Issues
- SQLite file permissions on Heroku
- Consider upgrading to PostgreSQL for production

## Performance Monitoring

### Backend Monitoring
```bash
# Check dyno usage
heroku ps -a your-backend-app

# Monitor response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-backend-app.herokuapp.com/api/health
```

Create `curl-format.txt`:
```
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
```

### Frontend Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check loading performance with Lighthouse

## Deployment Success Criteria

✅ **Backend Health Check**: Returns 200 status with correct JSON  
✅ **Frontend Loads**: No console errors, UI displays correctly  
✅ **CORS Working**: Frontend can communicate with backend  
✅ **Environment Variables**: All required variables are set  
✅ **Database Connected**: Backend can read/write to database  
✅ **File Uploads**: Image upload functionality works (if implemented)  
✅ **Mobile Responsive**: UI works on mobile devices  
✅ **Performance**: Reasonable load times (< 3 seconds)  

## Next Steps

Once verified:
1. Set up monitoring and alerting
2. Configure custom domains (optional)
3. Set up SSL certificates (handled automatically by Vercel/Heroku)
4. Plan scaling strategy for increased traffic
5. Set up CI/CD pipeline for automatic deployments

## Support

If you encounter issues:
1. Check the application logs
2. Verify all environment variables
3. Test endpoints individually
4. Review deployment configuration
5. Consult platform-specific documentation

---

**Note**: Keep this checklist handy for future deployments and updates!