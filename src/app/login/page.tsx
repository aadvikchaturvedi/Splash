"use client";
import Link from "next/link"
import { ArrowLeft, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Waves className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-mono text-xl font-bold text-foreground">
            DiveScore
          </span>
        </div>

        <h1 className="font-mono text-2xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to your DiveScore account
        </p>

          <form className="mt-8 flex flex-col gap-5" onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
              // redirect to dashboard
              window.location.href = '/dashboard';
            } else {
              const data = await res.json();
              alert(data.error || 'Login failed');
            }
          }}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="judge@olympics.org"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}
