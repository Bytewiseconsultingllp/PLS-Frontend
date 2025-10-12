"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the formSchema to include the new type
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["link", "dropdown", "button", "subheading", "subitem", "three-level-hierarchy"]),
  url: z.string().optional(),
  isActive: z.boolean().default(true),
  parentId: z.string().nullable().optional(),
  level: z.number().default(0),
})

type FormValues = z.infer<typeof formSchema>

interface NavigationItemFormProps {
  item: any | null
  parentId: string | null
  itemType?: "link" | "dropdown" | "button" | "subheading" | "subitem" | "three-level-hierarchy"
  level?: number
  onSubmit: (id: string, data: any) => Promise<void> | ((data: any) => Promise<void>)
  onCancel: () => void
}

export function NavigationItemForm({
  item,
  parentId,
  itemType,
  level = 0,
  onSubmit,
  onCancel,
}: NavigationItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableParents, setAvailableParents] = useState<any[]>([])
  const [availableSubheadings, setAvailableSubheadings] = useState<any[]>([])

  // Determine available types based on level
  // Update the getAvailableTypes function to include the new option for root level
  const getAvailableTypes = () => {
    if (level === 0) {
      return [
        { value: "link", label: "Link" },
        { value: "dropdown", label: "Dropdown" },
        { value: "button", label: "Button" },
        { value: "three-level-hierarchy", label: "Three-Level Hierarchy" },
      ]
    } else if (level === 1) {
      return [
        { value: "subheading", label: "Sub-heading" },
        { value: "link", label: "Link" },
      ]
    } else {
      return [
        { value: "subitem", label: "Sub-item" },
        { value: "link", label: "Link" },
      ]
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item?.title || "",
      slug: item?.slug || "",
      type: item?.type || itemType || (level === 1 ? "subheading" : level === 2 ? "subitem" : "link"),
      url: item?.url || "",
      isActive: item?.isActive ?? true,
      parentId: parentId || item?.parentId || null,
      level: item?.level ?? level,
    },
  })

  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title || "",
        slug: item.slug || "",
        type: item.type || itemType || (level === 1 ? "subheading" : level === 2 ? "subitem" : "link"),
        url: item.url || "",
        isActive: item.isActive ?? true,
        parentId: parentId || item.parentId || null,
        level: item.level ?? level,
      })
    } else {
      form.reset({
        title: "",
        slug: "",
        type: itemType || (level === 1 ? "subheading" : level === 2 ? "subitem" : "link"),
        url: "",
        isActive: true,
        parentId: parentId || null,
        level: level,
      })
    }
  }, [item, parentId, itemType, level, form])

  useEffect(() => {
    // Fetch available parent items
    async function fetchParentItems() {
      try {
        const response = await fetch("/api/navigation")
        if (!response.ok) {
          throw new Error("Failed to fetch navigation items")
        }
        const data = await response.json()

        // Filter to only include dropdown items for level 0
        const dropdownItems = data.filter((item: any) => item.type === "dropdown" && (!item.level || item.level === 0))
        setAvailableParents(dropdownItems)

        // Filter to only include subheading items for level 1
        const subheadingItems = data.filter((item: any) => item.type === "subheading" && item.level === 1)
        setAvailableSubheadings(subheadingItems)
      } catch (error) {
        console.error("Error fetching parent items:", error)
      }
    }

    fetchParentItems()
  }, [])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Update slug when title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        form.setValue("slug", generateSlug(value.title || ""))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      // Make sure we're handling the three-level-hierarchy type correctly
      if (values.type === "three-level-hierarchy") {
        // Ensure level is set to 0 for root items
        values.level = 0
      }

      if (item) {
        // Make sure we're using the correct ID
        const itemId = item.id || item._id?.toString()
        if (!itemId) {
          throw new Error("Item ID is missing")
        }
        await onSubmit(itemId, values)
      } else {
        await (onSubmit as (data: any) => Promise<void>)(values)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the showUrlField function to exclude the new type
  const showUrlField = () => {
    const type = form.watch("type")
    return type !== "dropdown" && type !== "subheading" && type !== "three-level-hierarchy"
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>The display name of the navigation item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Enter slug" {...field} />
              </FormControl>
              <FormDescription>The URL-friendly version of the title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getAvailableTypes().map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {level === 0
                  ? form.watch("type") === "three-level-hierarchy"
                    ? "Three-Level Hierarchy allows you to create a complex menu with sub-headings and sub-items"
                    : "The type of navigation item - dropdowns can contain sub-headings"
                  : level === 1
                    ? "Sub-headings can contain sub-items with URLs"
                    : "Sub-items must have a URL"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {showUrlField() && (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter URL" {...field} />
                </FormControl>
                <FormDescription>
                  {level === 2
                    ? "The URL this sub-item links to (required)"
                    : "The URL this item links to (not required for dropdown or sub-heading items)"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {level === 0 && !parentId && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Item</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  >
                    <option value="">None (Root Item)</option>
                    {availableParents.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>Select a parent dropdown item (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {level === 2 && !parentId && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Sub-heading</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  >
                    <option value="">Select a sub-heading</option>
                    {availableSubheadings.map((subheading) => (
                      <option key={subheading.id} value={subheading.id}>
                        {subheading.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>Select the parent sub-heading for this sub-item</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>Whether this navigation item is visible on the website</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {item ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
