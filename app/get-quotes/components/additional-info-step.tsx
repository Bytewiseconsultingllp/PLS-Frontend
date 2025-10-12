"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud } from "lucide-react"

export default function AdditionalInfoStep() {
  const { control, setValue, watch } = useFormContext()
  const uploadedFiles = watch("uploadedFiles") || []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setValue("uploadedFiles", [...uploadedFiles, ...newFiles])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <p className="text-sm text-gray-500 mb-6">
          Provide any additional details that will help us understand your project better.
        </p>
      </div>

      <div className="space-y-8">
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Brief or Samples</Label>
            <FormDescription>
              Upload reference documents, wireframes, or examples that can help us understand your vision better.
              Accepted formats: PDF, JPG, DOC, PNG
            </FormDescription>
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.jpg,.jpeg,.doc,.docx,.png"
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Browse Files
            </button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Uploaded Files:</p>
              <ul className="space-y-1">
                {uploadedFiles.map((file: File, index: number) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="truncate">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <FormField
          control={control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Additional Notes <span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                Tell us anything else about your vision, challenges, or goals that would help us understand your project
                better. This field is required.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Share any additional information about your project (minimum 3 characters required)..."
                  className="min-h-[150px]"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    // Also update the detail field for API compatibility
                    setValue("detail", e.target.value.length >= 3 ? e.target.value : "No additional details provided.")
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
