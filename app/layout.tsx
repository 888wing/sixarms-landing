import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react'
import "./globals.css";

export const metadata: Metadata = {
  title: 'SIXARMS - AI-Powered Content Creation Platform',
  description: 'Transform your ideas into compelling content with just three simple choices. Create social media posts, marketing copy, and engaging content across all platforms with AI assistance.',
  keywords: 'AI content creation, content generator, social media content, AI writing, content automation, AI copywriting, content marketing, social media automation, LinkedIn content, Twitter posts, Instagram captions',
  authors: [{ name: 'SIXARMS', url: 'https://sixarms.ai' }],
  creator: 'SIXARMS',
  publisher: 'SIXARMS',
  metadataBase: new URL('https://sixarms.ai'),
  alternates: {
    canonical: 'https://sixarms.ai',
  },
  openGraph: {
    title: 'SIXARMS - AI-Powered Content Creation Platform',
    description: 'Transform your ideas into compelling content with just three simple choices. Create engaging content for every platform with advanced AI.',
    url: 'https://sixarms.ai',
    siteName: 'SIXARMS',
    images: [
      {
        url: 'https://sixarms.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SIXARMS - AI Content Creation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIXARMS - AI-Powered Content Creation',
    description: 'Transform your ideas into compelling content with AI. Create engaging posts for every platform in seconds.',
    site: '@sixarms_ai',
    creator: '@sixarms_ai',
    images: {
      url: 'https://sixarms.ai/og-image.png',
      alt: 'SIXARMS - AI Content Creation Platform',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#FF6B6B',
  category: 'technology',
  classification: 'AI Software',
  applicationName: 'SIXARMS',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

import { CustomCursor } from '@/components/effects/CustomCursor'
import { FloatingShapes } from '@/components/effects/FloatingShapes'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { SkipLink } from '@/components/a11y/SkipLink'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { StructuredData } from './structured-data'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased cursor-none">
        <SkipLink />
        <CustomCursor />
        <FloatingShapes />
        <ScrollProgress />
        <ErrorBoundary>
          <main id="main-content" className="relative" tabIndex={-1}>
            {children}
          </main>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
