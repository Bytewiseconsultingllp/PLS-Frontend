import { type NextRequest, NextResponse } from "next/server"
import { updateQualityIndustry, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch quality industry
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(homePage.qualityIndustry || [])
  } catch (error) {
    console.error("Error fetching quality industry:", error)
    return NextResponse.json({ error: "Failed to fetch quality industry" }, { status: 500 })
  }
}

// POST handler to update quality industry
export async function POST(request: NextRequest) {
  try {
    const qualityIndustry = await request.json()

    if (!Array.isArray(qualityIndustry)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    const success = await updateQualityIndustry(qualityIndustry)

    if (!success) {
      return NextResponse.json({ error: "Failed to update quality industry" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Quality industry updated successfully" })
  } catch (error) {
    console.error("Error updating quality industry:", error)
    return NextResponse.json({ error: "Failed to update quality industry" }, { status: 500 })
  }
}
