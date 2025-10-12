"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function FixBlogNavigationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const fixBlogNavigation = async () => {
    try {
      setStatus("loading")
      setMessage("Fixing Blog navigation link...")

      const response = await fetch("/api/fix-blog-navigation")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to fix Blog navigation")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while fixing Blog navigation")
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Fix Blog Navigation Link</CardTitle>
          <CardDescription>
            This utility fixes the Blog link in your navigation menu to correctly point to the blog page.
          </CardDescription>
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
          <Button onClick={fixBlogNavigation} disabled={status === "loading"} className="w-full">
            {status === "success" ? "Blog Link Fixed Successfully" : "Fix Blog Navigation Link"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
