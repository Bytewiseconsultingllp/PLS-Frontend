import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
}

interface PricingSectionProps {
  title: string
  subtitle?: string
  plans: PricingPlan[]
}

export function PricingSection({ title, subtitle, plans = [] }: PricingSectionProps) {
  return (
    <div className="py-12 px-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={plan.highlighted ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`mr-2 h-4 w-4 ${feature.included ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={feature.included ? "" : "text-muted-foreground line-through"}>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} asChild>
                <a href={plan.buttonLink}>{plan.buttonText}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* If no plans are provided, show placeholders */}
        {plans.length === 0 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Perfect for individuals and small projects</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>1 user</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>5 pages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground line-through">Custom domain</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-primary shadow-lg">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">For growing businesses and teams</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>5 users</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom domain</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">For large organizations with specific needs</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom domain</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
