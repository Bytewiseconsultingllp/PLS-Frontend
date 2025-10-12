import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import NavigationItem from "@/models/Navigation"

export async function GET() {
  try {
    await dbConnect()

    // Find any navigation items with title containing "blog" (case insensitive)
    const blogItems = await NavigationItem.find({
      title: { $regex: "blog", $options: "i" },
    })

    if (blogItems.length === 0) {
      // If no blog item exists, create one
      const newBlogItem = new NavigationItem({
        title: "Blog",
        type: "link",
        url: "/blog",
        slug: "blog",
        order: 999, // High number to place at end
        isActive: true,
        level: 0,
        parentId: null,
      })

      await newBlogItem.save()

      return NextResponse.json({
        success: true,
        message: "Blog navigation item created successfully",
        action: "created",
      })
    } else {
      // Update all found blog items to have the correct URL
      let updated = 0
      for (const item of blogItems) {
        if (item.url !== "/blog") {
          item.url = "/blog"
          item.type = "link" // Ensure it's a link type
          item.isActive = true // Ensure it's active
          await item.save()
          updated++
        }
      }

      return NextResponse.json({
        success: true,
        message: `${updated} blog navigation items updated with correct URL`,
        action: "updated",
        itemsUpdated: updated,
      })
    }
  } catch (error) {
    console.error("Error fixing blog navigation:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fix blog navigation",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
