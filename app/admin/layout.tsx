import type React from "react"
import type { Metadata } from "next"

import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { LogoutButton } from "@/components/logout-button"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for content management",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real application, you would implement proper authentication
  // For this example, we'll simulate a logged-in user
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    image: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex items-center gap-4">
            <LogoutButton />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
