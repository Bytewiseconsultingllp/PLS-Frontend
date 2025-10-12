"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash, Eye } from "lucide-react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentSelector } from "@/components/component-selector"
import { ComponentEditor } from "@/components/component-editor"
import { PagePreview } from "@/components/page-preview"

import { getPageById } from "@/lib/pages"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(1, {
    message: "Slug is required.",
  }),
  description: z.string().optional(),
  isPublished: z.boolean().default(false),
  sections: z
    .array(
      z.object({
        id: z.string(),
        component: z.string(),
        data: z.record(z.any()),
      }),
    )
    .default([]),
})

type FormValues = z.infer<typeof formSchema>

export function PageForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [pageData, setPageData] = useState<any>(null)
  const [isPageLoading, setIsPageLoading] = useState(!!id)

  // Load page data if editing
  useEffect(() => {
    async function loadPage() {
      if (id) {
        try {
          console.log("PageForm: Loading page with ID:", id)
          const page = await getPageById(id)
          console.log("PageForm: Page data loaded:", page)

          if (page) {
            setPageData(page)
          } else {
            console.error("PageForm: Page not found with ID:", id)
          }
        } catch (error) {
          console.error("PageForm: Error loading page:", error)
        } finally {
          setIsPageLoading(false)
        }
      }
    }

    loadPage()
  }, [id])

  // Initialize form with existing data if editing
  const defaultValues: FormValues = {
    title: "",
    slug: "",
    description: "",
    isPublished: false,
    sections: [],
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Update form when page data changes
  useEffect(() => {
    if (pageData) {
      console.log("PageForm: Updating form with page data:", pageData)
      form.reset({
        title: pageData.title,
        slug: pageData.slug,
        description: pageData.description || "",
        isPublished: pageData.isPublished,
        sections: pageData.sections || [],
      })
    }
  }, [pageData, form])

  function onSubmit(values: FormValues) {
    setIsLoading(true)

    // In a real app, you would save the page to your database
    console.log("PageForm: Submitting form values:", values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/pages")
    }, 1000)
  }

  function handleAddComponent(component: string) {
    const newSection = {
      id: `section-${Date.now()}`,
      component,
      data: {},
    }

    const currentSections = form.getValues("sections") || []
    form.setValue("sections", [...currentSections, newSection])
    setActiveSection(newSection.id)
  }

  function handleDragEnd(result: any) {
    if (!result.destination) return

    const sections = form.getValues("sections")
    const [reorderedItem] = sections.splice(result.source.index, 1)
    sections.splice(result.destination.index, 0, reorderedItem)

    form.setValue("sections", sections)
  }

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading page data...</span>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{id ? "Edit Page" : "Create New Page"}</h2>
          {id && (
            <div className="flex items-center space-x-2">
              <PagePreview pageId={id} pageSections={form.getValues("sections")}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </PagePreview>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Page title" {...field} />
                    </FormControl>
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
                      <Input placeholder="page-slug" {...field} />
                    </FormControl>
                    <FormDescription>The URL path for this page</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the page" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Page Sections</h3>
                <ComponentSelector onSelect={handleAddComponent} />
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {form.watch("sections").map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`border ${activeSection === section.id ? "border-primary" : ""}`}
                            >
                              <CardHeader
                                className="flex flex-row items-center justify-between p-4"
                                {...provided.dragHandleProps}
                              >
                                <CardTitle className="text-sm font-medium">
                                  {section.component.charAt(0).toUpperCase() + section.component.slice(1)}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveSection(section.id === activeSection ? null : section.id)}
                                  >
                                    {section.id === activeSection ? "Close" : "Edit"}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const sections = form.getValues("sections")
                                      sections.splice(index, 1)
                                      form.setValue("sections", [...sections])
                                    }}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              {section.id === activeSection && (
                                <CardContent>
                                  <ComponentEditor
                                    component={section.component}
                                    data={section.data}
                                    onChange={(data) => {
                                      const sections = form.getValues("sections")
                                      sections[index].data = data
                                      form.setValue("sections", sections)
                                    }}
                                  />
                                </CardContent>
                              )}
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {form.watch("sections").length === 0 && (
                        <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">No sections added yet</p>
                          <ComponentSelector onSelect={handleAddComponent} variant="link" className="mt-2 h-auto p-0">
                            <Plus className="mr-2 h-4 w-4" />
                            Add a section
                          </ComponentSelector>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>
          <TabsContent value="seo" className="space-y-4">
            <div className="grid gap-4">
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="Meta title" />
                </FormControl>
                <FormDescription>The title that appears in search engine results</FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Meta description" />
                </FormControl>
                <FormDescription>A brief description of the page for search engines</FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>Open Graph Image</FormLabel>
                <FormControl>
                  <Input type="file" />
                </FormControl>
                <FormDescription>The image that appears when sharing the page on social media</FormDescription>
              </FormItem>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>Make this page visible to visitors</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? "Update Page" : "Create Page"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
