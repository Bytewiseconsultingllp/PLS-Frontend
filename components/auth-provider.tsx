"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    const checkAuth = () => {
      // Check sessionStorage first (for client-side)
      const authFromSession = sessionStorage.getItem("isAdminAuthenticated") === "true"

      // Check cookies as fallback
      const authFromCookie = document.cookie.includes("adminAuth=true")

      setIsAuthenticated(authFromSession || authFromCookie)

      // If on admin page but not authenticated and not on login page
      if (pathname?.startsWith("/admin") && !(authFromSession || authFromCookie) && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = async (email: string, password: string) => {
    if (email === "admin@gmail.com" && password === "1234567890") {
      // Set authentication in sessionStorage
      sessionStorage.setItem("isAdminAuthenticated", "true")

      // Set cookie for server-side checks
      document.cookie = "adminAuth=true; path=/; max-age=86400; samesite=lax"

      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    // Clear authentication
    sessionStorage.removeItem("isAdminAuthenticated")
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
