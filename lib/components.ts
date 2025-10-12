import dbConnect from "./mongodb"
import Component from "@/models/Component"
import type { Component as ComponentType } from "@/types"

// Convert MongoDB document to plain object and handle _id to id conversion
function formatComponent(component: any): ComponentType {
  const formattedComponent = component.toObject ? component.toObject() : component

  return {
    id: formattedComponent._id.toString(),
    name: formattedComponent.name,
    type: formattedComponent.type,
    description: formattedComponent.description,
    schema: formattedComponent.schema,
    createdAt: formattedComponent.createdAt,
  }
}

export async function getComponentById(id: string): Promise<ComponentType | null> {
  try {
    await dbConnect()

    const component = await Component.findById(id)

    if (!component) {
      return null
    }

    return formatComponent(component)
  } catch (error) {
    console.error("Error fetching component by ID:", error)
    return null
  }
}

export async function getAllComponents(): Promise<ComponentType[]> {
  try {
    await dbConnect()

    const components = await Component.find({}).sort({ name: 1 })

    return components.map(formatComponent)
  } catch (error) {
    console.error("Error fetching all components:", error)
    return []
  }
}

export async function getComponentsByType(type: string): Promise<ComponentType[]> {
  try {
    await dbConnect()

    const components = await Component.find({ type }).sort({ name: 1 })

    return components.map(formatComponent)
  } catch (error) {
    console.error("Error fetching components by type:", error)
    return []
  }
}

export async function createComponent(
  componentData: Omit<ComponentType, "id" | "createdAt">,
): Promise<ComponentType | null> {
  try {
    await dbConnect()

    const newComponent = new Component(componentData)
    await newComponent.save()

    return formatComponent(newComponent)
  } catch (error) {
    console.error("Error creating component:", error)
    return null
  }
}

export async function updateComponent(
  id: string,
  componentData: Partial<ComponentType>,
): Promise<ComponentType | null> {
  try {
    await dbConnect()

    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      { $set: componentData },
      { new: true, runValidators: true },
    )

    if (!updatedComponent) {
      return null
    }

    return formatComponent(updatedComponent)
  } catch (error) {
    console.error("Error updating component:", error)
    return null
  }
}

export async function deleteComponent(id: string): Promise<boolean> {
  try {
    await dbConnect()

    const result = await Component.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Error deleting component:", error)
    return false
  }
}
