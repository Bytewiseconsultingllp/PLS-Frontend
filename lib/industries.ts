import dbConnect from "./mongodb"
import Industry from "@/models/Industry"
import type { Industry as IndustryType } from "@/types"

// Convert MongoDB document to plain object and handle _id to id conversion
function formatIndustry(industry: any): IndustryType {
  const formattedIndustry = industry.toObject ? industry.toObject() : industry

  return {
    id: formattedIndustry._id.toString(),
    title: formattedIndustry.title,
    slug: formattedIndustry.slug,
    subtitle: formattedIndustry.subtitle,
    image: formattedIndustry.image || null, // Ensure image is properly handled
    isPublished: formattedIndustry.isPublished,
    status: formattedIndustry.status,
    createdAt: formattedIndustry.createdAt,
    parentIndustry: formattedIndustry.parentIndustry,
    description: formattedIndustry.description,
    industryStatus: formattedIndustry.industryStatus,
    challenges: formattedIndustry.challenges,
    requirements: formattedIndustry.requirements,
    solutions: formattedIndustry.solutions,
    benefits: formattedIndustry.benefits,
    features: formattedIndustry.features,
    faq: formattedIndustry.faq,
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustryType | null> {
  // Normalize the slug to handle both with and without leading slash
  const normalizedSlug = slug.startsWith("/") ? slug.substring(1) : slug

  try {
    await dbConnect()

    console.log(`Looking for industry with slug: ${normalizedSlug}`)

    const industry = await Industry.findOne({
      slug: normalizedSlug,
      isPublished: true,
    })

    if (!industry) {
      console.log(`Industry not found for slug: ${normalizedSlug}`)
      return null
    }

    console.log(`Found industry: ${industry.title}`)
    return formatIndustry(industry)
  } catch (error) {
    console.error("Error fetching industry by slug:", error)
    return null
  }
}

export async function getIndustryById(id: string): Promise<IndustryType | null> {
  try {
    await dbConnect()

    console.log(`Looking for industry with ID: ${id}`)

    const industry = await Industry.findById(id)

    if (!industry) {
      console.log(`Industry not found for ID: ${id}`)
      return null
    }

    console.log(`Found industry: ${industry.title}`)
    return formatIndustry(industry)
  } catch (error) {
    console.error("Error fetching industry by ID:", error)
    return null
  }
}

export async function getAllIndustries(): Promise<IndustryType[]> {
  try {
    await dbConnect()

    const industries = await Industry.find({}).sort({ createdAt: -1 })

    return industries.map(formatIndustry)
  } catch (error) {
    console.error("Error fetching all industries:", error)
    return []
  }
}

export async function createIndustry(
  industryData: Omit<IndustryType, "id" | "createdAt">,
): Promise<IndustryType | null> {
  try {
    await dbConnect()
    console.log("Connected to MongoDB")

    // Ensure all required fields are present
    const sanitizedData = {
      ...industryData,
      description: {
        intro: Array.isArray(industryData.description?.intro) ? industryData.description.intro : [],
        conclusion: industryData.description?.conclusion || "",
      },
      challenges: Array.isArray(industryData.challenges) ? industryData.challenges : [],
      requirements: Array.isArray(industryData.requirements) ? industryData.requirements : [],
      solutions: Array.isArray(industryData.solutions) ? industryData.solutions : [],
      benefits: Array.isArray(industryData.benefits) ? industryData.benefits : [],
      features: Array.isArray(industryData.features) ? industryData.features : [],
      faq: Array.isArray(industryData.faq) ? industryData.faq : [],
    }

    console.log("Creating new industry with data:", JSON.stringify(sanitizedData, null, 2))
    const newIndustry = new Industry(sanitizedData)

    // Validate the industry before saving
    const validationError = newIndustry.validateSync()
    if (validationError) {
      console.error("Validation error:", validationError)
      throw new Error(`Validation error: ${validationError.message}`)
    }

    await newIndustry.save()
    console.log("Industry saved successfully with ID:", newIndustry._id)

    return formatIndustry(newIndustry)
  } catch (error) {
    console.error("Error creating industry:", error)
    throw error // Re-throw to allow proper error handling in the API route
  }
}

export async function updateIndustry(id: string, industryData: Partial<IndustryType>): Promise<IndustryType | null> {
  try {
    await dbConnect()

    // Log the image URL being saved
    if (industryData.image) {
      console.log("Updating industry with image URL:", industryData.image)
    }

    const updatedIndustry = await Industry.findByIdAndUpdate(
      id,
      { $set: industryData },
      { new: true, runValidators: true },
    )

    if (!updatedIndustry) {
      return null
    }

    return formatIndustry(updatedIndustry)
  } catch (error) {
    console.error("Error updating industry:", error)
    return null
  }
}

export async function deleteIndustry(id: string): Promise<boolean> {
  try {
    await dbConnect()

    const result = await Industry.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Error deleting industry:", error)
    return false
  }
}

export const getIndustries = getAllIndustries
