"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TechnologyPreviewProps {
  technologyId: string
  technology?: any
  children: React.ReactNode
  timestamp?: number
}

export function TechnologyPreview({
  technologyId,
  technology,
  children,
  timestamp = Date.now(),
}: TechnologyPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Add timestamp to URL to prevent caching
  const [addTimestampToUrlFlag, setAddTimestampToUrlFlag] = useState(false)

  // Add timestamp to URL to prevent caching
  const addTimestampToUrl = (url: string): string => {
    if (!url) return url

    // Don't add timestamp to external URLs or data URLs
    if (url.startsWith("http") || url.startsWith("data:")) return url

    // Add timestamp as query parameter
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}t=${timestamp}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Technology Preview</DialogTitle>
          <DialogDescription>Preview how this technology will appear on the website</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto mt-4">
          <Tabs defaultValue="iframe" className="w-full">
            <TabsList>
              <TabsTrigger value="iframe">Live Preview</TabsTrigger>
              <TabsTrigger value="json">JSON Data</TabsTrigger>
            </TabsList>
            <TabsContent value="iframe" className="h-full">
              <div className="rounded-md border h-full min-h-[500px] overflow-hidden">
                <iframe
                  src={`/admin/technologies/preview/iframe/${technologyId}?t=${timestamp}`}
                  className="w-full h-full"
                  title="Technology Preview"
                />
              </div>
            </TabsContent>
            <TabsContent value="json">
              <pre className="rounded-md bg-slate-950 p-4 text-white overflow-auto max-h-[500px]">
                {JSON.stringify(technology || {}, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
