import { type NextRequest, NextResponse } from "next/server"
import { updateQualityServiceImages, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch quality service images
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(
      homePage.qualityServiceImages || {
        topImage: "/assets/17.png",
        bottomImage: "/assets/22.png",
      },
    )
  } catch (error) {
    console.error("Error fetching quality service images:", error)
    return NextResponse.json({ error: "Failed to fetch quality service images" }, { status: 500 })
  }
}

// POST handler to update quality service images
export async function POST(request: NextRequest) {
  try {
    const images = await request.json()

    if (!images || typeof images !== "object" || !images.topImage || !images.bottomImage) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 })
    }

    console.log("Received quality service images data:", images)

    const success = await updateQualityServiceImages(images)

    if (!success) {
      return NextResponse.json({ error: "Failed to update quality service images" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Quality service images updated successfully" })
  } catch (error) {
    console.error("Error updating quality service images:", error)
    return NextResponse.json({ error: "Failed to update quality service images" }, { status: 500 })
  }
}
