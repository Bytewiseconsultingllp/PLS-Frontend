import dbConnect from "./mongodb"
import Service from "@/models/Service"
import type { Service as ServiceType } from "@/types"

// Convert MongoDB document to plain object and handle _id to id conversion
function formatService(service: any): ServiceType {
  const formattedService = service.toObject ? service.toObject() : service

  return {
    id: formattedService._id.toString(),
    title: formattedService.title,
    slug: formattedService.slug,
    subtitle: formattedService.subtitle,
    image: formattedService.image,
    isPublished: formattedService.isPublished,
    status: formattedService.status,
    createdAt: formattedService.createdAt,
    description: formattedService.description,
    challenges: formattedService.challenges,
    techImperatives: formattedService.techImperatives,
    businessNeeds: formattedService.businessNeeds,
    scamProtection: formattedService.scamProtection,
    serviceCards: formattedService.serviceCards,
    advantageCards: formattedService.advantageCards,
    standardCards: formattedService.standardCards,
    ctaCards: formattedService.ctaCards,
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceType | null> {
  // Normalize the slug to handle both with and without leading slash
  const normalizedSlug = slug.startsWith("/") ? slug.substring(1) : slug

  try {
    await dbConnect()

    console.log(`Looking for service with slug: ${normalizedSlug}`)

    const service = await Service.findOne({
      slug: normalizedSlug,
      isPublished: true,
    })

    if (!service) {
      console.log(`Service not found for slug: ${normalizedSlug}`)
      return null
    }

    console.log(`Found service: ${service.title}`)
    return formatService(service)
  } catch (error) {
    console.error("Error fetching service by slug:", error)
    return null
  }
}

export async function getServiceById(id: string): Promise<ServiceType | null> {
  try {
    await dbConnect()

    console.log(`Looking for service with ID: ${id}`)

    const service = await Service.findById(id)

    if (!service) {
      console.log(`Service not found for ID: ${id}`)
      return null
    }

    console.log(`Found service: ${service.title}`)
    return formatService(service)
  } catch (error) {
    console.error("Error fetching service by ID:", error)
    return null
  }
}

export async function getAllServices(): Promise<ServiceType[]> {
  try {
    await dbConnect()

    const services = await Service.find({}).sort({ createdAt: -1 })

    return services.map(formatService)
  } catch (error) {
    console.error("Error fetching all services:", error)
    return []
  }
}

// Update the createService function to provide better error handling

export async function createService(serviceData: Omit<ServiceType, "id" | "createdAt">): Promise<ServiceType | null> {
  try {
    await dbConnect()
    console.log("Connected to MongoDB")

    // Ensure all required fields are present
    const sanitizedData = {
      ...serviceData,
      description: {
        intro: Array.isArray(serviceData.description?.intro) ? serviceData.description.intro : [],
        conclusion: serviceData.description?.conclusion || "",
      },
      challenges: Array.isArray(serviceData.challenges) ? serviceData.challenges : [],
      techImperatives: Array.isArray(serviceData.techImperatives) ? serviceData.techImperatives : [],
      businessNeeds: Array.isArray(serviceData.businessNeeds) ? serviceData.businessNeeds : [],
      scamProtection: Array.isArray(serviceData.scamProtection) ? serviceData.scamProtection : [],
      serviceCards: Array.isArray(serviceData.serviceCards) ? serviceData.serviceCards : [],
      advantageCards: Array.isArray(serviceData.advantageCards) ? serviceData.advantageCards : [],
      standardCards: Array.isArray(serviceData.standardCards) ? serviceData.standardCards : [],
      ctaCards: Array.isArray(serviceData.ctaCards) ? serviceData.ctaCards : [],
    }

    console.log("Creating new service with data:", JSON.stringify(sanitizedData, null, 2))
    const newService = new Service(sanitizedData)

    // Validate the service before saving
    const validationError = newService.validateSync()
    if (validationError) {
      console.error("Validation error:", validationError)
      throw new Error(`Validation error: ${validationError.message}`)
    }

    await newService.save()
    console.log("Service saved successfully with ID:", newService._id)

    return formatService(newService)
  } catch (error) {
    console.error("Error creating service:", error)
    throw error // Re-throw to allow proper error handling in the API route
  }
}

export async function updateService(id: string, serviceData: Partial<ServiceType>): Promise<ServiceType | null> {
  try {
    await dbConnect()

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: serviceData },
      { new: true, runValidators: true },
    )

    if (!updatedService) {
      return null
    }

    return formatService(updatedService)
  } catch (error) {
    console.error("Error updating service:", error)
    return null
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    await dbConnect()

    const result = await Service.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Error deleting service:", error)
    return false
  }
}

export const getServices = getAllServices
