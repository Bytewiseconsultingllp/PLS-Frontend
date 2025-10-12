import { type NextRequest, NextResponse } from "next/server"
import { getHomePage, updateHomePage } from "@/lib/home-page"

export async function GET() {
  try {
    const homePage = await getHomePage()
    return NextResponse.json(homePage)
  } catch (error) {
    console.error("Error fetching home page:", error)
    return NextResponse.json({ error: "Failed to fetch home page data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const updatedHomePage = await updateHomePage(data)
    return NextResponse.json(updatedHomePage)
  } catch (error) {
    console.error("Error updating home page:", error)
    return NextResponse.json({ error: "Failed to update home page data" }, { status: 500 })
  }
}
