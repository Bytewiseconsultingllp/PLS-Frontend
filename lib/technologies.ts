import dbConnect from "./mongodb"
import Technology from "@/models/Technology"
import type { Technology as TechnologyType } from "@/types"

// Update the formatTechnology function to ensure the image field is properly handled
function formatTechnology(technology: any): TechnologyType {
  const formattedTechnology = technology.toObject ? technology.toObject() : technology

  // Ensure tech stack has the correct structure
  let techStack = formattedTechnology.techStack || { title: "Technology Stack", stack: [] }

  // If techStack is not in the expected format, try to build it from techStacks array
  if (!techStack.stack && Array.isArray(formattedTechnology.techStacks)) {
    techStack = {
      title: "Technology Stack",
      stack: formattedTechnology.techStacks.map((stack: any) => ({
        category: stack.title || "Category",
        items: Array.isArray(stack.technologies) ? stack.technologies : [],
      })),
    }
  } else if (!Array.isArray(techStack.stack)) {
    techStack.stack = []
  }

  // Log the image field for debugging
  console.log("Technology image in formatTechnology:", formattedTechnology.image)

  return {
    id: formattedTechnology._id.toString(),
    title: formattedTechnology.title,
    slug: formattedTechnology.slug,
    subtitle: formattedTechnology.subtitle,
    image: formattedTechnology.image || "", // Ensure image is included even if null
    isPublished: formattedTechnology.isPublished,
    status: formattedTechnology.status,
    createdAt: formattedTechnology.createdAt,
    parentTechnology: formattedTechnology.parentTechnology,
    description: formattedTechnology.description || {
      intro: [formattedTechnology.description || ""],
      conclusion: "",
    },
    features: formattedTechnology.features || [],
    benefits: formattedTechnology.benefits || [],
    techStack: techStack,
    services: formattedTechnology.services || [],
    faq: formattedTechnology.faq || [],
  }
}

export async function getTechnologyBySlug(slug: string): Promise<TechnologyType | null> {
  // Normalize the slug to handle both with and without leading slash
  const normalizedSlug = slug.startsWith("/") ? slug.substring(1) : slug

  try {
    await dbConnect()

    console.log(`Looking for technology with slug: ${normalizedSlug}`)

    const technology = await Technology.findOne({
      slug: normalizedSlug,
      isPublished: true,
    })

    if (!technology) {
      console.log(`Technology not found for slug: ${normalizedSlug}`)
      return null
    }

    console.log(`Found technology: ${technology.title}`)
    return formatTechnology(technology)
  } catch (error) {
    console.error("Error fetching technology by slug:", error)
    return null
  }
}

export async function getTechnologyById(id: string): Promise<TechnologyType | null> {
  try {
    await dbConnect()

    console.log(`Looking for technology with ID: ${id}`)

    const technology = await Technology.findById(id)

    if (!technology) {
      console.log(`Technology not found for ID: ${id}`)
      return null
    }

    console.log(`Found technology: ${technology.title}, image: ${technology.image}`)
    return formatTechnology(technology)
  } catch (error) {
    console.error("Error fetching technology by ID:", error)
    return null
  }
}

export async function getAllTechnologies(): Promise<TechnologyType[]> {
  try {
    await dbConnect()

    const technologies = await Technology.find({}).sort({ createdAt: -1 })

    return technologies.map(formatTechnology)
  } catch (error) {
    console.error("Error fetching all technologies:", error)
    return []
  }
}

export async function createTechnology(
  technologyData: Omit<TechnologyType, "id" | "createdAt">,
): Promise<TechnologyType | null> {
  try {
    await dbConnect()
    console.log("Connected to MongoDB")

    // Handle the new data structure
    const sanitizedData = {
      ...technologyData,
      image: technologyData.image || "", // Ensure image is included even if null
      description: technologyData.description || {
        intro: [technologyData.description || ""],
        conclusion: "",
      },
      features: Array.isArray(technologyData.features) ? technologyData.features : [],
      benefits: Array.isArray(technologyData.benefits) ? technologyData.benefits : [],
      techStack: technologyData.techStack || {
        title: "Technology Stack",
        stack: [],
      },
      services: Array.isArray(technologyData.services) ? technologyData.services : [],
      faq: Array.isArray(technologyData.faq) ? technologyData.faq : [],
    }

    console.log("Creating new technology with data:", JSON.stringify(sanitizedData, null, 2))
    const newTechnology = new Technology(sanitizedData)

    // Validate the technology before saving
    const validationError = newTechnology.validateSync()
    if (validationError) {
      console.error("Validation error:", validationError)
      throw new Error(`Validation error: ${validationError.message}`)
    }

    await newTechnology.save()
    console.log("Technology saved successfully with ID:", newTechnology._id)

    return formatTechnology(newTechnology)
  } catch (error) {
    console.error("Error creating technology:", error)
    throw error // Re-throw to allow proper error handling in the API route
  }
}

// Update the updateTechnology function to ensure all fields are properly handled
export async function updateTechnology(
  id: string,
  technologyData: Partial<TechnologyType>,
): Promise<TechnologyType | null> {
  try {
    await dbConnect()

    // Log the received data for debugging
    console.log(
      "Updating technology with data:",
      JSON.stringify(
        {
          id,
          title: technologyData.title,
          slug: technologyData.slug,
          subtitle: technologyData.subtitle,
          image: technologyData.image,
          isPublished: technologyData.isPublished,
          status: technologyData.status,
          parentTechnology: technologyData.parentTechnology,
        },
        null,
        2,
      ),
    )

    // Handle the new data structure
    const sanitizedData = {
      ...technologyData,
      title: technologyData.title,
      slug: technologyData.slug,
      subtitle: technologyData.subtitle,
      image: technologyData.image || "", // Ensure image is included even if null
      isPublished: technologyData.isPublished,
      status: technologyData.status,
      parentTechnology: technologyData.parentTechnology || "",
      description: technologyData.description || {
        intro: [technologyData.description || ""],
        conclusion: "",
      },
      features: Array.isArray(technologyData.features) ? technologyData.features : [],
      benefits: Array.isArray(technologyData.benefits) ? technologyData.benefits : [],
      techStack: technologyData.techStack || {
        title: "Technology Stack",
        stack: [],
      },
      services: Array.isArray(technologyData.services) ? technologyData.services : [],
      faq: Array.isArray(technologyData.faq) ? technologyData.faq : [],
    }

    const updatedTechnology = await Technology.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      { new: true, runValidators: true, upsert: false },
    )

    if (!updatedTechnology) {
      return null
    }

    // Log the updated technology for verification
    console.log(
      "Updated technology:",
      JSON.stringify(
        {
          id: updatedTechnology._id.toString(),
          title: updatedTechnology.title,
          slug: updatedTechnology.slug,
          subtitle: updatedTechnology.subtitle,
          image: updatedTechnology.image,
          isPublished: updatedTechnology.isPublished,
          status: updatedTechnology.status,
          parentTechnology: updatedTechnology.parentTechnology,
        },
        null,
        2,
      ),
    )

    return formatTechnology(updatedTechnology)
  } catch (error) {
    console.error("Error updating technology:", error)
    return null
  }
}

export async function deleteTechnology(id: string): Promise<boolean> {
  try {
    await dbConnect()

    const result = await Technology.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Error deleting technology:", error)
    return false
  }
}

export const getTechnologies = getAllTechnologies
