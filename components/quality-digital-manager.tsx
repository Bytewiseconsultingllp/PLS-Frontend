"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Plus, Save } from "lucide-react"
import type { QualityDigitalService, QualityDigitalImages } from "@/components/home/quality-digital"

interface QualityDigitalManagerProps {
  initialSection: {
    heading: string
    subheading: string
    services: QualityDigitalService[]
    images: QualityDigitalImages
  }
}

export function QualityDigitalManager({ initialSection }: QualityDigitalManagerProps) {
  const [heading, setHeading] = useState(initialSection.heading || "")
  const [subheading, setSubheading] = useState(initialSection.subheading || "")
  const [services, setServices] = useState<QualityDigitalService[]>(initialSection.services || [])
  const [images, setImages] = useState<QualityDigitalImages>(
    initialSection.images || {
      topImage: "/assets/9.png",
      bottomImage: "/assets/11.png",
    },
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleAddService = () => {
    const newService: QualityDigitalService = {
      number: `0${services.length + 1}`,
      title: "New Service",
      description: "Service description goes here.",
      order: services.length,
    }
    setServices([...services, newService])
  }

  const handleRemoveService = (index: number) => {
    const updatedServices = [...services]
    updatedServices.splice(index, 1)

    // Update order numbers
    const reorderedServices = updatedServices.map((service, idx) => ({
      ...service,
      number: `0${idx + 1}`,
      order: idx,
    }))

    setServices(reorderedServices)
  }

  const handleServiceChange = (index: number, field: keyof QualityDigitalService, value: string) => {
    const updatedServices = [...services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    }
    setServices(updatedServices)
  }

  const handleImageChange = (field: keyof QualityDigitalImages, value: string) => {
    setImages({
      ...images,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/home-page/quality-digital", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          subheading,
          services,
          images,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update quality digital section")
      }

      toast({
        title: "Success",
        description: "Quality digital section updated successfully",
      })
    } catch (error) {
      console.error("Error updating quality digital section:", error)
      toast({
        title: "Error",
        description: "Failed to update quality digital section",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Digital Section</CardTitle>
        <CardDescription>Manage the quality digital section content</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter section heading"
              />
            </div>

            <div>
              <Label htmlFor="subheading">Subheading</Label>
              <Input
                id="subheading"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Enter section subheading"
              />
            </div>

            <div>
              <Label htmlFor="topImage">Top Image URL</Label>
              <Input
                id="topImage"
                value={images.topImage}
                onChange={(e) => handleImageChange("topImage", e.target.value)}
                placeholder="Enter top image URL"
              />
            </div>

            <div>
              <Label htmlFor="bottomImage">Bottom Image URL</Label>
              <Input
                id="bottomImage"
                value={images.bottomImage}
                onChange={(e) => handleImageChange("bottomImage", e.target.value)}
                placeholder="Enter bottom image URL"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Services</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddService}>
                  <Plus className="h-4 w-4 mr-2" /> Add Service
                </Button>
              </div>

              {services.map((service, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Service #{index + 1}</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveService(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`service-number-${index}`}>Number</Label>
                        <Input
                          id={`service-number-${index}`}
                          value={service.number}
                          onChange={(e) => handleServiceChange(index, "number", e.target.value)}
                          placeholder="Service number"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`service-title-${index}`}>Title</Label>
                        <Input
                          id={`service-title-${index}`}
                          value={service.title}
                          onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                          placeholder="Service title"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`service-description-${index}`}>Description</Label>
                        <Textarea
                          id={`service-description-${index}`}
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                          placeholder="Service description"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default QualityDigitalManager
