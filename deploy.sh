#!/bin/bash

# 🚀 CoddessCookie Blog Deployment Script
# This script automates the deployment process

echo "🚀 Starting CoddessCookie Blog Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Function to deploy to staging
deploy_staging() {
    print_status "Deploying to staging (develop branch)..."
    
    # Check if we're on develop branch
    if [ "$CURRENT_BRANCH" != "develop" ]; then
        print_warning "Switching to develop branch..."
        git checkout develop
    fi
    
    # Pull latest changes
    git pull origin develop
    
    # Add all changes
    git add .
    
    # Commit changes
    git commit -m "Deploy to staging - $(date)"
    
    # Push to develop branch
    git push origin develop
    
    print_success "Staging deployment triggered! Check Vercel dashboard for preview URL."
}

# Function to deploy to production
deploy_production() {
    print_status "Deploying to production (main branch)..."
    
    # Check if we're on main branch
    if [ "$CURRENT_BRANCH" != "main" ]; then
        print_warning "Switching to main branch..."
        git checkout main
    fi
    
    # Pull latest changes
    git pull origin main
    
    # Add all changes
    git add .
    
    # Commit changes
    git commit -m "Deploy to production - $(date)"
    
    # Push to main branch
    git push origin main
    
    print_success "Production deployment triggered! Check Vercel dashboard for production URL."
}

# Function to create feature branch
create_feature() {
    if [ -z "$1" ]; then
        print_error "Please provide a feature name: ./deploy.sh feature feature-name"
        exit 1
    fi
    
    FEATURE_NAME=$1
    print_status "Creating feature branch: feature/$FEATURE_NAME"
    
    git checkout -b "feature/$FEATURE_NAME"
    git push -u origin "feature/$FEATURE_NAME"
    
    print_success "Feature branch created and pushed: feature/$FEATURE_NAME"
}

# Function to show help
show_help() {
    echo "🚀 CoddessCookie Blog Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  staging              Deploy to staging (develop branch)"
    echo "  production           Deploy to production (main branch)"
    echo "  feature <name>       Create a new feature branch"
    echo "  help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh staging"
    echo "  ./deploy.sh production"
    echo "  ./deploy.sh feature new-blog-post"
    echo ""
    echo "Workflow:"
    echo "  1. Create feature branch: ./deploy.sh feature feature-name"
    echo "  2. Make changes and commit"
    echo "  3. Create PR to develop branch (staging)"
    echo "  4. After testing, create PR from develop to main (production)"
    echo "  5. Use ./deploy.sh staging or production for direct deployment"
}

# Main script logic
case "$1" in
    "staging")
        deploy_staging
        ;;
    "production")
        deploy_production
        ;;
    "feature")
        create_feature "$2"
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

echo ""
print_success "Deployment script completed!"
echo ""
echo "📚 Next steps:"
echo "  1. Check Vercel dashboard for deployment status"
echo "  2. Test your application on the deployed URL"
echo "  3. Monitor build logs for any issues"
echo ""
echo "🔗 Useful links:"
echo "  - Vercel Dashboard: https://vercel.com/dashboard"
echo "  - GitHub Repository: https://github.com/urviwd/coddesscookie-blog"
echo ""
