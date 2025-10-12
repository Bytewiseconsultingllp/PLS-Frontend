import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for login page and API routes
  if (path === "/admin/login" || path.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Only check admin paths
  if (path.startsWith("/admin")) {
    // Check for authentication cookie
    const adminAuth = request.cookies.get("adminAuth")
    const isAuthenticated = adminAuth?.value === "true"

    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Add performance-related headers
  const response = NextResponse.next()

  // Cache control for static assets
  if (path.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Set security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Return the response with added headers
  return response
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
}
