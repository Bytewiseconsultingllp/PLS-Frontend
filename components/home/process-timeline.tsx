"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Lightbulb,
  FileText,
  MessageCircle,
  DollarSign,
  Package,
  Paintbrush,
  Box,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

// Helper function to get deliverables for each step
const getDeliverables = (stepId: string) => {
  const deliverables: Record<string, string[]> = {
    "initial-idea": [
      "Project vision document",
      "Initial scope definition",
      "Market opportunity assessment",
      "Stakeholder identification",
    ],
    "proposal-submission": [
      "Detailed project proposal",
      "Timeline and milestones",
      "Resource requirements",
      "Technical feasibility analysis",
    ],
    discussion: ["Feedback documentation", "Requirement refinements", "Stakeholder approval", "Project charter"],
    "budget-planning": [
      "Cost breakdown structure",
      "Budget allocation by phase",
      "ROI projections",
      "Risk assessment and contingencies",
    ],
    production: [
      "Development sprints planning",
      "Quality assurance protocols",
      "Progress tracking dashboard",
      "Technical documentation",
    ],
    "ui-establishment": [
      "Wireframes and mockups",
      "UI component library",
      "User flow diagrams",
      "Accessibility compliance",
    ],
    delivery: ["Deployment checklist", "Knowledge transfer sessions", "Client training materials", "Maintenance plan"],
    "product-launch": [
      "Launch strategy",
      "Marketing collateral",
      "Performance monitoring setup",
      "Post-launch support plan",
    ],
  }

  return deliverables[stepId] || []
}

interface WorkflowStep {
  id: string
  title: string
  description: string
  icon: typeof Lightbulb
  color: string
}

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  const workflowSteps: WorkflowStep[] = [
    {
      id: "initial-idea",
      title: "Initial Idea",
      description: "Project concept and vision formation",
      icon: Lightbulb,
      color: "#FF6B35",
    },
    {
      id: "proposal-submission",
      title: "Proposal Submission",
      description: "Detailed project proposal and planning",
      icon: FileText,
      color: "#FF6B35",
    },
    {
      id: "discussion",
      title: "Discussion",
      description: "Team collaboration and refinement",
      icon: MessageCircle,
      color: "#FF6B35",
    },
    {
      id: "budget-planning",
      title: "Budget Planning",
      description: "Resource allocation and cost estimation",
      icon: DollarSign,
      color: "#FF6B35",
    },
    {
      id: "production",
      title: "Production",
      description: "Development and implementation phase",
      icon: Box,
      color: "#FF6B35",
    },
    {
      id: "ui-establishment",
      title: "UI Establishment",
      description: "Interface design and user experience",
      icon: Paintbrush,
      color: "#FF6B35",
    },
    {
      id: "delivery",
      title: "Delivery",
      description: "Project handover and deployment",
      icon: Package,
      color: "#FF6B35",
    },
    {
      id: "product-launch",
      title: "Product Launch",
      description: "Final release and market introduction",
      icon: CheckCircle,
      color: "#FF6B35",
    },
  ]

  const nextStep = () => {
    if (activeStep < workflowSteps.length - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  // Auto advance every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep === workflowSteps.length - 1) {
        setActiveStep(0)
      } else {
        setActiveStep((prev) => prev + 1)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [activeStep, workflowSteps.length])

  return (
    <div className="bg-gray-50 min-h-[50vh] p-4 md:p-8 font-sans dark:bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Our Process</h1>
          <p className="text-gray-600">Interactive project lifecycle visualization</p>
        </div>

        {/* Progress Bar - Desktop View */}
        <div className="relative mb-8 md:mb-16 hidden md:block">
          <div className="h-1 bg-gray-200 w-full absolute top-10 z-0"></div>
          <div className="flex justify-between items-center relative z-10">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer relative ${
                      index === activeStep ? "z-20" : "z-10"
                    }`}
                    onClick={() => {
                      setActiveStep(index)
                    }}
                  >
                    <div
                      className={`w-20 h-20 rounded-full absolute transition-all duration-500 ${
                        index === activeStep
                          ? "scale-100 bg-[#FF6B35]"
                          : index < activeStep
                            ? "scale-100 bg-[#003087]"
                            : "scale-90 bg-gray-200"
                      } ${index === activeStep ? "animate-pulse" : ""}`}
                    />
                    <StepIcon className={`w-8 h-8 z-10 ${index <= activeStep ? "text-white" : "text-gray-500"}`} />
                  </div>

                  {index < workflowSteps.length - 1 && (
                    <div
                      className={`h-px absolute top-10 left-10 z-0 transition-colors duration-500 ${
                        index < activeStep ? "bg-[#003087]" : "bg-gray-200"
                      }`}
                      style={{ width: "100%" }}
                    />
                  )}

                  <p
                    className={`mt-4 font-medium text-sm text-center text-black max-w-xs transition-all duration-300 ${
                      index === activeStep ? "opacity-100 -translate-y-1" : "opacity-50"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Bar - Mobile View */}
        <div className="md:hidden mb-6 overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center w-20 cursor-pointer ${
                    index === activeStep ? "opacity-100" : "opacity-60"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      index === activeStep ? "bg-[#FF6B35]" : index < activeStep ? "bg-[#003087]" : "bg-gray-200"
                    } ${index === activeStep ? "animate-pulse" : ""}`}
                  >
                    <StepIcon className={`w-6 h-6 ${index <= activeStep ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <p className="mt-2 text-xs font-medium text-center">{step.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Step Details */}
        <div
          key={activeStep}
          className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6 md:mb-10 transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto md:mx-0"
              style={{ backgroundColor: workflowSteps[activeStep].color }}
            >
              {React.createElement(workflowSteps[activeStep].icon, { className: "w-6 h-6 md:w-8 md:h-8 text-white" })}
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-center md:text-left">
                {workflowSteps[activeStep].title}
              </h2>
              <p className="text-gray-600 mb-4 text-center md:text-left">{workflowSteps[activeStep].description}</p>

              <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Key Deliverables:</h3>
                <ul className="space-y-2 text-black">
                  {getDeliverables(workflowSteps[activeStep].id).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 transition-all duration-300"
                      style={{
                        opacity: 1,
                        transform: "translateX(0px)",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: workflowSteps[activeStep].color }}
                      ></div>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className={`flex items-center gap-1 md:gap-2 hover:text-[#FF6B35] px-2 py-1 md:px-4 md:py-2 rounded-lg transition text-sm md:text-base ${
              activeStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-gray-500 text-sm md:text-base">
            {activeStep + 1} / {workflowSteps.length}
          </div>

          <button
            onClick={nextStep}
            disabled={activeStep === workflowSteps.length - 1}
            className={`flex items-center gap-1 md:gap-2 hover:text-white px-2 py-1 md:px-4 md:py-2 rounded-lg transition text-sm md:text-base ${
              activeStep === workflowSteps.length - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
