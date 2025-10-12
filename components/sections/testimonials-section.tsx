import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
  image?: string
}

interface TestimonialsSectionProps {
  title: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({ title, testimonials = [] }: TestimonialsSectionProps) {
  return (
    <div className="py-12 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
              <p className="italic mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
