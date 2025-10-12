import { type NextRequest, NextResponse } from "next/server"
import { updateITCards } from "@/lib/home-page"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    // Set cache control headers to prevent caching
    const headers = {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    }

    return NextResponse.json({ message: "Use POST to update IT cards" }, { headers })
  } catch (error) {
    console.error("Error in GET /api/home-page/it-cards:", error)
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
        { error: "Invalid data format. Expected an array of IT cards." },
        { status: 400, headers },
      )
    }

    console.log("Received IT cards data:", JSON.stringify(data, null, 2))

    // Update the IT cards in the database
    const result = await updateITCards(data)

    // Revalidate the home page to ensure it shows the latest data
    revalidatePath("/")

    return NextResponse.json({ success: true, itCards: result.itCards }, { headers })
  } catch (error) {
    console.error("Error in POST /api/home-page/it-cards:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers })
  }
}
