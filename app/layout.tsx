import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react'
import "./globals.css";

export const metadata: Metadata = {
  title: 'SIXARMS - Intelligent Content Creation',
  description: 'Transform your ideas into compelling content with just three simple choices',
  keywords: 'AI content creation, content generator, social media content, AI writing',
  authors: [{ name: 'SIXARMS' }],
  openGraph: {
    title: 'SIXARMS - Intelligent Content Creation',
    description: 'Transform your ideas into compelling content with just three simple choices',
    url: 'https://sixarms.ai',
    siteName: 'SIXARMS',
    images: [
      {
        url: 'https://sixarms.ai/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIXARMS - Intelligent Content Creation',
    description: 'Transform your ideas into compelling content with just three simple choices',
    images: ['https://sixarms.ai/og-image.png'],
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
};

import { CustomCursor } from '@/components/effects/CustomCursor'
import { FloatingShapes } from '@/components/effects/FloatingShapes'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { SkipLink } from '@/components/a11y/SkipLink'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased cursor-none">
        <SkipLink />
        <CustomCursor />
        <FloatingShapes />
        <ScrollProgress />
        <main id="main-content" className="relative" tabIndex={-1}>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
