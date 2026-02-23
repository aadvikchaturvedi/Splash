"use client";
import Link from "next/link"
import { ArrowLeft, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
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
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join the platform that powers fair diving judgment
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={async (e) => {
            e.preventDefault();
            const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
            const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
            const res = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password }),
            });
            if (res.ok) {
              // redirect to login after successful signup
              window.location.href = '/login';
            } else {
              const data = await res.json();
              alert(data.error || 'Signup failed');
            }
          }}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Tom Daley"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="judge@olympics.org"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role" className="text-foreground">
              Role
            </Label>
            <Input
              id="role"
              type="text"
              placeholder="Judge, Coach, or Athlete"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </main>
  )
}
