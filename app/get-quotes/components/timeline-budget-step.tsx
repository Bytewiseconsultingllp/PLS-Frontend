"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const timelineOptions = [
  {
    id: "urgent",
    label: "Urgent (1–2 weeks)",
    description: "You need the project completed as soon as possible.",
  },
  {
    id: "short",
    label: "Short (2–4 weeks)",
    description: "You have a tight but reasonable timeline.",
  },
  {
    id: "medium",
    label: "Medium (1–2 months)",
    description: "You have a standard timeline with some flexibility.",
  },
  {
    id: "long-term",
    label: "Long-term / Phased",
    description: "Your project can be delivered in stages over a longer period.",
  },
  {
    id: "not-sure-timeline",
    label: "Not sure yet",
    description: "You're flexible on the timeline and open to recommendations.",
  },
]

const budgetOptions = [
  {
    id: "budget-small",
    label: "<$1,000 – MVP, one-pager, basic features",
    description: "Suitable for simple websites or minimal viable products.",
  },
  {
    id: "budget-medium",
    label: "$1,000 – $5,000 – Business website / small web app",
    description: "Ideal for standard business websites or simple applications.",
  },
  {
    id: "budget-large",
    label: "$5,000 – $10,000 – Feature-rich custom builds",
    description: "For complex websites with custom functionality and features.",
  },
  {
    id: "budget-enterprise",
    label: "$10,000+ – Scalable platforms, SaaS, complex dashboards",
    description: "Enterprise-level solutions with advanced functionality.",
  },
  {
    id: "not-sure-budget",
    label: "I'm not sure yet",
    description: "You'd like guidance on appropriate budget based on your requirements.",
  },
]

export default function TimelineBudgetStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Timeline & Budget</h2>
        <p className="text-sm text-gray-500 mb-6">
          Help us understand your timeline expectations and budget range to provide the most appropriate solution.
        </p>
      </div>

      <div className="space-y-8">
        <FormField
          control={control}
          name="timeline"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Timeline Expectation</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                  {timelineOptions.map((option) => (
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

        <FormField
          control={control}
          name="budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Budget Range</FormLabel>
              <FormDescription>We use this to suggest the right solution within your budget.</FormDescription>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                  {budgetOptions.map((option) => (
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
    </div>
  )
}
