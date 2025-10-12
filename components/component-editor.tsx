"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"

interface ComponentEditorProps {
  component: string
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function ComponentEditor({ component, data, onChange }: ComponentEditorProps) {
  const [activeTab, setActiveTab] = useState("content")

  // This would come from your database in a real app
  const schema = getComponentSchema(component)

  function handleChange(key: string, value: any) {
    onChange({
      ...data,
      [key]: value,
    })
  }

  function handleArrayItemChange(key: string, index: number, value: any) {
    const array = [...(data[key] || [])]
    array[index] = { ...array[index], ...value }

    onChange({
      ...data,
      [key]: array,
    })
  }

  function handleAddArrayItem(key: string) {
    const array = [...(data[key] || [])]
    const template = schema[key]?.items?.template || {}

    array.push({ ...template })

    onChange({
      ...data,
      [key]: array,
    })
  }

  function handleRemoveArrayItem(key: string, index: number) {
    const array = [...(data[key] || [])]
    array.splice(index, 1)

    onChange({
      ...data,
      [key]: array,
    })
  }

  function renderField(key: string, field: any, value: any, path = "") {
    const fieldPath = path ? `${path}.${key}` : key

    switch (field.type) {
      case "string":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Input
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        )
      case "text":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Textarea
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        )
      case "image":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Input
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={field.placeholder}
            />
            <p className="text-xs text-muted-foreground">Enter image URL or path</p>
          </div>
        )
      case "array":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <div className="flex items-center justify-between">
              <Label>{field.label}</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleAddArrayItem(key)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {(value || []).map((item: any, index: number) => (
                <Card key={`${fieldPath}-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">{field.itemLabel || `Item ${index + 1}`}</h4>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveArrayItem(key, index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {field.items &&
                        field.items.fields &&
                        Object.entries(field.items.fields).map(([itemKey, itemField]: [string, any]) => {
                          return renderArrayItemField(
                            key,
                            index,
                            itemKey,
                            itemField,
                            item[itemKey],
                            `${fieldPath}.${index}`,
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(!value || value.length === 0) && (
                <div className="flex h-20 flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">No items added yet</p>
                </div>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  function renderArrayItemField(arrayKey: string, index: number, key: string, field: any, value: any, path = "") {
    const fieldPath = `${path}.${key}`

    switch (field.type) {
      case "string":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Input
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleArrayItemChange(arrayKey, index, { [key]: e.target.value })}
              placeholder={field.placeholder}
            />
          </div>
        )
      case "text":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Textarea
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleArrayItemChange(arrayKey, index, { [key]: e.target.value })}
              placeholder={field.placeholder}
            />
          </div>
        )
      case "image":
        return (
          <div className="grid gap-2" key={fieldPath}>
            <Label htmlFor={fieldPath}>{field.label}</Label>
            <Input
              id={fieldPath}
              value={value || field.default || ""}
              onChange={(e) => handleArrayItemChange(arrayKey, index, { [key]: e.target.value })}
              placeholder={field.placeholder}
            />
            <p className="text-xs text-muted-foreground">Enter image URL or path</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="content" className="space-y-4 pt-4">
        {schema &&
          Object.entries(schema)
            .filter(([_, field]: [string, any]) => field.tab === "content" || !field.tab)
            .map(([key, field]: [string, any]) => renderField(key, field, data[key]))}
      </TabsContent>
      <TabsContent value="style" className="space-y-4 pt-4">
        {schema &&
          Object.entries(schema)
            .filter(([_, field]: [string, any]) => field.tab === "style")
            .map(([key, field]: [string, any]) => renderField(key, field, data[key]))}
      </TabsContent>
      <TabsContent value="settings" className="space-y-4 pt-4">
        {schema &&
          Object.entries(schema)
            .filter(([_, field]: [string, any]) => field.tab === "settings")
            .map(([key, field]: [string, any]) => renderField(key, field, data[key]))}
      </TabsContent>
    </Tabs>
  )
}

// Helper function to get component schema based on component type
function getComponentSchema(component: string) {
  // This would come from your database in a real app
  const schemas: Record<string, Record<string, any>> = {
    hero: {
      title: {
        type: "string",
        label: "Title",
        default: "Welcome to our website",
        tab: "content",
      },
      subtitle: {
        type: "string",
        label: "Subtitle",
        default: "We provide amazing services",
        tab: "content",
      },
      buttonText: {
        type: "string",
        label: "Button Text",
        default: "Learn More",
        tab: "content",
      },
      buttonLink: {
        type: "string",
        label: "Button Link",
        default: "/about",
        tab: "content",
      },
      image: {
        type: "image",
        label: "Background Image",
        default: "/placeholder.svg?height=400&width=800",
        tab: "content",
      },
      backgroundColor: {
        type: "string",
        label: "Background Color",
        default: "#ffffff",
        tab: "style",
      },
      textColor: {
        type: "string",
        label: "Text Color",
        default: "#000000",
        tab: "style",
      },
    },
    features: {
      title: {
        type: "string",
        label: "Section Title",
        default: "Our Features",
        tab: "content",
      },
      features: {
        type: "array",
        label: "Features",
        tab: "content",
        items: {
          template: {
            title: "Feature Title",
            description: "Feature description goes here",
            icon: "star",
          },
          fields: {
            title: {
              type: "string",
              label: "Title",
              default: "Feature Title",
            },
            description: {
              type: "text",
              label: "Description",
              default: "Feature description goes here",
            },
            icon: {
              type: "string",
              label: "Icon",
              default: "star",
            },
          },
        },
      },
      columns: {
        type: "string",
        label: "Columns",
        default: "3",
        tab: "style",
      },
    },
    testimonials: {
      title: {
        type: "string",
        label: "Section Title",
        default: "What Our Customers Say",
        tab: "content",
      },
      testimonials: {
        type: "array",
        label: "Testimonials",
        tab: "content",
        items: {
          template: {
            name: "John Doe",
            role: "CEO, Company",
            content: "This is an amazing product!",
            image: "/placeholder.svg?height=100&width=100",
          },
          fields: {
            name: {
              type: "string",
              label: "Name",
              default: "John Doe",
            },
            role: {
              type: "string",
              label: "Role",
              default: "CEO, Company",
            },
            content: {
              type: "text",
              label: "Testimonial",
              default: "This is an amazing product!",
            },
            image: {
              type: "image",
              label: "Avatar",
              default: "/placeholder.svg?height=100&width=100",
            },
          },
        },
      },
    },
  }

  return schemas[component] || {}
}
