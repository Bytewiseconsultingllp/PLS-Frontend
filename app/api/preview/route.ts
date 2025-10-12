import { type NextRequest, NextResponse } from "next/server"
import { getPageById } from "@/lib/pages"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  console.log("Preview API called with ID:", id)

  if (!id) {
    console.log("Missing page ID in preview request")
    return NextResponse.json({ error: "Missing page ID" }, { status: 400 })
  }

  try {
    const page = await getPageById(id)

    console.log("Preview API found page:", page ? "yes" : "no")

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // In a real app, you might set a preview cookie here
    // and redirect to the page
    return NextResponse.json({ page })
  } catch (error) {
    console.error("Preview error:", error)
    return NextResponse.json({ error: "Failed to load preview" }, { status: 500 })
  }
}
