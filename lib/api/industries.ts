import { db } from "@/lib/db"
import { industries, type Industry, type NewIndustry } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { slugify } from "@/lib/utils"

export async function getIndustries() {
  return await db.select().from(industries)
}

export async function getIndustryById(id: string) {
  return await db.query.industries.findFirst({
    where: eq(industries.id, id),
  })
}

export async function getIndustryBySlug(slug: string) {
  return await db.query.industries.findFirst({
    where: eq(industries.slug, slug),
  })
}

export async function createIndustry(industry: NewIndustry) {
  // Ensure the slug is created if not provided
  if (!industry.slug && industry.name) {
    industry.slug = slugify(industry.name)
  }

  // Set default status if not provided
  if (!industry.status) {
    industry.status = "draft"
  }

  return await db.insert(industries).values(industry).returning()
}

export async function updateIndustry(id: string, industry: Partial<Industry>) {
  // Update slug if name is changed and slug is not explicitly provided
  if (industry.name && !industry.slug) {
    industry.slug = slugify(industry.name)
  }

  return await db.update(industries).set(industry).where(eq(industries.id, id)).returning()
}

export async function deleteIndustry(id: string) {
  return await db.delete(industries).where(eq(industries.id, id))
}
