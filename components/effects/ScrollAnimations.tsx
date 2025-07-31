'use client'

import { useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'rotate'
  duration?: number
  delay?: number
  className?: string
}

export const ScrollAnimation = ({
  children,
  animation = 'fadeIn',
  duration = 0.6,
  delay = 0,
  className = '',
}: ScrollAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax scrolling effect
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export const Parallax = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -speed
      element.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Stagger children animations
interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export const StaggerChildren = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}: StaggerChildrenProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item
interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}