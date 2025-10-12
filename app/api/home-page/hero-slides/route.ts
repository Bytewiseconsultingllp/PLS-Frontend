import { type NextRequest, NextResponse } from "next/server"
import { updateHeroSlides, getHomePage } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    console.log("GET /api/home-page/hero-slides called")

    const homePage = await getHomePage()

    if (!homePage) {
      console.log("Home page not found")
      return NextResponse.json([], {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      })
    }

    console.log("Returning hero slides:", homePage.heroSlides?.length || 0)
    return NextResponse.json(homePage.heroSlides || [], {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching hero slides:", error)
    return NextResponse.json({ error: "Failed to fetch hero slides data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log("PUT /api/home-page/hero-slides called")

    const slides = await request.json()
    console.log("Received slides data:", slides?.length || 0)

    const success = await updateHeroSlides(slides)

    if (!success) {
      console.log("Failed to update hero slides")
      return NextResponse.json({ error: "Failed to update hero slides data" }, { status: 500 })
    }

    // Revalidate the home page to ensure it shows the latest data
    revalidatePath("/")
    revalidatePath("/admin/home")

    console.log("Hero slides updated successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating hero slides:", error)
    return NextResponse.json({ error: "Failed to update hero slides data" }, { status: 500 })
  }
}
