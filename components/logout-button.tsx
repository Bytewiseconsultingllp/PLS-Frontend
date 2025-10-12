"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Clear client-side authentication
      localStorage.removeItem("isAdminAuthenticated")

      // Call the logout API to clear the cookie
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      // Redirect to login page
      router.push("/admin/login")
      // Force a full page refresh
      window.location.href = "/admin/login"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  )
}
