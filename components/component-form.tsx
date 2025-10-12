"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/component-preview"
import { SchemaEditor } from "@/components/schema-editor"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  description: z.string().optional(),
  schema: z.record(z.any()).default({}),
})

type FormValues = z.infer<typeof formSchema>

// This would come from your database in a real app
const existingComponent = {
  id: "1",
  name: "Hero Section",
  type: "hero",
  description: "A hero section with title, subtitle, and call to action",
  schema: {
    title: {
      type: "string",
      label: "Title",
      default: "Welcome to our website",
    },
    subtitle: {
      type: "string",
      label: "Subtitle",
      default: "We provide amazing services",
    },
    buttonText: {
      type: "string",
      label: "Button Text",
      default: "Learn More",
    },
    buttonLink: {
      type: "string",
      label: "Button Link",
      default: "/about",
    },
    image: {
      type: "image",
      label: "Background Image",
      default: "/placeholder.svg?height=400&width=800",
    },
  },
}

export function ComponentForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form with existing data if editing
  const defaultValues: FormValues = id
    ? existingComponent
    : {
        name: "",
        type: "",
        description: "",
        schema: {},
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(values: FormValues) {
    setIsLoading(true)

    // In a real app, you would save the component to your database
    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/components")
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Component name" {...field} />
                    </FormControl>
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
                          <SelectValue placeholder="Select a component type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hero">Hero</SelectItem>
                        <SelectItem value="features">Features</SelectItem>
                        <SelectItem value="testimonials">Testimonials</SelectItem>
                        <SelectItem value="pricing">Pricing</SelectItem>
                        <SelectItem value="contact">Contact</SelectItem>
                        <SelectItem value="gallery">Gallery</SelectItem>
                        <SelectItem value="faq">FAQ</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The type of component</FormDescription>
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
                    <Textarea placeholder="Brief description of the component" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <SchemaEditor schema={form.watch("schema")} onChange={(schema) => form.setValue("schema", schema)} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <ComponentPreview type={form.watch("type")} schema={form.watch("schema")} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? "Update Component" : "Create Component"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
