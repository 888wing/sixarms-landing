'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { VideoModal } from '@/components/ui/VideoModal'
import { navigateToApp } from '@/lib/config'

export const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleGetStarted = () => {
    navigateToApp('/signup')
  }

  const handleWatchVideo = () => {
    setIsVideoModalOpen(true)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
      {/* Floating gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-full h-full bg-gradient-primary rounded-full blur-[100px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-2 text-sm font-medium text-light-gray bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            Powered by Advanced AI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-fluid-5xl font-bold leading-tight mb-6"
        >
          <span className="gradient-text">Create Content</span>
          <br />
          That Connects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-fluid-xl text-light-gray mb-12 max-w-3xl mx-auto"
        >
          Transform your ideas into compelling content with just three simple choices
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
            >
              Try Live Demo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleWatchVideo}
            >
              Watch Video
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <svg className="w-6 h-6 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // TODO: Replace with actual SIXARMS demo video
        videoTitle="See SIXARMS in Action"
      />
    </section>
  )
}