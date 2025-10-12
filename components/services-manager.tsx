"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Trash2, GripVertical, Plus, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Service {
  _id?: string
  title: string
  description: string
  image: string
  icon: string
  order: number
}

interface ServicesManagerProps {
  initialServices: Service[]
}

export function ServicesManager({ initialServices = [] }: ServicesManagerProps) {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize services with the provided data or empty array
  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      // Sort by order property
      const sortedServices = [...initialServices].sort((a, b) => (a.order || 0) - (b.order || 0))
      setServices(sortedServices)
    } else {
      setServices([])
    }
  }, [initialServices])

  // Add a new empty service
  const addService = () => {
    const newService: Service = {
      title: "New Service",
      description: "🔹 Feature 1\n🔹 Feature 2\n🔹 Feature 3",
      image: "/assets/7.png",
      icon: "/assets/icon5.png",
      order: services.length,
    }
    setServices([...services, newService])
  }

  // Remove a service
  const removeService = (index: number) => {
    const updatedServices = [...services]
    updatedServices.splice(index, 1)

    // Update order values
    const reorderedServices = updatedServices.map((service, idx) => ({
      ...service,
      order: idx,
    }))

    setServices(reorderedServices)
  }

  // Handle input changes
  const handleInputChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    }
    setServices(updatedServices)
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(services)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order values
    const reorderedServices = items.map((service, idx) => ({
      ...service,
      order: idx,
    }))

    setServices(reorderedServices)
  }

  // Save services to the database
  const saveServices = async () => {
    try {
      setIsLoading(true)

      // Ensure all services have the correct order value
      const orderedServices = services.map((service, index) => ({
        ...service,
        order: index,
      }))

      console.log("Saving services:", JSON.stringify(orderedServices, null, 2))

      const response = await fetch("/api/home-page/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedServices),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save services")
      }

      toast({
        title: "Success",
        description: "Services saved successfully",
      })

      // Refresh the page to show the latest data
      router.refresh()
    } catch (error) {
      console.error("Error saving services:", error)
      toast({
        title: "Error",
        description: "Failed to save services. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <div className="flex gap-2">
          <Button onClick={addService} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
          <Button onClick={saveServices} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Services
              </>
            )}
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {services.map((service, index) => (
                <Draggable
                  key={service._id || `service-${index}`}
                  draggableId={service._id || `service-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div {...provided.dragHandleProps} className="mt-2 cursor-move">
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`title-${index}`}>Title</Label>
                                <Input
                                  id={`title-${index}`}
                                  value={service.title}
                                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`image-${index}`}>Image URL</Label>
                                <Input
                                  id={`image-${index}`}
                                  value={service.image}
                                  onChange={(e) => handleInputChange(index, "image", e.target.value)}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`icon-${index}`}>Icon URL</Label>
                                <Input
                                  id={`icon-${index}`}
                                  value={service.icon}
                                  onChange={(e) => handleInputChange(index, "icon", e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`description-${index}`}>Description (use 🔹 for bullet points)</Label>
                              <Textarea
                                id={`description-${index}`}
                                value={service.description}
                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                rows={4}
                              />
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeService(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
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
    </div>
  )
}
