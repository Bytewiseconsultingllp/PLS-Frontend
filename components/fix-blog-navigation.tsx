"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FixBlogNavigation() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "hidden">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check if we're in an admin context - this is a simplified check
    // In a real app, you'd use your auth system to check admin status
    const isAdmin = window.location.pathname.includes("/admin") || localStorage.getItem("isAdmin") === "true"

    if (!isAdmin) {
      setStatus("hidden")
      return
    }

    const fixNavigation = async () => {
      try {
        setStatus("loading")
        setMessage("Checking blog navigation...")

        const response = await fetch("/api/fix-blog-navigation")
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage(data.message)

          // Hide after 5 seconds
          setTimeout(() => {
            setStatus("hidden")
          }, 5000)
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

    fixNavigation()
  }, [])

  if (status === "hidden") {
    return null
  }

  return (
    <Alert className="mb-6" variant={status === "error" ? "destructive" : status === "success" ? "default" : "outline"}>
      <div className="flex items-center gap-2">
        {status === "loading" && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        )}
        {status === "success" && <CheckCircle className="h-4 w-4" />}
        {status === "error" && <AlertCircle className="h-4 w-4" />}
      </div>
      <AlertTitle>
        {status === "loading" && "Fixing Blog Navigation"}
        {status === "success" && "Blog Navigation Fixed"}
        {status === "error" && "Error Fixing Navigation"}
      </AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setStatus("hidden")}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </Alert>
  )
}
