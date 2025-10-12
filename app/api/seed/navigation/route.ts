import { NextResponse } from "next/server"
import { seedNavigation } from "@/lib/seed-navigation"

export async function GET() {
  try {
    const result = await seedNavigation()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error seeding navigation:", error)
    return NextResponse.json({ error: "Failed to seed navigation" }, { status: 500 })
  }
}
