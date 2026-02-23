"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, MoreHorizontal, Settings, HelpCircle, Waves } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const secondaryNav = [
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <aside
      className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col justify-between border-r lg:flex"
      style={{
        backgroundColor: "var(--dash-sidebar)",
        borderColor: "var(--dash-border)",
      }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--dash-accent)" }}
          >
            <Waves className="h-3.5 w-3.5" style={{ color: "var(--dash-bg)" }} />
          </div>
          <Link
            href="/"
            className="font-mono text-base font-bold tracking-tight"
            style={{ color: "var(--dash-text)" }}
          >
            DiveScore
          </Link>
        </div>

        {/* Primary nav */}
        <nav className="mt-1 flex flex-col gap-0.5 px-3">
          <button
            onClick={() => onTabChange("overview")}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeTab === "overview" ? "var(--dash-accent)" : "transparent",
              color: activeTab === "overview" ? "var(--dash-bg)" : "var(--dash-text-secondary)",
            }}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </button>
        </nav>
      </div>

      {/* Secondary nav collapsed into popover */}
      <div className="px-3 pb-4">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={{ color: "var(--dash-text-secondary)" }}
            >
              <MoreHorizontal className="h-4 w-4" />
              More
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            className="w-44 p-1"
            style={{
              backgroundColor: "var(--dash-card)",
              borderColor: "var(--dash-border)",
            }}
          >
            {secondaryNav.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--dash-text-secondary)" }}
                onClick={() => setPopoverOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  )
}
