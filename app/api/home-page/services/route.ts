import { type NextRequest, NextResponse } from "next/server"
import { updateServices } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    // Set cache control headers to prevent caching
    const headers = {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    }

    return NextResponse.json({ message: "Use POST to update services" }, { headers })
  } catch (error) {
    console.error("Error in GET /api/home-page/services:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Set cache control headers to prevent caching
    const headers = {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    }

    const data = await request.json()

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Invalid data format. Expected an array of services." },
        { status: 400, headers },
      )
    }

    console.log("Received services data:", JSON.stringify(data, null, 2))

    // Update the services in the database
    const result = await updateServices(data)

    // Revalidate the home page to ensure it shows the latest data
    revalidatePath("/")

    return NextResponse.json({ success: true, services: result.services }, { headers })
  } catch (error) {
    console.error("Error in POST /api/home-page/services:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers })
  }
}
