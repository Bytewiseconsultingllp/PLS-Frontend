"use server"

import { consultationSchema, type ConsultationFormData } from "@/validation/consultationschema"

export async function submitConsultation(formData: ConsultationFormData) {
  try {
    // Validate the form data
    const validatedData = consultationSchema.parse(formData)

    // Format the date if it exists
    if (validatedData.date) {
      const formattedDate = new Date(validatedData.date).toLocaleString()
      validatedData.date = formattedDate
    }

    // Here you would typically send the data to your backend API or database
    // For demonstration, we'll simulate a successful API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log the form data (in a real app, you'd send this to your backend)
    console.log("Consultation request:", validatedData)

    // In a real implementation, you might want to send an email notification
    // or store the consultation request in your database

    return {
      success: true,
      message: "Your consultation request has been submitted successfully. Please check your email for confirmation.",
    }
  } catch (error) {
    console.error("Error submitting consultation:", error)

    return {
      success: false,
      message: "Something went wrong while submitting your consultation request. Please try again.",
    }
  }
}
