"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash, Edit, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationItemForm } from "@/components/navigation-item-form"
import { HeaderPreview } from "@/components/header-preview"
import { useToast } from "@/hooks/use-toast"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"

interface NavigationItem {
  id: string
  _id: string
  title: string
  slug: string
  type: "link" | "dropdown" | "button" | "subheading" | "subitem" | "three-level-hierarchy"
  url?: string
  order: number
  isActive: boolean
  parentId?: string | null
  level?: number
  children?: NavigationItem[]
  subItems?: NavigationItem[]
}

export function HeaderManager() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)
  const [isAddingSubheading, setIsAddingSubheading] = useState(false)
  const [isAddingSubItem, setIsAddingSubItem] = useState(false)
  const [activeTab, setActiveTab] = useState("items")

  useEffect(() => {
    fetchNavigationItems()
  }, [])

  async function fetchNavigationItems() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/navigation")
      if (!response.ok) {
        throw new Error("Failed to fetch navigation items")
      }
      const data = await response.json()

      // Organize items into a hierarchical structure
      const rootItems: NavigationItem[] = []
      const childMap = new Map<string, NavigationItem[]>()
      const subItemMap = new Map<string, NavigationItem[]>()

      // Group items by their parent
      data.forEach((item: NavigationItem) => {
        const id = item.id || item._id.toString()
        item.id = id

        if (!item.parentId) {
          rootItems.push(item)
        } else {
          const parentId = item.parentId.toString()
          if (item.level === 1) {
            if (!childMap.has(parentId)) {
              childMap.set(parentId, [])
            }
            childMap.get(parentId)!.push(item)
          } else if (item.level === 2) {
            if (!subItemMap.has(parentId)) {
              subItemMap.set(parentId, [])
            }
            subItemMap.get(parentId)!.push(item)
          }
        }
      })

      // Sort items by order
      rootItems.sort((a, b) => a.order - b.order)

      // Attach children to their parents
      rootItems.forEach((item) => {
        const id = item.id || item._id.toString()
        if (childMap.has(id)) {
          item.children = childMap.get(id)!.sort((a, b) => a.order - b.order)

          // Attach sub-items to their parents (subheadings)
          item.children.forEach((child) => {
            const childId = child.id || child._id.toString()
            if (subItemMap.has(childId)) {
              child.subItems = subItemMap.get(childId)!.sort((a, b) => a.order - b.order)
            }
          })
        }
      })

      setNavigationItems(rootItems)
    } catch (error) {
      console.error("Error fetching navigation items:", error)
      toast({
        title: "Error",
        description: "Failed to load navigation items",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateItem(data: Partial<NavigationItem>) {
    try {
      // Ensure the level is set correctly for three-level-hierarchy
      if (data.type === "three-level-hierarchy") {
        data.level = 0
      }

      const response = await fetch("/api/navigation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create navigation item")
      }

      toast({
        title: "Success",
        description: "Navigation item created successfully",
      })

      fetchNavigationItems()
      setActiveTab("items")
    } catch (error) {
      console.error("Error creating navigation item:", error)
      toast({
        title: "Error",
        description: "Failed to create navigation item",
        variant: "destructive",
      })
    }
  }

  async function handleUpdateItem(id: string, data: Partial<NavigationItem>) {
    try {
      const response = await fetch(`/api/navigation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update navigation item")
      }

      toast({
        title: "Success",
        description: "Navigation item updated successfully",
      })

      fetchNavigationItems()
      setSelectedItem(null)
      setIsEditing(false)
      setActiveTab("items")
    } catch (error) {
      console.error("Error updating navigation item:", error)
      toast({
        title: "Error",
        description: "Failed to update navigation item",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteItem(id: string, level = 0) {
    const confirmMessage =
      level === 0
        ? "Are you sure you want to delete this navigation item? This will also delete all sub-headings and sub-items."
        : level === 1
          ? "Are you sure you want to delete this sub-heading? This will also delete all sub-items."
          : "Are you sure you want to delete this sub-item?"

    if (!confirm(confirmMessage)) {
      return
    }

    try {
      const response = await fetch(`/api/navigation/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete navigation item")
      }

      toast({
        title: "Success",
        description: "Navigation item deleted successfully",
      })

      fetchNavigationItems()
    } catch (error) {
      console.error("Error deleting navigation item:", error)
      toast({
        title: "Error",
        description: "Failed to delete navigation item",
        variant: "destructive",
      })
    }
  }

  async function handleReorderItems(result: any) {
    if (!result.destination) return

    const items = Array.from(navigationItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setNavigationItems(updatedItems)

    // Update order in database
    try {
      for (const item of updatedItems) {
        await fetch(`/api/navigation/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: item.order }),
        })
      }
    } catch (error) {
      console.error("Error updating item order:", error)
      toast({
        title: "Error",
        description: "Failed to update item order",
        variant: "destructive",
      })
      fetchNavigationItems() // Revert to original order
    }
  }

  function handleAddChild(parentItem: NavigationItem) {
    setSelectedItem(parentItem)
    setIsAddingChild(true)
    setIsAddingSubheading(false)
    setIsAddingSubItem(false)
    setActiveTab("edit")
  }

  function handleAddSubheading(parentItem: NavigationItem) {
    setSelectedItem(parentItem)
    setIsAddingChild(false)
    setIsAddingSubheading(true)
    setIsAddingSubItem(false)
    setActiveTab("edit")
  }

  function handleAddSubItem(parentItem: NavigationItem) {
    setSelectedItem(parentItem)
    setIsAddingChild(false)
    setIsAddingSubheading(false)
    setIsAddingSubItem(true)
    setActiveTab("edit")
  }

  function handleEditItem(item: NavigationItem) {
    // Make sure we have the complete item with the correct ID
    setSelectedItem({
      ...item,
      id: item.id || item._id.toString(),
    })
    setIsEditing(true)
    setIsAddingChild(false)
    setIsAddingSubheading(false)
    setIsAddingSubItem(false)
    setActiveTab("edit")
  }

  function getItemTypeLabel(type: string) {
    switch (type) {
      case "dropdown":
        return "Dropdown"
      case "link":
        return "Link"
      case "button":
        return "Button"
      case "subheading":
        return "Sub-heading"
      case "subitem":
        return "Sub-item"
      case "three-level-hierarchy":
        return "Three-Level Hierarchy"
      default:
        return type
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="items">Navigation Items</TabsTrigger>
        <TabsTrigger value="edit">
          {isEditing
            ? "Edit Item"
            : isAddingChild
              ? `Add Child Item to "${selectedItem?.title}"`
              : isAddingSubheading
                ? `Add Sub-heading to "${selectedItem?.title}"`
                : isAddingSubItem
                  ? `Add Sub-item to "${selectedItem?.title}"`
                  : "Add New Item"}
        </TabsTrigger>
        <TabsTrigger value="preview">Preview Header</TabsTrigger>
      </TabsList>

      <TabsContent value="items" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Header Navigation Items</CardTitle>
            <CardDescription>Manage the navigation items in your website header</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setSelectedItem(null)
                    setIsEditing(false)
                    setIsAddingChild(false)
                    setIsAddingSubheading(false)
                    setIsAddingSubItem(false)
                    setActiveTab("edit")
                  }}
                  className="mb-4"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Root Item
                </Button>

                <DragDropContext onDragEnd={handleReorderItems}>
                  <Droppable droppableId="navigation-items">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {navigationItems.length === 0 ? (
                          <p className="text-center text-muted-foreground py-4">No navigation items found</p>
                        ) : (
                          navigationItems.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`border rounded-md p-4 ${item.type === "three-level-hierarchy" ? "border-[#003087] bg-blue-50" : ""}`}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h3 className="font-medium">{item.title}</h3>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline">{getItemTypeLabel(item.type)}</Badge>
                                        {item.url && (
                                          <span className="text-sm text-muted-foreground">URL: {item.url}</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {item.type === "dropdown" || item.type === "three-level-hierarchy" ? (
                                        <Button variant="outline" size="sm" onClick={() => handleAddSubheading(item)}>
                                          <Plus className="h-4 w-4 mr-1" /> Sub-heading
                                        </Button>
                                      ) : null}
                                      <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id, 0)}>
                                        <Trash className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </div>
                                  </div>

                                  {item.children && item.children.length > 0 && (
                                    <div className="mt-3 pl-4 border-l space-y-3">
                                      {item.children.map((subheading) => (
                                        <div key={subheading.id} className="border rounded-md p-3">
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="font-medium flex items-center">
                                                <ChevronRight className="h-4 w-4 mr-1" />
                                                {subheading.title}
                                              </h4>
                                              <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline">{getItemTypeLabel(subheading.type)}</Badge>
                                                {subheading.url && (
                                                  <span className="text-sm text-muted-foreground">
                                                    URL: {subheading.url}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddSubItem(subheading)}
                                              >
                                                <Plus className="h-4 w-4 mr-1" /> Sub-item
                                              </Button>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEditItem(subheading)}
                                              >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                              </Button>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteItem(subheading.id, 1)}
                                              >
                                                <Trash className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                              </Button>
                                            </div>
                                          </div>

                                          {subheading.subItems && subheading.subItems.length > 0 && (
                                            <div className="mt-2 pl-4 border-l space-y-2">
                                              {subheading.subItems.map((subItem) => (
                                                <div key={subItem.id} className="border rounded-md p-2">
                                                  <div className="flex justify-between items-center">
                                                    <div>
                                                      <h5 className="font-medium flex items-center">
                                                        <ChevronRight className="h-3 w-3 mr-1" />
                                                        {subItem.title}
                                                      </h5>
                                                      <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">
                                                          {getItemTypeLabel(subItem.type)}
                                                        </Badge>
                                                        {subItem.url && (
                                                          <span className="text-sm text-muted-foreground">
                                                            URL: {subItem.url}
                                                          </span>
                                                        )}
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                      <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditItem(subItem)}
                                                      >
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                      </Button>
                                                      <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteItem(subItem.id, 2)}
                                                      >
                                                        <Trash className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="edit" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing
                ? "Edit Navigation Item"
                : isAddingChild
                  ? `Add Child Item to "${selectedItem?.title}"`
                  : isAddingSubheading
                    ? `Add Sub-heading to "${selectedItem?.title}"`
                    : isAddingSubItem
                      ? `Add Sub-item to "${selectedItem?.title}"`
                      : "Add New Navigation Item"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update the details of this navigation item"
                : "Create a new navigation item for your header"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationItemForm
              item={isEditing ? selectedItem : null}
              parentId={isAddingChild || isAddingSubheading || isAddingSubItem ? selectedItem?.id : null}
              itemType={isAddingSubheading ? "subheading" : isAddingSubItem ? "subitem" : undefined}
              level={isAddingSubheading ? 1 : isAddingSubItem ? 2 : isEditing ? selectedItem?.level : 0}
              onSubmit={isEditing ? handleUpdateItem : handleCreateItem}
              onCancel={() => {
                setSelectedItem(null)
                setIsEditing(false)
                setIsAddingChild(false)
                setIsAddingSubheading(false)
                setIsAddingSubItem(false)
                setActiveTab("items")
              }}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preview" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Header Preview</CardTitle>
            <CardDescription>Preview how your header will look on the website</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <HeaderPreview />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
