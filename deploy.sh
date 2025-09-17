#!/bin/bash

# Dish Agent Deployment Script
# This script helps automate the deployment process

set -e  # Exit on any error

echo "🍽️ Dish Agent Deployment Script"
echo "==============================="

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v heroku &> /dev/null; then
        echo "❌ Heroku CLI is not installed. Please install it first."
        echo "   Visit: https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed. Please install it first."
        exit 1
    fi
    
    echo "✅ Requirements check passed!"
}

# Deploy backend to Heroku
deploy_backend() {
    echo "🚀 Deploying backend to Heroku..."
    
    read -p "Enter your Heroku backend app name: " backend_app_name
    
    cd backend
    
    # Check if Heroku app exists
    if ! heroku apps:info "$backend_app_name" &> /dev/null; then
        echo "Creating Heroku app: $backend_app_name"
        heroku create "$backend_app_name"
    fi
    
    # Set environment variables
    heroku config:set NODE_ENV=production -a "$backend_app_name"
    
    read -p "Enter your frontend URL (or press Enter to skip): " frontend_url
    if [ ! -z "$frontend_url" ]; then
        heroku config:set FRONTEND_URL="$frontend_url" -a "$backend_app_name"
    fi
    
    # Deploy
    echo "Deploying to Heroku..."
    git add .
    git commit -m "Deploy backend to production" || echo "No changes to commit"
    
    heroku git:remote -a "$backend_app_name"
    git push heroku main
    
    echo "✅ Backend deployed successfully!"
    echo "📍 Backend URL: https://$backend_app_name.herokuapp.com"
    
    cd ..
}

# Deploy frontend to Vercel (instructions)
deploy_frontend() {
    echo "🎨 Frontend Deployment Instructions"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Click 'New Project'"
    echo "3. Import your Git repository"
    echo "4. Set root directory to 'frontend'"
    echo "5. Add environment variable: VITE_API_URL=https://your-backend-url.herokuapp.com"
    echo "6. Deploy!"
    echo ""
    echo "The frontend will auto-deploy on every push to main branch."
}

# Main deployment flow
main() {
    check_requirements
    
    echo ""
    echo "What would you like to deploy?"
    echo "1) Backend only"
    echo "2) Show frontend instructions"
    echo "3) Both"
    echo ""
    read -p "Choose option (1-3): " option
    
    case $option in
        1)
            deploy_backend
            ;;
        2)
            deploy_frontend
            ;;
        3)
            deploy_backend
            echo ""
            deploy_frontend
            ;;
        *)
            echo "Invalid option. Please choose 1, 2, or 3."
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Deployment process complete!"
    echo "📚 For detailed instructions, see DEPLOYMENT.md"
}

# Run main function
main