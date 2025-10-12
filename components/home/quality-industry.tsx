"use client"

import { motion } from "framer-motion"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

export interface QualityIndustryItem {
  number: string
  title: string
  description: string
  order?: number
}

export interface QualityIndustryImages {
  topImage: string
  bottomImage: string
}

interface QualityIndustryProps {
  industries: QualityIndustryItem[]
  images: QualityIndustryImages
  heading?: string
  subheading?: string
}

// Changed from default export to named export
export function QualityIndustry({
  industries = [],
  images = {
    topImage: "/assets/9.png",
    bottomImage: "/assets/15.png",
  },
  heading = "Industry-Specific Solutions with Deep Domain Expertise",
  subheading = "SPECIALIZED INDUSTRY SOLUTIONS FOR MODERN BUSINESSES 2025",
}: QualityIndustryProps) {
  // Sort industries by order if available
  const sortedIndustries = [...industries].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    return 0
  })

  return (
    <section className="py-16 md:py-24 overflow-hidden dark:bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[#FF6B35] font-semibold mb-4">{subheading}</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-12">{heading}</h2>

            <div className="space-y-8">
              {sortedIndustries.map((industry, index) => (
                <motion.div
                  key={industry.number || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-16 h-16 bg-[#003087] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {industry.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                    <p className="text-gray-600">{industry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <div className="relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 right-0 w-4/5 h-[400px]"
            >
              <ImageWithFallback
                src={images.topImage || "/placeholder.svg?height=400&width=500&query=industry professionals"}
                alt="Industry professionals in meeting"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc="/collaborative-innovation.png"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-4/5 h-[400px]"
            >
              <ImageWithFallback
                src={images.bottomImage || "/placeholder.svg?height=400&width=500&query=industry solutions"}
                alt="Industry solutions"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc="/interconnected-industries.png"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
