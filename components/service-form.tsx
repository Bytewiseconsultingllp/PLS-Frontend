"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServicePreview } from "@/components/service-preview"
import { useToast } from "@/hooks/use-toast"

// Define the schema for service form validation
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(1, {
    message: "Slug is required.",
  }),
  subtitle: z.string().min(1, {
    message: "Subtitle is required.",
  }),
  image: z.string().optional(),
  isPublished: z.boolean().default(false),
  description: z.object({
    intro: z.array(z.string()),
    conclusion: z.string(),
  }),
  challenges: z.array(z.string()),
  techImperatives: z.array(z.string()),
  businessNeeds: z.array(z.string()),
  scamProtection: z.array(z.string()),
  serviceCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
    }),
  ),
  advantageCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
    }),
  ),
  standardCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
    }),
  ),
  ctaCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

export function ServiceForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serviceData, setServiceData] = useState<any>(null)
  const [isServiceLoading, setIsServiceLoading] = useState(!!id)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Load service data if editing
  useEffect(() => {
    async function loadService() {
      if (id) {
        try {
          setIsServiceLoading(true)
          console.log("ServiceForm: Loading service with ID:", id)

          const response = await fetch(`/api/services/${id}`)

          if (!response.ok) {
            throw new Error(`Failed to fetch service: ${response.statusText}`)
          }

          const service = await response.json()
          console.log("ServiceForm: Service data loaded:", service)

          if (service) {
            // Ensure the service has all required properties
            setServiceData({
              ...service,
              id: service.id || service._id,
              description: service.description || { intro: [], conclusion: "" },
              challenges: service.challenges || [],
              techImperatives: service.techImperatives || [],
              businessNeeds: service.businessNeeds || [],
              scamProtection: service.scamProtection || [],
              serviceCards: service.serviceCards || [],
              advantageCards: service.advantageCards || [],
              standardCards: service.standardCards || [],
              ctaCards: service.ctaCards || [],
            })
          } else {
            setError("Service not found")
            console.error("ServiceForm: Service not found with ID:", id)
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : "Unknown error")
          console.error("ServiceForm: Error loading service:", error)
          toast({
            title: "Error",
            description: "Failed to load service data",
            variant: "destructive",
          })
        } finally {
          setIsServiceLoading(false)
        }
      }
    }

    loadService()
  }, [id, toast])

  // Initialize form with default values
  const defaultValues: FormValues = {
    title: "",
    slug: "",
    subtitle: "",
    image: "",
    isPublished: false,
    description: {
      intro: [""],
      conclusion: "",
    },
    challenges: [""],
    techImperatives: [""],
    businessNeeds: [""],
    scamProtection: [""],
    serviceCards: [
      {
        title: "",
        description: "",
        iconName: "Code",
      },
    ],
    advantageCards: [
      {
        title: "",
        description: "",
        iconName: "CheckCircle",
      },
    ],
    standardCards: [
      {
        title: "",
        description: "",
        iconName: "Shield",
      },
    ],
    ctaCards: [
      {
        title: "",
        description: "",
      },
    ],
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Update form when service data changes
  useEffect(() => {
    if (serviceData) {
      console.log("ServiceForm: Updating form with service data:", serviceData)
      form.reset({
        title: serviceData.title || "",
        slug: serviceData.slug || "",
        subtitle: serviceData.subtitle || "",
        image: serviceData.image || "",
        isPublished: serviceData.isPublished || false,
        description: {
          intro: serviceData.description?.intro || [""],
          conclusion: serviceData.description?.conclusion || "",
        },
        challenges: serviceData.challenges || [""],
        techImperatives: serviceData.techImperatives || [""],
        businessNeeds: serviceData.businessNeeds || [""],
        scamProtection: serviceData.scamProtection || [""],
        serviceCards: serviceData.serviceCards || [{ title: "", description: "", iconName: "Code" }],
        advantageCards: serviceData.advantageCards || [{ title: "", description: "", iconName: "CheckCircle" }],
        standardCards: serviceData.standardCards || [{ title: "", description: "", iconName: "Shield" }],
        ctaCards: serviceData.ctaCards || [{ title: "", description: "" }],
      })
    }
  }, [serviceData, form])

  async function onSubmit(values: FormValues) {
    setIsLoading(true)

    try {
      // Make sure all arrays have at least empty values to prevent null errors
      const formattedValues = {
        ...values,
        description: {
          intro: values.description.intro || [],
          conclusion: values.description.conclusion || "",
        },
        challenges: values.challenges || [],
        techImperatives: values.techImperatives || [],
        businessNeeds: values.businessNeeds || [],
        scamProtection: values.scamProtection || [],
        serviceCards: values.serviceCards || [],
        advantageCards: values.advantageCards || [],
        standardCards: values.standardCards || [],
        ctaCards: values.ctaCards || [],
      }

      const url = id ? `/api/services/${id}` : "/api/services"
      const method = id ? "PUT" : "POST"

      console.log(`ServiceForm: ${id ? "Updating" : "Creating"} service with URL:`, url)
      console.log("ServiceForm: Request method:", method)
      console.log("ServiceForm: Request data:", formattedValues)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      })

      const responseData = await response.json().catch(() => ({}))

      if (!response.ok) {
        console.error("Error response:", responseData)
        throw new Error(`Failed to ${id ? "update" : "create"} service: ${responseData.error || response.statusText}`)
      }

      toast({
        title: "Success",
        description: `Service ${id ? "updated" : "created"} successfully`,
      })

      router.push("/admin/services")
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} service:`, error)
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} service: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to add an item to an array field
  function addArrayItem(fieldName: string) {
    const currentItems = form.getValues(fieldName as any) || []

    if (fieldName === "description.intro") {
      const intro = [...form.getValues("description.intro"), ""]
      form.setValue("description.intro", intro)
    } else if (fieldName === "challenges") {
      form.setValue("challenges", [...currentItems, ""])
    } else if (fieldName === "techImperatives") {
      form.setValue("techImperatives", [...currentItems, ""])
    } else if (fieldName === "businessNeeds") {
      form.setValue("businessNeeds", [...currentItems, ""])
    } else if (fieldName === "scamProtection") {
      form.setValue("scamProtection", [...currentItems, ""])
    } else if (fieldName === "serviceCards") {
      form.setValue("serviceCards", [...currentItems, { title: "", description: "", iconName: "Code" }])
    } else if (fieldName === "advantageCards") {
      form.setValue("advantageCards", [...currentItems, { title: "", description: "", iconName: "CheckCircle" }])
    } else if (fieldName === "standardCards") {
      form.setValue("standardCards", [...currentItems, { title: "", description: "", iconName: "Shield" }])
    } else if (fieldName === "ctaCards") {
      form.setValue("ctaCards", [...currentItems, { title: "", description: "" }])
    }
  }

  // Helper function to remove an item from an array field
  function removeArrayItem(fieldName: string, index: number) {
    if (fieldName === "description.intro") {
      const intro = [...form.getValues("description.intro")]
      intro.splice(index, 1)
      form.setValue("description.intro", intro)
    } else if (fieldName === "challenges") {
      const items = [...form.getValues("challenges")]
      items.splice(index, 1)
      form.setValue("challenges", items)
    } else if (fieldName === "techImperatives") {
      const items = [...form.getValues("techImperatives")]
      items.splice(index, 1)
      form.setValue("techImperatives", items)
    } else if (fieldName === "businessNeeds") {
      const items = [...form.getValues("businessNeeds")]
      items.splice(index, 1)
      form.setValue("businessNeeds", items)
    } else if (fieldName === "scamProtection") {
      const items = [...form.getValues("scamProtection")]
      items.splice(index, 1)
      form.setValue("scamProtection", items)
    } else if (fieldName === "serviceCards") {
      const items = [...form.getValues("serviceCards")]
      items.splice(index, 1)
      form.setValue("serviceCards", items)
    } else if (fieldName === "advantageCards") {
      const items = [...form.getValues("advantageCards")]
      items.splice(index, 1)
      form.setValue("advantageCards", items)
    } else if (fieldName === "standardCards") {
      const items = [...form.getValues("standardCards")]
      items.splice(index, 1)
      form.setValue("standardCards", items)
    } else if (fieldName === "ctaCards") {
      const items = [...form.getValues("ctaCards")]
      items.splice(index, 1)
      form.setValue("ctaCards", items)
    }
  }

  if (isServiceLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading service data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-destructive text-xl mb-4">Error loading service</div>
        <p className="mb-4">{error}</p>
        <Button onClick={() => router.push("/admin/services")}>Back to Services</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{id ? "Edit Service" : "Create New Service"}</h2>
          {id && (
            <div className="flex items-center space-x-2">
              <ServicePreview serviceId={id} service={form.getValues()}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </ServicePreview>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                      <Input placeholder="Service title" {...field} />
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
                      <Input placeholder="service-slug" {...field} />
                    </FormControl>
                    <FormDescription>The URL path for this service</FormDescription>
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
                    <Input placeholder="Service subtitle" {...field} />
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
                  <FormControl>
                    <Input placeholder="/placeholder.svg?height=400&width=800" {...field} />
                  </FormControl>
                  <FormDescription>The URL for the service image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Introduction Paragraphs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("description.intro").map((paragraph, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`description.intro.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea placeholder="Introduction paragraph" {...field} />
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
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="description.conclusion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conclusion</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Conclusion paragraph" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("challenges").map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`challenges.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Challenge" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("challenges", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("challenges")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Challenge
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Imperatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("techImperatives").map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`techImperatives.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Technology Imperative" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("techImperatives", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("techImperatives")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("businessNeeds").map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`businessNeeds.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Business Need" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("businessNeeds", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("businessNeeds")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scam Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("scamProtection").map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`scamProtection.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Scam Protection Point" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("scamProtection", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("scamProtection")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("serviceCards").map((card, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("serviceCards", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`serviceCards.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Card title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`serviceCards.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Card description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`serviceCards.${index}.iconName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Lucide icon name (e.g., Code, CheckCircle)" {...field} />
                            </FormControl>
                            <FormDescription>Name of a Lucide React icon</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("serviceCards")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service Card
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advantage Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("advantageCards").map((card, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("advantageCards", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`advantageCards.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Card title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`advantageCards.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Card description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`advantageCards.${index}.iconName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Lucide icon name (e.g., Code, CheckCircle)" {...field} />
                            </FormControl>
                            <FormDescription>Name of a Lucide React icon</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("advantageCards")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Advantage Card
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Standard Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("standardCards").map((card, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("standardCards", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`standardCards.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Card title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`standardCards.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Card description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`standardCards.${index}.iconName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Lucide icon name (e.g., Shield, Lock)" {...field} />
                            </FormControl>
                            <FormDescription>Name of a Lucide React icon</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("standardCards")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Standard Card
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("ctaCards").map((card, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("ctaCards", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`ctaCards.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Card title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ctaCards.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Card description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("ctaCards")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add CTA Card
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>Make this service visible to visitors</FormDescription>
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
            {id ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
