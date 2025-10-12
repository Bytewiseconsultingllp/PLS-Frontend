"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  lowQualitySrc?: string
  blurhash?: string
  lazyLoad?: boolean
  loadingPriority?: "high" | "medium" | "low"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/placeholder.svg",
  lowQualitySrc,
  blurhash,
  lazyLoad = true,
  loadingPriority = "medium",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Determine if this image should be loaded with priority
  const shouldPrioritize = loadingPriority === "high" || props.priority

  // Set loading attribute based on priority
  const loadingAttr = shouldPrioritize ? "eager" : "lazy"

  useEffect(() => {
    // Reset state when src changes
    setImgSrc(lowQualitySrc || null)
    setIsLoaded(false)
    setError(false)

    // If high priority or not using lazy loading, load immediately
    if (shouldPrioritize || !lazyLoad) {
      setImgSrc(src as string)
      return
    }

    // Set up intersection observer for lazy loading
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImgSrc(src as string)
              observerRef.current?.disconnect()
            }
          })
        },
        { rootMargin: "200px" },
      )

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current)
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setImgSrc(src as string)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [src, lowQualitySrc, shouldPrioritize, lazyLoad])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
  }

  // Generate a simple CSS-based blur placeholder if blurhash is not provided
  const blurPlaceholder =
    !blurhash && !isLoaded
      ? {
          filter: "blur(20px)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f0f0f0",
        }
      : {}

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {!isLoaded && blurhash && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${blurhash})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Image
        ref={imgRef}
        src={imgSrc || fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
        style={!isLoaded ? blurPlaceholder : {}}
        loading={loadingAttr}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default OptimizedImage
