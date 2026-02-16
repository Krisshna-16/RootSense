"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TreePine, AlertTriangle, BarChart3, Leaf, Home, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trees", href: "/trees", icon: TreePine },
  { name: "Civic Issues", href: "/issues", icon: AlertTriangle },
  { name: "Impact", href: "/impact", icon: BarChart3 },
  { name: "Admin", href: "/admin", icon: Shield },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Leaf className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-sidebar-foreground">ROOTSENSE</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/10 p-3">
          <UserButton afterSignOutUrl="/" showName />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">{user?.fullName || "User"}</span>
            <span className="text-xs text-sidebar-foreground/60">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
