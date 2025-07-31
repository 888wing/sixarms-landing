# SIXARMS Landing Page Development Plan

## 🎯 Project Overview

### Project Details
- **Project Name**: SIXARMS Landing Page
- **Domain**: sixarms.ai (landing page)
- **App URL**: https://6arms.uk/ (main application)
- **Timeline**: 10 working days
- **Budget**: $8,000 - $12,000

### Objectives
1. Create a high-converting landing page with >5% conversion rate
2. Achieve <3s load time and >95 Lighthouse score
3. Implement interactive 3-node demo system
4. Seamless integration with main app at 6arms.uk

## 🏗️ Technical Architecture

### Tech Stack
```yaml
Framework: Next.js 14 (App Router)
Language: TypeScript 5.3+
Styling: Tailwind CSS + CSS Modules
Animation: Framer Motion
Icons: Custom SVG components
Analytics: Google Analytics 4 + Vercel Analytics
Deployment: Vercel
Domain: sixarms.ai
```

### Project Structure
```
sixarms-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── GlowCard.tsx
│   │   └── MagneticButton.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── InteractiveDemo.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   ├── demo/
│   │   ├── DemoCanvas.tsx
│   │   ├── NodeSelector.tsx
│   │   ├── OutputPanel.tsx
│   │   └── DraggableNode.tsx
│   └── effects/
│       ├── CustomCursor.tsx
│       ├── FloatingShapes.tsx
│       └── ScrollProgress.tsx
├── lib/
│   ├── constants.ts
│   ├── animations.ts
│   └── utils.ts
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── useWindowSize.ts
├── public/
│   ├── icons/
│   ├── og-image.png
│   └── favicon.ico
├── styles/
│   └── themes/
│       └── dark.css
└── types/
    └── index.ts
```

## 📅 Development Timeline

### Phase 1: Foundation (Days 1-2)
```yaml
Day 1:
  Morning:
    - Initialize Next.js 14 project
    - Configure TypeScript and ESLint
    - Set up Tailwind CSS with custom config
    - Create dark theme CSS variables
  Afternoon:
    - Build component library structure
    - Implement Button, GlowCard components
    - Create CustomCursor component
    - Set up Framer Motion

Day 2:
  Morning:
    - Design and implement SVG icon system
    - Create FloatingShapes background
    - Build ScrollProgress indicator
    - Implement responsive grid system
  Afternoon:
    - Create Hero section with animations
    - Add magnetic button effects
    - Implement smooth scroll navigation
    - Test responsive behavior
```

### Phase 2: Interactive Demo (Days 3-5)
```yaml
Day 3:
  Morning:
    - Build NodeSelector component
    - Create DraggableNode with drag logic
    - Implement node state management
    - Add node connection system
  Afternoon:
    - Create DemoCanvas with grid background
    - Implement node positioning logic
    - Add connection line animations
    - Test drag-and-drop functionality

Day 4:
  Morning:
    - Build OutputPanel component
    - Implement content generation logic
    - Add typewriter animation effect
    - Create loading states
  Afternoon:
    - Add demo content templates
    - Implement copy functionality
    - Create reset mechanism
    - Add success animations

Day 5:
  Morning:
    - Polish demo interactions
    - Add mobile touch support
    - Implement keyboard navigation
    - Add accessibility features
  Afternoon:
    - Create demo tutorial overlay
    - Add performance optimizations
    - Test cross-browser compatibility
    - Fine-tune animations
```

### Phase 3: Sections & Content (Days 6-7)
```yaml
Day 6:
  Morning:
    - Build HowItWorks section
    - Create step-by-step animations
    - Add visual progression indicators
    - Implement scroll-triggered animations
  Afternoon:
    - Design Pricing section
    - Create pricing card component
    - Add hover effects and CTAs
    - Implement feature comparison

Day 7:
  Morning:
    - Build Footer component
    - Add legal pages (Privacy, Terms)
    - Create sitemap
    - Implement newsletter signup
  Afternoon:
    - Add testimonials section
    - Create FAQ accordion
    - Add trust badges
    - Polish all sections
```

### Phase 4: Integration & Optimization (Days 8-9)
```yaml
Day 8:
  Morning:
    - Set up analytics tracking
    - Implement conversion tracking
    - Add UTM parameter handling
    - Create A/B test framework
  Afternoon:
    - Integrate with main app (6arms.uk)
    - Set up redirect logic
    - Add auth token passing
    - Test user flow

Day 9:
  Morning:
    - Performance optimization
    - Image optimization
    - Code splitting
    - Bundle size reduction
  Afternoon:
    - SEO optimization
    - Add meta tags
    - Create sitemap.xml
    - Implement structured data
```

### Phase 5: Testing & Deployment (Day 10)
```yaml
Day 10:
  Morning:
    - Cross-browser testing
    - Mobile device testing
    - Accessibility audit
    - Performance testing
  Afternoon:
    - Deploy to Vercel
    - Configure custom domain
    - Set up SSL
    - Final testing & launch
```

## 🔗 Integration Points

### Main App Integration
```typescript
// constants/config.ts
export const APP_CONFIG = {
  MAIN_APP_URL: 'https://6arms.uk',
  API_URL: 'https://api.6arms.uk',
  AUTH_REDIRECT: 'https://6arms.uk/auth',
};

// utils/navigation.ts
export const navigateToApp = (path: string = '/') => {
  window.location.href = `${APP_CONFIG.MAIN_APP_URL}${path}`;
};

// CTA Button Implementation
<Button
  onClick={() => navigateToApp('/signup')}
  variant="primary"
  size="large"
>
  Get Started Free
</Button>
```

