"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { PLSAdvantageDocument } from "@/models/HomePage"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PLSAdvantageProps {
  data: Partial<PLSAdvantageDocument>
}

export default function PLSAdvantage({ data }: PLSAdvantageProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Log the data to help with debugging
  console.log("PLS Advantage data:", data)

  // Default images if none are provided
  const mainImage = data?.images?.mainImage || "/assets/13.png"
  const secondaryImage = data?.images?.secondaryImage || "/assets/12.png"
  const tertiaryImage = data?.images?.tertiaryImage || "/assets/15.png"

  console.log("Using images:", { mainImage, secondaryImage, tertiaryImage })

  if (!data) return null

  return (
    <section className="py-16 md:py-24 overflow-hidden dark:bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[#FF6B35] font-semibold">{data.title}</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">{data.subtitle}</h2>

            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-[#FF6B35]">{data.yearsExperience}</div>
              <div>
                <h3 className="text-xl font-bold text-[#FF6B35] mb-2">{data.yearsTitle}</h3>
                <p className="text-gray-600">{data.description}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-black">
              {data.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="text-[#FF6B35] h-5 w-5 flex-shrink-0" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            
          </motion.div>

          {/* Right Column - Images */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Main Image - Always visible */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 right-0 w-4/5 h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={mainImage || "/placeholder.svg"}
                alt="Team collaboration"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover"
              />
            </motion.div>

            {/* Secondary Image - Always visible */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-3/5 h-[250px] md:h-[300px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={secondaryImage || "/placeholder.svg"}
                alt="Business meeting"
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover"
              />
            </motion.div>

            {/* Tertiary Image - Only visible on tablet and above */}
            {isDesktop && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-20 right-20 w-2/5 h-[250px] bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={tertiaryImage || "/placeholder.svg"}
                  alt="Professional working"
                  fill
                  sizes="(max-width: 768px) 0vw, 20vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
