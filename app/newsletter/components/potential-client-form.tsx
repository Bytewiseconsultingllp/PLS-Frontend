"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  workEmail: z.string().email({ message: "Please enter a valid email address" }),
  companyName: z.string().optional(),
  areaOfInterest: z.string().min(1, { message: "Please select an area of interest" }),
})

type FormValues = z.infer<typeof formSchema>

export default function PotentialClientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      companyName: "",
      areaOfInterest: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[400px]">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-center mb-2">Thank You for Subscribing!</h3>
          <p className="text-gray-600 text-center max-w-md">
            You've successfully subscribed to our Potential Client newsletter. Watch your inbox for valuable insights
            and updates.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
            Subscribe to Another Newsletter
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Get Strategic Briefings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Work Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company / Startup Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company / Startup Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an area of interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="saas-platforms">SaaS Platforms</SelectItem>
                      <SelectItem value="custom-cms">Custom CMS</SelectItem>
                      <SelectItem value="ai-ml-integration">AI/ML Integration</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe to Evaluation Insights"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
