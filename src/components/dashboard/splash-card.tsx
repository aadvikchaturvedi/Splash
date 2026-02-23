"use client"

import { useState } from "react"
import { Droplet } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface SplashCardProps {
  maxSplashFrame: number
}

export function SplashCard({ maxSplashFrame }: SplashCardProps) {
  const [open, setOpen] = useState(false)

  const quality = Math.min(maxSplashFrame / 2.5, 100)
  const doughnutData = [
    { name: "Quality", value: quality },
    { name: "Remaining", value: 100 - quality },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors hover:brightness-110"
        style={{
          backgroundColor: "var(--dash-bg)",
          border: "1px solid var(--dash-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <Droplet className="h-4 w-4 shrink-0" style={{ color: "var(--dash-accent)" }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--dash-text)" }}>
              Splash Analysis
            </p>
            <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
              Frame #{maxSplashFrame}
            </p>
          </div>
        </div>
        <span
          className="ml-3 font-mono text-sm font-semibold tabular-nums"
          style={{ color: quality >= 60 ? "var(--dash-accent)" : "var(--dash-warning)" }}
        >
          {quality.toFixed(0)}%
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md"
          style={{
            backgroundColor: "var(--dash-card)",
            borderColor: "var(--dash-border)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--dash-text)" }}>
              Splash Frame #{maxSplashFrame}
            </DialogTitle>
            <DialogDescription style={{ color: "var(--dash-text-secondary)" }}>
              Water displacement and entry quality analysis.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex items-start gap-6">
            <div className="flex shrink-0 flex-col items-center">
              <div className="h-[120px] w-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doughnutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={52}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      strokeWidth={0}
                    >
                      <Cell fill="#1FA97A" />
                      <Cell fill="#1E3A34" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <span className="mt-1 text-[10px]" style={{ color: "var(--dash-text-secondary)" }}>
                Entry quality
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              {[
                { label: "Frame", value: `#${maxSplashFrame}` },
                { label: "Displacement", value: `${(maxSplashFrame * 0.12).toFixed(1)}cm` },
                { label: "Duration", value: `${(maxSplashFrame * 0.033).toFixed(2)}s` },
                { label: "Rating", value: quality >= 60 ? "Clean" : "Messy" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: "var(--dash-bg)",
                    border: "1px solid var(--dash-border)",
                  }}
                >
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--dash-text-secondary)" }}>
                    {item.label}
                  </span>
                  <span className="font-mono text-xs font-semibold" style={{ color: "var(--dash-text)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
