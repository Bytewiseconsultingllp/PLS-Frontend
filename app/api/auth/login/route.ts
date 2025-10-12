import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate credentials
    if (email === "admin@gmail.com" && password === "1234567890") {
      // Set a secure HTTP-only cookie
      cookies().set({
        name: "adminAuth",
        value: "true",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
