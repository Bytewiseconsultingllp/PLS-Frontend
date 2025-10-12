"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ServiceForm } from "@/components/service-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [serviceExists, setServiceExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkService() {
      try {
        console.log("Checking if service exists with ID:", params.id)

        if (!params.id) {
          throw new Error("Service ID is missing")
        }

        // Fetch the service directly from the API
        const response = await fetch(`/api/services/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch service: ${response.statusText}`)
        }

        const service = await response.json()
        setServiceExists(!!service)
      } catch (error) {
        console.error("Error checking service:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        setServiceExists(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkService()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading service...</p>
        </div>
      </div>
    )
  }

  if (serviceExists === false) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-destructive">Service Not Found</h2>
        </div>
        <p>The service you're trying to edit doesn't exist or has been deleted.</p>
        {error && <p className="text-destructive">Error: {error}</p>}
        <Button onClick={() => router.push("/admin/services")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Service</h2>
      </div>
      <ServiceForm id={params.id} />
    </div>
  )
}
