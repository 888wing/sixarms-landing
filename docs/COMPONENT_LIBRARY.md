# SIXARMS Landing Page - Component Library

## 🎨 UI Components

### Button Component
```tsx
// components/ui/Button.tsx
import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]',
        secondary: 'bg-transparent border border-white/30 text-white hover:border-white/50 hover:bg-white/5 backdrop-blur-sm',
        ghost: 'text-light-gray hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-10 py-4 text-lg gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends HTMLMotionProps<'button'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Glow effect for primary button */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        )}
        
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

### MagneticButton Component
```tsx
// components/ui/MagneticButton.tsx
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3 
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### GlowCard Component
```tsx
// components/ui/GlowCard.tsx
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
  return (
    <motion.div
      className={cn(
        'relative rounded-3xl p-8 glassmorphism overflow-hidden group',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-success/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
```

## 🎯 Demo Components

### DraggableNode Component
```tsx
// components/demo/DraggableNode.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'

interface DraggableNodeProps {
  id: string
  type: 'platform' | 'tone' | 'language'
  icon: React.ReactNode
  label: string
  onSelect: (id: string) => void
  isActive: boolean
}

export const DraggableNode = ({
  id,
  type,
  icon,
  label,
  onSelect,
  isActive
}: DraggableNodeProps) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      layoutId={`node-${id}`}
      className={cn(
        'relative flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300',
        'border-2',
        isActive 
          ? 'bg-white/10 border-white/30' 
          : 'bg-white/[0.02] border-white/10 hover:border-white/20',
        isDragging && 'scale-105 shadow-2xl'
      )}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={() => onSelect(id)}
      drag
      dragSnapToOrigin
      dragElastic={0.2}
    >
      {/* Progress indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 to-success/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <div className="relative z-10 flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </motion.div>
  )
}
```

### NodeSelector Component
```tsx
// components/demo/NodeSelector.tsx
import { DraggableNode } from './DraggableNode'
import { motion } from 'framer-motion'

interface Node {
  id: string
  icon: React.ReactNode
  label: string
}

interface NodeSelectorProps {
  title: string
  nodes: Node[]
  activeNode: string | null
  onNodeSelect: (id: string) => void
}

export const NodeSelector = ({
  title,
  nodes,
  activeNode,
  onNodeSelect
}: NodeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-light-gray">
        {title}
      </h3>
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DraggableNode
              {...node}
              type={title.toLowerCase() as any}
              isActive={activeNode === node.id}
              onSelect={onNodeSelect}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
```

### DemoCanvas Component
```tsx
// components/demo/DemoCanvas.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface ActiveNode {
  id: string
  type: string
  icon: React.ReactNode
  label: string
}

interface DemoCanvasProps {
  activeNodes: {
    platform: ActiveNode | null
    tone: ActiveNode | null
    language: ActiveNode | null
  }
}

export const DemoCanvas = ({ activeNodes }: DemoCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const nodes = Object.values(activeNodes).filter(Boolean)

  return (
    <div
      ref={canvasRef}
      className="relative h-full min-h-[600px] rounded-3xl glassmorphism p-8 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Workflow visualization */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <AnimatePresence mode="wait">
          {nodes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-light-gray text-lg">
                Select options to build your content workflow
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="nodes"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {nodes.map((node, index) => (
                <React.Fragment key={node.id}>
                  {/* Node */}
                  <motion.div
                    layoutId={`canvas-node-${node.id}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 400,
                      damping: 25
                    }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Node body */}
                    <div className="relative bg-black border-2 border-white/20 rounded-2xl px-8 py-6 flex items-center gap-4">
                      <div className="text-3xl">{node.icon}</div>
                      <span className="text-lg font-medium">{node.label}</span>
                    </div>
                  </motion.div>
                  
                  {/* Connection line */}
                  {index < nodes.length - 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 40, opacity: 1 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      className="w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent relative"
                    >
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(255,255,255,0.4)', '0 0 0 8px rgba(255,255,255,0)'] 
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

### OutputPanel Component
```tsx
// components/demo/OutputPanel.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface OutputPanelProps {
  content: string | null
  isGenerating: boolean
  onReset: () => void
}

export const OutputPanel = ({ content, isGenerating, onReset }: OutputPanelProps) => {
  const [displayedContent, setDisplayedContent] = useState('')
  const [copied, setCopied] = useState(false)

  // Typewriter effect
  useEffect(() => {
    if (content && !isGenerating) {
      let index = 0
      setDisplayedContent('')
      
      const interval = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(prev => prev + content[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 20)

      return () => clearInterval(interval)
    }
  }, [content, isGenerating])

  const handleCopy = async () => {
    if (displayedContent) {
      await navigator.clipboard.writeText(displayedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="h-full rounded-3xl glassmorphism p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-light-gray">
          Generated Content
        </h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!displayedContent}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </Button>
        </div>
      </div>
      
      <div className="flex-1 font-mono text-sm leading-relaxed">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-accent"
            >
              <span>Generating content</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ●
              </motion.span>
            </motion.div>
          ) : displayedContent ? (
            <motion.p
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre-wrap"
            >
              {displayedContent}
              {displayedContent.length < (content?.length || 0) && (
                <motion.span
                  className="inline-block w-[2px] h-5 bg-white ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-light-gray italic"
            >
              Your AI-generated content will appear here...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

## 🌟 Effect Components

### CustomCursor Component
```tsx
// components/effects/CustomCursor.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)
      const isClickable = hoveredElement?.matches('a, button, [role="button"], input, textarea, select')
      setIsPointer(!!isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateCursorType)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 border-2 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
      
      {/* Follower */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
```

### FloatingShapes Component
```tsx
// components/effects/FloatingShapes.tsx
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
```

### ScrollProgress Component
```tsx
// components/effects/ScrollProgress.tsx
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[9999] origin-left"
      style={{ scaleX }}
    >
      <div className="h-full bg-gradient-primary" />
    </motion.div>
  )
}
```

## 📦 Icon Components

### Platform Icons
```tsx
// components/icons/PlatformIcons.tsx
export const TwitterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export const LinkedInIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export const InstagramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
```

### Tone Icons
```tsx
// components/icons/ToneIcons.tsx
export const ProfessionalIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

export const CasualIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
)

export const FormalIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)
```

### Language Icons
```tsx
// components/icons/LanguageIcons.tsx
export const GlobeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
```

## 🎨 Utility Components

### Container Component
```tsx
// components/ui/Container.tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
}

export const Container = ({ 
  children, 
  className = '', 
  size = 'lg' 
}: ContainerProps) => {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  )
}
```

### Section Component
```tsx
// components/ui/Section.tsx
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={cn('py-20 md:py-32', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}
```

---

**All components are ready for implementation! Each component follows the dark luxury design system with proper TypeScript types and Framer Motion animations. 🎨**