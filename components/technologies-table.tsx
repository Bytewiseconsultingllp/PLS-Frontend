"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Eye, Trash2, Check, X, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Technology {
  id: string
  title: string
  slug: string
  status?: string
  isPublished?: boolean
  updatedAt: Date | string
  image?: string
}

interface TechnologiesTableProps {
  technologies: Technology[]
  onDataChange?: () => void
}

export function TechnologiesTable({ technologies, onDataChange }: TechnologiesTableProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [technologyToDelete, setTechnologyToDelete] = useState<Technology | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageTimestamp, setImageTimestamp] = useState<number>(Date.now())

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status?: string, isPublished?: boolean) => {
    if (status === "published" || isPublished) {
      return <Badge className="bg-green-500">Published</Badge>
    } else if (status === "review") {
      return <Badge className="bg-yellow-500">In Review</Badge>
    } else if (status === "archived") {
      return <Badge className="bg-gray-500">Archived</Badge>
    } else {
      return <Badge variant="outline">Draft</Badge>
    }
  }

  const handleDelete = async (technology: Technology) => {
    setTechnologyToDelete(technology)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!technologyToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/technologies/${technologyToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete technology: ${response.statusText}`)
      }

      toast({
        title: "Success",
        description: "Technology deleted successfully",
      })

      // Refresh the data
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error("Error deleting technology:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete technology",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setTechnologyToDelete(null)
    }
  }

  const handlePublishToggle = async (technology: Technology) => {
    try {
      const newPublishedState = !technology.isPublished
      const newStatus = newPublishedState ? "published" : "draft"

      const response = await fetch(`/api/technologies/${technology.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPublished: newPublishedState,
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update technology: ${response.statusText}`)
      }

      toast({
        title: "Success",
        description: `Technology ${newPublishedState ? "published" : "unpublished"} successfully`,
      })

      // Refresh the data
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error("Error updating technology:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update technology",
        variant: "destructive",
      })
    }
  }

  // Add timestamp to URL to prevent caching
  const addTimestampToUrl = (url: string): string => {
    if (!url) return url

    // Don't add timestamp to external URLs or data URLs
    if (url.startsWith("http") || url.startsWith("data:")) return url

    // Add timestamp as query parameter
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}t=${imageTimestamp}`
  }

  // Force refresh images
  const refreshImages = () => {
    setImageTimestamp(Date.now())
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={refreshImages}>
          <Check className="mr-2 h-4 w-4" />
          Refresh Images
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technologies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No technologies found.
                </TableCell>
              </TableRow>
            ) : (
              technologies.map((technology) => (
                <TableRow key={technology.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted">
                      {technology.image ? (
                        <Image
                          src={addTimestampToUrl(technology.image) || "/placeholder.svg"}
                          alt={technology.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-muted">
                          <ImageOff className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{technology.title}</TableCell>
                  <TableCell>{technology.slug}</TableCell>
                  <TableCell>{getStatusBadge(technology.status, technology.isPublished)}</TableCell>
                  <TableCell>{formatDate(technology.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/technologies/${technology.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/technologies/preview/${technology.id}?t=${imageTimestamp}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePublishToggle(technology)}>
                          {technology.isPublished ? (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(technology)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the technology &quot;
              {technologyToDelete?.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
