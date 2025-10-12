import { useQuery } from "@tanstack/react-query"
import type { Industry } from "@/types"

export function useIndustries() {
  return useQuery<Industry[]>({
    queryKey: ["industries"],
    queryFn: async () => {
      try {
        // First try to get industries from the API
        const response = await fetch("/api/industries")

        if (!response.ok) {
          throw new Error(`Failed to fetch industries: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Error fetching industries:", error)
        // Return empty array on error
        return []
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once
  })
}
