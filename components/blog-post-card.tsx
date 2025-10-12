import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface BlogPostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    date: string
    author: string
    category: string
    image: string
    slug: string
  }
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <ImageWithFallback
          src={post.image || "/placeholder.svg?height=200&width=400&query=blog post"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{post.date}</span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{post.category}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium">By {post.author}</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
