export interface MenuItemType {
  id: number
  title: string
  href?: string
  description?: string
  image?: string
  children?: MenuItemType[]
}

export interface NavigationItem {
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  parentId?: string | null
}
