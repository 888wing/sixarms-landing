import { Hero } from '@/components/sections/Hero'
import { InteractiveDemo } from '@/components/sections/InteractiveDemo'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveDemo />
      <HowItWorks />
      <Pricing />
      <Footer />
    </>
  )
}