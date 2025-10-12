"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TechnologiesTable } from "@/components/technologies-table"
import { useToast } from "@/hooks/use-toast"

interface Technology {
  id: string
  title: string
  slug: string
  status?: string
  isPublished?: boolean
  updatedAt: Date | string
}

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTechnologies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/technologies", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch technologies: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Fetched technologies:", data)

      // Ensure we have an array of technologies
      if (!Array.isArray(data)) {
        console.error("Expected array of technologies but got:", data)
        setTechnologies([])
        setError("Invalid data format received from server")
        return
      }

      // Map the data to ensure it has the required fields
      const formattedTechnologies = data.map((tech: any) => ({
        id: tech.id || tech._id || "",
        title: tech.title || "Untitled",
        slug: tech.slug || "",
        status: tech.status || "draft",
        isPublished: tech.isPublished || false,
        updatedAt: tech.updatedAt || new Date().toISOString(),
      }))

      setTechnologies(formattedTechnologies)
      setError(null)
    } catch (error) {
      console.error("Error fetching technologies:", error)
      setError(error instanceof Error ? error.message : "Failed to load technologies")
      toast({
        title: "Error",
        description: "Failed to load technologies. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTechnologies()
  }, [toast])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Technologies</h2>
        <Link href="/admin/technologies/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Technology
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading technologies...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-800">
          <p>{error}</p>
          <Button variant="outline" className="mt-2" onClick={fetchTechnologies}>
            Try Again
          </Button>
        </div>
      ) : (
        <TechnologiesTable technologies={technologies} onDataChange={fetchTechnologies} />
      )}
    </div>
  )
}
