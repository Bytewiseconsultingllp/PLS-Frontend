import { NextResponse } from "next/server"
import { getComponentById, updateComponent, deleteComponent } from "@/lib/components"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const component = await getComponentById(params.id)

    if (!component) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 })
    }

    return NextResponse.json(component)
  } catch (error) {
    console.error("Error fetching component:", error)
    return NextResponse.json({ error: "Failed to fetch component" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const componentData = await request.json()

    const updatedComponent = await updateComponent(params.id, componentData)

    if (!updatedComponent) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 })
    }

    return NextResponse.json(updatedComponent)
  } catch (error) {
    console.error("Error updating component:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to update component"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await deleteComponent(params.id)

    if (!success) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Component deleted successfully" })
  } catch (error) {
    console.error("Error deleting component:", error)
    return NextResponse.json({ error: "Failed to delete component" }, { status: 500 })
  }
}
