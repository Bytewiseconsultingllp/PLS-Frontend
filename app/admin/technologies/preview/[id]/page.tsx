"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PreviewTechnologyPageProps {
  params: {
    id: string
  }
}

export default function PreviewTechnologyPage({ params }: PreviewTechnologyPageProps) {
  const router = useRouter()
  const [technology, setTechnology] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTechnology() {
      try {
        setLoading(true)
        const technologyId = params.id.trim()

        if (!technologyId) {
          setError("Invalid technology ID")
          return
        }

        const response = await fetch(`/api/technologies/${technologyId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch technology: ${response.statusText}`)
        }

        const data = await response.json()
        setTechnology(data)
      } catch (error) {
        console.error("Error loading technology:", error)
        setError(`Error loading technology: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    loadTechnology()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin mb-4 text-primary" />
          <h1 className="text-xl font-medium">Loading preview...</h1>
          <p className="mt-2 text-muted-foreground">Technology ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (error || !technology) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h1 className="text-xl font-medium">{error || "Technology not found"}</h1>
          <p className="mt-2 text-muted-foreground">
            The technology with ID "{params.id}" doesn't exist or has been removed.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/technologies")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Technologies
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/technologies")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="ml-4">
            <h1 className="text-sm font-medium">Preview: {technology.title}</h1>
            <p className="text-xs text-muted-foreground">{technology.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/technologies/${params.id}`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" onClick={() => window.open(`/technologies/${technology.slug}`, "_blank")}>
            <Eye className="mr-2 h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>

      <main className="flex-1 overflow-auto">
        <iframe
          src={`/admin/technologies/preview/iframe/${technology.id}`}
          className="w-full h-full border-0"
          title="Technology Preview"
        />
      </main>
    </div>
  )
}
