import { connectToDatabase } from "./mongodb"
import DigitalService from "@/models/DigitalService"
import { unstable_noStore as noStore } from "next/cache"

export interface DigitalServiceData {
  id: string
  title: string
  description: string
  image: string
  icon: string
  link?: string
  order: number
}

export async function getDigitalServices(): Promise<DigitalServiceData[]> {
  noStore()
  try {
    await connectToDatabase()

    const services = await DigitalService.find().sort({ order: 1 })

    return services.map((service) => ({
      id: service._id.toString(),
      title: service.title,
      description: service.description,
      image: service.image,
      icon: service.icon,
      link: service.link,
      order: service.order,
    }))
  } catch (error) {
    console.error("Failed to fetch digital services:", error)
    return []
  }
}

export async function createDigitalService(data: Omit<DigitalServiceData, "id">): Promise<DigitalServiceData | null> {
  try {
    await connectToDatabase()

    const service = await DigitalService.create(data)

    return {
      id: service._id.toString(),
      title: service.title,
      description: service.description,
      image: service.image,
      icon: service.icon,
      link: service.link,
      order: service.order,
    }
  } catch (error) {
    console.error("Failed to create digital service:", error)
    return null
  }
}

export async function updateDigitalService(
  id: string,
  data: Partial<DigitalServiceData>,
): Promise<DigitalServiceData | null> {
  try {
    await connectToDatabase()

    const service = await DigitalService.findByIdAndUpdate(id, data, { new: true })

    if (!service) return null

    return {
      id: service._id.toString(),
      title: service.title,
      description: service.description,
      image: service.image,
      icon: service.icon,
      link: service.link || undefined,
      order: service.order,
    }
  } catch (error) {
    console.error("Failed to update digital service:", error)
    return null
  }
}

export async function deleteDigitalService(id: string): Promise<boolean> {
  try {
    await connectToDatabase()

    const result = await DigitalService.findByIdAndDelete(id)

    return !!result
  } catch (error) {
    console.error("Failed to delete digital service:", error)
    return false
  }
}
