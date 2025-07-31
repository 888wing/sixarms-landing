'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  LoadingSpinner, 
  LoadingOverlay, 
  PulseLoader, 
  SkeletonCard, 
  SkeletonText, 
  ProgressBar, 
  LoadingDots 
} from '@/components/ui/LoadingSpinner'
import { 
  NetworkError, 
  NotFoundError, 
  AuthError, 
  PaymentError, 
  ValidationError, 
  ServerError,
  InlineError,
  ErrorToast 
} from '@/components/ui/ErrorStates'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { AuthModal } from '@/components/auth/AuthModal'

// Component that throws an error for testing
const ErrorThrowingComponent = () => {
  throw new Error('This is a test error for the error boundary')
}

export default function TestPage() {
  const [showModal, setShowModal] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showErrorBoundary, setShowErrorBoundary] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [progress, setProgress] = useState(30)

  const incrementProgress = () => {
    setProgress(prev => Math.min(100, prev + 10))
  }

  const resetProgress = () => {
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">SIXARMS Component Test Suite</h1>
        
        <div className="space-y-12">
          {/* Loading States */}
          <section className="bg-dark-gray rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent">Loading States</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Loading Spinners</h3>
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="xs" />
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                  <LoadingSpinner size="xl" />
                </div>
                <div className="flex items-center gap-4">
                  <LoadingSpinner variant="primary" />
                  <LoadingSpinner variant="secondary" />
                  <LoadingSpinner variant="minimal" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pulse & Dots</h3>
                <div className="space-y-3">
                  <PulseLoader />
                  <LoadingDots size="sm" />
                  <LoadingDots size="md" />
                  <LoadingDots size="lg" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Progress Bar</h3>
                <ProgressBar progress={progress} showPercentage />
                <div className="flex gap-2">
                  <Button size="sm" onClick={incrementProgress}>+10%</Button>
                  <Button size="sm" variant="secondary" onClick={resetProgress}>Reset</Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Skeleton Loaders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonCard />
                <div className="bg-dark-gray border border-white/10 rounded-2xl p-6">
                  <h4 className="mb-4">Skeleton Text</h4>
                  <SkeletonText lines={4} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button 
                variant="primary" 
                onClick={() => setShowOverlay(true)}
              >
                Show Loading Overlay
              </Button>
            </div>
          </section>

          {/* Error States */}
          <section className="bg-dark-gray rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent">Error States</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/50 rounded-2xl p-4">
                <NetworkError 
                  action={{ label: 'Retry Connection', onClick: () => alert('Retrying...') }}
                />
              </div>
              
              <div className="bg-black/50 rounded-2xl p-4">
                <NotFoundError />
              </div>
              
              <div className="bg-black/50 rounded-2xl p-4">
                <AuthError 
                  action={{ label: 'Sign In', onClick: () => setShowModal(true) }}
                />
              </div>
              
              <div className="bg-black/50 rounded-2xl p-4">
                <PaymentError 
                  action={{ label: 'Try Again', onClick: () => alert('Payment retry...') }}
                />
              </div>
              
              <div className="bg-black/50 rounded-2xl p-4">
                <ValidationError />
              </div>
              
              <div className="bg-black/50 rounded-2xl p-4">
                <ServerError />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Inline Errors</h3>
              <div className="space-y-3 max-w-md">
                <InlineError message="This field is required" />
                <InlineError message="Invalid email format" />
                <InlineError message="Password must be at least 8 characters" />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button 
                variant="primary" 
                onClick={() => setShowErrorBoundary(true)}
              >
                Test Error Boundary
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowToast(true)}
              >
                Show Error Toast
              </Button>
            </div>
          </section>

          {/* Authentication */}
          <section className="bg-dark-gray rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent">Authentication</h2>
            <div className="space-y-4">
              <p className="text-light-gray">Test the enhanced authentication modal with OAuth support:</p>
              <Button 
                variant="primary" 
                onClick={() => setShowModal(true)}
              >
                Open Auth Modal
              </Button>
            </div>
          </section>

          {/* Error Boundary Test */}
          {showErrorBoundary && (
            <section className="bg-dark-gray rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-accent">Error Boundary Test</h2>
              <ErrorBoundary
                onError={(error, errorInfo) => {
                  console.log('Error boundary caught:', error, errorInfo)
                }}
              >
                <ErrorThrowingComponent />
              </ErrorBoundary>
              <Button 
                variant="secondary" 
                className="mt-4"
                onClick={() => setShowErrorBoundary(false)}
              >
                Reset Error Boundary
              </Button>
            </section>
          )}
        </div>
      </div>

      {/* Modals and Overlays */}
      {showOverlay && (
        <LoadingOverlay 
          message="Processing your request" 
          subMessage="This may take a few moments..."
        />
      )}

      <AuthModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(user) => {
          console.log('User signed in:', user)
          setShowModal(false)
        }}
      />

      {showToast && (
        <ErrorToast 
          message="This is a test error notification"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}