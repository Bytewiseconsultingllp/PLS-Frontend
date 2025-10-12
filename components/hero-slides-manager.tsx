"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Trash2, GripVertical, Plus, Save, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Update the Slide interface to include buttonLink
interface Slide {
  _id?: string
  image: string
  head: string
  heading: string
  text: string
  buttonLink?: string
  order: number
}

interface HeroSlidesManagerProps {
  initialSlides?: Slide[]
}

export function HeroSlidesManager({ initialSlides = [] }: HeroSlidesManagerProps) {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Initialize with provided data or fetch from API
  useEffect(() => {
    console.log("HeroSlidesManager initialSlides:", initialSlides?.length || 0)

    if (initialSlides && initialSlides.length > 0) {
      console.log("Using provided initialSlides")
      // Sort slides by order
      const sortedSlides = [...initialSlides].sort((a, b) => (a.order || 0) - (b.order || 0))
      setSlides(sortedSlides)
      setLoading(false)
    } else {
      console.log("Fetching slides from API")
      fetchSlides()
    }
  }, [initialSlides])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      console.log("Fetching slides from API...")

      const response = await fetch("/api/home-page/hero-slides", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch slides")
      }

      const data = await response.json()
      console.log("Fetched slides:", data?.length || 0)

      // Sort slides by order
      const sortedSlides = Array.isArray(data) ? data.sort((a: Slide, b: Slide) => a.order - b.order) : []

      setSlides(sortedSlides)
    } catch (error) {
      console.error("Error fetching slides:", error)
      toast({
        title: "Error",
        description: "Failed to load hero slides",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSlides = async () => {
    try {
      setSaving(true)
      console.log("Saving slides...")

      // Ensure all slides have the correct order
      const updatedSlides = slides.map((slide, index) => ({
        ...slide,
        order: index,
      }))

      console.log("Saving slides:", updatedSlides.length)

      const response = await fetch("/api/home-page/hero-slides", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSlides),
      })

      if (!response.ok) {
        throw new Error("Failed to save slides")
      }

      const savedData = await response.json()
      console.log("Saved slides response:", savedData)

      toast({
        title: "Success",
        description: "Hero slides saved successfully",
      })

      // Force refresh the router to ensure we have the latest data
      router.refresh()

      // Refresh slides from server to ensure we have the latest data
      fetchSlides()
    } catch (error) {
      console.error("Error saving slides:", error)
      toast({
        title: "Error",
        description: "Failed to save hero slides",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddSlide = () => {
    const newSlide: Slide = {
      image: "/placeholder.svg",
      head: "New Section",
      heading: "New Heading",
      text: "Add your description here",
      order: slides.length,
    }
    setSlides([...slides, newSlide])
  }

  const handleRemoveSlide = (index: number) => {
    const newSlides = [...slides]
    newSlides.splice(index, 1)

    // Update order for remaining slides
    const updatedSlides = newSlides.map((slide, idx) => ({
      ...slide,
      order: idx,
    }))

    setSlides(updatedSlides)
  }

  const handleSlideChange = (index: number, field: keyof Slide, value: string) => {
    const newSlides = [...slides]
    newSlides[index] = {
      ...newSlides[index],
      [field]: value,
    }
    setSlides(newSlides)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order for all slides
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setSlides(updatedItems)
  }

  const handleRefreshHomePage = () => {
    window.open("/", "_blank")
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full bg-gray-100 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Hero Section Slides</CardTitle>
            <CardDescription>
              Manage the slides that appear in the hero section of the home page. Drag to reorder.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefreshHomePage} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            View Home Page
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {slides.length} {slides.length === 1 ? "slide" : "slides"}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAddSlide} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
            <Button onClick={handleSaveSlides} disabled={saving} size="sm">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="slides">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {slides.map((slide, index) => (
                  <Draggable
                    key={slide._id || `slide-${index}`}
                    draggableId={slide._id || `slide-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSlide(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`slide-${index}-image`}>Image URL</Label>
                              <Input
                                id={`slide-${index}-image`}
                                value={slide.image}
                                onChange={(e) => handleSlideChange(index, "image", e.target.value)}
                                placeholder="/assets/image.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`slide-${index}-head`}>Section Title</Label>
                              <Input
                                id={`slide-${index}-head`}
                                value={slide.head}
                                onChange={(e) => handleSlideChange(index, "head", e.target.value)}
                                placeholder="Software Development"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`slide-${index}-heading`}>Main Heading</Label>
                            <Input
                              id={`slide-${index}-heading`}
                              value={slide.heading}
                              onChange={(e) => handleSlideChange(index, "heading", e.target.value)}
                              placeholder="Custom Software Solutions"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`slide-${index}-text`}>Description</Label>
                            <Textarea
                              id={`slide-${index}-text`}
                              value={slide.text}
                              onChange={(e) => handleSlideChange(index, "text", e.target.value)}
                              placeholder="Bespoke software development tailored for scalability, security, and business efficiency."
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`slide-${index}-buttonLink`}>Button Link</Label>
                            <Input
                              id={`slide-${index}-buttonLink`}
                              value={slide.buttonLink || "/contact"}
                              onChange={(e) => handleSlideChange(index, "buttonLink", e.target.value)}
                              placeholder="/contact"
                            />
                            <p className="text-xs text-gray-500">
                              Enter the URL where the "Discover More" button should link to
                            </p>
                          </div>
                          {slide.image && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2">Preview:</p>
                              <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={slide.image || "/placeholder.svg"}
                                  alt={slide.heading}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {slides.length === 0 && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-gray-500 mb-4">No slides added yet</p>
              <Button onClick={handleAddSlide} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Slide
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
