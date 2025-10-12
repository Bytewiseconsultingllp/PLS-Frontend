"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LazySectionProps {
  children: ReactNode
  className?: string
  placeholder?: ReactNode
  threshold?: number
  rootMargin?: string
  id?: string
}

export function LazySection({
  children,
  className,
  placeholder,
  threshold = 0.1,
  rootMargin = "200px",
  id,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div ref={sectionRef} className={cn("transition-opacity duration-500", className)} id={id}>
      {isVisible
        ? children
        : placeholder || (
            <div className="w-full h-40 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
    </div>
  )
}

export default LazySection
