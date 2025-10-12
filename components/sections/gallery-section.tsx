import Image from "next/image"

interface GalleryItem {
  image: string
  alt?: string
}

interface GallerySectionProps {
  title: string
  subtitle?: string
  items: GalleryItem[]
  columns?: string
}

export function GallerySection({ title, subtitle, items = [], columns = "3" }: GallerySectionProps) {
  return (
    <div className="py-12 px-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div
        className={`grid gap-4 ${
          columns === "2"
            ? "grid-cols-1 md:grid-cols-2"
            : columns === "4"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" // default to 3 columns
        }`}
      >
        {items.map((item, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-md">
            <Image
              src={item.image || "/placeholder.svg?height=400&width=400"}
              alt={item.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}

        {/* If no items are provided, show placeholders */}
        {items.length === 0 && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=Image+${index + 1}`}
                  alt={`Placeholder ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
