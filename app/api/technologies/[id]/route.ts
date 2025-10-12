import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Technology from "@/models/Technology"
import mongoose from "mongoose"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const id = params.id

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid technology ID" }, { status: 400 })
    }

    const technology = await Technology.findById(id)

    if (!technology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }

    // Return the technology with proper ID format
    return NextResponse.json({
      id: technology._id.toString(),
      title: technology.title,
      slug: technology.slug,
      subtitle: technology.subtitle,
      image: technology.image,
      isPublished: technology.isPublished,
      status: technology.status,
      createdAt: technology.createdAt,
      updatedAt: technology.updatedAt,
      parentTechnology: technology.parentTechnology,
      description: technology.description,
      features: technology.features,
      benefits: technology.benefits,
      techStack: technology.techStack,
      techStacks: technology.techStacks,
      services: technology.services,
      faq: technology.faq,
    })
  } catch (error) {
    console.error("Error fetching technology:", error)
    return NextResponse.json({ error: "Failed to fetch technology" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const id = params.id

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid technology ID" }, { status: 400 })
    }

    const technologyData = await request.json()

    // Log the received data for debugging
    console.log(
      "Updating technology with data:",
      JSON.stringify(
        {
          id,
          title: technologyData.title,
          slug: technologyData.slug,
          subtitle: technologyData.subtitle,
          image: technologyData.image,
          isPublished: technologyData.isPublished,
          status: technologyData.status,
          parentTechnology: technologyData.parentTechnology,
        },
        null,
        2,
      ),
    )

    // Ensure image field is included
    if (technologyData.image === undefined) {
      technologyData.image = ""
    }

    // Create a clean update object with only the fields that are present
    const updateData = {
      title: technologyData.title,
      slug: technologyData.slug,
      subtitle: technologyData.subtitle,
      image: technologyData.image,
      isPublished: technologyData.isPublished,
      status: technologyData.status,
      parentTechnology: technologyData.parentTechnology,
      description: technologyData.description,
      features: technologyData.features,
      benefits: technologyData.benefits,
      techStack: technologyData.techStack,
      services: technologyData.services,
      faq: technologyData.faq,
    }

    // Update the technology with the clean update object
    const updatedTechnology = await Technology.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    if (!updatedTechnology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }

    // Log the updated technology for verification
    console.log(
      "Updated technology:",
      JSON.stringify(
        {
          id: updatedTechnology._id.toString(),
          title: updatedTechnology.title,
          slug: updatedTechnology.slug,
          subtitle: updatedTechnology.subtitle,
          image: updatedTechnology.image,
          isPublished: updatedTechnology.isPublished,
          status: updatedTechnology.status,
          parentTechnology: updatedTechnology.parentTechnology,
        },
        null,
        2,
      ),
    )

    // Return the updated technology with proper ID format
    return NextResponse.json({
      id: updatedTechnology._id.toString(),
      title: updatedTechnology.title,
      slug: updatedTechnology.slug,
      subtitle: updatedTechnology.subtitle,
      image: updatedTechnology.image,
      isPublished: updatedTechnology.isPublished,
      status: updatedTechnology.status,
      createdAt: updatedTechnology.createdAt,
      updatedAt: updatedTechnology.updatedAt,
      parentTechnology: updatedTechnology.parentTechnology,
      description: updatedTechnology.description,
      features: updatedTechnology.features,
      benefits: updatedTechnology.benefits,
      techStack: updatedTechnology.techStack,
      techStacks: updatedTechnology.techStacks,
      services: updatedTechnology.services,
      faq: updatedTechnology.faq,
    })
  } catch (error) {
    console.error("Error updating technology:", error)
    return NextResponse.json({ error: "Failed to update technology" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const id = params.id

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid technology ID" }, { status: 400 })
    }

    const deletedTechnology = await Technology.findByIdAndDelete(id)

    if (!deletedTechnology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Technology deleted successfully" })
  } catch (error) {
    console.error("Error deleting technology:", error)
    return NextResponse.json({ error: "Failed to delete technology" }, { status: 500 })
  }
}
