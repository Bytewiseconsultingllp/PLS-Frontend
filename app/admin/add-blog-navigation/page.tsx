"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function AddBlogNavigationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const addBlogNavigation = async () => {
    try {
      setStatus("loading")
      setMessage("Adding Blog to navigation menu...")

      const response = await fetch("/api/add-blog-navigation")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to add Blog to navigation menu")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while adding Blog to navigation menu")
      console.error(error)
    }
  }

  // Auto-run on page load
  useEffect(() => {
    addBlogNavigation()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add Blog to Navigation</CardTitle>
          <CardDescription>This utility adds a Blog link to your site's main navigation menu.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {status === "loading" && (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span>Processing...</span>
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={addBlogNavigation}
            disabled={status === "loading" || status === "success"}
            className="w-full"
          >
            {status === "success" ? "Blog Added Successfully" : "Add Blog to Navigation"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
