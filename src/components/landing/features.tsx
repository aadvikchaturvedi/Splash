import {
  Eye,
  BarChart3,
  Shield,
  Zap,
  Users,
  Trophy,
} from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Bias Detection",
    description:
      "AI-powered analysis flags scoring anomalies and potential biases in real time, promoting fair and transparent judging.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description:
      "Comprehensive dashboards break down scores, difficulty, and execution for every dive as it happens.",
  },
  {
    icon: Shield,
    title: "Tamper-Proof Scores",
    description:
      "Immutable score records ensure that every judge's submission is securely logged and auditable.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Scores are calculated and displayed in under a second, keeping competitions moving at full pace.",
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description:
      "Judges, coaches, athletes, and spectators each get a tailored interface for their needs.",
  },
  {
    icon: Trophy,
    title: "Competition Management",
    description:
      "Full event setup from preliminary rounds to finals, with bracket management and real-time leaderboards.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Features
          </span>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Built for Precision
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every tool a judge, coach, or athlete needs to ensure diving
            competitions are scored fairly and efficiently.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/90 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-mono text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
