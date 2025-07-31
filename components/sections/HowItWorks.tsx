'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose Platform',
    description: 'Select where you want to publish - Twitter, LinkedIn, Instagram, or any other platform.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M9 3v18"/>
        <path d="M15 3v18"/>
        <path d="M3 9h18"/>
        <path d="M3 15h18"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Select Tone & Language',
    description: 'Pick your preferred tone of voice and target language to match your audience perfectly.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Generate Content',
    description: 'Watch as AI instantly creates engaging content tailored to your specifications.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 text-sm font-medium text-light-gray bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            How It Works
          </div>
          <h2 className="text-fluid-4xl font-bold mb-6">Three Simple Steps</h2>
          <p className="text-fluid-lg text-light-gray max-w-3xl mx-auto">
            Create compelling content in seconds with our intuitive process designed for speed and quality.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Lines - Desktop Only */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.line
              x1="16.66%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="url(#gradient-line)"
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="83.34%"
              y2="50%"
              stroke="url(#gradient-line)"
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0" />
                <stop offset="50%" stopColor="#FF6B6B" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Step Cards */}
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm h-full hover:bg-white/[0.04] transition-colors duration-300">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-white/10">{step.number}</span>
                  <motion.div
                    className="text-accent"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-light-gray leading-relaxed">{step.description}</p>

                {/* Decorative Element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-light-gray mb-6">Ready to transform your content creation?</p>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
          >
            Try the live demo
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}