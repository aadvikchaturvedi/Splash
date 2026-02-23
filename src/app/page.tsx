'use client'

import { Bubbles } from '@/components/landing/bubbles'
import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Stats } from '@/components/landing/stats'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { CallToAction } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'
import { WaveDivider } from '@/components/landing/wave-divider'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Bubbles />
      <Navbar />
      
      <main>
        <Hero />
        <WaveDivider />
        <Stats />
        <Features />
        <WaveDivider flip />
        <HowItWorks />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}
