"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface ComponentPreviewProps {
  type: string
  schema: Record<string, any>
}

export function ComponentPreview({ type, schema }: ComponentPreviewProps) {
  const [viewMode, setViewMode] = useState("desktop")

  // Generate default data from schema
  const defaultData = Object.entries(schema).reduce(
    (acc, [key, field]: [string, any]) => {
      if (field.type === "array" && field.items?.template) {
        // For arrays, create a sample array with 2 items
        acc[key] = [field.items.template, field.items.template]
      } else {
        acc[key] = field.default || ""
      }
      return acc
    },
    {} as Record<string, any>,
  )

  return (
    <div className="space-y-4">
      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="tablet">Tablet</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>
      </Tabs>

      <div
        className={`border rounded-lg overflow-hidden ${
          viewMode === "desktop" ? "w-full" : viewMode === "tablet" ? "w-[768px] mx-auto" : "w-[375px] mx-auto"
        }`}
      >
        {renderPreview(type, defaultData)}
      </div>
    </div>
  )
}

function renderPreview(type: string, data: Record<string, any>) {
  switch (type) {
    case "hero":
      return (
        <div
          className="relative flex items-center justify-center min-h-[400px] p-8 text-center"
          style={{
            backgroundColor: data.backgroundColor || "#ffffff",
            color: data.textColor || "#000000",
          }}
        >
          {data.image && (
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src={data.image || "/placeholder.svg?height=400&width=800&query=hero background"}
                alt="Hero background"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">{data.title}</h1>
            <p className="text-xl mb-8 text-white">{data.subtitle}</p>
            {data.buttonText && <Button>{data.buttonText}</Button>}
          </div>
        </div>
      )

    case "features":
      return (
        <div className="py-12 px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
          <div
            className={`grid gap-8 ${
              data.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : data.columns === "4"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-3" // default to 3 columns
            }`}
          >
            {(data.features || []).map((feature: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {/* This would be an actual icon in a real implementation */}
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    case "testimonials":
      return (
        <div className="py-12 px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(data.testimonials || []).map((testimonial: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                      <ImageWithFallback
                        src={testimonial.image || "/placeholder.svg?height=100&width=100&query=person"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    default:
      return (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Preview not available for this component type.</p>
        </div>
      )
  }
}
