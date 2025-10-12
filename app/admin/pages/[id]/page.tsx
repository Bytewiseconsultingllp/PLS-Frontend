"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageForm } from "@/components/page-form"
import { getPageById } from "@/lib/pages"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EditPagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pageExists, setPageExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkPage() {
      try {
        console.log("Checking if page exists with ID:", params.id)
        const page = await getPageById(params.id)
        setPageExists(!!page)
      } catch (error) {
        console.error("Error checking page:", error)
        setPageExists(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPage()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Loading...</h2>
        </div>
      </div>
    )
  }

  if (pageExists === false) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-destructive">Page Not Found</h2>
        </div>
        <p>The page you're trying to edit doesn't exist or has been deleted.</p>
        <Button onClick={() => router.push("/admin/pages")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Page</h2>
      </div>
      <PageForm id={params.id} />
    </div>
  )
}
