import { type NextRequest, NextResponse } from "next/server"
import { updateTechnologyCards } from "@/lib/home-page"

export async function POST(request: NextRequest) {
  try {
    const technologyCards = await request.json()

    if (!Array.isArray(technologyCards)) {
      return NextResponse.json({ error: "Technology cards must be an array" }, { status: 400 })
    }

    const success = await updateTechnologyCards(technologyCards)

    if (success) {
      return NextResponse.json({ success: true, message: "Technology cards updated successfully" })
    } else {
      return NextResponse.json({ error: "Failed to update technology cards" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating technology cards:", error)
    return NextResponse.json({ error: "Failed to update technology cards" }, { status: 500 })
  }
}
