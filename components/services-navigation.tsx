"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/types"

export function ServicesNavigation({ currentSlug }: { currentSlug?: string }) {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        // Add cache-busting parameter
        const response = await fetch(`/api/services?t=${Date.now()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()

        // Ensure each service has required properties
        const formattedServices = data.map((service: any) => ({
          ...service,
          id: service.id || service._id?.toString(),
          title: service.title || "Untitled Service",
          slug: service.slug || "",
        }))

        setServices(formattedServices)
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices([])

        // Retry after 3 seconds if there was an error
        setTimeout(fetchServices, 3000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-lg">
        <p className="text-sm text-muted-foreground">No services available</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/services/${service.slug}`}
          className={`flex items-center justify-between px-6 py-4 rounded-lg transition-all ${
            currentSlug === service.slug
              ? "bg-[#003087] text-white"
              : "bg-white text-black hover:text-[#FF6B35] hover:bg-[#003087] group"
          }`}
        >
          <span className="font-medium">{service.title}</span>
          <ArrowRight
            className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
              currentSlug === service.slug ? "text-white" : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
      ))}
    </div>
  )
}
