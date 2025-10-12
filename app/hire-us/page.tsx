"use client"
 
import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HireUsSchema, type HireUsFormData } from "../../validation/hireschema"
import { useLoading } from "../../hooks/useLoading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, X, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "react-toastify"
 
export default function HireUsForm() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<HireUsFormData>({
    resolver: zodResolver(HireUsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      detail: "",
      files: [],
    },
  })
 
  const { startLoading, stopLoading } = useLoading()
 
  const onSubmit = async (data: HireUsFormData) => {
    try {
      startLoading()
 
      // Create FormData for file upload
      const formData = new FormData()
 
      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value && key !== "files") {
          formData.append(key, value as string)
        }
      })
 
      // Add files
      uploadedFiles.forEach((file, index) => {
        formData.append(`files`, file)
      })
 
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}hireUs/createHireUsRequest`, formData)
 
      toast.success("Your request has been submitted successfully. Please check your email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
 
      // Reset form
      setUploadedFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong while submitting your request.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    } finally {
      stopLoading()
    }
  }
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return
 
    // Check file count
    if (uploadedFiles.length + selectedFiles.length > 5) {
      toast.error("You can only upload a maximum of 5 files", {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }
 
    // Validate file types
    const newFiles: File[] = []
    let hasInvalidFile = false
 
    Array.from(selectedFiles).forEach((file) => {
      if (file.type !== "application/pdf") {
        hasInvalidFile = true
        return
      }
 
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(`File ${file.name} exceeds the 5MB size limit`, {
          position: "top-right",
          autoClose: 5000,
        })
        hasInvalidFile = true
        return
      }
 
      newFiles.push(file)
    })
 
    if (hasInvalidFile) {
      toast.error("Only PDF files are allowed", {
        position: "top-right",
        autoClose: 5000,
      })
    }
 
    if (newFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      setValue("files", updatedFiles)
    }
 
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }
 
  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles]
    updatedFiles.splice(index, 1)
    setUploadedFiles(updatedFiles)
    setValue("files", updatedFiles)
  }
 
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }
 
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-[#003087] text-white rounded-t-lg">
        <CardTitle className="text-2xl">Hire Us</CardTitle>
        <CardDescription className="text-blue-100">
          Fill out the form below to get in touch with our team
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form id="hire-us-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Your email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...register("phone")}
                type="tel"
                placeholder="Your phone number"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register("company")} placeholder="Your company" />
            </div> */}
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} placeholder="Your address" />
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="detail">detail *</Label>
            <Textarea
              id="detail"
              {...register("detail")}
              placeholder="Additional detail about your project"
              className={`min-h-[120px] ${errors.detail ? "border-red-500" : ""}`}
            />
            {errors.detail && <p className="text-red-500 text-sm mt-1">{errors.detail.message}</p>}
          </div>
 
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Files (Maximum 5 PDFs, 5MB each)</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadedFiles.length >= 5 || isSubmitting}
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload PDF Files
                </Button>
                <span className="text-sm text-muted-foreground">{uploadedFiles.length}/5 files</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept=".pdf,application/pdf"
                className="hidden"
              />
              {errors.files && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.files.message}</AlertDescription>
                </Alert>
              )}
            </div>
 
            {uploadedFiles.length > 0 && (
              <div className="border rounded-md p-4">
                <Label className="mb-2 block">Uploaded Files</Label>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <FileIcon className="h-4 w-4 mr-2 text-[#003087]" />
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px] md:max-w-[300px]">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="hire-us-form" disabled={isSubmitting} className="w-full bg-[#003087] hover:bg-[#003087] md:w-auto">
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </CardFooter>
    </Card>
  )
}