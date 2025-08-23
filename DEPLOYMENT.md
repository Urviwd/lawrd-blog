# 🚀 **Deployment Guide - Vercel Staging & Production**

This guide will help you deploy your CoddessCookie blog to Vercel with separate staging and production environments.

## 📋 **Prerequisites**

- GitHub account: `urviwd@gmail.com`
- Vercel account (free tier available)
- Node.js 18+ installed locally

## 🔧 **Step 1: Initialize Git Repository**

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CoddessCookie blog with admin system"

# Add your GitHub repository as remote
git remote add origin https://github.com/urviwd/coddesscookie-blog.git

# Push to GitHub
git push -u origin main
```

## 🌐 **Step 2: Connect to Vercel**

### **2.1 Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (`urviwd@gmail.com`)
3. Authorize Vercel to access your repositories

### **2.2 Import Your Project**
1. Click "New Project"
2. Import your `coddesscookie-blog` repository
3. Vercel will auto-detect it's a Next.js project

## 🏗️ **Step 3: Configure Environment Variables**

### **3.1 Get Vercel Project Details**
After importing, note down:
- **Project ID** (found in project settings)
- **Org ID** (found in account settings)

### **3.2 Set Up GitHub Secrets**
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### **3.3 Get Vercel Token**
1. Go to Vercel → Settings → Tokens
2. Create new token with name "GitHub Actions"
3. Copy the token value

## 🔄 **Step 4: Set Up Branch Strategy**

### **4.1 Create Development Branch**
```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch
git push -u origin develop
```

### **4.2 Branch Protection Rules**
In GitHub repository settings:
1. Go to Branches → Add rule
2. Set `main` branch as protected
3. Require pull request reviews
4. Require status checks to pass

## 🚀 **Step 5: Deploy Workflow**

### **5.1 Staging Deployment (Develop Branch)**
- **Trigger**: Push to `develop` branch
- **Result**: Creates preview deployment
- **URL**: `https://coddesscookie-blog-git-develop-urviwd.vercel.app`

### **5.2 Production Deployment (Main Branch)**
- **Trigger**: Merge PR to `main` branch
- **Result**: Deploys to production
- **URL**: `https://coddesscookie-blog.vercel.app`

## 📝 **Step 6: Development Workflow**

### **6.1 Daily Development**
```bash
# Create feature branch
git checkout -b feature/new-blog-post

# Make changes
git add .
git commit -m "Add new blog post feature"

# Push feature branch
git push origin feature/new-blog-post

# Create PR to develop branch
# This triggers staging deployment
```

### **6.2 Staging Review**
1. Create PR from `feature/*` → `develop`
2. Vercel creates preview deployment
3. Test on staging URL
4. Get team approval
5. Merge to `develop`

### **6.3 Production Release**
1. Create PR from `develop` → `main`
2. Get final approval
3. Merge to `main`
4. Vercel automatically deploys to production

## 🔍 **Step 7: Verify Deployment**

### **7.1 Check Vercel Dashboard**
- Go to your Vercel project
- View deployment history
- Check build logs
- Monitor performance

### **7.2 Test Your Application**
- **Staging**: Test new features before production
- **Production**: Verify everything works correctly
- **Admin Panel**: Test at `/admin` on both environments

## 🛠️ **Step 8: Custom Domain (Optional)**

### **8.1 Add Custom Domain**
1. Go to Vercel project settings
2. Add custom domain (e.g., `blog.coddesscookie.com`)
3. Update DNS records as instructed

### **8.2 Environment-Specific Domains**
- **Staging**: `staging.blog.coddesscookie.com`
- **Production**: `blog.coddesscookie.com`

## 📊 **Step 9: Monitoring & Analytics**

### **9.1 Vercel Analytics**
- Page views and performance
- Core Web Vitals
- User behavior tracking

### **9.2 Error Monitoring**
- Set up error tracking
- Monitor build failures
- Track deployment success rates

## 🔒 **Step 10: Security & Performance**

### **10.1 Security Headers**
Vercel automatically adds:
- HTTPS enforcement
- Security headers
- DDoS protection

### **10.2 Performance Optimization**
- Automatic image optimization
- Edge caching
- CDN distribution

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Build Failures**
   ```bash
   # Check build logs in Vercel
   # Verify all dependencies are in package.json
   npm run build --verbose
   ```

2. **Environment Variables**
   - Ensure all required env vars are set in Vercel
   - Check GitHub secrets are correctly configured

3. **Deployment Issues**
   - Verify GitHub Actions workflow is enabled
   - Check Vercel project settings
   - Review deployment logs

### **Useful Commands**
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Rollback to previous deployment
vercel rollback [deployment-url]
```

## 📚 **Additional Resources**

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🎯 **Next Steps**

1. **Set up monitoring** for both environments
2. **Configure alerts** for deployment failures
3. **Set up staging data** separate from production
4. **Implement automated testing** in CI/CD pipeline
5. **Add performance monitoring** and analytics

---

**Happy Deploying! 🚀**

*For support, check Vercel documentation or create an issue in your GitHub repository.*
