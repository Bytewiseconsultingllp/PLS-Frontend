"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { FaqSection } from "@/components/sections/faq-section"
import { PricingSection } from "@/components/sections/pricing-section"

interface DynamicComponentProps {
  component: string
  data: Record<string, any>
}

export function DynamicComponent({ component, data }: DynamicComponentProps) {
  // Render the appropriate component based on the component type
  switch (component) {
    case "hero":
      return <HeroSection {...data} />
    case "features":
      return <FeaturesSection {...data} />
    case "testimonials":
      return <TestimonialsSection {...data} />
    case "contact":
      return <ContactSection {...data} />
    case "gallery":
      return <GallerySection {...data} />
    case "faq":
      return <FaqSection {...data} />
    case "pricing":
      return <PricingSection {...data} />
    default:
      return (
        <div className="p-8 text-center border rounded-md">
          <p className="text-muted-foreground">Component type "{component}" not found</p>
        </div>
      )
  }
}
