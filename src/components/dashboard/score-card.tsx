"use client"

import { useEffect, useState, useRef } from "react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts"

interface ScoreCardProps {
  score: number
  maxScore?: number
}

export function ScoreCard({ score, maxScore = 10 }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const duration = 900
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(eased * score)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [score])

  const percentage = (score / maxScore) * 100
  const radialData = [{ name: "score", value: percentage, fill: "#1FA97A" }]

  const label =
    score >= 8.5 ? "Excellent" : score >= 6 ? "Good" : "Needs work"

  return (
    <div
      className="flex items-center gap-5 rounded-2xl p-5"
      style={{
        backgroundColor: "var(--dash-card)",
        border: "1px solid var(--dash-border)",
      }}
    >
      <div className="relative h-[100px] w-[100px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="72%"
            outerRadius="100%"
            barSize={8}
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={4}
              background={{ fill: "var(--dash-border)" }}
              isAnimationActive
              animationDuration={700}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-2xl font-bold leading-none"
            style={{ color: "var(--dash-text)" }}
          >
            {displayScore.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
          Overall Score
        </p>
        <p
          className="mt-0.5 text-sm font-medium"
          style={{
            color:
              score >= 8.5
                ? "var(--dash-accent)"
                : score >= 6
                  ? "var(--dash-warning)"
                  : "var(--dash-danger)",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
