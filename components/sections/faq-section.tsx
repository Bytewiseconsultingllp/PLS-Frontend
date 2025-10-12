import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  title: string
  subtitle?: string
  items: FaqItem[]
}

export function FaqSection({ title, subtitle, items = [] }: FaqSectionProps) {
  return (
    <div className="py-12 px-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}

          {/* If no items are provided, show placeholders */}
          {items.length === 0 && (
            <>
              <AccordionItem value="item-1">
                <AccordionTrigger>What services do you offer?</AccordionTrigger>
                <AccordionContent>
                  We offer a wide range of services including web design, development, and digital marketing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How much do your services cost?</AccordionTrigger>
                <AccordionContent>
                  Our pricing varies depending on the scope of the project. Contact us for a custom quote.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
                <AccordionContent>
                  Project timelines vary based on complexity. A simple website might take 2-4 weeks, while more complex
                  projects can take several months.
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </div>
    </div>
  )
}
