export function LoadingSkeleton() {
  const bar = "animate-pulse rounded-lg"

  return (
    <div className="space-y-6">
      {/* Score header row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl p-5"
            style={{
              backgroundColor: "var(--dash-card)",
              border: "1px solid var(--dash-border)",
            }}
          >
            <div className={`h-[100px] w-[100px] shrink-0 rounded-full ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
            <div className="flex-1 space-y-2">
              <div className={`h-3 w-16 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
              <div className={`h-3 w-10 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Metrics card */}
      <div
        className="space-y-3 rounded-2xl p-5"
        style={{
          backgroundColor: "var(--dash-card)",
          border: "1px solid var(--dash-border)",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-4 py-3.5"
            style={{
              backgroundColor: "var(--dash-bg)",
              border: "1px solid var(--dash-border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
              <div className="space-y-1.5">
                <div className={`h-3 w-24 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
                <div className={`h-2.5 w-32 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
              </div>
            </div>
            <div className={`h-4 w-8 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "var(--dash-card)",
          border: "1px solid var(--dash-border)",
        }}
      >
        <div className={`h-3 w-28 ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
        <div className={`mt-4 h-[200px] w-full rounded-lg ${bar}`} style={{ backgroundColor: "var(--dash-border)" }} />
      </div>
    </div>
  )
}
