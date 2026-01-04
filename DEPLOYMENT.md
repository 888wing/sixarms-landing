# Sixarms Landing Page - Deployment Guide

## Pre-Deployment Checklist

### 1. Add Required Images

```bash
# Create these files:
public/images/app-screenshot.png  # App dashboard screenshot (recommended: 1200x800)
public/images/og-image.png        # Social share image (recommended: 1200x630)
```

**App Screenshot**: Take a screenshot of Sixarms dashboard and save to `public/images/`

**OG Image**: Create a social share preview image (1200x630px) with:
- Sixarms logo
- Tagline: "AI-powered dev progress tracker"
- Terminal aesthetic

### 2. Update App Screenshot in Code

Edit `src/pages/index.astro`, replace the placeholder (lines 70-86):

```astro
<div class="app-screenshot">
  <img src="/images/app-screenshot.png" alt="Sixarms Dashboard" />
</div>
```

### 3. Setup Cloudflare D1

```bash
# Login to Cloudflare
wrangler login

# Create database
wrangler d1 create sixarms-subscribers

# Copy the database_id from output and update wrangler.toml

# Create table
wrangler d1 execute sixarms-subscribers --file=schema.sql
```

### 4. Deploy to Cloudflare Pages

**Option A: Dashboard**
1. Go to https://dash.cloudflare.com
2. Pages → Create a project
3. Connect to GitHub → Select `sixarms-landing`
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add D1 binding in Settings → Functions → D1 bindings

**Option B: CLI**
```bash
npm run build
wrangler pages deploy dist
```

### 5. Configure Custom Domain (Optional)

1. Pages → Your project → Custom domains
2. Add `sixarms.app` or your domain
3. Update DNS records as instructed

## Verification

After deployment:
- [ ] Homepage loads correctly
- [ ] Download button works
- [ ] Email subscription works (test with your email)
- [ ] Privacy/Terms pages accessible
- [ ] OG image shows in social shares

## Subscriber Management

```bash
# View all subscribers
wrangler d1 execute sixarms-subscribers --command "SELECT * FROM subscribers;"

# Count subscribers
wrangler d1 execute sixarms-subscribers --command "SELECT COUNT(*) FROM subscribers;"

# Export emails
wrangler d1 execute sixarms-subscribers --command "SELECT email FROM subscribers;" --json
```
