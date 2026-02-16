import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <MobileNav />
      <main className="lg:pl-64">
        <div className="min-h-screen pt-14 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
