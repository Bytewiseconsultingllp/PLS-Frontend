import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Check if blog navigation item already exists
    const existingBlogItem = await db.collection("navigation").findOne({
      title: "Blog",
      parentId: null, // Top-level navigation item
    })

    if (existingBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog navigation item already exists",
        item: existingBlogItem,
      })
    }

    // Get the highest order number to place our new item at the end
    const highestOrderItem = await db
      .collection("navigation")
      .find({ parentId: null })
      .sort({ order: -1 })
      .limit(1)
      .toArray()

    const nextOrder = highestOrderItem.length > 0 ? highestOrderItem[0].order + 1 : 1

    // Insert the blog navigation item
    const blogItem = {
      title: "Blog",
      slug: "blog",
      url: "/blog",
      type: "link",
      order: nextOrder,
      isActive: true,
      parentId: null,
      level: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("navigation").insertOne(blogItem)

    return NextResponse.json({
      success: true,
      message: "Blog navigation item added successfully",
      item: { ...blogItem, id: result.insertedId },
    })
  } catch (error) {
    console.error("Error adding blog navigation item:", error)
    return NextResponse.json({ success: false, message: "Failed to add blog navigation item" }, { status: 500 })
  }
}
