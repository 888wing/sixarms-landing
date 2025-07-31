'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import { GlowCard } from '@/components/ui/GlowCard'
import { useState } from 'react'
import { AuthPaymentFlow } from '@/components/auth/AuthPaymentFlow'

const features = [
  {
    icon: '∞',
    text: 'Unlimited content generation',
  },
  {
    icon: '🌍',
    text: 'All platforms supported',
  },
  {
    icon: '🗣️',
    text: 'Multiple languages & tones',
  },
  {
    icon: '⚡',
    text: 'Lightning-fast generation',
  },
  {
    icon: '🛡️',
    text: 'Secure & private',
  },
  {
    icon: '💬',
    text: 'Priority support',
  },
]

export const Pricing = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleGetStarted = () => {
    // TODO: Open auth modal with payment flow
    setIsAuthModalOpen(true)
  }

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-dark-gray relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-success/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-2 text-sm font-medium text-light-gray bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            Simple Pricing
          </div>
          <h2 className="text-fluid-4xl font-bold mb-6">One Plan, Everything Included</h2>
          <p className="text-fluid-lg text-light-gray max-w-2xl mx-auto">
            No hidden fees, no complex tiers. Just powerful AI content creation at your fingertips.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <GlowCard className="p-8 md:p-10">
            {/* Price */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              >
                <span className="text-6xl md:text-7xl font-bold gradient-text">$10</span>
                <span className="text-xl text-light-gray ml-2">/month</span>
              </motion.div>
              <p className="text-light-gray mt-4">500 credits included monthly</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-white">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <MagneticButton className="w-full">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleGetStarted}
              >
                Get Started Now
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </Button>
            </MagneticButton>

            {/* Trust indicators */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-light-gray">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-light-gray mb-4">
            Need more credits? Additional credits available at $0.02 per credit
          </p>
          <a href="#" className="text-accent hover:text-accent-light transition-colors">
            View full pricing details →
          </a>
        </motion.div>
      </div>

      {/* Auth Payment Flow */}
      {typeof window !== 'undefined' && (
        <AuthPaymentFlow
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onComplete={() => {
            // Redirect to app or show success message
            window.location.href = '/app'
          }}
        />
      )}
    </section>
  )
}