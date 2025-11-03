# Deployment Guide

This guide covers deploying the Underdecanopy Digital Hub to production.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] Backup strategy in place

## Environment Variables

Ensure all required environment variables are set in your production environment:

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=no-reply@underdecanopy.com

# Supabase (if using)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-key

# Application
NEXT_PUBLIC_APP_URL=https://underdecanopy.com
NODE_ENV=production

# Security
JWT_SECRET=your-secure-secret
SESSION_SECRET=your-secure-session-secret
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git push origin main
   ```

2. **Import in Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all required environment variables
   - Separate variables for Production, Preview, and Development

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

### Option 2: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json package-lock.json ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN npm run build
   
   # Production image, copy all files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t underdecanopy .
   docker run -p 3000:3000 --env-file .env underdecanopy
   ```

### Option 3: Traditional VPS (Ubuntu)

1. **Set up Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Clone and Build**
   ```bash
   cd /var/www
   git clone https://github.com/underdecanopy-source/underdecanopy.git
   cd underdecanopy
   npm install
   npm run build
   ```

3. **Configure PM2**
   ```bash
   # Create ecosystem.config.js
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'underdecanopy',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   EOF
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name underdecanopy.com www.underdecanopy.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d underdecanopy.com -d www.underdecanopy.com
   ```

## Database Setup

### Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

### Database Connection Pooling

For production, use a connection pooler like PgBouncer or Supabase Connection Pooling.

```env
# Direct connection for migrations
DIRECT_URL="postgresql://user:pass@host:5432/db"

# Pooled connection for application
DATABASE_URL="postgresql://user:pass@pooler:6543/db?pgbouncer=true"
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Check website loads: https://underdecanopy.com
- [ ] Test all subdomains (coophub, applysmart, etc.)
- [ ] Verify API endpoints: /api/health
- [ ] Check sitemap: /sitemap.xml
- [ ] Check robots.txt: /robots.txt

### 2. Monitor

```bash
# Check application logs
pm2 logs underdecanopy

# Monitor resources
pm2 monit

# View status
pm2 status
```

### 3. Set Up Monitoring

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics
- **Performance**: Vercel Analytics or New Relic

## Backup Strategy

### Database Backups

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/underdecanopy_$DATE.sql

# Keep only last 30 days
find /backups -name "underdecanopy_*.sql" -mtime +30 -delete
```

### Automated Backups

Set up automated backups with your hosting provider or use:
- Vercel Backup
- AWS RDS Automated Backups
- Supabase Point-in-Time Recovery

## Rollback Procedure

If deployment fails:

1. **Vercel**: Use deployment history to revert
   ```bash
   vercel rollback
   ```

2. **PM2**: Deploy previous version
   ```bash
   git checkout <previous-commit>
   npm install
   npm run build
   pm2 restart underdecanopy
   ```

3. **Database**: Restore from backup
   ```bash
   psql $DATABASE_URL < /backups/underdecanopy_backup.sql
   ```

## Performance Optimization

### CDN Setup

Use Vercel Edge Network or configure CloudFlare:
- Enable caching
- Minify CSS/JS
- Enable Brotli compression

### Image Optimization

Next.js automatically optimizes images. Ensure:
- Remote image domains are configured in `next.config.js`
- Use `next/image` component

### Caching Strategy

```nginx
# Nginx caching
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Security Hardening

### Production Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] API keys rotated
- [ ] Firewall rules configured

### Security Headers

Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ];
}
```

## Troubleshooting

### Build Fails

1. Check Node version (18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall
4. Check for TypeScript errors

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check database is accessible
3. Verify Prisma client is generated
4. Check connection pooling settings

### Performance Issues

1. Check server resources (CPU, memory)
2. Analyze with Chrome DevTools
3. Review database query performance
4. Enable caching
5. Use CDN for static assets

## Support

For deployment support:
- Email: contactus@underdecanopy.com
- Documentation: /docs
- Issues: GitHub Issues
