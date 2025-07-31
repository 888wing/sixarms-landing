'use client'

import { motion } from 'framer-motion'

export const FloatingShapes = () => {
  const shapes = [
    { 
      size: 400, 
      color: '#FF6B6B', 
      position: { top: '-200px', right: '-100px' },
      duration: 20 
    },
    { 
      size: 300, 
      color: '#4ECDC4', 
      position: { bottom: '-150px', left: '-150px' },
      duration: 25,
      delay: -5 
    },
    { 
      size: 200, 
      color: '#667eea', 
      position: { top: '50%', left: '10%' },
      duration: 30,
      delay: -10 
    },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full filter blur-[100px] opacity-30"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            ...shape.position,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay || 0,
          }}
        />
      ))}
    </div>
  )
}