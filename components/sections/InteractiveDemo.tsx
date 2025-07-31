'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { NodeSelector } from '@/components/demo/NodeSelector'
import { DemoCanvas } from '@/components/demo/DemoCanvas'
import { OutputPanel } from '@/components/demo/OutputPanel'
import { contentTemplates } from '@/lib/demo-content'

export type NodeType = 'platform' | 'tone' | 'language'
export type ActiveNodes = {
  platform: string | null
  tone: string | null
  language: string | null
}

export const InteractiveDemo = () => {
  const [activeNodes, setActiveNodes] = useState<ActiveNodes>({
    platform: null,
    tone: null,
    language: null,
  })
  const [generatedContent, setGeneratedContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleNodeSelect = (type: NodeType, nodeId: string) => {
    const newNodes = { ...activeNodes, [type]: nodeId }
    setActiveNodes(newNodes)
    
    // Check if all nodes are selected
    if (newNodes.platform && newNodes.tone && newNodes.language) {
      generateContent(newNodes)
    }
  }

  const generateContent = async (nodes: ActiveNodes) => {
    setIsGenerating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const key = `${nodes.platform}-${nodes.tone}-${nodes.language}`
    const content = contentTemplates[key] || contentTemplates.default
    
    setGeneratedContent(content)
    setIsGenerating(false)
  }

  const handleReset = () => {
    setActiveNodes({
      platform: null,
      tone: null,
      language: null,
    })
    setGeneratedContent('')
    setIsGenerating(false)
  }

  return (
    <section id="demo" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-dark-gray relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 text-sm font-medium text-light-gray bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            Interactive Demo
          </div>
          <h2 className="text-fluid-4xl font-bold mb-6">Experience the Magic</h2>
          <p className="text-fluid-lg text-light-gray max-w-3xl mx-auto">
            Select your platform, tone, and language to instantly generate tailored content that resonates with your audience.
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6"
        >
          {/* Node Selector */}
          <NodeSelector
            activeNodes={activeNodes}
            onNodeSelect={handleNodeSelect}
          />

          {/* Canvas */}
          <DemoCanvas activeNodes={activeNodes} />

          {/* Output Panel */}
          <OutputPanel
            content={generatedContent}
            isGenerating={isGenerating}
            onReset={handleReset}
          />
        </motion.div>
      </div>
    </section>
  )
}