### Analytics Integration
```typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, parameters?: any) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      source: 'landing',
    });
  }
  
  // Vercel Analytics
  if (window.va) {
    window.va('event', eventName, parameters);
  }
};

// Usage
trackEvent('demo_interaction', {
  action: 'node_selected',
  node_type: 'platform',
  node_value: 'twitter'
});
```

### Conversion Tracking
```typescript
// Key conversion points
const CONVERSION_EVENTS = {
  DEMO_STARTED: 'demo_started',
  DEMO_COMPLETED: 'demo_completed',
  CTA_CLICKED: 'cta_clicked',
  SIGNUP_INITIATED: 'signup_initiated',
  PRICING_VIEWED: 'pricing_viewed',
};

// Redirect with tracking
const handleGetStarted = () => {
  trackEvent(CONVERSION_EVENTS.CTA_CLICKED, {
    location: 'hero_section',
    button: 'primary_cta'
  });
  
  // Redirect with UTM parameters
  const utm = new URLSearchParams({
    utm_source: 'landing',
    utm_medium: 'cta',
    utm_campaign: 'hero'
  });
  
  navigateToApp(`/signup?${utm.toString()}`);
};
```

## 🎨 Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --black: #0A0A0A;
  --dark-gray: #1A1A1A;
  --medium-gray: #2D2D2D;
  --light-gray: #808080;
  --white: #FFFFFF;
  
  /* Accent Colors */
  --accent: #FF6B6B;
  --accent-light: #FF8787;
  --success: #4ECDC4;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-glow: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
}
```

### Typography Scale
```css
/* Fluid Typography */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(2rem, 1.7rem + 1.5vw, 3rem);
--text-4xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
--text-5xl: clamp(3rem, 2.5rem + 3.5vw, 6rem);
```

## 🚀 Performance Targets

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Bundle Size Budget
- **Initial JS**: < 100KB
- **Total JS**: < 300KB
- **CSS**: < 50KB
- **Fonts**: System fonts only

### Optimization Strategies
1. **Static Generation**: Use Next.js SSG for all pages
2. **Image Optimization**: Next/Image with WebP
3. **Code Splitting**: Dynamic imports for demo
4. **Caching**: Aggressive cache headers
5. **CDN**: Vercel Edge Network

## 📊 Success Metrics

### Primary KPIs
- **Conversion Rate**: > 5% (visitor to signup)
- **Demo Engagement**: > 60% (visitors trying demo)
- **Time to Action**: < 30s (first interaction)
- **Bounce Rate**: < 40%

### Secondary KPIs
- **Page Load Time**: < 3s
- **Lighthouse Score**: > 95
- **Mobile Traffic**: > 50%
- **Return Visitors**: > 20%

### Tracking Implementation
```typescript
// Conversion Funnel
const FUNNEL_STEPS = {
  PAGE_VIEW: 'landing_page_view',
  DEMO_INTERACTION: 'demo_interaction',
  DEMO_COMPLETE: 'demo_complete',
  CTA_CLICK: 'cta_click',
  APP_REDIRECT: 'app_redirect',
};

// Enhanced tracking
export const trackFunnelStep = (step: string, metadata?: any) => {
  trackEvent(step, {
    ...metadata,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    device_type: getDeviceType(),
  });
};
```

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled
- **Components**: Functional with hooks
- **Styling**: Tailwind utility-first
- **Animations**: Framer Motion only
- **Icons**: SVG components only

### Git Workflow
```bash
# Branch naming
feature/hero-section
feature/interactive-demo
fix/mobile-navigation
chore/update-dependencies

# Commit messages
feat: add interactive demo with drag-and-drop
fix: resolve mobile touch event handling
style: update button hover animations
perf: optimize bundle size with code splitting
```

### Testing Strategy
- **Unit Tests**: Components and utilities
- **Integration Tests**: User flows
- **Visual Tests**: Chromatic/Percy
- **Performance Tests**: Lighthouse CI
- **Accessibility Tests**: axe-core

## 📝 Deliverables

### Final Deliverables
1. **Production-ready landing page** at sixarms.ai
2. **Source code** with documentation
3. **Deployment guide** for Vercel
4. **Analytics dashboard** setup
5. **A/B testing framework** ready
6. **Performance report** with metrics
7. **SEO audit** results
8. **Handover documentation**

### Documentation
- Component library documentation
- Animation guidelines
- Analytics event reference
- Deployment procedures
- Maintenance guide

## 🚨 Risk Mitigation

### Technical Risks
- **Performance degradation**: Regular monitoring
- **Browser compatibility**: Progressive enhancement
- **Mobile experience**: Mobile-first development
- **SEO issues**: Server-side rendering

### Business Risks
- **Low conversion**: A/B testing ready
- **High bounce rate**: Engaging animations
- **Slow load times**: Performance budget
- **Poor messaging**: Content iteration

## 📞 Communication

### Daily Updates
- Progress report via Slack/Discord
- Blockers and solutions
- Next day priorities

### Weekly Reviews
- Demo of completed features
- Metrics review
- Timeline adjustments
- Feedback incorporation

## ✅ Launch Checklist

### Pre-launch
- [ ] All pages responsive
- [ ] Cross-browser tested
- [ ] Analytics configured
- [ ] SEO optimized
- [ ] Performance verified
- [ ] Accessibility checked
- [ ] Legal pages added
- [ ] SSL configured

### Post-launch
- [ ] Monitor analytics
- [ ] Track conversions
- [ ] Gather feedback
- [ ] Plan iterations
- [ ] A/B test setup

---

**Ready to build a landing page that converts! 🚀**