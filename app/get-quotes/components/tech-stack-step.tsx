"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const techStacks = [
  {
    id: "react",
    label: "React.js",
    description: "A JavaScript library for building user interfaces",
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "React framework for production with server-side rendering",
  },
  {
    id: "nodejs",
    label: "Node.js",
    description: "JavaScript runtime for server-side applications",
  },
  {
    id: "laravel",
    label: "Laravel",
    description: "PHP framework for web application development",
  },
  {
    id: "django",
    label: "Django",
    description: "Python web framework for rapid development",
  },
  {
    id: "wordpress",
    label: "WordPress",
    description: "Popular CMS for websites and blogs",
  },
  {
    id: "shopify",
    label: "Shopify",
    description: "E-commerce platform for online stores",
  },
  {
    id: "guidance",
    label: "I need guidance",
    description: "Our team will recommend the best technology for your project",
  },
]

export default function TechStackStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Preferred Tech Stack</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the technologies you'd prefer for your project. Choose "I need guidance" if you're unsure, and we'll
          recommend the best fit based on your requirements.
        </p>
      </div>

      <FormField
        control={control}
        name="techStack"
        render={() => (
          <FormItem>
            <div className="space-y-4">
              {techStacks.map((tech) => (
                <FormField
                  key={tech.id}
                  control={control}
                  name="techStack"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={tech.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tech.id)}
                            onCheckedChange={(checked) => {
                              // If selecting "guidance", clear other selections
                              if (tech.id === "guidance" && checked) {
                                return field.onChange(["guidance"])
                              }

                              // If selecting another option while "guidance" is selected, remove "guidance"
                              let newValue = [...field.value]
                              if (checked) {
                                if (newValue.includes("guidance")) {
                                  newValue = newValue.filter((v) => v !== "guidance")
                                }
                                newValue.push(tech.id)
                              } else {
                                newValue = newValue.filter((v) => v !== tech.id)
                              }

                              return field.onChange(newValue)
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">{tech.label}</FormLabel>
                          <FormDescription className="text-xs">{tech.description}</FormDescription>
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
