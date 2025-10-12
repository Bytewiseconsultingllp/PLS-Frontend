import type { Service, Industry, Technology } from "@/types"

interface MenuItem {
  id: number
  title: string
  href?: string
  image?: string
  description?: string
  children?: MenuItem[]
}

// Helper function to generate unique IDs
let idCounter = 1000
function generateId(): number {
  return idCounter++
}

// Transform services, industries, or technologies into menu items
export function transformToMenuItems(
  items: Service[] | Industry[] | Technology[] | undefined,
  type: "services" | "industries" | "technologies",
): MenuItem[] {
  // Handle undefined or empty items
  if (!items || items.length === 0) {
    return []
  }

  try {
    // Group items by category (e.g., "Software Development", "Healthcare", etc.)
    const groupedItems: Record<string, any[]> = {}

    items.forEach((item) => {
      if (!item) return // Skip null or undefined items

      // Extract category from slug or use a default
      let category = "General"

      if (item.slug) {
        const parts = item.slug.split("/")
        if (parts.length > 1) {
          // Use the first part of the slug as the category
          category = parts[0].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        }
      }

      if (!groupedItems[category]) {
        groupedItems[category] = []
      }

      groupedItems[category].push(item)
    })

    // Convert grouped items to menu structure
    return Object.entries(groupedItems).map(([category, categoryItems]) => {
      return {
        id: generateId(),
        title: category,
        children: categoryItems.map((item) => ({
          id: generateId(),
          title: item.title || "Untitled",
          href: `/${type}/${item.slug || ""}`,
          image: item.image,
        })),
      }
    })
  } catch (error) {
    console.error("Error transforming menu items:", error)
    return []
  }
}
