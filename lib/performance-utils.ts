import type React from "react"
/**
 * Performance optimization utilities for the website
 */

// Image optimization constants
export const IMAGE_QUALITY = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  LOSSLESS: 100,
}

/**
 * Generates optimized image URL parameters for Next.js Image component
 * @param width Desired width
 * @param quality Image quality (1-100)
 * @param format Image format (webp, avif, etc)
 */
export function getImageParams(width: number, quality = IMAGE_QUALITY.HIGH, format = "webp"): string {
  return `?w=${width}&q=${quality}&fmt=${format}`
}

/**
 * Determines if a component should be loaded based on viewport visibility
 * Uses IntersectionObserver API
 * @param elementRef React ref to the element
 * @param callback Function to call when element is visible
 * @param options IntersectionObserver options
 */
export function observeElementVisibility(
  elementRef: React.RefObject<HTMLElement>,
  callback: () => void,
  options = { threshold: 0.1, rootMargin: "200px" },
): () => void {
  if (typeof window === "undefined") return () => {}

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback()
        observer.disconnect()
      }
    })
  }, options)

  if (elementRef.current) {
    observer.observe(elementRef.current)
  }

  // Return cleanup function
  return () => observer.disconnect()
}

/**
 * Defers non-critical JavaScript execution
 * @param callback Function to execute when browser is idle
 */
export function deferExecution(callback: () => void): void {
  if (typeof window === "undefined") return

  if ("requestIdleCallback" in window) {
    ;(window as any).requestIdleCallback(callback)
  } else {
    setTimeout(callback, 1)
  }
}

/**
 * Prefetches critical resources
 * @param resources Array of URLs to prefetch
 * @param type Resource type (e.g., 'image', 'style', 'script')
 */
export function prefetchResources(resources: string[], type: "image" | "style" | "script" = "image"): void {
  if (typeof window === "undefined") return

  resources.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "prefetch"

    if (type === "image") {
      link.as = "image"
      link.href = url
    } else if (type === "style") {
      link.as = "style"
      link.href = url
    } else if (type === "script") {
      link.as = "script"
      link.href = url
    }

    document.head.appendChild(link)
  })
}

/**
 * Measures component render time
 * @param componentName Name of the component being measured
 * @returns Object with start and end functions
 */
export function measureRenderTime(componentName: string) {
  const markStart = `${componentName}-render-start`
  const markEnd = `${componentName}-render-end`

  return {
    start: () => {
      if (typeof performance !== "undefined") {
        performance.mark(markStart)
      }
    },
    end: () => {
      if (typeof performance !== "undefined") {
        performance.mark(markEnd)
        performance.measure(`${componentName} render time`, markStart, markEnd)
      }
    },
  }
}
