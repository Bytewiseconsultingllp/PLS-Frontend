"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, GripVertical, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface QualityService {
  _id?: string
  number: string
  title: string
  description: string
  order: number
}

interface QualityServiceImages {
  topImage: string
  bottomImage: string
}

interface QualityServicesManagerProps {
  initialQualityServices?: QualityService[]
  initialImages?: QualityServiceImages
}

export function QualityServicesManager({
  initialQualityServices = [],
  initialImages = { topImage: "/assets/17.png", bottomImage: "/assets/22.png" },
}: QualityServicesManagerProps) {
  const router = useRouter()
  const [services, setServices] = useState<QualityService[]>([])
  const [images, setImages] = useState<QualityServiceImages>(initialImages)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  // Initialize with provided data
  useEffect(() => {
    if (initialQualityServices && initialQualityServices.length > 0) {
      console.log("Setting initial quality services:", initialQualityServices.length)
      setServices([...initialQualityServices].sort((a, b) => (a.order || 0) - (b.order || 0)))
    }

    if (initialImages) {
      console.log("Setting initial quality service images")
      setImages(initialImages)
    }
  }, [initialQualityServices, initialImages])

  // Add a new quality service
  const addQualityService = () => {
    const newService: QualityService = {
      number: String(services.length + 1).padStart(2, "0"),
      title: "New Service",
      description: "Service description goes here",
      order: services.length,
    }
    setServices([...services, newService])
  }

  // Update a quality service
  const updateQualityService = (index: number, field: keyof QualityService, value: string) => {
    const updatedServices = [...services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    }
    setServices(updatedServices)
  }

  // Remove a quality service
  const removeQualityService = (index: number) => {
    const updatedServices = [...services]
    updatedServices.splice(index, 1)

    // Update order for remaining services
    const reorderedServices = updatedServices.map((service, idx) => ({
      ...service,
      order: idx,
    }))

    setServices(reorderedServices)
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(services)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order for all items
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setServices(updatedItems)
  }

  // Save quality services to the API
  const saveQualityServices = async () => {
    setLoading(true)
    try {
      console.log("Saving quality services:", services)
      const response = await fetch("/api/home-page/quality-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(services),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save quality services")
      }

      toast({
        title: "Success",
        description: "Quality services saved successfully",
      })

      // Refresh the page to show the latest data
      router.refresh()
    } catch (error) {
      console.error("Error saving quality services:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save quality services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Save image URLs
  const saveImageUrls = async () => {
    setImageLoading(true)
    try {
      console.log("Saving quality service images:", images)
      const response = await fetch("/api/home-page/quality-service-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(images),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save image URLs")
      }

      toast({
        title: "Success",
        description: "Image URLs saved successfully",
      })

      // Refresh the page to show the latest data
      router.refresh()
    } catch (error) {
      console.error("Error saving image URLs:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save image URLs",
        variant: "destructive",
      })
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quality Services</h2>
        <Button onClick={saveQualityServices} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Image URL Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Top Image</h3>
            {images.topImage && (
              <div className="relative h-40 mb-4">
                <Image
                  src={images.topImage || "/placeholder.svg"}
                  alt="Top image"
                  width={300}
                  height={160}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="topImageUrl" className="text-sm">
                Image URL
              </label>
              <Input
                type="text"
                id="topImageUrl"
                value={images.topImage}
                onChange={(e) => setImages({ ...images, topImage: e.target.value })}
                placeholder="Enter image URL"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Bottom Image</h3>
            {images.bottomImage && (
              <div className="relative h-40 mb-4">
                <Image
                  src={images.bottomImage || "/placeholder.svg"}
                  alt="Bottom image"
                  width={300}
                  height={160}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="bottomImageUrl" className="text-sm">
                Image URL
              </label>
              <Input
                type="text"
                id="bottomImageUrl"
                value={images.bottomImage}
                onChange={(e) => setImages({ ...images, bottomImage: e.target.value })}
                placeholder="Enter image URL"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add this after the image cards grid */}
      <Button onClick={saveImageUrls} disabled={imageLoading} className="mb-6">
        {imageLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Images...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Image URLs
          </>
        )}
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="quality-services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {services.map((service, index) => (
                <Draggable
                  key={service._id || `new-${index}`}
                  draggableId={service._id || `new-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div {...provided.dragHandleProps} className="cursor-move p-2">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQualityService(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Number</label>
                          <Input
                            value={service.number}
                            onChange={(e) => updateQualityService(index, "number", e.target.value)}
                            placeholder="01"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <Input
                            value={service.title}
                            onChange={(e) => updateQualityService(index, "title", e.target.value)}
                            placeholder="Service Title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => updateQualityService(index, "description", e.target.value)}
                            placeholder="Service description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={addQualityService} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Quality Service
      </Button>
    </div>
  )
}

export default QualityServicesManager
