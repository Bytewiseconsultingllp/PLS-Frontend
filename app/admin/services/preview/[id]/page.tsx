"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceDetails from "@/components/service-details"
import type { Service } from "@/types"

interface PreviewServicePageProps {
  params: {
    id: string
  }
}

export default function PreviewServicePage({ params }: PreviewServicePageProps) {
  const router = useRouter()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadService() {
      try {
        // Make sure we're using a valid ID format
        const serviceId = params.id.trim()
        console.log("Loading preview service with ID:", serviceId)

        if (!serviceId) {
          setError("Invalid service ID")
          setLoading(false)
          return
        }

        // Fetch the service directly from the API
        const response = await fetch(`/api/services/${serviceId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch service: ${response.statusText}`)
        }

        const serviceData = await response.json()
        console.log("Service data loaded:", serviceData)

        if (!serviceData) {
          setError(`Service not found with ID: ${serviceId}`)
        } else {
          // Ensure the service has an id property
          setService({
            ...serviceData,
            id: serviceData.id || serviceData._id,
          })
        }
      } catch (error) {
        console.error("Error loading service:", error)
        setError(`Error loading service: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    loadService()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin mb-4 text-primary" />
          <h1 className="text-xl font-medium">Loading preview...</h1>
          <p className="mt-2 text-muted-foreground">Service ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h1 className="text-xl font-medium">{error || "Service not found"}</h1>
          <p className="mt-2 text-muted-foreground">
            The service with ID "{params.id}" doesn't exist or has been removed.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/services")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/services")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="ml-4">
            <h1 className="text-sm font-medium">Preview: {service.title}</h1>
            <p className="text-xs text-muted-foreground">{service.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/services/${params.id}`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" onClick={() => window.open(`/services/${service.slug}`, "_blank")}>
            <Eye className="mr-2 h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>

      <main className="flex-1">
        <ServiceDetails service={service} />
      </main>
    </div>
  )
}
