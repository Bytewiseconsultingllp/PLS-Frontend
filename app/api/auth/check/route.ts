import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const adminAuth = cookies().get("adminAuth")
  const isAuthenticated = adminAuth?.value === "true"

  return NextResponse.json({ authenticated: isAuthenticated })
}
