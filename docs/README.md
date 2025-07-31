# SIXARMS Landing Page

A high-converting, modern landing page for SIXARMS AI content creation platform.

## 🎯 Overview

This is an independent landing page for SIXARMS that showcases the platform's capabilities through an interactive 3-node demo system. The landing page is designed to convert visitors into users with a target conversion rate of >5%.

### Key Features
- ⚡ Ultra-fast performance (<3s load time)
- 🎨 Dark luxury aesthetic with glassmorphism
- 🎮 Interactive drag-and-drop demo
- 📱 Fully responsive design
- 🔗 Seamless integration with main app (6arms.uk)
- 📊 Built-in analytics and conversion tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: Framer Motion
- **Analytics**: Google Analytics 4 + Vercel Analytics
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm 9+ or yarn 1.22+

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/sixarms-landing.git
cd sixarms-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_APP_URL=https://6arms.uk
NEXT_PUBLIC_API_URL=https://api.6arms.uk
NEXT_PUBLIC_SITE_URL=https://sixarms.ai
```

## 📁 Project Structure

```
sixarms-landing/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   ├── demo/             # Interactive demo components
│   └── effects/          # Visual effects
├── lib/                   # Utilities and helpers
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── types/                # TypeScript types
```

## 🎨 Design System

### Colors
- **Primary**: Black (#0A0A0A)
- **Accent**: Coral (#FF6B6B)
- **Success**: Teal (#4ECDC4)
- **Text**: White/Gray scale

### Typography
- **Font**: System font stack (SF Pro, Segoe UI)
- **Scale**: Fluid typography with clamp()

### Components
- Button (Primary/Secondary/Ghost)
- GlowCard with glassmorphism
- MagneticButton with hover effects
- CustomCursor with blend modes
- Interactive demo nodes

## 📊 Performance Targets

- **Lighthouse Score**: >95
- **Load Time**: <3 seconds
- **Bundle Size**: <300KB total JS
- **Core Web Vitals**:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

## 🔗 Integration

The landing page redirects to the main application at `https://6arms.uk` for:
- User signup: `/signup`
- User login: `/login`
- Dashboard access: `/dashboard`

### Conversion Tracking
Key events tracked:
- Demo interactions
- CTA clicks
- Page views
- Conversion funnel steps

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format with Prettier
npm run type-check # TypeScript checking
```

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Custom Domain
1. Add `sixarms.ai` to Vercel domains
2. Configure DNS records
3. Enable SSL certificate

## 📈 Analytics

### Google Analytics 4
- Conversion tracking
- User behavior analysis
- A/B testing support

### Vercel Analytics
- Real-time performance metrics
- Web Vitals monitoring

## 🧪 Testing

- **Unit Tests**: Components and utilities
- **E2E Tests**: User flows with Playwright
- **Visual Tests**: UI regression with Chromatic
- **Performance Tests**: Lighthouse CI

## 📚 Documentation

- [Development Plan](./DEVELOPMENT_PLAN.md)
- [Project Setup](./PROJECT_SETUP.md)
- [Component Library](./COMPONENT_LIBRARY.md)
- [UI Design Concept](../SIXARMS_UI_DESIGN_CONCEPT.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ for SIXARMS by the development team.