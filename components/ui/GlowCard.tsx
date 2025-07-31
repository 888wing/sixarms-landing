'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export const GlowCard = ({ 
  children, 
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.1)'
}: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-3xl p-8 glassmorphism overflow-hidden group',
        className
      )}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-success/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}