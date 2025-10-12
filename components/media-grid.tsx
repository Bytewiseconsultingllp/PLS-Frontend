"use client"

import { useState } from "react"
import Image from "next/image"
import { File, FileImage, FileText, FileVideo, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"

interface MediaItem {
  id: string
  name: string
  type: "image" | "document" | "video"
  url: string
  size: string
  createdAt: Date
}

// Sample data - in a real app, this would come from your database
const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "hero-image.jpg",
    type: "image",
    url: "/placeholder.svg?height=400&width=600",
    size: "1.2 MB",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "product-brochure.pdf",
    type: "document",
    url: "/documents/brochure.pdf",
    size: "3.5 MB",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    name: "promotional-video.mp4",
    type: "video",
    url: "/videos/promo.mp4",
    size: "15.8 MB",
    createdAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    name: "team-photo.jpg",
    type: "image",
    url: "/placeholder.svg?height=400&width=600",
    size: "2.3 MB",
    createdAt: new Date("2023-01-04"),
  },
  {
    id: "5",
    name: "annual-report.pdf",
    type: "document",
    url: "/documents/report.pdf",
    size: "5.1 MB",
    createdAt: new Date("2023-01-05"),
  },
  {
    id: "6",
    name: "product-demo.mp4",
    type: "video",
    url: "/videos/demo.mp4",
    size: "22.4 MB",
    createdAt: new Date("2023-01-06"),
  },
  {
    id: "7",
    name: "office-location.jpg",
    type: "image",
    url: "/placeholder.svg?height=400&width=600",
    size: "1.8 MB",
    createdAt: new Date("2023-01-07"),
  },
  {
    id: "8",
    name: "user-manual.pdf",
    type: "document",
    url: "/documents/manual.pdf",
    size: "4.2 MB",
    createdAt: new Date("2023-01-08"),
  },
]

interface MediaGridProps {
  type: "all" | "images" | "documents" | "videos"
  searchQuery?: string
}

export function MediaGrid({ type, searchQuery = "" }: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Filter media items based on type and search query
  const filteredItems = mediaItems.filter((item) => {
    const matchesType =
      type === "all" ||
      (type === "images" && item.type === "image") ||
      (type === "documents" && item.type === "document") ||
      (type === "videos" && item.type === "video")

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesSearch
  })

  function handleDelete() {
    // In a real app, you would delete the item from your database
    console.log(`Deleting item with ID: ${selectedItem?.id}`)
    setDeleteDialogOpen(false)
    setSelectedItem(null)
  }

  function renderMediaIcon(mediaType: string) {
    switch (mediaType) {
      case "image":
        return <FileImage className="h-6 w-6" />
      case "document":
        return <FileText className="h-6 w-6" />
      case "video":
        return <FileVideo className="h-6 w-6" />
      default:
        return <File className="h-6 w-6" />
    }
  }

  return (
    <div>
      {filteredItems.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No media items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square">
                {item.type === "image" ? (
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    onClick={() => {
                      setSelectedItem(item)
                      setDetailsOpen(true)
                    }}
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center bg-muted"
                    onClick={() => {
                      setSelectedItem(item)
                      setDetailsOpen(true)
                    }}
                  >
                    {renderMediaIcon(item.type)}
                  </div>
                )}
                <div className="absolute right-2 top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 text-white hover:bg-black/70">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedItem(item)
                          setDetailsOpen(true)
                        }}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.url)}>
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedItem(item)
                          setDeleteDialogOpen(true)
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-2">
                <div className="truncate text-sm font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.size}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Media Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4">
              <div className="relative aspect-video overflow-hidden rounded-md">
                {selectedItem.type === "image" ? (
                  <Image
                    src={selectedItem.url || "/placeholder.svg"}
                    alt={selectedItem.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    {renderMediaIcon(selectedItem.type)}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Name</div>
                  <div className="text-sm">{selectedItem.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-sm capitalize">{selectedItem.type}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Size</div>
                  <div className="text-sm">{selectedItem.size}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Uploaded</div>
                  <div className="text-sm">{formatDate(selectedItem.createdAt)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">URL</div>
                  <div className="text-sm truncate">{selectedItem.url}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => navigator.clipboard.writeText(selectedItem?.url || "")}>Copy URL</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Media</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
