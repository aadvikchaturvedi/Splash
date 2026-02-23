const stats = [
  { value: "7", label: "Judges per dive" },
  { value: "<1s", label: "Score calculation" },
  { value: "100%", label: "Audit transparency" },
  { value: "0", label: "Tolerance for bias" },
]

export function Stats() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
