"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample component types - in a real app, these would come from your database
const componentTypes = [
  {
    value: "hero",
    label: "Hero Section",
  },
  {
    value: "features",
    label: "Features Grid",
  },
  {
    value: "testimonials",
    label: "Testimonials",
  },
  {
    value: "pricing",
    label: "Pricing Table",
  },
  {
    value: "contact",
    label: "Contact Form",
  },
  {
    value: "gallery",
    label: "Image Gallery",
  },
  {
    value: "faq",
    label: "FAQ Accordion",
  },
]

interface ComponentSelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onSelect: (value: string) => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export function ComponentSelector({
  onSelect,
  variant = "default",
  className,
  children,
  ...props
}: ComponentSelectorProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} className={className} {...props}>
          {children || (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end" side="bottom">
        <Command>
          <CommandInput placeholder="Search components..." />
          <CommandList>
            <CommandEmpty>No components found.</CommandEmpty>
            <CommandGroup>
              {componentTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  onSelect={() => {
                    onSelect(type.value)
                    setOpen(false)
                  }}
                >
                  {type.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
