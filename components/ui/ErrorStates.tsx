'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const NetworkError = ({ 
  title = "Connection Error", 
  message = "Please check your internet connection and try again.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="network" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </ErrorStateWrapper>
)

export const NotFoundError = ({ 
  title = "Page Not Found", 
  message = "The page you're looking for doesn't exist or has been moved.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="notFound" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action ? (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    ) : (
      <Button variant="primary" onClick={() => window.history.back()}>
        Go Back
      </Button>
    )}
  </ErrorStateWrapper>
)

export const AuthError = ({ 
  title = "Authentication Required", 
  message = "Please sign in to access this feature.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="auth" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </ErrorStateWrapper>
)

export const PaymentError = ({ 
  title = "Payment Failed", 
  message = "We couldn't process your payment. Please try again or contact support.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="payment" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </ErrorStateWrapper>
)

export const ValidationError = ({ 
  title = "Invalid Input", 
  message = "Please check your input and try again.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="validation" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </ErrorStateWrapper>
)

export const ServerError = ({ 
  title = "Server Error", 
  message = "Something went wrong on our end. Please try again later.",
  action,
  className = ""
}: ErrorStateProps) => (
  <ErrorStateWrapper className={className}>
    <ErrorIcon type="server" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-light-gray mb-6">{message}</p>
    {action ? (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    ) : (
      <Button variant="primary" onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    )}
  </ErrorStateWrapper>
)

interface ErrorStateWrapperProps {
  children: React.ReactNode
  className?: string
}

const ErrorStateWrapper = ({ children, className }: ErrorStateWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`text-center p-8 ${className}`}
  >
    {children}
  </motion.div>
)

interface ErrorIconProps {
  type: 'network' | 'notFound' | 'auth' | 'payment' | 'validation' | 'server'
}

const ErrorIcon = ({ type }: ErrorIconProps) => {
  const iconClasses = "w-16 h-16 mx-auto mb-6 text-accent"
  
  const icons = {
    network: (
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
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </motion.div>
    ),
    notFound: (
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.326m15.356-2.49a9.964 9.964 0 01-1.335 1.835c-2.384 2.542-5.894 4.145-9.847 4.145-3.952 0-7.463-1.603-9.847-4.145A9.964 9.964 0 01.493 10.18" />
        </svg>
      </motion.div>
    ),
    auth: (
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </motion.div>
    ),
    payment: (
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </motion.div>
    ),
    validation: (
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </motion.div>
    ),
    server: (
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </motion.div>
    )
  }
  
  return icons[type]
}

// Inline error components for forms and small sections
export const InlineError = ({ message, className = "" }: { message: string; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex items-center gap-2 text-sm text-accent mt-1 ${className}`}
  >
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{message}</span>
  </motion.div>
)

// Toast-style error notification
export const ErrorToast = ({ 
  message, 
  onClose,
  duration = 5000 
}: { 
  message: string
  onClose: () => void
  duration?: number 
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className="fixed top-4 left-1/2 transform z-50 bg-accent/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg border border-accent/20 max-w-md"
    >
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-auto hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}