"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Trash2, GripVertical, Plus, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// List of available Lucide icons for selection
const availableIcons = [
  "Heart",
  "DollarSign",
  "ShoppingCart",
  "Building",
  "Truck",
  "Briefcase",
  "Plane",
  "Utensils",
  "Landmark",
  "Hammer",
  "Microscope",
  "Leaf",
]

interface IndustryCard {
  _id?: string
  title: string
  description: string
  image: string
  icon: string
  order: number
}

interface IndustryCardsManagerProps {
  initialIndustryCards: IndustryCard[]
}

export function IndustryCardsManager({ initialIndustryCards = [] }: IndustryCardsManagerProps) {
  const router = useRouter()
  const [industryCards, setIndustryCards] = useState<IndustryCard[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize industry cards with the provided data or empty array
  useEffect(() => {
    if (initialIndustryCards && initialIndustryCards.length > 0) {
      // Sort by order property
      const sortedIndustryCards = [...initialIndustryCards].sort((a, b) => (a.order || 0) - (b.order || 0))
      setIndustryCards(sortedIndustryCards)
    } else {
      setIndustryCards([])
    }
  }, [initialIndustryCards])

  // Add a new empty industry card
  const addIndustryCard = () => {
    const newIndustryCard: IndustryCard = {
      title: "New Industry",
      description: "🔹 Feature 1\n🔹 Feature 2\n🔹 Feature 3",
      image: "/assets/9.png",
      icon: "Heart",
      order: industryCards.length,
    }
    setIndustryCards([...industryCards, newIndustryCard])
  }

  // Remove an industry card
  const removeIndustryCard = (index: number) => {
    const updatedIndustryCards = [...industryCards]
    updatedIndustryCards.splice(index, 1)

    // Update order values
    const reorderedIndustryCards = updatedIndustryCards.map((card, idx) => ({
      ...card,
      order: idx,
    }))

    setIndustryCards(reorderedIndustryCards)
  }

  // Handle input changes
  const handleInputChange = (index: number, field: keyof IndustryCard, value: string) => {
    const updatedIndustryCards = [...industryCards]
    updatedIndustryCards[index] = {
      ...updatedIndustryCards[index],
      [field]: value,
    }
    setIndustryCards(updatedIndustryCards)
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(industryCards)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order values
    const reorderedIndustryCards = items.map((card, idx) => ({
      ...card,
      order: idx,
    }))

    setIndustryCards(reorderedIndustryCards)
  }

  // Save industry cards to the database
  const saveIndustryCards = async () => {
    try {
      setIsLoading(true)

      // Ensure all industry cards have the correct order value
      const orderedIndustryCards = industryCards.map((card, index) => ({
        ...card,
        order: index,
      }))

      console.log("Saving industry cards:", JSON.stringify(orderedIndustryCards, null, 2))

      const response = await fetch("/api/home-page/industry-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedIndustryCards),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save industry cards")
      }

      toast({
        title: "Success",
        description: "Industry cards saved successfully",
      })

      // Refresh the page to show the latest data
      router.refresh()
    } catch (error) {
      console.error("Error saving industry cards:", error)
      toast({
        title: "Error",
        description: "Failed to save industry cards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Industry Cards</h2>
        <div className="flex gap-2">
          <Button onClick={addIndustryCard} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Industry Card
          </Button>
          <Button onClick={saveIndustryCards} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Industry Cards
              </>
            )}
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="industryCards">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {industryCards.map((card, index) => (
                <Draggable
                  key={card._id || `industry-card-${index}`}
                  draggableId={card._id || `industry-card-${index}`}
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
                                  value={card.title}
                                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`image-${index}`}>Image URL</Label>
                                <Input
                                  id={`image-${index}`}
                                  value={card.image}
                                  onChange={(e) => handleInputChange(index, "image", e.target.value)}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`icon-${index}`}>Icon</Label>
                                <Select
                                  value={card.icon}
                                  onValueChange={(value) => handleInputChange(index, "icon", value)}
                                >
                                  <SelectTrigger id={`icon-${index}`}>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableIcons.map((icon) => (
                                      <SelectItem key={icon} value={icon}>
                                        {icon}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`description-${index}`}>Description (use 🔹 for bullet points)</Label>
                              <Textarea
                                id={`description-${index}`}
                                value={card.description}
                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                rows={4}
                              />
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIndustryCard(index)}
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
