import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/lib/services"
import ServiceDetails from "@/components/service-details"
import type { Metadata } from "next"

interface ServicePageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    }
  }

  return {
    title: service.title,
    description: service.subtitle,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  console.log("Rendering service with slug:", params.slug)
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    console.log("Service not found for slug:", params.slug)
    notFound()
  }

  return <ServiceDetails service={service} />
}
