"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, BellRing, Calendar, Home, LightbulbIcon, Settings } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-16 border-r bg-muted/40 md:w-52">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-3 lg:h-[60px] lg:px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChart className="h-6 w-6" />
            <span className="hidden md:inline">EnergyDash</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/") ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              href="/appliances"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/appliances")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LightbulbIcon className="h-4 w-4" />
              <span className="hidden md:inline">Appliances</span>
            </Link>
            <Link
              href="/alerts"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/alerts") ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BellRing className="h-4 w-4" />
              <span className="hidden md:inline">Alerts</span>
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/history")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">History</span>
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/settings")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

