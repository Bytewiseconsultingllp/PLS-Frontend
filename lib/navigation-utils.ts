import { getServices } from "@/lib/services"
import { getIndustries } from "@/lib/industries"
import { getTechnologies } from "@/lib/technologies"
import type { MenuItemType } from "@/types/menu"

// Helper function to transform database items to menu structure
function transformToMenuItems(items: any[], parentId: string | null = null): MenuItemType[] {
  // First, filter items that match the current parent
  const currentLevelItems = items.filter((item) => item.parentId === parentId)

  // Transform each item
  return currentLevelItems.map((item, index) => {
    // Find children for this item
    const children = transformToMenuItems(items, item.id)

    return {
      id: Number.parseInt(item.id) || index + 1,
      title: item.title,
      href: item.slug ? `/${parentId ? items.find((i) => i.id === parentId)?.slug : ""}/${item.slug}` : undefined,
      description: item.subtitle || item.description,
      image: item.image || undefined,
      children: children.length > 0 ? children : undefined,
    }
  })
}

export async function fetchDynamicMenuData(): Promise<MenuItemType[]> {
  try {
    // Fetch data from the database
    const [services, industries, technologies] = await Promise.all([getServices(), getIndustries(), getTechnologies()])

    // Create base menu structure
    const menuData: MenuItemType[] = [
      {
        id: 1,
        title: "Home",
        href: "/",
      },
      {
        id: 2,
        title: "Services",
        description: "Our professional services",
        image: "/images/menu/services.jpg",
        children: transformToMenuItems(services),
      },
      {
        id: 3,
        title: "Industries",
        description: "Industries we serve",
        image: "/images/menu/industries.jpg",
        children: transformToMenuItems(industries),
      },
      {
        id: 4,
        title: "Technologies",
        description: "Technologies we use",
        image: "/images/menu/technologies.jpg",
        children: transformToMenuItems(technologies),
      },
      {
        id: 5,
        title: "About",
        href: "/about",
      },
      {
        id: 6,
        title: "Contact",
        href: "/contact",
      },
    ]

    return menuData
  } catch (error) {
    console.error("Error fetching menu data:", error)
    return []
  }
}
