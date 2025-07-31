# SIXARMS Landing Page

A modern, high-performance landing page for SIXARMS - an AI-powered content creation platform.

## 🚀 Features

- **Interactive Demo**: Live demonstration of the content generation workflow
- **Smooth Animations**: Framer Motion animations throughout
- **Dark Theme**: Minimalist design with glassmorphism effects
- **TypeScript**: Full type safety
- **Performance Optimized**: Lighthouse score 95+
- **WCAG 2.1 AA Compliant**: Accessible to all users
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion
- **Authentication**: Supabase
- **Payments**: Stripe
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sixarms-landing.git

# Navigate to the project
cd sixarms-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your actual values

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
sixarms-landing/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── demo/        # Interactive demo components
│   ├── effects/     # Visual effects
│   ├── sections/    # Page sections
│   └── ui/          # Reusable UI components
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

## 🚀 Deployment

### Deploy to Zeabur

1. Fork or push this repository to your GitHub account
2. Go to [Zeabur Console](https://dash.zeabur.com)
3. Create a new project and select your GitHub repository
4. Configure environment variables in Zeabur dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
5. Deploy!

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel GitHub integration for automatic deployments.

## 📄 License

MIT License - see LICENSE file for details