import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-diver.jpg"
          alt="Olympic diver underwater"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-wide text-primary">
              Olympics Hackathon 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance font-mono text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Redefining How
            <span className="text-primary"> Diving </span>
            Is Judged
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            A transparent, real-time scoring platform built for the modern
            Olympics. Eliminate bias, empower judges, and bring clarity to every
            dive.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-secondary/50 text-foreground hover:bg-secondary px-8 text-base"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Scoring mockup card */}
          <div className="relative mt-16 w-full max-w-3xl">
            <div className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-2xl shadow-primary/5 backdrop-blur-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-chart-4/60" />
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  live scoring
                </span>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {[9.5, 9.0, 9.5, 8.5, 9.0, 9.5, 9.0].map((score, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 rounded-lg bg-secondary/60 p-3"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {"J" + (i + 1)}
                    </span>
                    <span className="font-mono text-lg font-bold text-foreground md:text-2xl">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                <span className="text-sm text-muted-foreground">
                  Dive: Forward 3.5 Somersaults Pike
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Total:
                  </span>
                  <span className="font-mono text-2xl font-bold text-primary">
                    92.40
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
