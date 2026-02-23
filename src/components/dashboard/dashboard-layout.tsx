"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Menu, X, Waves } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"

interface DashboardLayoutProps {
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

export function DashboardLayout({ activeTab, onTabChange, children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="dash min-h-screen" style={{ backgroundColor: "var(--dash-bg)" }}>
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Mobile header */}
      <header
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b px-4 py-3 lg:hidden"
        style={{
          backgroundColor: "var(--dash-sidebar)",
          borderColor: "var(--dash-border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: "var(--dash-accent)" }}
          >
            <Waves className="h-3.5 w-3.5" style={{ color: "var(--dash-bg)" }} />
          </div>
          <span className="font-mono text-sm font-bold" style={{ color: "var(--dash-text)" }}>
            DiveScore
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{ color: "var(--dash-text)" }}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-[49px] z-20 border-b p-3 lg:hidden"
          style={{
            backgroundColor: "var(--dash-sidebar)",
            borderColor: "var(--dash-border)",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            style={{ color: "var(--dash-text-secondary)" }}
            onClick={() => setMobileOpen(false)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      )}

      {/* Main content */}
      <main className="pt-[49px] lg:ml-[220px] lg:pt-0">
        <div
          className="hidden items-center justify-between border-b px-8 py-4 lg:flex"
          style={{ borderColor: "var(--dash-border)" }}
        >
          <div>
            <h1
              className="font-mono text-lg font-bold tracking-tight"
              style={{ color: "var(--dash-text)" }}
            >
              Dive Analytics
            </h1>
            <p className="text-xs" style={{ color: "var(--dash-text-secondary)" }}>
              Performance breakdown and scoring analysis
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--dash-text-secondary)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>

        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
