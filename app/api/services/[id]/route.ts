import { NextResponse } from "next/server"
import { getServiceById, updateService, deleteService } from "@/lib/services"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const service = await getServiceById(params.id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const serviceData = await request.json()

    // Validate required fields
    if (serviceData.title === "") {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 })
    }

    if (serviceData.slug === "") {
      return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 })
    }

    if (serviceData.subtitle === "") {
      return NextResponse.json({ error: "Subtitle cannot be empty" }, { status: 400 })
    }

    // Ensure arrays are properly handled
    if (serviceData.challenges && !Array.isArray(serviceData.challenges)) {
      serviceData.challenges = []
    }

    if (serviceData.techImperatives && !Array.isArray(serviceData.techImperatives)) {
      serviceData.techImperatives = []
    }

    if (serviceData.businessNeeds && !Array.isArray(serviceData.businessNeeds)) {
      serviceData.businessNeeds = []
    }

    if (serviceData.scamProtection && !Array.isArray(serviceData.scamProtection)) {
      serviceData.scamProtection = []
    }

    const updatedService = await updateService(params.id, serviceData)

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("Error updating service:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to update service"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deleteService(params.id)

    if (!success) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
