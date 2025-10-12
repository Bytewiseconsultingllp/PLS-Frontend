"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { BlogPostCard } from "@/components/blog-post-card"
import axios from "axios"
import { FixBlogNavigation } from "@/components/fix-blog-navigation"

export interface Blog {
  blogId: number
  blogTitle: string
  blogSlug: string
  blogThumbnail: string
  blogOverview: string
  blogBody?: string
  isPublished: boolean
  createdAt: string
}

export interface BlogsResponse {
  success: boolean
  status: number
  message: string
  data: {
    blogs: Blog[]
    pagination: PaginationInfo
  }
  requestInfo: {
    url: string
    ip: string
    method: string
  }
}
export interface PaginationInfo {
  page: number
  limit: number
  totalPages: number
  totalBlogs: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for blogs data
  const [blogsData, setBlogsData] = useState<BlogsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  // Get current page from URL or default to 1
  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getAllPublicBlogs`, {
          params: {
            page: currentPage,
            limit: limit,
            search: debouncedSearchQuery,
          },
        })
        setBlogsData(response.data) // Adjust this if the data is nested
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage, limit, debouncedSearchQuery])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    router.push(
      `/blog?page=${page}&limit=${limit}${
        debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""
      }`,
    )
  }

  const blogs = blogsData?.data?.blogs || []
  const totalBlogs = blogsData?.data?.pagination?.totalBlogs || 0
  const totalPages = blogsData?.data?.pagination?.totalPages || 1

  return (
    <div className="container mx-auto py-8 px-4">
      <FixBlogNavigation />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, news, and updates from our team of experts. Stay informed about the latest trends and best
          practices.
        </p>
      </div>

      {/* Search and Add New Blog */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      {/* Blog Count */}
      {!loading && blogsData && blogsData.data && (
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {blogs.length} of {totalBlogs} blogs
          </p>
        </div>
      )}

      {/* Blogs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogPostCard
              key={blog.blogId}
              post={{
                id: blog.blogId,
                title: blog.blogTitle,
                excerpt: blog.blogOverview,
                date: blog.createdAt,
                author: "Prime Logic",
                category: "Technology",
                image: blog.blogThumbnail,
                slug: blog.blogSlug,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blogs found. Try adjusting your search criteria.</p>
        </div>
      )}

      {!loading &&
        blogsData &&
        blogsData.data &&
        blogsData.data.pagination &&
        blogsData.data.pagination.totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/blog?page=1&limit=${limit}${
                      debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""
                    }`}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}

              {/* Previous page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/blog?page=${currentPage - 1}&limit=${limit}${
                      debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""
                    }`}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Current page */}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {/* Next page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href={`/blog?page=${currentPage + 1}&limit=${limit}${
                      debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""
                    }`}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}

              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/blog?page=${totalPages}&limit=${limit}${
                      debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""
                    }`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
    </div>
  )
}
