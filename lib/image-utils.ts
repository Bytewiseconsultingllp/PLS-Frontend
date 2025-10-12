/**
 * Generates a placeholder image URL with the specified dimensions and query
 */
export function getPlaceholderImage(width: number, height: number, alt = ""): string {
  // Create a query based on the alt text or use a default
  const query = encodeURIComponent(alt || "placeholder image")
  return `/placeholder.svg?height=${height}&width=${width}&query=${query}`
}

/**
 * Checks if an image URL is valid
 */
export async function isImageValid(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error("Error checking image URL:", error)
    return false
  }
}

/**
 * Gets the appropriate image URL based on environment variables
 */
export function getImageUrl(path: string, basePath = ""): string {
  // If it's already a full URL, return it
  if (path.startsWith("http")) {
    return path
  }

  // If we have a base path, prepend it
  if (basePath) {
    // Ensure we have a trailing slash in the path
    const basePathWithSlash = basePath.endsWith("/") ? basePath : `${basePath}/`
    // Remove any leading slash from the image path
    const cleanPath = path.startsWith("/") ? path.substring(1) : path
    return `${basePathWithSlash}${cleanPath}`
  }

  // Fallback to the original path
  return path
}

/**
 * Handles image loading errors
 */
export function handleImageError(src: string, fallbackSrc: string): string {
  console.error(`Failed to load image: ${src}`)
  return fallbackSrc
}
