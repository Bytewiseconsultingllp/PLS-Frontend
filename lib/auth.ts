"use client"

// Check if code is running in browser
const isBrowser = typeof window !== "undefined"

// Set authentication cookie
export const login = (email: string, password: string): boolean => {
  if (email === "admin@gmail.com" && password === "1234567890") {
    // Set cookie with 1 day expiration
    document.cookie = "auth=true; path=/; max-age=86400; samesite=lax"
    return true
  }
  return false
}

// Clear authentication cookie
export const logout = () => {
  document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

  // If in browser, redirect to login page
  if (isBrowser) {
    window.location.href = "/admin/login"
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (!isBrowser) return false

  return document.cookie.includes("auth=true")
}
