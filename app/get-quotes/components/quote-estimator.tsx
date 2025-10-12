"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

interface QuoteEstimatorProps {
  formValues: any
}

export default function QuoteEstimator({ formValues }: QuoteEstimatorProps) {
  const [estimate, setEstimate] = useState({
    min: 0,
    max: 0,
    timeframe: "",
  })

  useEffect(() => {
    // Base prices for different project types
    const projectTypePrices: Record<string, { min: number; max: number }> = {
      "business-website": { min: 1000, max: 3000 },
      ecommerce: { min: 3000, max: 8000 },
      "web-application": { min: 5000, max: 15000 },
      "custom-dashboard": { min: 4000, max: 12000 },
      "saas-platform": { min: 8000, max: 20000 },
      redesign: { min: 2000, max: 6000 },
      "api-integration": { min: 1500, max: 5000 },
      "seo-marketing": { min: 800, max: 3000 },
      "hosting-maintenance": { min: 500, max: 2000 },
    }

    // Feature prices
    const featurePrices: Record<string, { min: number; max: number }> = {
      "responsive-design": { min: 500, max: 1000 },
      cms: { min: 800, max: 2000 },
      "user-auth": { min: 1000, max: 2500 },
      ecommerce: { min: 1500, max: 4000 },
      "admin-dashboard": { min: 1200, max: 3500 },
      blog: { min: 600, max: 1500 },
      "live-chat": { min: 500, max: 1200 },
      booking: { min: 800, max: 2000 },
      "social-media": { min: 400, max: 1000 },
      "multi-language": { min: 1000, max: 2500 },
      analytics: { min: 300, max: 800 },
    }

    // Timeline multipliers
    const timelineMultipliers: Record<string, number> = {
      urgent: 1.5,
      short: 1.2,
      medium: 1,
      "long-term": 0.9,
      "not-sure-timeline": 1,
    }

    // Calculate base price from project types
    let baseMin = 0
    let baseMax = 0

    if (formValues.projectTypes && formValues.projectTypes.length > 0) {
      formValues.projectTypes.forEach((type: string) => {
        if (projectTypePrices[type]) {
          baseMin += projectTypePrices[type].min
          baseMax += projectTypePrices[type].max
        }
      })
    } else {
      // Default base price if no project type selected
      baseMin = 1000
      baseMax = 5000
    }

    // Add feature prices
    let featureMin = 0
    let featureMax = 0

    if (formValues.features && formValues.features.length > 0) {
      formValues.features.forEach((feature: string) => {
        if (featurePrices[feature]) {
          featureMin += featurePrices[feature].min
          featureMax += featurePrices[feature].max
        }
      })
    }

    // Apply timeline multiplier
    const timelineMultiplier = formValues.timeline ? timelineMultipliers[formValues.timeline] || 1 : 1

    // Calculate total estimate
    let totalMin = (baseMin + featureMin) * timelineMultiplier
    let totalMax = (baseMax + featureMax) * timelineMultiplier

    // Round to nearest hundred
    totalMin = Math.ceil(totalMin / 100) * 100
    totalMax = Math.ceil(totalMax / 100) * 100

    // Determine timeframe based on project complexity and timeline
    let timeframe = "4-8 weeks"

    if (formValues.timeline === "urgent") {
      timeframe = "1-2 weeks"
    } else if (formValues.timeline === "short") {
      timeframe = "2-4 weeks"
    } else if (formValues.timeline === "medium") {
      timeframe = "4-8 weeks"
    } else if (formValues.timeline === "long-term") {
      timeframe = "8+ weeks"
    }

    // If it's a complex project, adjust timeframe
    const isComplex =
      totalMax > 10000 ||
      (formValues.features && formValues.features.length > 5) ||
      (formValues.projectTypes && formValues.projectTypes.includes("saas-platform"))

    if (isComplex && formValues.timeline !== "urgent") {
      if (timeframe === "2-4 weeks") timeframe = "4-6 weeks"
      else if (timeframe === "4-8 weeks") timeframe = "8-12 weeks"
    }

    setEstimate({
      min: totalMin,
      max: totalMax,
      timeframe,
    })
  }, [formValues])

  return (
    <Card className="sticky top-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center text-lg">
          <Calculator className="mr-2 h-5 w-5" />
          Quote Estimator Example
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Estimated Price Range</p>
            <p className="text-3xl font-bold">
              ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">This is an automated estimate based on your selections</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Estimated Timeframe</p>
            <p className="text-xl font-semibold">{estimate.timeframe}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              This is just an estimate. Your final quote will be prepared by our team after reviewing your specific
              requirements.
            </p>
          </div>

          {(!formValues.projectTypes || formValues.projectTypes.length === 0) && (
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-700">Complete more form fields to get a more accurate estimate.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
