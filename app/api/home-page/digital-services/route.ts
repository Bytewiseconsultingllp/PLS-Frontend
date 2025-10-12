import { type NextRequest, NextResponse } from "next/server"
import {
  getDigitalServices,
  createDigitalService,
  updateDigitalService,
  deleteDigitalService,
} from "@/lib/digital-services"

export async function GET() {
  try {
    const services = await getDigitalServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching digital services:", error)
    return NextResponse.json({ error: "Failed to fetch digital services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.description || !data.image || !data.icon) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, image, and icon are required" },
        { status: 400 },
      )
    }

    const service = await createDigitalService(data)

    if (!service) {
      return NextResponse.json({ error: "Failed to create digital service" }, { status: 500 })
    }

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Error creating digital service:", error)
    return NextResponse.json({ error: "Failed to create digital service" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const { id, ...updateData } = data

    const service = await updateDigitalService(id, updateData)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error updating digital service:", error)
    return NextResponse.json({ error: "Failed to update digital service" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const success = await deleteDigitalService(id)

    if (!success) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting digital service:", error)
    return NextResponse.json({ error: "Failed to delete digital service" }, { status: 500 })
  }
}
