"use client"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SchemaEditorProps {
  schema: Record<string, any>
  onChange: (schema: Record<string, any>) => void
}

export function SchemaEditor({ schema, onChange }: SchemaEditorProps) {
  const [newFieldKey, setNewFieldKey] = useState("")
  const [newFieldType, setNewFieldType] = useState("string")
  const [newFieldTab, setNewFieldTab] = useState("content")

  function handleAddField() {
    if (!newFieldKey) return

    const fieldTemplate = getFieldTemplate(newFieldType)

    onChange({
      ...schema,
      [newFieldKey]: {
        ...fieldTemplate,
        tab: newFieldTab,
      },
    })

    setNewFieldKey("")
  }

  function handleRemoveField(key: string) {
    const newSchema = { ...schema }
    delete newSchema[key]
    onChange(newSchema)
  }

  function handleUpdateField(key: string, field: any) {
    onChange({
      ...schema,
      [key]: field,
    })
  }

  function getFieldTemplate(type: string) {
    switch (type) {
      case "string":
        return {
          type: "string",
          label: "Text Field",
          default: "",
        }
      case "text":
        return {
          type: "text",
          label: "Text Area",
          default: "",
        }
      case "image":
        return {
          type: "image",
          label: "Image",
          default: "",
        }
      case "array":
        return {
          type: "array",
          label: "Array",
          items: {
            template: {},
            fields: {},
          },
        }
      default:
        return {
          type: "string",
          label: "Field",
          default: "",
        }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-4">
        <div className="grid gap-2 flex-1">
          <Label htmlFor="new-field-key">Field Key</Label>
          <Input
            id="new-field-key"
            value={newFieldKey}
            onChange={(e) => setNewFieldKey(e.target.value)}
            placeholder="e.g., title, description, image"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new-field-type">Type</Label>
          <Select value={newFieldType} onValueChange={setNewFieldType}>
            <SelectTrigger id="new-field-type" className="w-[140px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">Text Field</SelectItem>
              <SelectItem value="text">Text Area</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="array">Array</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new-field-tab">Tab</Label>
          <Select value={newFieldTab} onValueChange={setNewFieldTab}>
            <SelectTrigger id="new-field-tab" className="w-[140px]">
              <SelectValue placeholder="Select tab" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="style">Style</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddField}>
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4 pt-4">
          {renderFieldsByTab("content")}
        </TabsContent>
        <TabsContent value="style" className="space-y-4 pt-4">
          {renderFieldsByTab("style")}
        </TabsContent>
        <TabsContent value="settings" className="space-y-4 pt-4">
          {renderFieldsByTab("settings")}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderFieldsByTab(tab: string) {
    const fields = Object.entries(schema).filter(([_, field]) => field.tab === tab)

    if (fields.length === 0) {
      return (
        <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No fields in this tab</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {fields.map(([key, field]: [string, any]) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">
                {field.label} <span className="text-muted-foreground">({key})</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleRemoveField(key)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`${key}-label`}>Label</Label>
                  <Input
                    id={`${key}-label`}
                    value={field.label}
                    onChange={(e) => handleUpdateField(key, { ...field, label: e.target.value })}
                  />
                </div>

                {field.type !== "array" && (
                  <div className="grid gap-2">
                    <Label htmlFor={`${key}-default`}>Default Value</Label>
                    <Input
                      id={`${key}-default`}
                      value={field.default || ""}
                      onChange={(e) => handleUpdateField(key, { ...field, default: e.target.value })}
                    />
                  </div>
                )}

                {field.type === "array" && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="items">
                      <AccordionTrigger>Array Items</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <div className="grid gap-2">
                            <Label>Item Template</Label>
                            <div className="rounded-md border p-4">
                              <pre className="text-xs overflow-auto">
                                {JSON.stringify(field.items?.template || {}, null, 2)}
                              </pre>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Item Fields</Label>
                            <div className="rounded-md border p-4">
                              <pre className="text-xs overflow-auto">
                                {JSON.stringify(field.items?.fields || {}, null, 2)}
                              </pre>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            Array item configuration is currently limited in the UI. For complex arrays, edit the schema
                            directly.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}
