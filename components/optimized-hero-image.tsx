"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getPlaceholderImage } from "@/lib/image-utils"

interface OptimizedHeroImageProps {
  src: string
  alt: string
  priority?: boolean
}

export function OptimizedHeroImage({ src, alt, priority = false }: OptimizedHeroImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Generate a low-quality placeholder
  const placeholderSrc = getPlaceholderImage(20, 10, alt)

  useEffect(() => {
    // Preload the image
    if (priority && src) {
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded(true)
      img.onerror = () => setError(true)
    }
  }, [src, priority])

  return (
    <div className="relative w-full h-full">
      {/* Low-quality placeholder */}
      {!loaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {/* Main image */}
      <Image
        src={error ? placeholderSrc : src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        sizes="100vw"
      />
    </div>
  )
}
