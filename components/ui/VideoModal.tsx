'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  videoTitle?: string;
}

export const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
  videoTitle = 'SIXARMS Platform Demo'
}: VideoModalProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all duration-200 group"
              aria-label="Close video modal"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Video container */}
            <div className="relative w-full h-full">
              {/* YouTube embed */}
              <iframe
                ref={videoRef}
                src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={videoTitle}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Loading state */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-coral border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400">Loading video...</p>
                </div>
              </div>
            </div>

            {/* Video title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white">{videoTitle}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};