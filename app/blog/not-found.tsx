import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The blog post you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/blog">Return to Blog</Link>
      </Button>
    </div>
  )
}
