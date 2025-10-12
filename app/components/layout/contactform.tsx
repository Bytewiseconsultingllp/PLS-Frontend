"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { submitContactForm, type ContactFormData } from "@/app/actions/contact-actions"

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide a detailed message (minimum 10 characters)"),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await submitContactForm(data)

      if (response.success) {
        setIsSubmitted(true)
        setResponseMessage(response.message)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        setResponseMessage(response.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setResponseMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <p className="text-gray-600 mb-8">
        Have questions about our technology solutions? Fill out the form below and our experts will get back to you
        shortly.
      </p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
          <p className="text-green-700">{responseMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input id="phone" {...register("phone")} placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input id="company" {...register("company")} placeholder="Your Company Ltd." />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <Textarea
              id="message"
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              placeholder="Tell us about your project or inquiry..."
              rows={5}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          {responseMessage && !isSubmitted && <div className="text-red-500 text-sm">{responseMessage}</div>}
          <Button type="submit" className="w-full bg-[#003087] hover:bg-[#004087]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      )}
    </Card>
  )
}
