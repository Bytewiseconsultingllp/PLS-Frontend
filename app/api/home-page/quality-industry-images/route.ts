import { type NextRequest, NextResponse } from "next/server"
import { updateQualityIndustryImages, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch quality industry images
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(
      homePage.qualityIndustryImages || {
        topImage: "/assets/9.png",
        bottomImage: "/assets/15.png",
      },
    )
  } catch (error) {
    console.error("Error fetching quality industry images:", error)
    return NextResponse.json({ error: "Failed to fetch quality industry images" }, { status: 500 })
  }
}

// POST handler to update quality industry images
export async function POST(request: NextRequest) {
  try {
    const images = await request.json()

    if (!images || typeof images !== "object" || !images.topImage || !images.bottomImage) {
      return NextResponse.json(
        { error: "Invalid data format. Expected object with topImage and bottomImage." },
        { status: 400 },
      )
    }

    const success = await updateQualityIndustryImages(images)

    if (!success) {
      return NextResponse.json({ error: "Failed to update quality industry images" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Quality industry images updated successfully" })
  } catch (error) {
    console.error("Error updating quality industry images:", error)
    return NextResponse.json({ error: "Failed to update quality industry images" }, { status: 500 })
  }
}
