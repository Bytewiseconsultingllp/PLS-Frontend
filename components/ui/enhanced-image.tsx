"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageSkeleton } from "./image-skeleton"
import { getPlaceholderImage } from "@/lib/image-utils"

interface EnhancedImageProps extends Omit<ImageProps, "onLoadingComplete" | "onError"> {
  fallbackSrc?: string
  showSkeleton?: boolean
}

export function EnhancedImage({ src, alt, fallbackSrc, showSkeleton = true, className, ...rest }: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate a fallback source if none provided
  const getFallbackSrc = () => {
    if (fallbackSrc) return fallbackSrc

    // Extract dimensions from rest props or use defaults
    const width = typeof rest.width === "number" ? rest.width : 300
    const height = typeof rest.height === "number" ? rest.height : 200

    return getPlaceholderImage(width, height, alt)
  }

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <ImageSkeleton width={rest.width || "100%"} height={rest.height || "100%"} className={className} />
      )}

      <Image
        src={error ? getFallbackSrc() : src}
        alt={alt}
        className={className}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          console.error(`Failed to load image: ${src}`)
          setError(true)
          setIsLoading(false)
        }}
        {...rest}
      />
    </div>
  )
}
