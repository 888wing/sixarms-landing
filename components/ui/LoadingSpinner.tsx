'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 border-2 border-accent/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-accent border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay = ({ message = 'Loading...' }: LoadingOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-dark-gray border border-white/10 rounded-2xl p-6 flex flex-col items-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-light-gray">{message}</p>
      </div>
    </motion.div>
  )
}