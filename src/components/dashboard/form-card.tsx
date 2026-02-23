"use client"

interface FormCardProps {
  position: string
}

const positionConfig: Record<string, { color: string; description: string }> = {
  pike: {
    color: "var(--dash-warning)",
    description: "Body bent at hips, legs straight.",
  },
  tuck: {
    color: "var(--dash-accent)",
    description: "Knees drawn to chest, compact.",
  },
  straight: {
    color: "var(--dash-accent-secondary)",
    description: "Full extension, maximum difficulty.",
  },
}

export function FormCard({ position }: FormCardProps) {
  const key = position.toLowerCase()
  const config = positionConfig[key] || positionConfig.tuck

  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3.5"
      style={{
        backgroundColor: "var(--dash-bg)",
        border: "1px solid var(--dash-border)",
      }}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--dash-text)" }}>
          Form Classification
        </p>
        <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
          {config.description}
        </p>
      </div>
      <span
        className="ml-3 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold"
        style={{
          backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)`,
          color: config.color,
        }}
      >
        {position}
      </span>
    </div>
  )
}
