import { NextResponse } from "next/server"
import { updateQualityDigitalSection, getInitialQualityDigitalSection } from "@/lib/home-page"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    await connectToDatabase()
    const initialData = getInitialQualityDigitalSection()
    return NextResponse.json(initialData)
  } catch (error) {
    console.error("Error fetching quality digital section:", error)
    return NextResponse.json({ error: "Failed to fetch quality digital section" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const success = await updateQualityDigitalSection(data)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to update quality digital section" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating quality digital section:", error)
    return NextResponse.json({ error: "Failed to update quality digital section" }, { status: 500 })
  }
}
