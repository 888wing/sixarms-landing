'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void; errorInfo?: React.ErrorInfo }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.reset} errorInfo={this.state.errorInfo || undefined} />
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} errorInfo={this.state.errorInfo} />
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error: Error
  reset: () => void
  errorInfo?: React.ErrorInfo | null
}

const DefaultErrorFallback = ({ error, reset, errorInfo }: DefaultErrorFallbackProps) => {
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg w-full"
      >
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(255, 107, 107, 0.4)',
              '0 0 0 10px rgba(255, 107, 107, 0)',
              '0 0 0 0 rgba(255, 107, 107, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2 text-white">Oops! Something went wrong</h1>
        <p className="text-light-gray mb-6 text-lg">
          We encountered an unexpected error. Our team has been notified.
        </p>
        
        <div className="bg-dark-gray border border-white/10 rounded-2xl p-4 mb-6 text-left">
          <p className="text-sm font-medium text-accent mb-2">Error Details:</p>
          <p className="text-sm text-light-gray font-mono break-all">
            {error.message || 'Unknown error occurred'}
          </p>
          
          {errorInfo && (
            <div className="mt-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-accent hover:text-accent-light transition-colors underline"
              >
                {showDetails ? 'Hide' : 'Show'} technical details
              </button>
              
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-black/50 rounded-lg border border-white/5"
                >
                  <pre className="text-xs text-light-gray whitespace-pre-wrap break-all overflow-x-auto">
                    {errorInfo.componentStack}
                  </pre>
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={reset} className="min-w-[120px]">
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'} className="min-w-[120px]">
            Go Home
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => window.location.reload()} 
            className="min-w-[120px]"
          >
            Reload Page
          </Button>
        </div>
        
        <p className="text-xs text-light-gray/60 mt-6">
          Error ID: {Date.now().toString(36).toUpperCase()}
        </p>
      </motion.div>
    </div>
  )
}