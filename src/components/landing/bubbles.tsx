"use client"

import { useState, useEffect } from "react"

interface Bubble {
  id: number
  size: number
  left: number
  delay: number
  duration: number
  opacity: number
}

export function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    setBubbles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 3,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 10,
        opacity: Math.random() * 0.3 + 0.05,
      }))
    )
  }, [])

  if (bubbles.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="animate-float-up absolute rounded-full border border-primary/20 bg-primary/10"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  )
}
