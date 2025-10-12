import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import NavigationItem from "@/models/Navigation"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const item = await NavigationItem.findById(params.id)

    if (!item) {
      return NextResponse.json({ error: "Navigation item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching navigation item:", error)
    return NextResponse.json({ error: "Failed to fetch navigation item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const data = await request.json()

    // Remove any _id from the data to avoid MongoDB errors
    if (data._id) {
      delete data._id
    }

    // Remove any id from the data to avoid MongoDB errors
    if (data.id) {
      delete data.id
    }

    const updatedItem = await NavigationItem.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })

    if (!updatedItem) {
      return NextResponse.json({ error: "Navigation item not found" }, { status: 404 })
    }

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error updating navigation item:", error)
    return NextResponse.json({ error: "Failed to update navigation item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Get the item to determine its level
    const item = await NavigationItem.findById(params.id)

    if (!item) {
      return NextResponse.json({ error: "Navigation item not found" }, { status: 404 })
    }

    // If it's a dropdown or three-level-hierarchy (level 0), delete all sub-headings and sub-items
    if (item.level === 0 && (item.type === "dropdown" || item.type === "three-level-hierarchy")) {
      // Find all sub-headings
      const subheadings = await NavigationItem.find({ parentId: params.id })

      // Delete all sub-items for each sub-heading
      for (const subheading of subheadings) {
        await NavigationItem.deleteMany({ parentId: subheading._id })
      }

      // Delete all sub-headings
      await NavigationItem.deleteMany({ parentId: params.id })
    }
    // If it's a sub-heading (level 1), delete all its sub-items
    else if (item.level === 1 && item.type === "subheading") {
      await NavigationItem.deleteMany({ parentId: params.id })
    }

    // Delete the item itself
    const deletedItem = await NavigationItem.findByIdAndDelete(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting navigation item:", error)
    return NextResponse.json({ error: "Failed to delete navigation item" }, { status: 500 })
  }
}
