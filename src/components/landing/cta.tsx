import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/scoring.jpg"
              alt="Diving scoreboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-background/90" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-8 py-16 text-center md:py-24">
            <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to Bring Transparency to Diving?
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Join the next generation of Olympic judging. Sign up now and be
              part of the revolution in competitive diving.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base"
                asChild
              >
                <Link href="/signup">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-secondary/50 text-foreground hover:bg-secondary px-8 text-base"
                asChild
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
