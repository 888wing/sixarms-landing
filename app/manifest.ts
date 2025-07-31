import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SIXARMS - Intelligent Content Creation',
    short_name: 'SIXARMS',
    description: 'Transform your ideas into compelling content with AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#FF6B6B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}