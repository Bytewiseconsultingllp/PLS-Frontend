import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the authentication cookie
  cookies().set({
    name: "adminAuth",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  })

  return NextResponse.json({ success: true })
}
