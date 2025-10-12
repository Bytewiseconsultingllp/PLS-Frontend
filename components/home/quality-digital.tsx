"use client"

import { motion } from "framer-motion"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

export interface QualityDigitalService {
  number: string
  title: string
  description: string
  order?: number
}

export interface QualityDigitalImages {
  topImage: string
  bottomImage: string
}

interface QualityDigitalProps {
  services: QualityDigitalService[]
  images: QualityDigitalImages
  heading?: string
  subheading?: string
}

export default function QualityDigital({
  services = [],
  images = {
    topImage: "/assets/9.png",
    bottomImage: "/assets/11.png",
  },
  heading = "Elevate Your Digital Brand with Cutting-Edge Marketing",
  subheading = "DIGITAL MARKETING SOLUTIONS FOR EXPERIENCED PROFESSIONALS 2025",
}: QualityDigitalProps) {
  // Sort services by order if available
  const sortedServices = [...services].sort((a, b) => {
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
              {sortedServices.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-16 h-16 bg-[#FF6B35] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {service.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
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
                src={images.topImage || "/placeholder.svg?height=400&width=500&query=business meeting"}
                alt="Business professionals in meeting"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc="/collaborative-strategy-session.png"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-4/5 h-[400px]"
            >
              <ImageWithFallback
                src={images.bottomImage || "/placeholder.svg?height=400&width=500&query=team collaboration"}
                alt="Team collaboration"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc="/diverse-team-brainstorm.png"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
