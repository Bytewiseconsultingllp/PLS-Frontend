"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  BarChart3,
  Megaphone,
  Paintbrush,
  Search,
  Video,
  PenTool,
  Camera,
  Layers,
  Globe,
  Sparkles,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

export interface DigitalService {
  id?: string
  title: string
  description: string
  image: string
  icon: string
  link?: string
}

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Megaphone: Megaphone,
  Search: Search,
  BarChart3: BarChart3,
  Paintbrush: Paintbrush,
  Video: Video,
  PenTool: PenTool,
  Camera: Camera,
  Layers: Layers,
  Globe: Globe,
  Sparkles: Sparkles,
}

// Default services if none are provided
const defaultServices: DigitalService[] = [
  {
    icon: "Megaphone",
    title: "SEO & Digital Marketing",
    description: "Boost visibility with data-driven SEO, PPC, and social media strategies.",
    image: "/assets/23.png",
  },
  {
    icon: "Search",
    title: "Performance Marketing",
    description: "Optimized ad campaigns leveraging AI for higher conversion rates.",
    image: "/assets/22.png",
  },
  {
    icon: "BarChart3",
    title: "Data-Driven Advertising",
    description: "Precision-targeted campaigns using analytics and automation.",
    image: "/assets/21.png",
  },
]

const ServiceCard = ({ service }: { service: DigitalService }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const IconComponent = iconMap[service.icon] || BarChart3

  const handleImageError = () => {
    console.error("Failed to load service image:", service.image)
    setImageError(true)
  }

  return (
    <motion.div
      className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of the card */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={service.image || "/placeholder.svg?height=400&width=300&query=digital marketing"}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            fallbackSrc="/placeholder.svg?height=400&width=300&query=digital marketing"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
            <IconComponent className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 w-full h-full bg-[#003087]"
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Back of the card */}
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">{service.title}</h3>

          <p className="text-white/90 mb-4 text-center">{service.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DigitalServices({ services = defaultServices }: { services?: DigitalService[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const isLaptop = useMediaQuery("(min-width: 1024px)")

  const visibleCards = isLaptop ? 4 : isTablet ? 2 : 1

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          if (nextIndex >= services.length) {
            // If we've reached the end, immediately jump to the start
            setTimeout(() => setCurrentIndex(0), 50)
            return services.length - 1
          }
          return nextIndex
        })
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, services.length])

  const handlePrevious = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return services.length - 1
      }
      return newIndex
    })
  }

  const handleNext = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      if (newIndex >= services.length) {
        return 0
      }
      return newIndex
    })
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="">
            <span className="text-[#FF6B35] font-semibold mb-2 inline-block">Create. Grow. Optimize. Succeed.</span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Smart Digital Marketing Solution &
              <br />
              Digital Strategies to Maximize Your Success
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-all duration-300 ease-in-out"
            style={{
              width: `${(100 * services.length) / visibleCards}%`,
              transform: `translateX(-${(currentIndex * 100) / services.length}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={index} className={`w-full ${isTablet ? "sm:w-1/2" : ""} ${isLaptop ? "lg:w-1/4" : ""} px-2`}>
                <ServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-[#003087] text-white hover:bg-[#FF6B35] transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-[#003087] text-white hover:bg-[#FF6B35] hover:text-white transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-[#003087] text-white hover:bg-[#FF6B35] transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
