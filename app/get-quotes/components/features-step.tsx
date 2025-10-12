"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

const features = [
  {
    id: "responsive-design",
    label: "Responsive Design",
    tooltip: "Your website will look great and function well on all devices - desktops, tablets, and mobile phones.",
  },
  {
    id: "cms",
    label: "CMS (WordPress, Headless, etc.)",
    tooltip: "Content Management System allows you to easily update your website content without technical knowledge.",
  },
  {
    id: "user-auth",
    label: "User Login / Signup",
    tooltip: "Allow users to create accounts, log in, and access personalized features on your site.",
  },
  {
    id: "ecommerce",
    label: "Shopping Cart & Payment Gateway",
    tooltip: "Sell products or services online with secure payment processing and shopping cart functionality.",
  },
  {
    id: "admin-dashboard",
    label: "Admin Dashboard",
    tooltip: "A secure area where you can manage your website, view analytics, and control user accounts.",
  },
  {
    id: "blog",
    label: "Blog or News Section",
    tooltip: "Regularly publish content to engage your audience and improve SEO.",
  },
  {
    id: "live-chat",
    label: "Live Chat / Support Widget",
    tooltip: "Provide real-time customer support through chat functionality on your website.",
  },
  {
    id: "booking",
    label: "Booking or Calendar Integration",
    tooltip: "Allow users to schedule appointments, book services, or view availability.",
  },
  {
    id: "social-media",
    label: "Social Media Integration",
    tooltip: "Connect your website with social platforms for sharing and displaying social content.",
  },
  {
    id: "multi-language",
    label: "Multi-language Support",
    tooltip: "Make your website accessible to users who speak different languages.",
  },
  {
    id: "analytics",
    label: "Analytics Integration",
    tooltip: "Track visitor behavior, page views, and conversion metrics to optimize your site.",
  },
]

export default function FeaturesStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Features You Want</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the features you need for your project. Hover over each option for more information. Tip: Select only
          the features you really need — we can add more later.
        </p>
      </div>

      <TooltipProvider>
        <FormField
          control={control}
          name="features"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, feature.id])
                                  : field.onChange(field.value?.filter((value) => value !== feature.id))
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <div className="flex items-center">
                              <FormLabel className="text-sm font-medium mr-2">{feature.label}</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
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
      </TooltipProvider>

      <FormField
        control={control}
        name="otherFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Features</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any other features you need that aren't listed above..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
