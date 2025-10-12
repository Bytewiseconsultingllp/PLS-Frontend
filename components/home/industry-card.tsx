"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  Users,
  Code,
  Database,
  Cloud,
  Cpu,
  PenTool,
  Search,
  Video,
  Shield,
  Leaf,
  CheckSquare,
  Monitor,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import type React from "react"

interface ITCard {
  _id?: string
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

interface IndustryCardProps {
  itCards: ITCard[]
}

// Map of icon names to Lucide icon components
const iconMap: Record<string, React.ComponentType> = {
  Users,
  Code,
  Database,
  Cloud,
  Cpu,
  PenTool,
  Search,
  Video,
  Shield,
  Leaf,
  CheckSquare,
  Monitor,
}

const ServiceCard = ({ service }: { service: ITCard }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  // Get the icon component from the icon name
  const IconComponent = (iconMap[service.icon] || Code) as React.ComponentType<{ className?: string }>

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
          <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
            <IconComponent className="h-10 w-10 text-[#003087]" />
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

          {/* Render description as bullet points */}
          <ul className="text-white/90 mb-4 text-left">
            {service.description.split("\n").map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>{point.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function IndustryCard({ itCards = [] }: IndustryCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Sort IT cards by order
  const sortedITCards = [...itCards].sort((a, b) => (a.order || 0) - (b.order || 0))

  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const isLaptop = useMediaQuery("(min-width: 1024px)")

  const visibleCards = isLaptop ? 4 : isTablet ? 2 : 1

  // If there are no cards, don't render the component
  if (sortedITCards.length === 0) {
    return null
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    const startInterval = () => {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          if (nextIndex >= sortedITCards.length) {
            return 0
          }
          return nextIndex
        })
      }, 3000)
    }

    if (isPlaying && sortedITCards.length > 0) {
      startInterval()
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, sortedITCards.length])

  const handlePrevious = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return sortedITCards.length - 1
      }
      return newIndex
    })
  }

  const handleNext = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      if (newIndex >= sortedITCards.length) {
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
            <span className="text-[#FF6B35] font-semibold mb-2 inline-block">Innovate. Scale. Secure. Succeed.</span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Future-Ready Enterprise IT &
              <br />
              Digital Strategies for Business Expansion
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-all duration-300 ease-in-out"
            style={{
              width: `${(100 * sortedITCards.length) / visibleCards}%`,
              transform: `translateX(-${(currentIndex * 100) / sortedITCards.length}%)`,
            }}
          >
            {/* Original services */}
            {sortedITCards.map((service, index) => (
              <div
                key={service._id || index}
                className={`w-full ${isTablet ? "sm:w-1/2" : ""} ${isLaptop ? "lg:w-1/4" : ""} px-2`}
              >
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
