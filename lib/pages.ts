import dbConnect from "./mongodb"
import Page from "@/models/Page"
import type { Page as PageType } from "@/types"

// Convert MongoDB document to plain object and handle _id to id conversion
function formatPage(page: any): PageType {
  const formattedPage = page.toObject ? page.toObject() : page

  return {
    id: formattedPage._id.toString(),
    title: formattedPage.title,
    slug: formattedPage.slug,
    description: formattedPage.description,
    isPublished: formattedPage.isPublished,
    sections: formattedPage.sections,
    createdAt: formattedPage.createdAt,
    status: formattedPage.status,
  }
}

export async function getPageBySlug(slug: string): Promise<PageType | null> {
  // Normalize the slug to handle both with and without leading slash
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`

  try {
    await dbConnect()

    console.log(`Looking for page with slug: ${normalizedSlug}`)

    const page = await Page.findOne({
      slug: normalizedSlug,
      isPublished: true,
    })

    if (!page) {
      console.log(`Page not found for slug: ${normalizedSlug}`)
      return null
    }

    console.log(`Found page: ${page.title}`)
    return formatPage(page)
  } catch (error) {
    console.error("Error fetching page by slug:", error)
    return null
  }
}

export async function getPageById(id: string): Promise<PageType | null> {
  try {
    await dbConnect()

    console.log(`Looking for page with ID: ${id}`)

    const page = await Page.findById(id)

    if (!page) {
      console.log(`Page not found for ID: ${id}`)
      return null
    }

    console.log(`Found page: ${page.title}`)
    return formatPage(page)
  } catch (error) {
    console.error("Error fetching page by ID:", error)
    return null
  }
}

export async function getAllPages(): Promise<PageType[]> {
  try {
    await dbConnect()

    const pages = await Page.find({}).sort({ createdAt: -1 })

    return pages.map(formatPage)
  } catch (error) {
    console.error("Error fetching all pages:", error)
    return []
  }
}

export async function createPage(pageData: Omit<PageType, "id" | "createdAt">): Promise<PageType | null> {
  try {
    await dbConnect()

    const newPage = new Page(pageData)
    await newPage.save()

    return formatPage(newPage)
  } catch (error) {
    console.error("Error creating page:", error)
    return null
  }
}

export async function updatePage(id: string, pageData: Partial<PageType>): Promise<PageType | null> {
  try {
    await dbConnect()

    const updatedPage = await Page.findByIdAndUpdate(id, { $set: pageData }, { new: true, runValidators: true })

    if (!updatedPage) {
      return null
    }

    return formatPage(updatedPage)
  } catch (error) {
    console.error("Error updating page:", error)
    return null
  }
}

export async function deletePage(id: string): Promise<boolean> {
  try {
    await dbConnect()

    const result = await Page.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Error deleting page:", error)
    return false
  }
}

export type { PageType as Page }
