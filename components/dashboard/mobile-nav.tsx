"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Calculator,
  ShieldAlert,
  FileBarChart,
  Settings,
  Shield,
  Menu,
  LogOut,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { label: "Cash Flow", href: "/dashboard/cash-flow", icon: TrendingUp },
  { label: "Tax Center", href: "/dashboard/tax-center", icon: Calculator },
  { label: "Fraud Monitor", href: "/dashboard/fraud-monitor", icon: ShieldAlert },
  { label: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold text-foreground">FinGuard AI</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold text-foreground">FinGuard AI</span>
            </Link>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-border px-3 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Log Out</span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
