"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
  resourceCount: number
  jsHeapSize: number | null
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    resourceCount: 0,
    jsHeapSize: null,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) return

    // Only enable in development or with a special query parameter
    const isDebug = process.env.NODE_ENV === "development" || window.location.search.includes("debug_performance")

    if (!isDebug) return

    // First Contentful Paint
    const observePaint = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
        }
      })
    })
    observePaint.observe({ type: "paint", buffered: true })

    // Largest Contentful Paint
    const observeLCP = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
    })
    observeLCP.observe({ type: "largest-contentful-paint", buffered: true })

    // Cumulative Layout Shift
    const observeCLS = new PerformanceObserver((list) => {
      let clsValue = 0
      list.getEntries().forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      })
      setMetrics((prev) => ({ ...prev, cls: clsValue }))
    })
    observeCLS.observe({ type: "layout-shift", buffered: true })

    // First Input Delay
    const observeFID = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        setMetrics((prev) => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
      })
    })
    observeFID.observe({ type: "first-input", buffered: true })

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType("navigation")
    if (navigationEntries.length > 0) {
      const ttfb = (navigationEntries[0] as PerformanceNavigationTiming).responseStart
      setMetrics((prev) => ({ ...prev, ttfb }))
    }

    // Resource count
    const resourceEntries = performance.getEntriesByType("resource")
    setMetrics((prev) => ({ ...prev, resourceCount: resourceEntries.length }))

    // Memory usage (if available)
    if ((performance as any).memory) {
      setMetrics((prev) => ({
        ...prev,
        jsHeapSize: (performance as any).memory.usedJSHeapSize / (1024 * 1024),
      }))
    }

    // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      observePaint.disconnect()
      observeLCP.disconnect()
      observeCLS.disconnect()
      observeFID.disconnect()
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 z-50 text-xs font-mono rounded-tl-lg">
      <h3 className="font-bold mb-2">Performance Metrics</h3>
      <ul>
        <li>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : "N/A"}</li>
        <li>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : "N/A"}</li>
        <li>CLS: {metrics.cls !== null ? metrics.cls.toFixed(3) : "N/A"}</li>
        <li>FID: {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : "N/A"}</li>
        <li>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : "N/A"}</li>
        <li>Resources: {metrics.resourceCount}</li>
        <li>JS Heap: {metrics.jsHeapSize ? `${metrics.jsHeapSize.toFixed(1)}MB` : "N/A"}</li>
      </ul>
      <div className="mt-2 text-xs opacity-70">Press Ctrl+Shift+P to hide</div>
    </div>
  )
}

export default PerformanceMonitor
