# Sixarms Landing Page

Marketing website for Sixarms - AI-powered development progress tracker.

## Tech Stack

- **Framework**: Astro
- **Deployment**: Cloudflare Pages
- **Database**: Cloudflare D1 (email subscriptions)
- **Styling**: Native CSS (Terminal theme)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Cloudflare D1 Setup

1. Create the D1 database:
   ```bash
   wrangler d1 create sixarms-subscribers
   ```

2. Update `wrangler.toml` with your database ID

3. Create the table:
   ```bash
   wrangler d1 execute sixarms-subscribers --file=schema.sql
   ```

## Deployment

The site auto-deploys to Cloudflare Pages when pushing to the main branch.

Manual deployment:
```bash
npm run build
wrangler pages deploy dist
```

## Project Structure

```
sixarms-landing/
├── src/
│   ├── pages/          # Astro pages
│   ├── components/     # Reusable components
│   ├── layouts/        # Page layouts
│   └── styles/         # Global styles
├── functions/
│   └── api/            # Cloudflare Pages Functions
├── public/             # Static assets
└── schema.sql          # D1 database schema
```
