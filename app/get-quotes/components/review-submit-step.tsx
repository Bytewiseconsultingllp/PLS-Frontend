"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import HiddenFields from "./hidden-fields"
import { useEffect } from "react"

interface ReviewSubmitStepProps {
  formValues: any
}

export default function ReviewSubmitStep({ formValues }: ReviewSubmitStepProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext()

  // Log any validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors)
    }
  }, [errors])

  const formatArrayToString = (array: string[] = [], mapping: Record<string, string> = {}) => {
    if (!array.length) return "None selected"

    return array.map((item) => mapping[item] || item).join(", ")
  }

  const projectTypeMapping: Record<string, string> = {
    "business-website": "Business Website",
    ecommerce: "E-Commerce Site",
    "web-application": "Web Application",
    "custom-dashboard": "Custom Dashboard",
    "saas-platform": "SaaS Platform",
    redesign: "Redesign Existing Website",
    "api-integration": "API Integration",
    "seo-marketing": "SEO & Marketing Add-on",
    "hosting-maintenance": "Hosting & Maintenance Only",
  }

  const featureMapping: Record<string, string> = {
    "responsive-design": "Responsive Design",
    cms: "CMS",
    "user-auth": "User Login/Signup",
    ecommerce: "Shopping Cart & Payment",
    "admin-dashboard": "Admin Dashboard",
    blog: "Blog/News Section",
    "live-chat": "Live Chat",
    booking: "Booking/Calendar",
    "social-media": "Social Media Integration",
    "multi-language": "Multi-language Support",
    analytics: "Analytics Integration",
  }

  const techStackMapping: Record<string, string> = {
    react: "React.js",
    nextjs: "Next.js",
    nodejs: "Node.js",
    laravel: "Laravel",
    django: "Django",
    wordpress: "WordPress",
    shopify: "Shopify",
    guidance: "Need Guidance",
  }

  const contentStatusMapping: Record<string, string> = {
    "content-ready": "Content Ready",
    "need-content-writing": "Need Content Writing",
    "need-branding": "Need Logo/Branding",
    "working-on-content": "Working on Content",
  }

  const timelineMapping: Record<string, string> = {
    urgent: "Urgent (1-2 weeks)",
    short: "Short (2-4 weeks)",
    medium: "Medium (1-2 months)",
    "long-term": "Long-term / Phased",
    "not-sure-timeline": "Not sure yet",
  }

  const budgetMapping: Record<string, string> = {
    "budget-small": "Less than $1,000",
    "budget-medium": "$1,000 - $5,000",
    "budget-large": "$5,000 - $10,000",
    "budget-enterprise": "$10,000+",
    "not-sure-budget": "Not sure yet",
  }

  // Trigger validation when component mounts
  useEffect(() => {
    trigger()
  }, [trigger])

  return (
    <div className="space-y-6">
      <HiddenFields />

      <div>
        <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please review your information before submitting. You can go back to any section to make changes.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">{formValues.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Business Name</p>
                <p className="font-medium">{formValues.businessName || formValues.company || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{formValues.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{formValues.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{formValues.address || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{formValues.location || "Not provided"}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Project Details</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Project Type</p>
                <p className="font-medium">{formatArrayToString(formValues.projectTypes, projectTypeMapping)}</p>
              </div>
              <div>
                <p className="text-gray-500">Features</p>
                <p className="font-medium">{formatArrayToString(formValues.features, featureMapping)}</p>
              </div>
              {formValues.otherFeatures && (
                <div>
                  <p className="text-gray-500">Other Features</p>
                  <p className="font-medium">{formValues.otherFeatures}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Tech Stack</p>
                <p className="font-medium">{formatArrayToString(formValues.techStack, techStackMapping)}</p>
              </div>
              <div>
                <p className="text-gray-500">Content Status</p>
                <p className="font-medium">{contentStatusMapping[formValues.contentStatus] || "Not specified"}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Timeline & Budget</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Timeline</p>
                <p className="font-medium">{timelineMapping[formValues.timeline] || "Not specified"}</p>
              </div>
              <div>
                <p className="text-gray-500">Budget</p>
                <p className="font-medium">{budgetMapping[formValues.budget] || "Not specified"}</p>
              </div>
              {formValues.deadline && (
                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium">{formValues.deadline}</p>
                </div>
              )}
            </div>
          </div>

          {(formValues.additionalNotes || formValues.detail) && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Additional Notes</h3>
                <p className="text-sm">{formValues.additionalNotes || formValues.detail}</p>
              </div>
            </>
          )}

          {formValues.uploadedFiles?.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Uploaded Files</h3>
                <ul className="text-sm space-y-1">
                  {formValues.uploadedFiles.map((file: File, index: number) => (
                    <li key={index}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <FormField
          control={control}
          name="termsAgreed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={() => {
                    console.log("Terms checkbox blur event")
                    trigger("termsAgreed")
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to the Terms of Use & Privacy Policy</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="marketingConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I want updates on new tech tips and offers</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
