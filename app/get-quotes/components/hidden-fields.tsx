"use client"

import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"

export default function HiddenFields() {
  const { control, setValue } = useFormContext()

  // Watch the fields that will contribute to the services field
  const projectTypes = useWatch({ control, name: "projectTypes" })
  const features = useWatch({ control, name: "features" })
  const additionalNotes = useWatch({ control, name: "additionalNotes" })
  const timeline = useWatch({ control, name: "timeline" })
  const budget = useWatch({ control, name: "budget" })
  const contentStatus = useWatch({ control, name: "contentStatus" })

  // Update the services field whenever project types or features change
  useEffect(() => {
    const services = []

    if (projectTypes && projectTypes.length > 0) {
      services.push(`Project Types: ${projectTypes.join(", ")}`)
    }

    if (features && features.length > 0) {
      services.push(`Features: ${features.join(", ")}`)
    }

    if (services.length > 0) {
      setValue("services", services.join("; "))
    }
  }, [projectTypes, features, setValue])

  // Update the detail field to ensure it meets the minimum length requirement
  useEffect(() => {
    const details = []

    if (additionalNotes) {
      details.push(`Notes: ${additionalNotes}`)
    }

    if (timeline) {
      details.push(`Timeline: ${timeline}`)
    }

    if (budget) {
      details.push(`Budget: ${budget}`)
    }

    if (contentStatus) {
      details.push(`Content Status: ${contentStatus}`)
    }

    const detailText = details.join("\n")

    // Only set if we have enough content to meet the minimum requirement
    if (detailText.length >= 3) {
      setValue("detail", detailText)
    } else if (projectTypes && projectTypes.length > 0) {
      // Fallback to project types if we don't have enough detail
      setValue("detail", `Project request for: ${projectTypes.join(", ")}`)
    } else {
      // Last resort fallback
      setValue("detail", "Quote request from website")
    }
  }, [additionalNotes, timeline, budget, contentStatus, projectTypes, setValue])

  return null
}
