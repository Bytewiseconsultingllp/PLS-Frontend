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

interface QualityIndustry {
  _id?: string
  number: string
  title: string
  description: string
  order: number
}

interface QualityIndustryImages {
  topImage: string
  bottomImage: string
}

interface QualityIndustryManagerProps {
  initialQualityIndustry?: QualityIndustry[]
  initialImages?: QualityIndustryImages
}

export function QualityIndustryManager({
  initialQualityIndustry = [],
  initialImages = { topImage: "/assets/9.png", bottomImage: "/assets/15.png" },
}: QualityIndustryManagerProps) {
  const router = useRouter()
  const [industries, setIndustries] = useState<QualityIndustry[]>([])
  const [images, setImages] = useState<QualityIndustryImages>(initialImages)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  // Initialize with provided data
  useEffect(() => {
    if (initialQualityIndustry && initialQualityIndustry.length > 0) {
      console.log("Setting initial quality industry:", initialQualityIndustry.length)
      setIndustries([...initialQualityIndustry].sort((a, b) => (a.order || 0) - (b.order || 0)))
    }

    if (initialImages) {
      console.log("Setting initial quality industry images")
      setImages(initialImages)
    }
  }, [initialQualityIndustry, initialImages])

  // Add a new quality industry
  const addQualityIndustry = () => {
    const newIndustry: QualityIndustry = {
      number: String(industries.length + 1).padStart(2, "0"),
      title: "New Industry",
      description: "Industry description goes here",
      order: industries.length,
    }
    setIndustries([...industries, newIndustry])
  }

  // Update a quality industry
  const updateQualityIndustry = (index: number, field: keyof QualityIndustry, value: string) => {
    const updatedIndustries = [...industries]
    updatedIndustries[index] = {
      ...updatedIndustries[index],
      [field]: value,
    }
    setIndustries(updatedIndustries)
  }

  // Remove a quality industry
  const removeQualityIndustry = (index: number) => {
    const updatedIndustries = [...industries]
    updatedIndustries.splice(index, 1)

    // Update order for remaining industries
    const reorderedIndustries = updatedIndustries.map((industry, idx) => ({
      ...industry,
      order: idx,
    }))

    setIndustries(reorderedIndustries)
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(industries)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order for all items
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setIndustries(updatedItems)
  }

  // Save quality industry to the API
  const saveQualityIndustry = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/home-page/quality-industry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(industries),
      })

      if (!response.ok) {
        throw new Error("Failed to save quality industry")
      }

      toast({
        title: "Success",
        description: "Quality industry saved successfully",
      })

      // Refresh the page to show the latest data
      router.refresh()
    } catch (error) {
      console.error("Error saving quality industry:", error)
      toast({
        title: "Error",
        description: "Failed to save quality industry",
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
      const response = await fetch("/api/home-page/quality-industry-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(images),
      })

      if (!response.ok) {
        throw new Error("Failed to save image URLs")
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
        description: "Failed to save image URLs",
        variant: "destructive",
      })
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quality Industry</h2>
        <Button onClick={saveQualityIndustry} disabled={loading}>
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
                  fill
                  className="object-cover rounded-md"
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
                  fill
                  className="object-cover rounded-md"
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
        <Droppable droppableId="quality-industry">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {industries.map((industry, index) => (
                <Draggable
                  key={industry._id || `new-${index}`}
                  draggableId={industry._id || `new-${index}`}
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
                          onClick={() => removeQualityIndustry(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Number</label>
                          <Input
                            value={industry.number}
                            onChange={(e) => updateQualityIndustry(index, "number", e.target.value)}
                            placeholder="01"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <Input
                            value={industry.title}
                            onChange={(e) => updateQualityIndustry(index, "title", e.target.value)}
                            placeholder="Industry Title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <Textarea
                            value={industry.description}
                            onChange={(e) => updateQualityIndustry(index, "description", e.target.value)}
                            placeholder="Industry description"
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

      <Button onClick={addQualityIndustry} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Quality Industry
      </Button>
    </div>
  )
}

export default QualityIndustryManager
