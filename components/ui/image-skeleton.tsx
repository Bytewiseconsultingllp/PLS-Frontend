import { cn } from "@/lib/utils"

interface ImageSkeletonProps {
  width?: number | string
  height?: number | string
  className?: string
}

export function ImageSkeleton({ width = "100%", height = "100%", className }: ImageSkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 rounded", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  )
}
