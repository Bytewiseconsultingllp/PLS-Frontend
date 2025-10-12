import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

// Mock blog data - in a real application, this would come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "The Future of Content Management Systems",
    content: `
      <p>Content Management Systems (CMS) have come a long way since their inception. From simple text editors to sophisticated platforms that manage entire digital ecosystems, the evolution has been remarkable.</p>
      
      <p>In recent years, we've seen a shift towards headless CMS architectures, which separate the content repository from the presentation layer. This decoupling allows for greater flexibility and enables content to be delivered to multiple channels and devices.</p>
      
      <h2>The Rise of API-First CMS</h2>
      
      <p>API-first CMS platforms are gaining popularity as they provide developers with the freedom to build front-end experiences using their preferred technologies while managing content through a robust back-end system.</p>
      
      <p>This approach is particularly beneficial for organizations that need to deliver content across various platforms, including websites, mobile apps, IoT devices, and more.</p>
      
      <h2>AI and Automation in CMS</h2>
      
      <p>Artificial Intelligence is making its way into CMS platforms, offering capabilities such as automated content generation, intelligent content recommendations, and advanced analytics.</p>
      
      <p>These AI-powered features help content creators and marketers streamline their workflows, personalize user experiences, and make data-driven decisions.</p>
      
      <h2>The Future Outlook</h2>
      
      <p>Looking ahead, we can expect CMS platforms to become even more integrated with other business systems, providing a unified approach to digital experience management.</p>
      
      <p>The focus will be on creating seamless, personalized experiences across all touchpoints, powered by advanced analytics and AI capabilities.</p>
      
      <p>As organizations continue to prioritize digital transformation, the role of CMS in enabling these initiatives will only grow in importance.</p>
    `,
    date: "April 2, 2025",
    author: "Jane Smith",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "future-of-cms",
    tags: ["CMS", "Technology", "Digital Transformation", "Headless CMS", "API-First"],
  },
  {
    id: 2,
    title: "Optimizing Your Website for Performance",
    content: `<p>This is a sample content for the second blog post.</p>`,
    date: "March 28, 2025",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Web Development",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "optimizing-website-performance",
    tags: ["Performance", "Web Development", "Optimization"],
  },
  {
    id: 3,
    title: "The Role of AI in Modern Web Applications",
    content: `<p>This is a sample content for the third blog post.</p>`,
    date: "March 15, 2025",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Artificial Intelligence",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "ai-in-web-applications",
    tags: ["AI", "Web Development", "Technology"],
  },
  {
    id: 4,
    title: "Building Accessible Websites: A Comprehensive Guide",
    content: `<p>This is a sample content for the fourth blog post.</p>`,
    date: "March 10, 2025",
    author: "Sarah Williams",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Accessibility",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "building-accessible-websites",
    tags: ["Accessibility", "Web Development", "Inclusive Design"],
  },
  {
    id: 5,
    title: "The Evolution of JavaScript Frameworks",
    content: `<p>This is a sample content for the fifth blog post.</p>`,
    date: "February 28, 2025",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "JavaScript",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "evolution-of-javascript-frameworks",
    tags: ["JavaScript", "Frameworks", "Web Development"],
  },
  {
    id: 6,
    title: "Responsive Design Best Practices for 2025",
    content: `<p>This is a sample content for the sixth blog post.</p>`,
    date: "February 15, 2025",
    author: "Emily Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Design",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "responsive-design-best-practices",
    tags: ["Responsive Design", "Web Design", "UX/UI"],
  },
]

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Post header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Tag className="mr-1 h-4 w-4" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
        </div>

        {/* Featured image */}
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Post content */}
        <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-muted px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author info */}
        <div className="bg-muted rounded-xl p-6 flex items-center gap-6">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">About {post.author}</h3>
            <p className="text-muted-foreground">
              Content creator and technology enthusiast with a passion for exploring emerging trends in digital
              experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
