import { type NextRequest, NextResponse } from "next/server"
import { updateQualityServices, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch quality services
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(homePage.qualityServices || [])
  } catch (error) {
    console.error("Error fetching quality services:", error)
    return NextResponse.json({ error: "Failed to fetch quality services" }, { status: 500 })
  }
}

// POST handler to update quality services
export async function POST(request: NextRequest) {
  try {
    const qualityServices = await request.json()

    if (!Array.isArray(qualityServices)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    console.log("Received quality services data:", qualityServices)

    const success = await updateQualityServices(qualityServices)

    if (!success) {
      return NextResponse.json({ error: "Failed to update quality services" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Quality services updated successfully" })
  } catch (error) {
    console.error("Error updating quality services:", error)
    return NextResponse.json({ error: "Failed to update quality services" }, { status: 500 })
  }
}
