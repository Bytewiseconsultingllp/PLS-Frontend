import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Zap, Heart, Shield, Award, Compass } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeaturesSectionProps {
  title: string
  features: Feature[]
  columns?: string
}

export function FeaturesSection({ title, features = [], columns = "3" }: FeaturesSectionProps) {
  // Map icon strings to Lucide React components
  const iconMap: Record<string, React.ReactNode> = {
    star: <Star className="h-6 w-6" />,
    zap: <Zap className="h-6 w-6" />,
    heart: <Heart className="h-6 w-6" />,
    shield: <Shield className="h-6 w-6" />,
    award: <Award className="h-6 w-6" />,
    compass: <Compass className="h-6 w-6" />,
  }

  return (
    <div className="py-12 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div
        className={`grid gap-8 ${
          columns === "2"
            ? "grid-cols-1 md:grid-cols-2"
            : columns === "4"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3" // default to 3 columns
        }`}
      >
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                {iconMap[feature.icon] || <Star className="h-6 w-6" />}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
