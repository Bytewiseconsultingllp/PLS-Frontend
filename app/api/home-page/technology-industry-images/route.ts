import { type NextRequest, NextResponse } from "next/server"
import { updateTechnologyIndustryImages, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

// GET handler to fetch technology industry images
export async function GET() {
  try {
    const homePage = await getHomePage()

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    return NextResponse.json(
      homePage.technologyIndustryImages || {
        topImage: "/assets/6.png",
        bottomImage: "/assets/11.png",
      },
    )
  } catch (error) {
    console.error("Error fetching technology industry images:", error)
    return NextResponse.json({ error: "Failed to fetch technology industry images" }, { status: 500 })
  }
}

// POST handler to update technology industry images
export async function POST(request: NextRequest) {
  try {
    const images = await request.json()

    if (!images || typeof images !== "object" || !images.topImage || !images.bottomImage) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 })
    }

    console.log("Received technology industry images data:", images)

    const success = await updateTechnologyIndustryImages(images)

    if (!success) {
      return NextResponse.json({ error: "Failed to update technology industry images" }, { status: 500 })
    }

    // Revalidate the home page to reflect the changes
    revalidatePath("/")
    revalidatePath("/admin/home")

    return NextResponse.json({ success: true, message: "Technology industry images updated successfully" })
  } catch (error) {
    console.error("Error updating technology industry images:", error)
    return NextResponse.json({ error: "Failed to update technology industry images" }, { status: 500 })
  }
}
