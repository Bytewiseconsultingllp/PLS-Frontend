"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicComponent } from "@/components/dynamic-component"
import { getPageById, type Page } from "@/lib/pages"

interface PreviewPageProps {
  params: {
    id: string
  }
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPage() {
      try {
        // Make sure we're using a valid ID format
        const pageId = params.id.trim()
        console.log("Loading preview page with ID:", pageId)

        if (!pageId) {
          setError("Invalid page ID")
          setLoading(false)
          return
        }

        // Try to load the page with the given ID
        const pageData = await getPageById(pageId)
        console.log("Page data loaded:", pageData)

        if (!pageData) {
          setError(`Page not found with ID: ${pageId}`)
        } else {
          setPage(pageData)
        }
      } catch (error) {
        console.error("Error loading page:", error)
        setError(`Error loading page: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    loadPage()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <h1 className="text-xl font-medium">Loading preview...</h1>
          <p className="mt-2 text-muted-foreground">Page ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h1 className="text-xl font-medium">{error || "Page not found"}</h1>
          <p className="mt-2 text-muted-foreground">
            The page with ID "{params.id}" doesn't exist or has been removed.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/pages")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pages
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/pages")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="ml-4">
            <h1 className="text-sm font-medium">Preview: {page.title}</h1>
            <p className="text-xs text-muted-foreground">{page.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/admin/pages/${params.id}`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" onClick={() => window.open(`${page.slug}`, "_blank")}>
            <Eye className="mr-2 h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto">
          <h1 className="my-8 text-3xl font-bold">{page.title}</h1>
          <div className="space-y-8">
            {page.sections.map((section, index) => (
              <DynamicComponent key={index} component={section.component} data={section.data} />
            ))}
            {page.sections.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">No sections added to this page yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
