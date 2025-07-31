export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sixarms.ai/#organization",
      "name": "SIXARMS",
      "url": "https://sixarms.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sixarms.ai/logo.png",
        "width": 300,
        "height": 60
      },
      "sameAs": [
        "https://twitter.com/sixarms_ai",
        "https://linkedin.com/company/sixarms",
        "https://github.com/sixarms"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://sixarms.ai/#website",
      "url": "https://sixarms.ai",
      "name": "SIXARMS",
      "description": "AI-Powered Content Creation Platform",
      "publisher": {
        "@id": "https://sixarms.ai/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://sixarms.ai/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sixarms.ai/#software",
      "name": "SIXARMS",
      "description": "Transform your ideas into compelling content with just three simple choices. AI-powered content generation for every platform.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://sixarms.ai",
      "publisher": {
        "@id": "https://sixarms.ai/#organization"
      },
      "offers": {
        "@type": "Offer",
        "price": "10",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": "https://sixarms.ai/#organization"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "AI-powered content generation",
        "Multi-platform support",
        "Visual workflow builder",
        "Real-time content preview",
        "Multiple language support",
        "Tone customization",
        "Export to multiple formats"
      ],
      "screenshot": {
        "@type": "ImageObject",
        "url": "https://sixarms.ai/screenshot.png",
        "caption": "SIXARMS Content Creation Interface"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://sixarms.ai/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is SIXARMS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SIXARMS is an AI-powered content creation platform that helps you transform ideas into compelling content with just three simple choices: platform, tone, and language."
          }
        },
        {
          "@type": "Question",
          "name": "How does SIXARMS work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SIXARMS uses advanced AI to generate content based on your selections. Simply choose your target platform, desired tone, and language, then let our AI create engaging content tailored to your needs."
          }
        },
        {
          "@type": "Question",
          "name": "What platforms does SIXARMS support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SIXARMS supports content creation for LinkedIn, Twitter/X, Instagram, Facebook, YouTube, TikTok, and many other popular social media and content platforms."
          }
        },
        {
          "@type": "Question",
          "name": "How much does SIXARMS cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SIXARMS offers flexible pricing starting at $10/month with a credit-based system. Each content generation uses credits based on complexity and length."
          }
        }
      ]
    }
  ]
};

export const StructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};