"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Plus, Save, Eye } from "lucide-react"
import Image from "next/image"
import type { PLSAdvantageDocument } from "@/models/HomePage"

interface PLSAdvantageManagerProps {
  initialAdvantage: Partial<PLSAdvantageDocument>
}

export function PLSAdvantageManager({ initialAdvantage }: PLSAdvantageManagerProps) {
  const [advantage, setAdvantage] = useState<Partial<PLSAdvantageDocument>>(initialAdvantage)
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "yearsExperience") {
      setAdvantage((prev) => ({
        ...prev,
        [name]: Number.parseInt(value) || 0,
      }))
    } else if (name.startsWith("images.")) {
      const imageName = name.split(".")[1]
      setAdvantage((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [imageName]: value,
        },
      }))
    } else {
      setAdvantage((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const addFeature = () => {
    setAdvantage((prev) => ({
      ...prev,
      features: [...(prev.features || []), { text: "" }],
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setAdvantage((prev) => {
      const features = [...(prev.features || [])]
      features[index] = { text: value }
      return { ...prev, features }
    })
  }

  const removeFeature = (index: number) => {
    setAdvantage((prev) => {
      const features = [...(prev.features || [])]
      features.splice(index, 1)
      return { ...prev, features }
    })
  }

  const saveAdvantage = async () => {
    setIsLoading(true)
    try {
      console.log("Saving PLS Advantage:", advantage)

      const response = await fetch("/api/home-page/pls-advantage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(advantage),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "PLS Advantage updated successfully",
        })
      } else {
        throw new Error(data.message || "Failed to update PLS Advantage")
      }
    } catch (error) {
      console.error("Error saving PLS Advantage:", error)
      toast({
        title: "Error",
        description: `Failed to save PLS Advantage: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">PLS Advantage Section</h2>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      {showPreview && (
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Desktop & Tablet Preview (3 images)</h3>
              <div className="relative h-[400px] mb-8 border rounded-lg p-4">
                <div className="absolute top-4 right-4 w-3/5 h-[200px] bg-gray-200 rounded-lg overflow-hidden">
                  {advantage.images?.mainImage ? (
                    <Image
                      src={advantage.images.mainImage || "/placeholder.svg"}
                      alt="Main Image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Main Image</div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 w-2/5 h-[150px] bg-gray-200 rounded-lg overflow-hidden">
                  {advantage.images?.secondaryImage ? (
                    <Image
                      src={advantage.images.secondaryImage || "/placeholder.svg"}
                      alt="Secondary Image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Secondary Image</div>
                  )}
                </div>
                <div className="absolute bottom-20 right-20 w-1/4 h-[120px] bg-gray-200 rounded-lg overflow-hidden">
                  {advantage.images?.tertiaryImage ? (
                    <Image
                      src={advantage.images.tertiaryImage || "/placeholder.svg"}
                      alt="Tertiary Image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Tertiary Image</div>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Mobile Preview (2 images)</h3>
              <div className="relative h-[300px] w-[250px] mx-auto border rounded-lg p-4">
                <div className="absolute top-4 right-4 w-3/5 h-[150px] bg-gray-200 rounded-lg overflow-hidden">
                  {advantage.images?.mainImage ? (
                    <Image
                      src={advantage.images.mainImage || "/placeholder.svg"}
                      alt="Main Image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Main Image</div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 w-2/5 h-[100px] bg-gray-200 rounded-lg overflow-hidden">
                  {advantage.images?.secondaryImage ? (
                    <Image
                      src={advantage.images.secondaryImage || "/placeholder.svg"}
                      alt="Secondary Image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Secondary Image</div>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 text-sm text-gray-500">Tertiary image hidden on mobile</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>PLS Advantage Section</CardTitle>
          <CardDescription>Manage the PLS Advantage section that appears on the homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={advantage.title || ""}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={advantage.subtitle || ""}
                  onChange={handleChange}
                  placeholder="Subtitle"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={advantage.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsExperience">Years Experience</Label>
                  <Input
                    id="yearsExperience"
                    name="yearsExperience"
                    type="number"
                    value={advantage.yearsExperience || ""}
                    onChange={handleChange}
                    placeholder="Years"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsTitle">Years Title</Label>
                  <Input
                    id="yearsTitle"
                    name="yearsTitle"
                    value={advantage.yearsTitle || ""}
                    onChange={handleChange}
                    placeholder="Years Title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    value={advantage.buttonText || ""}
                    onChange={handleChange}
                    placeholder="Button Text"
                  />
                </div>

                <div>
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    name="buttonLink"
                    value={advantage.buttonLink || ""}
                    onChange={handleChange}
                    placeholder="Button Link"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Features</Label>
                <div className="space-y-2 mt-2">
                  {advantage.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature.text}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addFeature} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <Label className="text-lg font-medium">Images</Label>
                <p className="text-sm text-gray-500 mb-4">
                  Note: On mobile devices, only the main and secondary images will be displayed. The tertiary image will
                  only appear on tablet and desktop views.
                </p>

                <div>
                  <Label htmlFor="images.mainImage">Main Image URL (Top Right)</Label>
                  <Input
                    id="images.mainImage"
                    name="images.mainImage"
                    value={advantage.images?.mainImage || ""}
                    onChange={handleChange}
                    placeholder="Main Image URL"
                  />
                  {advantage.images?.mainImage && (
                    <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md">
                      <Image
                        src={advantage.images.mainImage || "/placeholder.svg"}
                        alt="Main Image"
                        width={200}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="images.secondaryImage">Secondary Image URL (Bottom Left)</Label>
                  <Input
                    id="images.secondaryImage"
                    name="images.secondaryImage"
                    value={advantage.images?.secondaryImage || ""}
                    onChange={handleChange}
                    placeholder="Secondary Image URL"
                  />
                  {advantage.images?.secondaryImage && (
                    <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md">
                      <Image
                        src={advantage.images.secondaryImage || "/placeholder.svg"}
                        alt="Secondary Image"
                        width={200}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="images.tertiaryImage">Tertiary Image URL (Bottom Right - Hidden on Mobile)</Label>
                  <Input
                    id="images.tertiaryImage"
                    name="images.tertiaryImage"
                    value={advantage.images?.tertiaryImage || ""}
                    onChange={handleChange}
                    placeholder="Tertiary Image URL"
                  />
                  {advantage.images?.tertiaryImage && (
                    <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md">
                      <Image
                        src={advantage.images.tertiaryImage || "/placeholder.svg"}
                        alt="Tertiary Image"
                        width={200}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button onClick={saveAdvantage} disabled={isLoading} className="mt-6">
            {isLoading ? "Saving..." : "Save Changes"}
            {!isLoading && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
