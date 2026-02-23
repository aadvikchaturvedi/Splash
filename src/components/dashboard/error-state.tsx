"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = "Failed to load dive data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-2xl px-8 py-16"
      style={{
        backgroundColor: "var(--dash-card)",
        border: "1px solid var(--dash-border)",
      }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: "#EF444420" }}
      >
        <AlertTriangle className="h-6 w-6" style={{ color: "var(--dash-danger)" }} />
      </div>
      <p className="text-lg font-medium" style={{ color: "var(--dash-text)" }}>
        Something went wrong
      </p>
      <p className="max-w-sm text-center text-sm" style={{ color: "var(--dash-text-secondary)" }}>
        {message}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-2 gap-2 rounded-lg text-sm font-semibold"
          style={{
            backgroundColor: "var(--dash-accent)",
            color: "var(--dash-bg)",
          }}
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  )
}
