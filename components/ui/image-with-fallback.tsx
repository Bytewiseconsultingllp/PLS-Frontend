"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  fallbackAlt?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  fallbackAlt,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  // Generate a query for the placeholder if none is provided
  const getFallbackSrc = () => {
    if (fallbackSrc.includes("placeholder.svg") && !fallbackSrc.includes("query=")) {
      // Extract dimensions from rest props or use defaults
      const width = rest.width || 300
      const height = rest.height || 200
      // Create a query based on the alt text
      const query = encodeURIComponent(alt || "image")
      return `/placeholder.svg?height=${height}&width=${width}&query=${query}`
    }
    return fallbackSrc
  }

  return (
    <Image
      src={error ? getFallbackSrc() : src}
      alt={error ? fallbackAlt || `Fallback for ${alt}` : alt}
      onError={() => {
        console.error(`Failed to load image: ${src}`)
        setError(true)
      }}
      {...rest}
    />
  )
}
