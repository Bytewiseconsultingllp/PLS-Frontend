import { type NextRequest, NextResponse } from "next/server"
import { updateTechnologyIndustry, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch technology industry
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(homePage.technologyIndustry || [])
  } catch (error) {
    console.error("Error fetching technology industry:", error)
    return NextResponse.json({ error: "Failed to fetch technology industry" }, { status: 500 })
  }
}

// POST handler to update technology industry
export async function POST(request: NextRequest) {
  try {
    const technologyIndustry = await request.json()

    if (!Array.isArray(technologyIndustry)) {
      return NextResponse.json({ error: "Technology industry must be an array" }, { status: 400 })
    }

    console.log("Received technology industry data:", technologyIndustry)

    const success = await updateTechnologyIndustry(technologyIndustry)

    if (!success) {
      return NextResponse.json({ error: "Failed to update technology industry" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Technology industry updated successfully" })
  } catch (error) {
    console.error("Error updating technology industry:", error)
    return NextResponse.json({ error: "Failed to update technology industry" }, { status: 500 })
  }
}
