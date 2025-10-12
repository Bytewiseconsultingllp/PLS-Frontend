import { NextResponse } from "next/server"
import { getAllIndustries, getIndustryById, getIndustryBySlug, createIndustry } from "@/lib/industries"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const slug = url.searchParams.get("slug")

  try {
    if (id) {
      const industry = await getIndustryById(id)
      if (!industry) {
        return NextResponse.json({ error: "Industry not found" }, { status: 404 })
      }
      return NextResponse.json(industry)
    } else if (slug) {
      const industry = await getIndustryBySlug(slug)
      if (!industry) {
        return NextResponse.json({ error: "Industry not found" }, { status: 404 })
      }
      return NextResponse.json(industry)
    } else {
      const industries = await getAllIndustries()
      return NextResponse.json(industries)
    }
  } catch (error) {
    console.error("Error fetching industries:", error)
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const industryData = await request.json()
    console.log("Received industry data:", JSON.stringify(industryData, null, 2))

    // Validate required fields
    if (!industryData.title) {
      console.log("Validation error: Title is required")
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!industryData.slug) {
      console.log("Validation error: Slug is required")
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    if (!industryData.subtitle) {
      console.log("Validation error: Subtitle is required")
      return NextResponse.json({ error: "Subtitle is required" }, { status: 400 })
    }

    // Ensure description has required structure
    if (!industryData.description) {
      industryData.description = { intro: [], conclusion: "" }
    }

    // Ensure arrays exist
    industryData.challenges = industryData.challenges || []
    industryData.requirements = industryData.requirements || []
    industryData.solutions = industryData.solutions || []
    industryData.benefits = industryData.benefits || []
    industryData.features = industryData.features || []
    industryData.faq = industryData.faq || []

    // Ensure description.conclusion is a string
    if (!industryData.description.conclusion) {
      industryData.description.conclusion = ""
    }

    // Ensure description.intro is an array
    if (!Array.isArray(industryData.description.intro)) {
      industryData.description.intro = []
    }

    console.log("Processed industry data:", JSON.stringify(industryData, null, 2))
    console.log("Calling createIndustry function...")
    const newIndustry = await createIndustry(industryData)

    if (!newIndustry) {
      console.error("Failed to create industry: createIndustry returned null")
      return NextResponse.json({ error: "Failed to create industry in database" }, { status: 500 })
    }

    console.log("Industry created successfully:", newIndustry.id)
    return NextResponse.json(newIndustry, { status: 201 })
  } catch (error) {
    console.error("Error creating industry:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create industry"
    console.error("Error details:", errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
