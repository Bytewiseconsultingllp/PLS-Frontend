"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const contentOptions = [
  {
    id: "content-ready",
    label: "I have all the content ready",
    description: "You have text, images, and other assets prepared for the project.",
  },
  {
    id: "need-content-writing",
    label: "I need help with content writing",
    description: "You need professional copywriting services for your website.",
  },
  {
    id: "need-branding",
    label: "I need help with logo/branding",
    description: "You need design services for logo, color scheme, and brand identity.",
  },
  {
    id: "working-on-content",
    label: "I'm still working on content",
    description: "You're in the process of preparing content but it's not ready yet.",
  },
]

export default function ContentAssetsStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Content & Assets</h2>
        <p className="text-sm text-gray-500 mb-6">
          This helps us understand what extra support you'll need for content creation and assets.
        </p>
      </div>

      <FormField
        control={control}
        name="contentStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                {contentOptions.map((option) => (
                  <FormItem
                    key={option.id}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.id} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">{option.label}</FormLabel>
                      <FormDescription className="text-xs">{option.description}</FormDescription>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
