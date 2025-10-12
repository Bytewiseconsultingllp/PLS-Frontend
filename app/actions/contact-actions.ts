"use server"

import { z } from "zod"

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide a detailed message (minimum 10 characters)"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)

    // Here you would typically send the data to your backend API or database
    // For demonstration, we'll simulate a successful API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log the form data (in a real app, you'd send this to your backend)
    console.log("Contact form submission:", validatedData)

    // Return success response
    return {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
