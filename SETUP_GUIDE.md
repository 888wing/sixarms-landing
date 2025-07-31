# SIXARMS Landing Page - Setup Guide

## Overview

This guide covers the setup for the enhanced SIXARMS landing page with comprehensive error handling, loading states, and OAuth authentication.

## Features Implemented

### ✅ Comprehensive Error Handling States
- Enhanced ErrorBoundary with technical details and recovery options
- Specialized error components for different scenarios:
  - NetworkError (connection issues)
  - NotFoundError (404 pages)
  - AuthError (authentication required)
  - PaymentError (payment failures)
  - ValidationError (form validation)
  - ServerError (5xx errors)
- InlineError for form field validation
- ErrorToast for notifications
- Animated error states with proper UX feedback

### ✅ Enhanced Loading States
- Multiple LoadingSpinner variants and sizes
- PulseLoader for button loading states
- Skeleton loaders (SkeletonCard, SkeletonText, SkeletonLine)
- ProgressBar with percentage display
- LoadingDots animations
- LoadingOverlay for full-screen loading
- All components follow the dark luxury design theme

### ✅ OAuth Configuration (Google/GitHub)
- Enhanced Supabase client with PKCE flow
- OAuth callback route for handling authentication
- Updated AuthModal with better loading states
- Enhanced useAuth hook with error handling
- Proper redirect configuration for development/production

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Supabase Configuration

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Configure OAuth Providers**

   **Google OAuth:**
   - Go to Authentication > Providers in Supabase Dashboard
   - Enable Google provider
   - Add your Google OAuth credentials:
     - Client ID from Google Cloud Console
     - Client Secret from Google Cloud Console
   - Set redirect URL: 
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://your-domain.com/auth/callback`

   **GitHub OAuth:**
   - Enable GitHub provider in Supabase
   - Add your GitHub OAuth App credentials:
     - Client ID from GitHub Developer Settings
     - Client Secret from GitHub Developer Settings
   - Set redirect URL same as above

3. **Configure Authentication Settings**
   - Set Site URL to your domain
   - Add redirect URLs to the allowed list
   - Configure email templates if needed

## Google OAuth Setup

1. **Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Set Application Type to "Web Application"
   - Add Authorized Redirect URIs:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`

2. **Configuration**
   ```javascript
   // Scopes requested: openid, email, profile
   // Access type: offline (for refresh tokens)
   // Prompt: consent (for offline access)
   ```

## GitHub OAuth Setup

1. **GitHub Developer Settings**
   - Go to Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   - Set Authorization callback URL:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`

2. **Configuration**
   ```javascript
   // Scopes requested: user:email
   // No additional configuration needed
   ```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Test Components
Visit `/test` route to see all components in action:
- http://localhost:3000/test

### Build for Production
```bash
npm run build
npm start
```

## Component Usage

### Error Handling

```typescript
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { NetworkError, InlineError } from '@/components/ui/ErrorStates'

// Wrap components that might error
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Show specific error states
<NetworkError 
  action={{ label: 'Retry', onClick: handleRetry }}
/>

// Form validation errors
<InlineError message="This field is required" />
```

### Loading States

```typescript
import { 
  LoadingSpinner, 
  SkeletonCard, 
  LoadingOverlay 
} from '@/components/ui/LoadingSpinner'

// Button loading
<Button disabled={loading}>
  {loading ? <LoadingSpinner size="sm" /> : 'Submit'}
</Button>

// Content loading
{loading ? <SkeletonCard /> : <YourContent />}

// Full screen loading
{loading && (
  <LoadingOverlay 
    message="Processing..." 
    subMessage="Please wait..."
  />
)}
```

### Authentication

```typescript
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'

function MyComponent() {
  const { user, loading, error, signOut } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (loading) return <LoadingSpinner />
  if (error) return <NetworkError />

  return (
    <>
      {user ? (
        <Button onClick={signOut}>Sign Out</Button>
      ) : (
        <Button onClick={() => setShowAuth(true)}>Sign In</Button>
      )}
      
      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={(user) => {
          setShowAuth(false)
          console.log('User signed in:', user)
        }}
      />
    </>
  )
}
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` folder and `public` folder
3. Set environment variables on your platform
4. Ensure Node.js 18+ is available

## Error Monitoring

The ErrorBoundary component logs errors to the console. For production, consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Custom analytics for error patterns

## Testing

### Manual Testing Checklist

**Error States:**
- [ ] Error boundary catches and displays errors properly
- [ ] Network errors show retry options
- [ ] Form validation shows inline errors
- [ ] 404 pages display correctly
- [ ] Server errors have fallback UI

**Loading States:**
- [ ] Buttons show loading spinners during actions
- [ ] Skeleton loaders appear during data fetching
- [ ] Progress bars update correctly
- [ ] Full-screen overlays work properly

**Authentication:**
- [ ] Email/password sign up works
- [ ] Email/password sign in works
- [ ] Google OAuth redirects and returns properly
- [ ] GitHub OAuth redirects and returns properly
- [ ] Sign out clears session
- [ ] Protected routes redirect to auth

### Automated Testing
```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## Troubleshooting

### Common Issues

**OAuth Redirect Issues:**
- Check redirect URLs in OAuth provider settings
- Verify Supabase site URL configuration
- Ensure HTTPS in production

**Environment Variables:**
- Double-check variable names (case-sensitive)
- Restart development server after changes
- Verify variables are accessible in browser for public ones

**Build Errors:**
- Run `npm run type-check` to catch TypeScript issues
- Check import paths are correct
- Verify all dependencies are installed

**Styling Issues:**
- Ensure Tailwind classes are in the safelist
- Check for CSS conflicts
- Verify custom colors are defined in tailwind.config.js

### Support

For issues related to:
- Supabase: Check Supabase documentation and dashboard logs
- OAuth: Verify provider-specific documentation
- UI Components: Test using the `/test` route
- Deployment: Check platform-specific logs and environment variables

## Next Steps

Consider implementing:
1. **Error Reporting**: Integrate Sentry or similar service
2. **Analytics**: Track user interactions and errors
3. **Testing**: Add Jest and React Testing Library
4. **Performance**: Add monitoring and optimization
5. **Accessibility**: Audit with axe-core and screen readers
6. **Internationalization**: Support multiple languages

## File Structure

```
components/
├── ui/
│   ├── ErrorBoundary.tsx      # Enhanced error boundary
│   ├── ErrorStates.tsx        # Specialized error components
│   └── LoadingSpinner.tsx     # Loading states and skeletons
├── auth/
│   └── AuthModal.tsx          # Enhanced auth modal
hooks/
└── useAuth.ts                 # Enhanced auth hook
lib/
└── supabase.ts               # Supabase client with OAuth
app/
├── auth/
│   └── callback/
│       └── route.ts          # OAuth callback handler
└── test/
    └── page.tsx              # Component test suite
```

This implementation provides a production-ready foundation with proper error handling, loading states, and OAuth authentication for the SIXARMS landing page.