# SIXARMS Landing Page - Project Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ 
- npm 9+ or yarn 1.22+
- Git
- Vercel CLI (optional)

### Initial Setup
```bash
# Clone repository
git clone https://github.com/yourusername/sixarms-landing.git
cd sixarms-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## 📦 Project Initialization

### 1. Create Next.js Project
```bash
# Create new Next.js 14 project with TypeScript
npx create-next-app@latest sixarms-landing --typescript --tailwind --app --no-src-dir

# Navigate to project
cd sixarms-landing
```

### 2. Install Dependencies
```bash
# Core dependencies
npm install framer-motion
npm install clsx
npm install @vercel/analytics
npm install sharp

# Development dependencies
npm install -D @types/node
npm install -D eslint-config-prettier
npm install -D prettier
npm install -D prettier-plugin-tailwindcss
```

### 3. Project Configuration

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2D2D2D',
        'light-gray': '#808080',
        accent: '#FF6B6B',
        'accent-light': '#FF8787',
        success: '#4ECDC4',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out',
        pulse: 'pulse 2s ease-in-out infinite',
        blink: 'blink 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

#### .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off"
  }
}
```

## 🔧 Environment Variables

### .env.local
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# App URLs
NEXT_PUBLIC_APP_URL=https://6arms.uk
NEXT_PUBLIC_API_URL=https://api.6arms.uk

# SEO
NEXT_PUBLIC_SITE_URL=https://sixarms.ai
```

## 📁 Initial File Structure

### app/layout.tsx
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIXARMS - Intelligent Content Creation',
  description: 'Transform your ideas into compelling content with just three simple choices',
  keywords: 'AI content creation, content generator, social media content, AI writing',
  authors: [{ name: 'SIXARMS' }],
  openGraph: {
    title: 'SIXARMS - Intelligent Content Creation',
    description: 'Transform your ideas into compelling content with just three simple choices',
    url: 'https://sixarms.ai',
    siteName: 'SIXARMS',
    images: [
      {
        url: 'https://sixarms.ai/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIXARMS - Intelligent Content Creation',
    description: 'Transform your ideas into compelling content with just three simple choices',
    images: ['https://sixarms.ai/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --black: #0A0A0A;
    --dark-gray: #1A1A1A;
    --medium-gray: #2D2D2D;
    --light-gray: #808080;
    --white: #FFFFFF;
    --accent: #FF6B6B;
    --accent-light: #FF8787;
    --success: #4ECDC4;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-black text-white;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-dark-gray;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-medium-gray rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-light-gray;
  }
}

@layer utilities {
  /* Custom utilities */
  .text-balance {
    text-wrap: balance;
  }

  .glassmorphism {
    @apply backdrop-blur-[20px] bg-white/[0.02] border border-white/10;
  }

  .glow {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  .grid-pattern {
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}
```

## 🧪 Scripts Configuration

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "analyze": "ANALYZE=true next build"
  }
}
```

## 🚀 Deployment Configuration

### vercel.json
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/app",
      "destination": "https://6arms.uk",
      "permanent": false
    },
    {
      "source": "/login",
      "destination": "https://6arms.uk/login",
      "permanent": false
    },
    {
      "source": "/signup",
      "destination": "https://6arms.uk/signup",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔍 SEO Configuration

### robots.txt
```txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://sixarms.ai/sitemap.xml
```

### next-sitemap.config.js
```javascript
module.exports = {
  siteUrl: 'https://sixarms.ai',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
}
```

## 📊 Analytics Setup

### lib/analytics.ts
```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Conversion events
export const trackConversion = (conversionType: string) => {
  event({
    action: 'conversion',
    category: 'engagement',
    label: conversionType,
  })
}
```

## 🎨 Component Template

### components/ui/Button.tsx
```tsx
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg',
        secondary: 'bg-transparent border border-white/30 text-white hover:bg-white/10',
        ghost: 'text-light-gray hover:text-white',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

## 🛠️ Development Tools

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Auto Rename Tag
- Color Highlight

### Chrome Extensions
- React Developer Tools
- Lighthouse
- Wappalyzer
- JSON Viewer

## 📚 Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

### Design Resources
- [Heroicons](https://heroicons.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind UI](https://tailwindui.com/)

---

**Ready to start development! Run `npm run dev` to begin. 🚀**