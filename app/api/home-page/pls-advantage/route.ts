import { NextResponse } from "next/server"
import { updatePLSAdvantage } from "@/lib/home-page"

export async function PUT(request: Request) {
  try {
    const advantage = await request.json()
    const result = await updatePLSAdvantage(advantage)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, message: result.error || "Failed to update PLS advantage" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in PLS advantage API route:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
