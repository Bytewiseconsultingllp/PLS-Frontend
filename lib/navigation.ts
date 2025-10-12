import dbConnect from "./mongodb"
import NavigationItem from "@/models/Navigation"
import type { NavigationItem as NavigationItemType } from "@/models/Navigation"

export async function getNavigationTree() {
  try {
    await dbConnect()

    // Get all root navigation items
    const rootItems = await NavigationItem.find({ parentId: null }).sort({ order: 1 })

    // Get all child items
    const childItems = await NavigationItem.find({ parentId: { $ne: null } }).sort({ order: 1 })

    // Organize items into a tree structure
    const navigationTree = rootItems.map((item) => {
      const itemObj = item.toObject()
      const children = childItems.filter((child) => child.parentId && child.parentId.toString() === item._id.toString())

      return {
        ...itemObj,
        id: itemObj._id.toString(),
        children: children.map((child) => ({
          ...child.toObject(),
          id: child._id.toString(),
        })),
      }
    })

    return navigationTree
  } catch (error) {
    console.error("Error fetching navigation tree:", error)
    return []
  }
}

export async function createNavigationItem(data: Partial<NavigationItemType>) {
  try {
    await dbConnect()
    const newItem = await NavigationItem.create(data)
    return newItem.toObject()
  } catch (error) {
    console.error("Error creating navigation item:", error)
    throw error
  }
}

export async function updateNavigationItem(id: string, data: Partial<NavigationItemType>) {
  try {
    await dbConnect()
    const updatedItem = await NavigationItem.findByIdAndUpdate(id, data, { new: true })
    return updatedItem ? updatedItem.toObject() : null
  } catch (error) {
    console.error("Error updating navigation item:", error)
    throw error
  }
}

export async function deleteNavigationItem(id: string) {
  try {
    await dbConnect()

    // First, delete all child items
    await NavigationItem.deleteMany({ parentId: id })

    // Then delete the item itself
    const deletedItem = await NavigationItem.findByIdAndDelete(id)
    return !!deletedItem
  } catch (error) {
    console.error("Error deleting navigation item:", error)
    throw error
  }
}

export async function getNavigationItemsByType(type: string) {
  try {
    await dbConnect()
    const items = await NavigationItem.find({ type }).sort({ order: 1 })
    return items.map((item) => item.toObject())
  } catch (error) {
    console.error(`Error fetching navigation items by type ${type}:`, error)
    return []
  }
}
