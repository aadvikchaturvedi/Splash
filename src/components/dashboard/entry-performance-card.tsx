"use client"

import { useEffect, useState } from "react"

interface EntryPerformanceCardProps {
  percentile: number
}

export function EntryPerformanceCard({ percentile }: EntryPerformanceCardProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentile), 50)
    return () => clearTimeout(timer)
  }, [percentile])

  const color =
    percentile >= 80
      ? "var(--dash-accent)"
      : percentile >= 50
        ? "var(--dash-warning)"
        : "var(--dash-danger)"

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3.5"
      style={{
        backgroundColor: "var(--dash-bg)",
        border: "1px solid var(--dash-border)",
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium" style={{ color: "var(--dash-text)" }}>
            Entry Straightness
          </p>
          <span className="ml-2 font-mono text-sm font-semibold tabular-nums" style={{ color }}>
            {percentile}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--dash-border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${width}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <p className="mt-1 text-[10px]" style={{ color: "var(--dash-text-secondary)" }}>
          {percentile >= 80
            ? "Near-vertical entry"
            : percentile >= 50
              ? "Moderate entry angle"
              : "Significant deviation"}
        </p>
      </div>
    </div>
  )
}
