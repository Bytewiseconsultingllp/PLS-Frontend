import { NextResponse } from "next/server"
import { getAllPages, getPageById, getPageBySlug, createPage } from "@/lib/pages"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const slug = url.searchParams.get("slug")

  try {
    if (id) {
      console.log(`API: Fetching page with ID: ${id}`)
      const page = await getPageById(id)
      if (!page) {
        console.log(`API: Page not found with ID: ${id}`)
        return NextResponse.json({ error: "Page not found" }, { status: 404 })
      }
      return NextResponse.json(page)
    } else if (slug) {
      console.log(`API: Fetching page with slug: ${slug}`)
      const page = await getPageBySlug(slug)
      if (!page) {
        console.log(`API: Page not found with slug: ${slug}`)
        return NextResponse.json({ error: "Page not found" }, { status: 404 })
      }
      return NextResponse.json(page)
    } else {
      console.log("API: Fetching all pages")
      const pages = await getAllPages()
      console.log(`API: Found ${pages.length} pages`)
      return NextResponse.json(pages)
    }
  } catch (error) {
    console.error("API Error fetching pages:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch pages",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const pageData = await request.json()

    const newPage = await createPage(pageData)

    if (!newPage) {
      return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
    }

    return NextResponse.json(newPage, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create page"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
