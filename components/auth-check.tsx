"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page and non-admin pages
    if (pathname === "/admin/login" || !pathname.startsWith("/admin")) {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        // Check client-side auth first
        const clientAuth = localStorage.getItem("isAdminAuthenticated") === "true"

        if (clientAuth) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // If no client-side auth, check with the server
        const response = await fetch("/api/auth/check")
        const data = await response.json()

        if (data.authenticated) {
          localStorage.setItem("isAdminAuthenticated", "true")
          setIsAuthenticated(true)
        } else {
          // Redirect to login if not authenticated
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  // For non-admin pages or if authenticated, render children
  if (!pathname.startsWith("/admin") || isAuthenticated) {
    return <>{children}</>
  }

  // For admin pages that are not authenticated, render nothing (will be redirected)
  return null
}
