import { NextResponse } from "next/server"
import { getAllServices, getServiceById, getServiceBySlug, createService } from "@/lib/services"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const slug = url.searchParams.get("slug")

  try {
    if (id) {
      const service = await getServiceById(id)
      if (!service) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 })
      }
      return NextResponse.json(service)
    } else if (slug) {
      const service = await getServiceBySlug(slug)
      if (!service) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 })
      }
      return NextResponse.json(service)
    } else {
      const services = await getAllServices()
      return NextResponse.json(services)
    }
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const serviceData = await request.json()
    console.log("Received service data:", JSON.stringify(serviceData, null, 2))

    // Validate required fields
    if (!serviceData.title) {
      console.log("Validation error: Title is required")
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!serviceData.slug) {
      console.log("Validation error: Slug is required")
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    if (!serviceData.subtitle) {
      console.log("Validation error: Subtitle is required")
      return NextResponse.json({ error: "Subtitle is required" }, { status: 400 })
    }

    // Ensure description has required structure
    if (!serviceData.description) {
      serviceData.description = { intro: [], conclusion: "" }
    }

    // Ensure arrays exist
    serviceData.challenges = serviceData.challenges || []
    serviceData.techImperatives = serviceData.techImperatives || []
    serviceData.businessNeeds = serviceData.businessNeeds || []
    serviceData.scamProtection = serviceData.scamProtection || []
    serviceData.serviceCards = serviceData.serviceCards || []
    serviceData.advantageCards = serviceData.advantageCards || []
    serviceData.standardCards = serviceData.standardCards || []
    serviceData.ctaCards = serviceData.ctaCards || []

    // Ensure description.conclusion is a string
    if (!serviceData.description.conclusion) {
      serviceData.description.conclusion = ""
    }

    // Ensure description.intro is an array
    if (!Array.isArray(serviceData.description.intro)) {
      serviceData.description.intro = []
    }

    console.log("Processed service data:", JSON.stringify(serviceData, null, 2))
    console.log("Calling createService function...")
    const newService = await createService(serviceData)

    if (!newService) {
      console.error("Failed to create service: createService returned null")
      return NextResponse.json({ error: "Failed to create service in database" }, { status: 500 })
    }

    console.log("Service created successfully:", newService.id)
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create service"
    console.error("Error details:", errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
