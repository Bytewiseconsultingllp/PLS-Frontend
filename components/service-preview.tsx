"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceDetails from "@/components/service-details"

interface ServicePreviewProps {
  serviceId: string
  service: any
  children?: React.ReactNode
}

export function ServicePreview({ serviceId, service, children }: ServicePreviewProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [viewMode, setViewMode] = useState("desktop")

  function handleOpenFullPreview() {
    if (!serviceId) {
      console.error("Cannot open preview: No service ID provided")
      return
    }

    console.log("Opening full preview for service ID:", serviceId)
    router.push(`/admin/services/preview/${serviceId}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Service Preview</DialogTitle>
          <DialogDescription>Preview how your service will look to visitors.</DialogDescription>
        </DialogHeader>

        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="tablet">Tablet</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={handleOpenFullPreview}>
              Full Preview
            </Button>
          </div>
        </Tabs>

        <div
          className={`mt-4 border rounded-lg overflow-auto ${
            viewMode === "desktop" ? "w-full" : viewMode === "tablet" ? "w-[768px] mx-auto" : "w-[375px] mx-auto"
          }`}
        >
          <div className="p-4">
            <ServiceDetails service={service} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
