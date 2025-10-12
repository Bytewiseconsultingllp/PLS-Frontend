import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function GET() {
  try {
    await dbConnect()
    const technologies = await Technology.find({}).sort({ updatedAt: -1 })

    // Transform MongoDB documents to plain objects with proper ID format
    const formattedTechnologies = technologies.map((tech) => ({
      id: tech._id.toString(),
      title: tech.title,
      slug: tech.slug,
      subtitle: tech.subtitle,
      image: tech.image,
      isPublished: tech.isPublished,
      status: tech.status,
      createdAt: tech.createdAt,
      updatedAt: tech.updatedAt,
      description: tech.description,
      features: tech.features,
      benefits: tech.benefits,
      techStacks: tech.techStacks,
      services: tech.services,
      faq: tech.faq,
    }))

    return NextResponse.json(formattedTechnologies)
  } catch (error) {
    console.error("Error fetching technologies:", error)
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 })
  }
}

// Make sure the POST method properly handles all the fields from the form

// Update the POST method to ensure it handles all fields
export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate required fields
    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!data.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    // Create a new technology document
    const technology = new Technology({
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle || "",
      image: data.image || "",
      isPublished: data.isPublished || false,
      status: data.status || "draft",
      parentTechnology: data.parentTechnology || "",
      description: data.description || "",
      features: data.features || [],
      benefits: data.benefits || [],
      techStacks: data.techStacks || [],
      services: data.services || [],
      faq: data.faq || [],
    })

    // Save to database
    await technology.save()

    // Return the created technology with proper ID format
    return NextResponse.json(
      {
        id: technology._id.toString(),
        title: technology.title,
        slug: technology.slug,
        subtitle: technology.subtitle,
        image: technology.image,
        isPublished: technology.isPublished,
        status: technology.status,
        createdAt: technology.createdAt,
        updatedAt: technology.updatedAt,
        description: technology.description,
        features: technology.features,
        benefits: technology.benefits,
        techStacks: technology.techStacks,
        services: technology.services,
        faq: technology.faq,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating technology:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create technology"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
