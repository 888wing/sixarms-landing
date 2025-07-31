'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthModal } from './AuthModal'
import { StripePayment } from './StripePayment'
import type { User } from '@supabase/supabase-js'

interface AuthPaymentFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

type FlowStep = 'auth' | 'payment' | 'success'

export const AuthPaymentFlow = ({ isOpen, onClose, onComplete }: AuthPaymentFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('auth')
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAuthSuccess = async (authUser: User) => {
    setUser(authUser)
    setCurrentStep('payment')
  }

  const handlePaymentSuccess = async () => {
    // Update user subscription status in your database
    try {
      await fetch('/api/activate-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      })

      setCurrentStep('success')
      setTimeout(() => {
        onComplete?.()
        onClose()
      }, 3000)
    } catch {
      setError('Failed to activate subscription')
    }
  }

  const handlePaymentError = (error: string) => {
    setError(error)
  }

  const handleClose = () => {
    setCurrentStep('auth')
    setUser(null)
    setError(null)
    onClose()
  }

  if (currentStep === 'auth') {
    return (
      <AuthModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleAuthSuccess}
        defaultMode="signup"
      />
    )
  }

  if (currentStep === 'payment') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-dark-gray border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Complete Your Subscription</h2>
                  <button
                    onClick={handleClose}
                    className="text-light-gray hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="w-16 h-0.5 bg-white/20"></div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Payment Form */}
                <StripePayment
                  email={user?.email || ''}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  if (currentStep === 'success') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Success Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-dark-gray border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">Welcome to SIXARMS!</h2>
                <p className="text-light-gray mb-6">
                  Your subscription is active. Let&apos;s create amazing content together!
                </p>

                <div className="space-y-2 text-sm text-light-gray">
                  <p>✓ 500 credits added to your account</p>
                  <p>✓ Access to all platforms and features</p>
                  <p>✓ Priority support activated</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return null
}