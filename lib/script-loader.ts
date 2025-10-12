/**
 * Dynamically loads a script with performance optimizations
 * @param src Script URL
 * @param id Optional ID for the script element
 * @param async Whether to load the script asynchronously
 * @param defer Whether to defer loading the script
 * @returns Promise that resolves when the script is loaded
 */
export function loadScript(src: string, id?: string, async = true, defer = true): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (id && document.getElementById(id)) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    if (id) script.id = id
    script.async = async
    script.defer = defer

    script.onload = () => resolve()
    script.onerror = (error) => reject(error)

    document.head.appendChild(script)
  })
}

/**
 * Loads a script only when it's needed (e.g., when an element is in viewport)
 * @param src Script URL
 * @param id Optional ID for the script element
 * @param selector Element selector that triggers script loading when visible
 */
export function lazyLoadScript(src: string, id?: string, selector?: string): void {
  if (typeof window === "undefined") return

  // If no selector is provided, load when page becomes idle
  if (!selector) {
    if ("requestIdleCallback" in window) {
      ;(window as any).requestIdleCallback(() => {
        loadScript(src, id)
      })
    } else {
      setTimeout(() => loadScript(src, id), 2000)
    }
    return
  }

  // Otherwise, use Intersection Observer to load when element is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadScript(src, id)
        observer.disconnect()
      }
    })
  })

  // Start observing the element
  const element = document.querySelector(selector)
  if (element) {
    observer.observe(element)
  } else {
    // If element doesn't exist, load when DOM is fully loaded
    window.addEventListener("DOMContentLoaded", () => {
      const el = document.querySelector(selector)
      if (el) observer.observe(el)
      else loadScript(src, id) // Fallback if selector never found
    })
  }
}
