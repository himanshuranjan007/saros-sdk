# Deployment Guide

This guide covers different ways to deploy your Saros SDK Documentation site.

## Quick Deploy Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment experience with automatic builds and previews.

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
3. **Configure Build Settings**:
   - Framework Preset: `Docusaurus`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
4. **Deploy**: Click "Deploy" and your site will be live!

The site will automatically redeploy on every push to your main branch.

### 2. Netlify

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose your repository
3. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. **Deploy**: Click "Deploy site"

### 3. GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "GitHub Actions" as source
2. **Create Workflow**:
   - Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

3. **Deploy**: Push to main branch and the workflow will deploy automatically

### 4. Manual Deployment

For any static hosting service:

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Upload the `build/` directory** to your hosting service:
   - AWS S3 + CloudFront
   - Firebase Hosting
   - Surge.sh
   - Any static hosting provider

## Environment Variables

If you need to set environment variables for your deployment:

### Vercel
- Go to Project Settings → Environment Variables
- Add your variables

### Netlify
- Go to Site Settings → Environment Variables
- Add your variables

### GitHub Actions
- Go to Repository Settings → Secrets and Variables → Actions
- Add your secrets

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

### GitHub Pages
1. Go to Repository Settings → Pages
2. Add custom domain
3. Update DNS records

## Performance Optimization

The site is already optimized with:
- Static site generation
- Code splitting
- Image optimization
- Minification
- Compression

For additional optimization:
- Enable CDN caching
- Use a CDN like Cloudflare
- Optimize images before uploading
- Enable gzip compression on your server

## Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- Uptime monitoring
- Performance monitoring

## Troubleshooting

### Build Failures
- Check Node.js version (requires 18+)
- Clear cache: `npm run clear`
- Delete `node_modules` and reinstall

### Deployment Issues
- Check build logs in your hosting platform
- Verify build command and output directory
- Check for environment variable issues

### Custom Domain Issues
- Verify DNS records
- Check SSL certificate status
- Wait for DNS propagation (up to 48 hours)

## Support

For deployment issues:
- Check Docusaurus documentation
- Check your hosting platform's documentation
- Open an issue in the repository
