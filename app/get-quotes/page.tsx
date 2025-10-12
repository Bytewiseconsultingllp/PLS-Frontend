"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { toast } from "react-toastify"
import { axios } from "@/config/axios"
import { useMessage } from "@/hooks/useMessage"
import { useLoading } from "@/hooks/useLoading"
import { getQuoteSchema, type FormData } from "./schema"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import PersonalInfoStep from "./components/personal-info-step"
import ProjectTypeStep from "./components/project-type-step"
import FeaturesStep from "./components/features-step"
import TechStackStep from "./components/tech-stack-step"
import ContentAssetsStep from "./components/content-assets-step"
import TimelineBudgetStep from "./components/timeline-budget-step"
import AdditionalInfoStep from "./components/additional-info-step"
import ReviewSubmitStep from "./components/review-submit-step"
import QuoteEstimator from "./components/quote-estimator"
import LoadingAnimation from "./components/loading-animation"

const steps = [
  "Personal Info",
  "Project Type",
  "Features",
  "Tech Stack",
  "Content & Assets",
  "Timeline & Budget",
  "Additional Info",
  "Review & Submit",
]

export default function GetQuotePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const { errorMessage } = useMessage()
  const { startLoading, stopLoading, isLoading } = useLoading()

  const methods = useForm<FormData>({
    resolver: zodResolver(getQuoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      services: "",
      company: "",
      detail: "",
      deadline: "",
      businessName: "",
      location: "",
      projectTypes: [],
      features: [],
      otherFeatures: "",
      techStack: [],
      contentStatus: "",
      timeline: "",
      budget: "",
      additionalNotes: "",
      uploadedFiles: [],
      termsAgreed: false,
      marketingConsent: false,
    },
  })

  const { handleSubmit, watch, formState } = methods
  const formValues = watch()

  // Log form errors to console whenever they change
  console.log("Form errors:", formState.errors)

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  // Update the onSubmit function with better error handling and logging
  const onSubmit = async (data: FormData) => {
    console.log("Form submission started", data)
    setLoading(true)

    // Prepare the data for your API
    const formattedDetails = formatAdditionalDetails(data)

    // Ensure detail field is populated with at least 3 characters
    if (!data.detail || data.detail.length < 3) {
      data.detail = formattedDetails.length >= 3 ? formattedDetails : "Project details from quote form"
    }

    const apiData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      services: data.services || formatSelectedServices(data),
      company: data.company || data.businessName,
      detail: data.detail,
      deadline: data.deadline,
      // You can add additional fields as needed
      projectTypes: data.projectTypes,
      features: data.features,
      techStack: data.techStack,
      timeline: data.timeline,
      budget: data.budget,
    }

    console.log("Prepared API data:", apiData)

    try {
      startLoading()
      console.log("Making API request to:", `${process.env.NEXT_PUBLIC_API_URL}getQuotes/createQuote`)

      // Add a fallback for the API URL if it's not defined
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}getQuotes/createQuote`
        : "/api/submit-quote"

      console.log("Using API URL:", apiUrl)

      const res = await axios.post(apiUrl, apiData)
      console.log("Response received:", res.data)

      toast.success("Quote submitted successfully!")

      // Redirect to success page with the user's name
      window.location.href = `/get-quote/success?name=${encodeURIComponent(data.name)}`
    } catch (error: any) {
      console.error("Submission error details:", error)

      // Log more detailed error information
      if (error.response) {
        console.error("Error response data:", error.response.data)
        console.error("Error response status:", error.response.status)
        console.error("Error response headers:", error.response.headers)
      } else if (error.request) {
        console.error("Error request:", error.request)
      } else {
        console.error("Error message:", error.message)
      }

      const errorDetails = error.response?.data?.details || []
      const errorMessage =
        errorDetails.length > 0
          ? errorDetails.map((detail: any) => detail.message).join(", ")
          : "Something went wrong while submitting quote"

      toast.error(errorMessage)
      errorMessage(errorMessage)
    } finally {
      stopLoading()
      setLoading(false)
      console.log("Form submission completed")
    }
  }

  // Add a direct submit handler for debugging
  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("Form submit event triggered")
    // The handleSubmit from react-hook-form will be called by the form's onSubmit
  }

  // Helper function to format selected services for the API
  const formatSelectedServices = (data: FormData): string => {
    const services = []

    if (data.projectTypes && data.projectTypes.length > 0) {
      services.push(`Project Types: ${data.projectTypes.join(", ")}`)
    }

    if (data.features && data.features.length > 0) {
      services.push(`Features: ${data.features.join(", ")}`)
    }

    return services.join("; ")
  }

  // Helper function to format additional details
  const formatAdditionalDetails = (data: FormData): string => {
    const details = []

    if (data.additionalNotes) {
      details.push(`Notes: ${data.additionalNotes}`)
    }

    if (data.timeline) {
      details.push(`Timeline: ${data.timeline}`)
    }

    if (data.budget) {
      details.push(`Budget: ${data.budget}`)
    }

    if (data.contentStatus) {
      details.push(`Content Status: ${data.contentStatus}`)
    }

    return details.join("\n")
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get a Project Quote Instantly</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few simple questions and we'll deliver a cost estimate, no guesswork, no delays.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Not sure what to select? No worries, every choice comes with guidance. You can also{" "}
            <Button variant="link" className="p-0 h-auto text-sm font-medium">
              Book a Free Call
            </Button>{" "}
            if you'd prefer to discuss first.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{steps[currentStep]}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} onSubmitCapture={handleFormSubmit}>
                    {currentStep === 0 && <PersonalInfoStep />}
                    {currentStep === 1 && <ProjectTypeStep />}
                    {currentStep === 2 && <FeaturesStep />}
                    {currentStep === 3 && <TechStackStep />}
                    {currentStep === 4 && <ContentAssetsStep />}
                    {currentStep === 5 && <TimelineBudgetStep />}
                    {currentStep === 6 && <AdditionalInfoStep />}
                    {currentStep === 7 && <ReviewSubmitStep formValues={formValues} />}

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                        Previous
                      </Button>

                      {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={nextStep}>
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={loading || isLoading}
                          className="min-w-[120px]"
                          onClick={() => console.log("Submit button clicked")}
                        >
                          {loading ? <LoadingAnimation /> : "Get My Quote"}
                        </Button>
                      )}
                    </div>
                  </form>
                </FormProvider>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <QuoteEstimator formValues={formValues} />
          </div>
        </div>
      </div>
    </div>
  )
}
