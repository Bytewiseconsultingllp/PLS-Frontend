"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const projectTypes = [
  {
    id: "business-website",
    label: "Business Website",
    description: "Professional website for your business with information about your services.",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Site",
    description: "Online store with product listings, cart, and payment processing.",
  },
  {
    id: "web-application",
    label: "Web Application",
    description: "Interactive web-based software with user accounts and dynamic features.",
  },
  {
    id: "custom-dashboard",
    label: "Custom Dashboard (Admin/CRM/ERP)",
    description: "Specialized interface for managing business operations and data.",
  },
  {
    id: "saas-platform",
    label: "SaaS Platform",
    description: "Subscription-based software service with recurring revenue model.",
  },
  {
    id: "redesign",
    label: "Redesign Existing Website",
    description: "Update and improve your current website's design and functionality.",
  },
  {
    id: "api-integration",
    label: "API Integration",
    description: "Connect your website or application with third-party services.",
  },
  {
    id: "seo-marketing",
    label: "SEO & Marketing Add-on",
    description: "Optimize your site for search engines and implement marketing tools.",
  },
  {
    id: "hosting-maintenance",
    label: "Hosting & Maintenance Only",
    description: "Ongoing support and hosting for your existing website.",
  },
]

export default function ProjectTypeStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Project Type</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose what best fits your project. We'll tailor the quote accordingly. You can select multiple options if
          your project spans different categories.
        </p>
      </div>

      <FormField
        control={control}
        name="projectTypes"
        render={() => (
          <FormItem>
            <div className="space-y-4">
              {projectTypes.map((type) => (
                <FormField
                  key={type.id}
                  control={control}
                  name="projectTypes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={type.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type.id])
                                : field.onChange(field.value?.filter((value) => value !== type.id))
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">{type.label}</FormLabel>
                          <FormDescription className="text-xs">{type.description}</FormDescription>
                        </div>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
