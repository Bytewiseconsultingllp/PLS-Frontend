/**
 * Preloads critical images to improve LCP
 * @param imagePaths Array of image paths to preload
 */
export function preloadCriticalImages(imagePaths: string[]): void {
  if (typeof window === "undefined") return

  imagePaths.forEach((path) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = path
    document.head.appendChild(link)
  })
}

/**
 * Lazy loads images that are not immediately visible
 * @param imageSelector Selector for images to lazy load
 */
export function setupLazyLoading(imageSelector = 'img[data-lazy="true"]'): void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src

        if (src) {
          img.src = src
          img.removeAttribute("data-src")
          img.removeAttribute("data-lazy")
        }

        observer.unobserve(img)
      }
    })
  })

  // Start observing images
  document.querySelectorAll(imageSelector).forEach((img) => {
    observer.observe(img)
  })
}

/**
 * Determines if an image should be loaded with priority based on viewport visibility
 * @param elementId ID of the element containing the image
 * @returns Boolean indicating if the image should be loaded with priority
 */
export function shouldPrioritizeImage(elementId: string): boolean {
  if (typeof window === "undefined") return false

  const element = document.getElementById(elementId)
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // If the element is in the initial viewport, prioritize it
  return rect.top < viewportHeight
}
