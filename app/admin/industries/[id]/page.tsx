"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IndustryForm } from "@/components/industry-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditIndustryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [industryExists, setIndustryExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkIndustry() {
      try {
        console.log("Checking if industry exists with ID:", params.id)

        if (!params.id) {
          throw new Error("Industry ID is missing")
        }

        // Fetch the industry directly from the API
        const response = await fetch(`/api/industries/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch industry: ${response.statusText}`)
        }

        const industry = await response.json()
        setIndustryExists(!!industry)
      } catch (error) {
        console.error("Error checking industry:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        setIndustryExists(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkIndustry()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading industry...</p>
        </div>
      </div>
    )
  }

  if (industryExists === false) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-destructive">Industry Not Found</h2>
        </div>
        <p>The industry you're trying to edit doesn't exist or has been deleted.</p>
        {error && <p className="text-destructive">Error: {error}</p>}
        <Button onClick={() => router.push("/admin/industries")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Industries
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Industry</h2>
      </div>
      <IndustryForm id={params.id} />
    </div>
  )
}
