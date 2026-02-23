"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface DeductionCardProps {
  interpretation: string
}

export function DeductionCard({ interpretation }: DeductionCardProps) {
  const [open, setOpen] = useState(false)
  const lower = interpretation.toLowerCase()
  const isClean = lower.includes("no separation") || lower.includes("minimal")
  const isMajor = lower.includes("significant")

  const statusColor = isClean
    ? "var(--dash-accent)"
    : isMajor
      ? "var(--dash-danger)"
      : "var(--dash-warning)"

  const statusLabel = isClean ? "Pass" : isMajor ? "Major" : "Minor"

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
        <div className="flex items-center gap-3 min-w-0">
          {isClean ? (
            <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "var(--dash-accent)" }} />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: statusColor }} />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium" style={{ color: "var(--dash-text)" }}>
              Leg Separation
            </p>
            <p className="truncate text-xs" style={{ color: "var(--dash-text-secondary)" }}>
              {interpretation}
            </p>
          </div>
        </div>
        <span
          className="ml-3 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: `color-mix(in srgb, ${statusColor} 15%, transparent)`,
            color: statusColor,
          }}
        >
          {statusLabel}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          style={{
            backgroundColor: "var(--dash-card)",
            borderColor: "var(--dash-border)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--dash-text)" }}>
              Leg Separation Analysis
            </DialogTitle>
            <DialogDescription style={{ color: "var(--dash-text-secondary)" }}>
              Deduction breakdown for the feet-apart metric.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 space-y-3">
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--dash-bg)",
                border: "1px solid var(--dash-border)",
              }}
            >
              <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
                Interpretation
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--dash-text)" }}>
                {interpretation}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--dash-bg)",
                border: "1px solid var(--dash-border)",
              }}
            >
              <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
                Deduction Rule
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--dash-text)" }}>
                {isClean
                  ? "No deduction applied. Feet maintained alignment within acceptable threshold."
                  : isMajor
                    ? "Deduction of 0.5 - 1.0 pts. Visible separation detected during entry."
                    : "Deduction of 0.0 - 0.5 pts. Slight separation detected but within correctable range."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
