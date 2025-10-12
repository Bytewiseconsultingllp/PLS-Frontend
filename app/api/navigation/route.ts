import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import NavigationItem from "@/models/Navigation"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const items = await NavigationItem.find().sort({ order: 1 })

    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching navigation items:", error)
    return NextResponse.json({ error: "Failed to fetch navigation items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const data = await request.json()

    // Add validation for the three-level-hierarchy type
    if (data.type === "three-level-hierarchy") {
      // Ensure level is set to 0 for root items
      data.level = 0
    }

    // Validate level based on parent
    if (data.parentId) {
      const parentItem = await NavigationItem.findById(data.parentId)

      if (!parentItem) {
        return NextResponse.json({ error: "Parent item not found" }, { status: 404 })
      }

      // If parent is a dropdown or three-level-hierarchy (level 0), child should be a sub-heading (level 1)
      if (parentItem.level === 0 && (parentItem.type === "dropdown" || parentItem.type === "three-level-hierarchy")) {
        data.level = 1
        if (!data.type || data.type === "dropdown") {
          data.type = "subheading"
        }
      }
      // If parent is a sub-heading (level 1), child should be a sub-item (level 2)
      else if (parentItem.level === 1 && parentItem.type === "subheading") {
        data.level = 2
        if (!data.type) {
          data.type = "subitem"
        }
      }
    } else {
      // Root items are level 0
      data.level = 0
    }

    // Get the highest order for the same level and parent
    const query = {
      level: data.level,
      ...(data.parentId ? { parentId: data.parentId } : { parentId: null }),
    }

    const highestOrderItem = await NavigationItem.findOne(query).sort({ order: -1 })

    // Set the order to be one more than the highest, or 0 if no items exist
    data.order = highestOrderItem ? highestOrderItem.order + 1 : 0

    const newItem = await NavigationItem.create(data)

    return NextResponse.json(newItem)
  } catch (error) {
    console.error("Error creating navigation item:", error)
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 })
  }
}
