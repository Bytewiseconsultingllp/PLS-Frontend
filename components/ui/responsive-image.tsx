"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ImageSkeleton } from "./image-skeleton"

interface ResponsiveImageProps {
  src: string
  alt: string
  sizes?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  className,
  fill = false,
  width,
  height,
  priority = false,
}: ResponsiveImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate a placeholder based on dimensions
  const getPlaceholder = () => {
    if (fill) {
      return "/placeholder.svg?height=800&width=1200"
    }
    return `/placeholder.svg?height=${height || 300}&width=${width || 400}`
  }

  // Handle window resize for responsive images
  useEffect(() => {
    const handleResize = () => {
      // Force re-render of image when window size changes significantly
      const currentWidth = window.innerWidth
      const breakpoints = [640, 768, 1024, 1280, 1536]

      // Check if we crossed a breakpoint
      const prevBreakpoint = breakpoints.findIndex((bp) => bp >= window.innerWidth)
      const newBreakpoint = breakpoints.findIndex((bp) => bp >= currentWidth)

      if (prevBreakpoint !== newBreakpoint) {
        // Refresh the image
        setLoading(true)
        setTimeout(() => setLoading(false), 10)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={`relative ${className || ""}`} style={fill ? { width: "100%", height: "100%" } : {}}>
      {loading && <ImageSkeleton width={fill ? "100%" : width} height={fill ? "100%" : height} />}

      <Image
        src={error ? getPlaceholder() : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoadingComplete={() => setLoading(false)}
        onError={() => {
          console.error(`Failed to load image: ${src}`)
          setError(true)
          setLoading(false)
        }}
      />
    </div>
  )
}
