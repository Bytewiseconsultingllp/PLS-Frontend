"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface MediaUploaderProps {
  children: React.ReactNode
}

export function MediaUploader({ children }: MediaUploaderProps) {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
    }
  }

  function handleUpload() {
    if (files.length === 0) return

    setIsUploading(true)

    // In a real app, you would upload the files to your server or cloud storage
    // This is a simulated upload
    setTimeout(() => {
      setIsUploading(false)
      setFiles([])
      setOpen(false)

      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${files.length} file(s)`,
      })
    }, 2000)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      setFiles(droppedFiles)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>Upload images, documents, or videos to your media library.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className="flex flex-col items-center justify-center rounded-md border border-dashed p-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Drag and drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports images, documents, and videos up to 10MB</p>
            <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="max-h-40 overflow-auto rounded-md border p-2">
                <ul className="space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
