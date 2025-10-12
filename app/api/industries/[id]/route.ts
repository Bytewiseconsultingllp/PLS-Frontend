import { NextResponse } from "next/server"
import { getIndustryById, updateIndustry, deleteIndustry } from "@/lib/industries"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const industry = await getIndustryById(params.id)

    if (!industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json(industry)
  } catch (error) {
    console.error("Error fetching industry:", error)
    return NextResponse.json({ error: "Failed to fetch industry" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const industryData = await request.json()

    // Validate required fields
    if (industryData.title === "") {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 })
    }

    if (industryData.slug === "") {
      return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 })
    }

    if (industryData.subtitle === "") {
      return NextResponse.json({ error: "Subtitle cannot be empty" }, { status: 400 })
    }

    // Ensure arrays are properly handled
    if (industryData.challenges && !Array.isArray(industryData.challenges)) {
      industryData.challenges = []
    }

    if (industryData.requirements && !Array.isArray(industryData.requirements)) {
      industryData.requirements = []
    }

    if (industryData.solutions && !Array.isArray(industryData.solutions)) {
      industryData.solutions = []
    }

    if (industryData.benefits && !Array.isArray(industryData.benefits)) {
      industryData.benefits = []
    }

    if (industryData.features && !Array.isArray(industryData.features)) {
      industryData.features = []
    }

    if (industryData.faq && !Array.isArray(industryData.faq)) {
      industryData.faq = []
    }

    const updatedIndustry = await updateIndustry(params.id, industryData)

    if (!updatedIndustry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json(updatedIndustry)
  } catch (error) {
    console.error("Error updating industry:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to update industry"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deleteIndustry(params.id)

    if (!success) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Industry deleted successfully" })
  } catch (error) {
    console.error("Error deleting industry:", error)
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 })
  }
}
