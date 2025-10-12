"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BlogNavigationSetup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(true)

  const setupNavigation = async () => {
    try {
      setStatus("loading")
      setMessage("Setting up Blog navigation...")

      const response = await fetch("/api/add-blog-navigation")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)

        // Hide the component after 5 seconds on success
        setTimeout(() => {
          setVisible(false)
        }, 5000)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to set up Blog navigation")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while setting up Blog navigation")
      console.error(error)
    }
  }

  useEffect(() => {
    // Check if we're in an admin context (you can customize this check)
    const isAdmin = window.location.pathname.includes("/admin")

    if (isAdmin) {
      setupNavigation()
    } else {
      setVisible(false)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div className="mb-6">
      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>{message}</span>
            <Button size="sm" onClick={setupNavigation}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {status === "success" && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {status === "loading" && (
        <Alert>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <AlertTitle>Setting up navigation</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
