"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash, Eye, RefreshCw, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TechnologyPreview } from "@/components/technology-preview"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the schema for technology form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  image: z.string().optional(),
  parentTechnology: z.string().optional(),
  isPublished: z.boolean().default(false),
  status: z.enum(["draft", "review", "published", "archived"]).default("draft"),
  description: z.object({
    intro: z.array(z.string()),
    conclusion: z.string().optional(),
  }),
  features: z.array(
    z.object({
      title: z.string().min(1, "Feature title is required"),
      description: z.string().min(1, "Feature description is required"),
      details: z.array(z.string()),
    }),
  ),
  benefits: z.array(
    z.object({
      title: z.string().min(1, "Benefit title is required"),
      description: z.string().min(1, "Benefit description is required"),
    }),
  ),
  techStack: z.object({
    title: z.string().default("Technology Stack"),
    stack: z.array(
      z.object({
        category: z.string().min(1, "Category is required"),
        items: z.array(z.string()),
      }),
    ),
  }),
  services: z.array(
    z.object({
      title: z.string().min(1, "Service title is required"),
      description: z.string().min(1, "Service description is required"),
    }),
  ),
  faq: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

export function TechnologyForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [technologyData, setTechnologyData] = useState<any>(null)
  const [isTechnologyLoading, setIsTechnologyLoading] = useState(!!id)
  const [error, setError] = useState<string | null>(null)
  const [imageStatus, setImageStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [imageTimestamp, setImageTimestamp] = useState<number>(Date.now())
  const { toast } = useToast()

  // Load technology data if editing
  const loadTechnology = useCallback(async () => {
    if (id) {
      try {
        setIsTechnologyLoading(true)
        console.log("TechnologyForm: Loading technology with ID:", id)

        const timestamp = Date.now()
        const response = await fetch(`/api/technologies/${id}?t=${timestamp}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch technology: ${response.statusText}`)
        }

        const technology = await response.json()
        console.log("TechnologyForm: Technology data loaded:", technology)

        if (technology) {
          // Ensure the technology has all required properties
          const formattedTechnology = {
            ...technology,
            id: technology.id || technology._id,
            description: technology.description || {
              intro: [technology.description || ""],
              conclusion: "",
            },
            features: technology.features || [],
            benefits: technology.benefits || [],
            techStack: technology.techStack || {
              title: "Technology Stack",
              stack: [],
            },
            services: technology.services || [],
            faq: technology.faq || [],
          }

          setTechnologyData(formattedTechnology)

          // Set image preview if available with timestamp to prevent caching
          if (technology.image) {
            const imageUrl = addTimestampToUrl(technology.image, timestamp)
            setImagePreviewUrl(imageUrl)
            setImageTimestamp(timestamp)
            checkImageUrl(imageUrl)
          }
        } else {
          setError("Technology not found")
          console.error("TechnologyForm: Technology not found with ID:", id)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error")
        console.error("TechnologyForm: Error loading technology:", error)
        toast({
          title: "Error",
          description: "Failed to load technology data",
          variant: "destructive",
        })
      } finally {
        setIsTechnologyLoading(false)
      }
    }
  }, [id, toast])

  useEffect(() => {
    loadTechnology()
  }, [loadTechnology])

  // Add timestamp to URL to prevent caching
  const addTimestampToUrl = (url: string, timestamp: number): string => {
    if (!url) return url

    // Don't add timestamp to external URLs or data URLs
    if (url.startsWith("http") || url.startsWith("data:")) return url

    // Add timestamp as query parameter
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}t=${timestamp}`
  }

  // Initialize form with default values
  const defaultValues: FormValues = {
    title: "",
    slug: "",
    subtitle: "",
    image: "",
    parentTechnology: "",
    isPublished: false,
    status: "draft",
    description: {
      intro: [""],
      conclusion: "",
    },
    features: [
      {
        title: "",
        description: "",
        details: [""],
      },
    ],
    benefits: [
      {
        title: "",
        description: "",
      },
    ],
    techStack: {
      title: "Technology Stack",
      stack: [
        {
          category: "",
          items: [""],
        },
      ],
    },
    services: [
      {
        title: "",
        description: "",
      },
    ],
    faq: [
      {
        question: "",
        answer: "",
      },
    ],
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  // Update form when technology data changes
  useEffect(() => {
    if (technologyData) {
      console.log("TechnologyForm: Updating form with technology data:", technologyData)

      // Handle string description or object description
      let descriptionValue = technologyData.description
      if (typeof descriptionValue === "string") {
        descriptionValue = {
          intro: [descriptionValue],
          conclusion: "",
        }
      } else if (!descriptionValue) {
        descriptionValue = {
          intro: [""],
          conclusion: "",
        }
      }

      // Properly format tech stack data
      let techStackValue = technologyData.techStack
      if (!techStackValue || !techStackValue.stack || !Array.isArray(techStackValue.stack)) {
        techStackValue = {
          title: "Technology Stack",
          stack: [{ category: "", items: [""] }],
        }
      } else if (techStackValue.stack.length === 0) {
        techStackValue.stack = [{ category: "", items: [""] }]
      } else {
        // Ensure each stack category has an items array
        techStackValue.stack = techStackValue.stack.map((category) => ({
          ...category,
          items: Array.isArray(category.items) ? category.items : [""],
        }))
      }

      form.reset({
        title: technologyData.title || "",
        slug: technologyData.slug || "",
        subtitle: technologyData.subtitle || "",
        image: technologyData.image || "",
        parentTechnology: technologyData.parentTechnology || "",
        isPublished: technologyData.isPublished || false,
        status: technologyData.status || "draft",
        description: descriptionValue,
        features: technologyData.features?.length
          ? technologyData.features
          : [{ title: "", description: "", details: [""] }],
        benefits: technologyData.benefits?.length ? technologyData.benefits : [{ title: "", description: "" }],
        techStack: techStackValue,
        services: technologyData.services?.length ? technologyData.services : [{ title: "", description: "" }],
        faq: technologyData.faq?.length ? technologyData.faq : [{ question: "", answer: "" }],
      })
    }
  }, [technologyData, form])

  // Check image URL validity
  const checkImageUrl = useCallback((url: string) => {
    if (!url) {
      setImageStatus(null)
      setImagePreviewUrl(null)
      return
    }

    setImageStatus("loading")
    setImagePreviewUrl(url)

    const img = new Image()
    img.onload = () => {
      setImageStatus("success")
    }
    img.onerror = () => {
      setImageStatus("error")
    }
    img.src = url
  }, [])

  // Watch for image field changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "image" || name?.startsWith("image")) {
        const timestamp = Date.now()
        setImageTimestamp(timestamp)
        const imageUrl = value.image ? addTimestampToUrl(value.image, timestamp) : null
        checkImageUrl(imageUrl || "")
      }
    })
    return () => subscription.unsubscribe()
  }, [form, checkImageUrl])

  async function onSubmit(values: FormValues) {
    try {
      setIsSaving(true)
      console.log("Form submitted with values:", values)

      // Make sure all arrays have at least empty values to prevent null errors
      const formattedValues = {
        ...values,
        title: values.title.trim(),
        slug: values.slug.trim(),
        subtitle: values.subtitle.trim(),
        image: values.image || "", // Ensure image is included even if empty
        parentTechnology: values.parentTechnology || "",
        isPublished: values.isPublished,
        status: values.status,
        features: values.features || [],
        benefits: values.benefits || [],
        techStack: values.techStack || {
          title: "Technology Stack",
          stack: [],
        },
        services: values.services || [],
        faq: values.faq || [],
      }

      // Update status based on isPublished if they don't match
      if (formattedValues.isPublished && formattedValues.status !== "published") {
        formattedValues.status = "published"
      }

      const url = id ? `/api/technologies/${id}` : "/api/technologies"
      const method = id ? "PUT" : "POST"

      console.log(`TechnologyForm: ${id ? "Updating" : "Creating"} technology with URL:`, url)
      console.log("TechnologyForm: Request method:", method)
      console.log("TechnologyForm: Request data:", formattedValues)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(formattedValues),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Error response:", errorData)
        throw new Error(`Failed to ${id ? "update" : "create"} technology: ${errorData.error || response.statusText}`)
      }

      const responseData = await response.json()
      console.log("Success response:", responseData)

      toast({
        title: "Success",
        description: `Technology ${id ? "updated" : "created"} successfully`,
      })

      if (id) {
        // Update the image timestamp to force refresh
        setImageTimestamp(Date.now())

        // Reload the technology data to reflect changes
        await loadTechnology()

        // Force a router refresh to update any cached data
        router.refresh()
      } else {
        router.push("/admin/technologies")
        router.refresh()
      }
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} technology:`, error)
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} technology: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Helper function to add an item to an array field
  function addArrayItem(fieldName: string, parentIndex?: number) {
    if (fieldName === "features") {
      const items = [...form.getValues("features"), { title: "", description: "", details: [""] }]
      form.setValue("features", items)
    } else if (fieldName === "features.details" && parentIndex !== undefined) {
      const features = [...form.getValues("features")]
      features[parentIndex].details = [...(features[parentIndex].details || []), ""]
      form.setValue("features", features)
    } else if (fieldName === "benefits") {
      const items = [...form.getValues("benefits"), { title: "", description: "" }]
      form.setValue("benefits", items)
    } else if (fieldName === "techStack.stack") {
      const techStack = { ...form.getValues("techStack") }
      techStack.stack = [...techStack.stack, { category: "", items: [""] }]
      form.setValue("techStack", techStack)
    } else if (fieldName === "techStack.stack.items" && parentIndex !== undefined) {
      const techStack = { ...form.getValues("techStack") }
      techStack.stack[parentIndex].items = [...techStack.stack[parentIndex].items, ""]
      form.setValue("techStack", techStack)
    } else if (fieldName === "services") {
      const items = [...form.getValues("services"), { title: "", description: "" }]
      form.setValue("services", items)
    } else if (fieldName === "faq") {
      const items = [...form.getValues("faq"), { question: "", answer: "" }]
      form.setValue("faq", items)
    } else if (fieldName === "description.intro") {
      const description = { ...form.getValues("description") }
      description.intro = [...description.intro, ""]
      form.setValue("description", description)
    }
  }

  // Helper function to remove an item from an array field
  function removeArrayItem(fieldName: string, index: number, parentIndex?: number) {
    if (fieldName === "features") {
      const items = [...form.getValues("features")]
      items.splice(index, 1)
      form.setValue("features", items.length ? items : [{ title: "", description: "", details: [""] }])
    } else if (fieldName === "features.details" && parentIndex !== undefined) {
      const features = [...form.getValues("features")]
      features[parentIndex].details?.splice(index, 1)
      form.setValue("features", features)
    } else if (fieldName === "benefits") {
      const items = [...form.getValues("benefits")]
      items.splice(index, 1)
      form.setValue("benefits", items.length ? items : [{ title: "", description: "" }])
    } else if (fieldName === "techStack.stack") {
      const techStack = { ...form.getValues("techStack") }
      techStack.stack.splice(index, 1)
      form.setValue("techStack", {
        ...techStack,
        stack: techStack.stack.length ? techStack.stack : [{ category: "", items: [""] }],
      })
    } else if (fieldName === "techStack.stack.items" && parentIndex !== undefined) {
      const techStack = { ...form.getValues("techStack") }
      techStack.stack[parentIndex].items.splice(index, 1)
      if (techStack.stack[parentIndex].items.length === 0) {
        techStack.stack[parentIndex].items = [""]
      }
      form.setValue("techStack", techStack)
    } else if (fieldName === "services") {
      const items = [...form.getValues("services")]
      items.splice(index, 1)
      form.setValue("services", items.length ? items : [{ title: "", description: "" }])
    } else if (fieldName === "faq") {
      const items = [...form.getValues("faq")]
      items.splice(index, 1)
      form.setValue("faq", items.length ? items : [{ question: "", answer: "" }])
    } else if (fieldName === "description.intro") {
      const description = { ...form.getValues("description") }
      description.intro.splice(index, 1)
      if (description.intro.length === 0) {
        description.intro = [""]
      }
      form.setValue("description", description)
    }
  }

  // Helper function to generate a slug from the title
  function generateSlug() {
    const title = form.getValues("title")
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen

      form.setValue("slug", slug)
    }
  }

  // Handle direct form submission (backup method)
  const handleManualSubmit = () => {
    form.handleSubmit(onSubmit)()
  }

  if (isTechnologyLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading technology data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-destructive text-xl mb-4">Error loading technology</div>
        <p className="mb-4">{error}</p>
        <Button onClick={() => router.push("/admin/technologies")}>Back to Technologies</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{id ? "Edit Technology" : "Create New Technology"}</h2>
          {id && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={loadTechnology} disabled={isTechnologyLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isTechnologyLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <TechnologyPreview technologyId={id} technology={form.getValues()} timestamp={imageTimestamp}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </TechnologyPreview>
              <Button type="button" onClick={handleManualSubmit} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-7">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Technology title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          // If this is a new technology and slug is empty, generate a slug
                          if (!id && !form.getValues("slug")) {
                            setTimeout(generateSlug, 500)
                          }
                        }}
                      />
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
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="technology-slug" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" size="sm" className="mt-0" onClick={generateSlug}>
                        Generate
                      </Button>
                    </div>
                    <FormDescription>The URL path for this technology</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Technology subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <FormControl className="flex-1">
                        <Input
                          placeholder="/placeholder.svg?height=400&width=800"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            const timestamp = Date.now()
                            setImageTimestamp(timestamp)
                            const imageUrl = e.target.value ? addTimestampToUrl(e.target.value, timestamp) : null
                            checkImageUrl(imageUrl || "")
                          }}
                        />
                      </FormControl>
                      {imageStatus === "loading" && (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      )}
                      {imageStatus === "success" && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                      {imageStatus === "error" && (
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                      )}
                    </div>

                    {imageStatus === "error" && field.value && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          The image URL could not be loaded. Please check the URL and try again.
                        </AlertDescription>
                      </Alert>
                    )}

                    {imagePreviewUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                        <div className="border rounded-md overflow-hidden w-full max-w-md h-48 bg-muted relative">
                          <img
                            src={imagePreviewUrl || "/placeholder.svg"}
                            alt="Technology preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=400&width=800"
                              e.currentTarget.classList.add("border-dashed")
                              setImageStatus("error")
                            }}
                            onLoad={() => setImageStatus("success")}
                          />
                        </div>
                      </div>
                    )}
                    <FormDescription>The URL for the technology image</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentTechnology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Technology (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Parent technology name" {...field} />
                  </FormControl>
                  <FormDescription>If this is a sub-technology, enter the parent technology name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published Status</FormLabel>
                    <FormDescription>Toggle to publish this technology to the website</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        // Update status to match publication state
                        if (checked && form.getValues("status") !== "published") {
                          form.setValue("status", "published")
                        } else if (!checked && form.getValues("status") === "published") {
                          form.setValue("status", "draft")
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      // Update isPublished to match status
                      if (value === "published" && !form.getValues("isPublished")) {
                        form.setValue("isPublished", true)
                      } else if (value !== "published" && form.getValues("isPublished")) {
                        form.setValue("isPublished", false)
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Set the current status of this technology</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Introduction Paragraphs</FormLabel>
                  {form.watch("description.intro").map((paragraph, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`description.intro.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Textarea placeholder="Description paragraph" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem("description.intro", index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("description.intro")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Paragraph
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="description.conclusion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conclusion (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Conclusion paragraph" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("features").map((feature, featureIndex) => (
                  <Card key={featureIndex} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Feature {featureIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("features", featureIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`features.${featureIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Feature title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`features.${featureIndex}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Feature description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <FormLabel>Feature Details</FormLabel>
                        {feature.details?.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <FormField
                              control={form.control}
                              name={`features.${featureIndex}.details.${detailIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="Feature detail" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArrayItem("features.details", detailIndex, featureIndex)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("features.details", featureIndex)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Detail
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("features")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("benefits").map((benefit, benefitIndex) => (
                  <Card key={benefitIndex} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Benefit {benefitIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("benefits", benefitIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`benefits.${benefitIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Benefit title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`benefits.${benefitIndex}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Benefit description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("benefits")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Benefit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="techstack" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="techStack.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Technology Stack" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("techStack.stack").map((stack, stackIndex) => (
                  <Card key={stackIndex} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Stack Category {stackIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("techStack.stack", stackIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`techStack.stack.${stackIndex}.category`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <FormLabel>Technology Items</FormLabel>
                        {stack.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <FormField
                              control={form.control}
                              name={`techStack.stack.${stackIndex}.items.${itemIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="Technology name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArrayItem("techStack.stack.items", itemIndex, stackIndex)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("techStack.stack.items", stackIndex)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Technology
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("techStack.stack")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stack Category
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("services").map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Service {serviceIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("services", serviceIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`services.${serviceIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Service title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`services.${serviceIndex}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Service description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("services")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("faq").map((faqItem, faqIndex) => (
                  <Card key={faqIndex} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">FAQ {faqIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("faq", faqIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`faq.${faqIndex}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Input placeholder="FAQ question" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`faq.${faqIndex}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea placeholder="FAQ answer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("faq")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="button" onClick={handleManualSubmit} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? "Update Technology" : "Create Technology"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
