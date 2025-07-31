'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface OutputPanelProps {
  content: string
  isGenerating: boolean
  onReset: () => void
}

export const OutputPanel = ({ content, isGenerating, onReset }: OutputPanelProps) => {
  const [displayedContent, setDisplayedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Typewriter effect
  useEffect(() => {
    if (content && !isGenerating) {
      setIsTyping(true)
      setDisplayedContent('')
      
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedContent(prev => prev + content[currentIndex])
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, 20) // Typing speed

      return () => clearInterval(interval)
    }
  }, [content, isGenerating])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-light-gray">
          Generated Content
        </h3>
        <AnimatePresence mode="wait">
          {content && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-xs"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-xs"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {/* Loading state */}
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  {/* Rotating rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-accent/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-2 border-2 border-accent/50 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-4 border-2 border-accent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                <p className="text-light-gray text-sm">Generating content...</p>
              </div>
            </motion.div>
          )}

          {/* Content display */}
          {!isGenerating && displayedContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 h-full overflow-y-auto">
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {displayedContent}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {!isGenerating && !content && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-light-gray">Your content will appear here</p>
                <p className="text-light-gray/60 text-sm mt-2">Select all three options to generate</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        {content && !isGenerating && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex gap-3"
          >
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => window.open('/signup', '_blank')}
            >
              Create Your Own
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}