const steps = [
  {
    number: "01",
    title: "Set Up the Event",
    description:
      "Create a competition with rounds, assign judges, and register athletes with their dive lists in minutes.",
  },
  {
    number: "02",
    title: "Score Each Dive",
    description:
      "Judges submit scores from any device. Execution, synchronization, and difficulty are weighted automatically.",
  },
  {
    number: "03",
    title: "Analyze & Finalize",
    description:
      "Real-time analytics detect outliers, flag potential bias, and generate transparent leaderboards instantly.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            How It Works
          </span>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Three Steps to Fair Scoring
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From event creation to final results, DiveScore keeps the process
            streamlined and transparent.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-12 left-full z-10 hidden h-px w-full bg-gradient-to-r from-primary/40 to-transparent md:block" />
              )}
              <div className="mb-4 font-mono text-5xl font-bold text-primary/20">
                {step.number}
              </div>
              <h3 className="font-mono text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
