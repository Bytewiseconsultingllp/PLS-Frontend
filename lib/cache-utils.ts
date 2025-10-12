import { cache } from "react"

/**
 * Cache duration in seconds
 */
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
}

/**
 * Cached fetch function that can be used in server components
 */
export const cachedFetch = cache(async (url: string, options?: RequestInit, cacheDuration = CACHE_DURATIONS.MEDIUM) => {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: cacheDuration },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw error
  }
})

/**
 * Cached image existence check
 */
export const cachedImageCheck = cache(async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      next: { revalidate: CACHE_DURATIONS.LONG },
    })
    return response.ok
  } catch (error) {
    console.error(`Error checking image at ${url}:`, error)
    return false
  }
})
