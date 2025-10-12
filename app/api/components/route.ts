import { NextResponse } from "next/server"
import { getAllComponents, getComponentById, getComponentsByType, createComponent } from "@/lib/components"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const type = url.searchParams.get("type")

  try {
    if (id) {
      const component = await getComponentById(id)
      if (!component) {
        return NextResponse.json({ error: "Component not found" }, { status: 404 })
      }
      return NextResponse.json(component)
    } else if (type) {
      const components = await getComponentsByType(type)
      return NextResponse.json(components)
    } else {
      const components = await getAllComponents()
      return NextResponse.json(components)
    }
  } catch (error) {
    console.error("Error fetching components:", error)
    return NextResponse.json({ error: "Failed to fetch components" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const componentData = await request.json()

    const newComponent = await createComponent(componentData)

    if (!newComponent) {
      return NextResponse.json({ error: "Failed to create component" }, { status: 500 })
    }

    return NextResponse.json(newComponent, { status: 201 })
  } catch (error) {
    console.error("Error creating component:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create component"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
