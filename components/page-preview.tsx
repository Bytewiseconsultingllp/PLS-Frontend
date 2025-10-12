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
import { DynamicComponent } from "@/components/dynamic-component"

interface PagePreviewProps {
  pageId: string
  pageSections: any[]
  children?: React.ReactNode
}

export function PagePreview({ pageId, pageSections, children }: PagePreviewProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [viewMode, setViewMode] = useState("desktop")

  function handleOpenFullPreview() {
    if (!pageId) {
      console.error("Cannot open preview: No page ID provided")
      return
    }

    console.log("Opening full preview for page ID:", pageId)
    router.push(`/admin/preview/${pageId}`)
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
          <DialogTitle>Page Preview</DialogTitle>
          <DialogDescription>Preview how your page will look to visitors.</DialogDescription>
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
            <div className="space-y-8">
              {pageSections && pageSections.length > 0 ? (
                pageSections.map((section, index) => (
                  <DynamicComponent key={index} component={section.component} data={section.data} />
                ))
              ) : (
                <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">No sections added to this page yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
