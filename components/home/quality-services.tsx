"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

interface QualityService {
  _id?: string
  number: string
  title: string
  description: string
  order: number
}

interface QualityServiceImages {
  topImage: string
  bottomImage: string
}

interface QualityServicesProps {
  services: QualityService[]
  images: QualityServiceImages
}

export function QualityServices({ services = [], images }: QualityServicesProps) {
  const [sortedServices, setSortedServices] = useState<QualityService[]>([])

  useEffect(() => {
    if (services && services.length > 0) {
      const sorted = [...services].sort((a, b) => a.order - b.order)
      setSortedServices(sorted)
    } else {
      setSortedServices([])
    }
  }, [services])

  // Default images if none are provided
  const topImage = images?.topImage || "/assets/17.png"
  const bottomImage = images?.bottomImage || "/assets/22.png"

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
            <span className="inline-block text-[#FF6B35] font-semibold mb-4">
              GET INDUSTRY-LEADING IT & DIGITAL SOLUTIONS 2025
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-12">
              Ready to Experience Cutting-Edge IT & Digital Marketing?
            </h2>

            <div className="space-y-8">
              {sortedServices.map((service, index) => (
                <motion.div
                  key={service._id || index}
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
              <Image
                src={topImage || "/placeholder.svg"}
                alt="Business professionals in meeting"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-4/5 h-[400px]"
            >
              <Image
                src={bottomImage || "/placeholder.svg"}
                alt="Team collaboration"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QualityServices
