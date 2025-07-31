'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ActiveNodes } from '@/components/sections/InteractiveDemo'

interface DemoCanvasProps {
  activeNodes: ActiveNodes
}

interface NodePosition {
  x: number
  y: number
  label: string
  type: string
}

const nodeConfig: Record<string, { label: string; color: string }> = {
  // Platforms
  twitter: { label: 'Twitter', color: '#1DA1F2' },
  linkedin: { label: 'LinkedIn', color: '#0077B5' },
  instagram: { label: 'Instagram', color: '#E4405F' },
  // Tones
  professional: { label: 'Professional', color: '#6366F1' },
  casual: { label: 'Casual', color: '#10B981' },
  formal: { label: 'Formal', color: '#8B5CF6' },
  // Languages
  english: { label: 'English', color: '#EF4444' },
  spanish: { label: 'Español', color: '#F59E0B' },
  chinese: { label: '中文', color: '#EC4899' },
}

export const DemoCanvas = ({ activeNodes }: DemoCanvasProps) => {
  const [nodes, setNodes] = useState<NodePosition[]>([])
  const [connections, setConnections] = useState<{ from: number; to: number }[]>([])

  useEffect(() => {
    const newNodes: NodePosition[] = []
    const newConnections: { from: number; to: number }[] = []

    // Platform node (left)
    if (activeNodes.platform) {
      newNodes.push({
        x: 25,
        y: 50,
        label: nodeConfig[activeNodes.platform].label,
        type: activeNodes.platform,
      })
    }

    // Tone node (top middle)
    if (activeNodes.tone) {
      newNodes.push({
        x: 50,
        y: 20,
        label: nodeConfig[activeNodes.tone].label,
        type: activeNodes.tone,
      })
      
      // Connect platform to tone if both exist
      if (activeNodes.platform) {
        newConnections.push({ from: 0, to: 1 })
      }
    }

    // Language node (bottom middle)
    if (activeNodes.language) {
      const languageIndex = activeNodes.tone ? 2 : 1
      newNodes.push({
        x: 50,
        y: 80,
        label: nodeConfig[activeNodes.language].label,
        type: activeNodes.language,
      })
      
      // Connect to previous nodes
      if (activeNodes.platform && !activeNodes.tone) {
        newConnections.push({ from: 0, to: 1 })
      } else if (activeNodes.tone) {
        newConnections.push({ from: 1, to: languageIndex })
      }
    }

    // Output node (right)
    if (activeNodes.platform && activeNodes.tone && activeNodes.language) {
      newNodes.push({
        x: 75,
        y: 50,
        label: 'Generate',
        type: 'output',
      })
      
      // Connect all to output
      const outputIndex = newNodes.length - 1
      if (activeNodes.tone) {
        newConnections.push({ from: 2, to: outputIndex })
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)
  }, [activeNodes])

  return (
    <div className="relative h-full min-h-[400px] bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Canvas content */}
      <div className="relative w-full h-full">
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence>
            {connections.map((connection, index) => {
              const fromNode = nodes[connection.from]
              const toNode = nodes[connection.to]
              
              if (!fromNode || !toNode) return null

              const x1 = `${fromNode.x}%`
              const y1 = `${fromNode.y}%`
              const x2 = `${toNode.x}%`
              const y2 = `${toNode.y}%`

              // Calculate control points for curved path
              const midX = (fromNode.x + toNode.x) / 2
              const controlX1 = midX
              const controlY1 = fromNode.y
              const controlX2 = midX
              const controlY2 = toNode.y

              return (
                <motion.g key={`connection-${index}`}>
                  {/* Connection path */}
                  <motion.path
                    d={`M ${x1} ${y1} C ${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${x2} ${y2}`}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                  
                  {/* Animated dot */}
                  <motion.circle
                    r="4"
                    fill="#FF6B6B"
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.2,
                    }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={`M ${x1} ${y1} C ${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${x2} ${y2}`}
                    />
                  </motion.circle>
                </motion.g>
              )
            })}
          </AnimatePresence>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node, index) => {
            const config = node.type === 'output' 
              ? { label: 'Generate', color: '#FF6B6B' }
              : nodeConfig[node.type]

            return (
              <motion.div
                key={`node-${node.type}-${index}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.1 
                }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Node glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ backgroundColor: config.color }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Node body */}
                  <div 
                    className="relative px-6 py-3 rounded-2xl border-2 backdrop-blur-sm"
                    style={{
                      borderColor: config.color,
                      backgroundColor: `${config.color}10`,
                    }}
                  >
                    <span className="font-semibold text-white">
                      {config.label}
                    </span>
                  </div>

                  {/* Pulse animation for output node */}
                  {node.type === 'output' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2"
                      style={{ borderColor: config.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty state */}
        {nodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-light-gray">Select options to see the workflow</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}