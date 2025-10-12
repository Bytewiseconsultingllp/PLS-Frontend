"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import IndustryDesign from "@/app/industries/[slug]/industrydesign"
import type { Industry } from "@/types"

interface PreviewIndustryPageProps {
  params: {
    id: string
  }
}

export default function PreviewIndustryPage({ params }: PreviewIndustryPageProps) {
  const router = useRouter()
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadIndustry() {
      try {
        // Make sure we're using a valid ID format
        const industryId = params.id.trim()
        console.log("Loading preview industry with ID:", industryId)

        if (!industryId) {
          setError("Invalid industry ID")
          setLoading(false)
          return
        }

        // Fetch the industry directly from the API
        const response = await fetch(`/api/industries/${industryId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch industry: ${response.statusText}`)
        }

        const industryData = await response.json()
        console.log("Industry data loaded:", industryData)

        if (!industryData) {
          setError(`Industry not found with ID: ${industryId}`)
        } else {
          // Ensure the industry has an id property
          setIndustry({
            ...industryData,
            id: industryData.id || industryData._id,
          })
        }
      } catch (error) {
        console.error("Error loading industry:", error)
        setError(`Error loading industry: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    loadIndustry()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin mb-4 text-primary" />
          <h1 className="text-xl font-medium">Loading preview...</h1>
          <p className="mt-2 text-muted-foreground">Industry ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (error || !industry) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h1 className="text-xl font-medium">{error || "Industry not found"}</h1>
          <p className="mt-2 text-muted-foreground">
            The industry with ID "{params.id}" doesn't exist or has been removed.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/industries")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Industries
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/industries")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="ml-4">
            <h1 className="text-sm font-medium">Preview: {industry.title}</h1>
            <p className="text-xs text-muted-foreground">{industry.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/industries/${params.id}`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" onClick={() => window.open(`/industries/${industry.slug}`, "_blank")}>
            <Eye className="mr-2 h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>

      <main className="flex-1">
        <IndustryDesign data={industry} type="industry" />
      </main>
    </div>
  )
}
