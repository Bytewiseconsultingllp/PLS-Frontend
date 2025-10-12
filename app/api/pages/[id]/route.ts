import { NextResponse } from "next/server"
import { getPageById, updatePage, deletePage } from "@/lib/pages"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const page = await getPageById(params.id)

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const pageData = await request.json()

    const updatedPage = await updatePage(params.id, pageData)

    if (!updatedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error("Error updating page:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to update page"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deletePage(params.id)

    if (!success) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
