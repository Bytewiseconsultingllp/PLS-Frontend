import { useQuery } from "@tanstack/react-query"
import type { Technology } from "@/types"

export function useTechnologies() {
  return useQuery<Technology[]>({
    queryKey: ["technologies"],
    queryFn: async () => {
      try {
        // First try to get technologies from the API
        const response = await fetch("/api/technologies")

        if (!response.ok) {
          throw new Error(`Failed to fetch technologies: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Error fetching technologies:", error)
        // Return empty array on error
        return []
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once
  })
}
