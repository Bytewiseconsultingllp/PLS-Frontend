import { useQuery } from "@tanstack/react-query"
import type { Service } from "@/types"

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        // First try to get services from the API
        const response = await fetch("/api/services")

        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Error fetching services:", error)
        // Return empty array on error
        return []
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once
  })
}
