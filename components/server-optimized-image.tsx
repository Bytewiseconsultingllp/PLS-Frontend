import Image from "next/image"
import { cachedImageCheck } from "@/lib/cache-utils"
import { getPlaceholderImage } from "@/lib/image-utils"

interface ServerOptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export async function ServerOptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ServerOptimizedImageProps) {
  // Check if the image exists on the server
  const imageExists = await cachedImageCheck(src).catch(() => false)

  // Use placeholder if image doesn't exist
  const imageSrc = imageExists ? src : getPlaceholderImage(width, height, alt)

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
