'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'primary' | 'secondary' | 'minimal'
}

export const LoadingSpinner = ({ size = 'md', className = '', variant = 'primary' }: LoadingSpinnerProps) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const variants = {
    primary: {
      outer: 'border-accent/30',
      inner: 'border-accent border-t-transparent'
    },
    secondary: {
      outer: 'border-white/20',
      inner: 'border-white/60 border-t-transparent'
    },
    minimal: {
      outer: 'border-light-gray/20',
      inner: 'border-light-gray border-t-transparent'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className={`absolute inset-0 border-2 ${currentVariant.outer} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={`absolute inset-0 border-2 ${currentVariant.inner} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  subMessage?: string
  showSpinner?: boolean
}

export const LoadingOverlay = ({ 
  message = 'Loading...', 
  subMessage,
  showSpinner = true 
}: LoadingOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-gray border border-white/10 rounded-2xl p-8 flex flex-col items-center max-w-sm mx-4"
      >
        {showSpinner && <LoadingSpinner size="xl" className="mb-6" />}
        <p className="text-white font-medium text-lg mb-2">{message}</p>
        {subMessage && (
          <p className="text-light-gray text-sm text-center">{subMessage}</p>
        )}
      </motion.div>
    </motion.div>
  )
}

// Pulse loading for buttons
export const PulseLoader = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`flex gap-1 ${className}`}
    initial="start"
    animate="end"
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-current rounded-full"
        variants={{
          start: { opacity: 0.3 },
          end: { opacity: 1 }
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.2
        }}
      />
    ))}
  </motion.div>
)

// Skeleton loaders
export const SkeletonLine = ({ 
  width = '100%', 
  height = '1rem',
  className = '' 
}: { 
  width?: string
  height?: string
  className?: string 
}) => (
  <motion.div
    className={`bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded ${className}`}
    style={{ width, height }}
    animate={{
      backgroundPosition: ['200% 0', '-200% 0']
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }}
  />
)

export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`p-6 bg-dark-gray border border-white/10 rounded-2xl ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <motion.div 
        className="w-12 h-12 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="flex-1 space-y-2">
        <SkeletonLine width="60%" height="1.25rem" />
        <SkeletonLine width="40%" height="0.875rem" />
      </div>
    </div>
    <div className="space-y-3">
      <SkeletonLine width="100%" height="0.875rem" />
      <SkeletonLine width="80%" height="0.875rem" />
      <SkeletonLine width="60%" height="0.875rem" />
    </div>
  </div>
)

export const SkeletonText = ({ 
  lines = 3,
  className = '' 
}: { 
  lines?: number
  className?: string 
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonLine 
        key={i}
        width={i === lines - 1 ? '75%' : '100%'}
        height="0.875rem"
      />
    ))}
  </div>
)

// Progress bar
export const ProgressBar = ({ 
  progress, 
  className = '',
  showPercentage = false 
}: { 
  progress: number
  className?: string
  showPercentage?: boolean 
}) => (
  <div className={`w-full ${className}`}>
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
    {showPercentage && (
      <p className="text-sm text-light-gray mt-2 text-center">
        {Math.round(progress)}%
      </p>
    )}
  </div>
)

// Loading dots animation
export const LoadingDots = ({ 
  className = '',
  size = 'md' 
}: { 
  className?: string
  size?: 'sm' | 'md' | 'lg' 
}) => {
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${dotSizes[size]} bg-accent rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}