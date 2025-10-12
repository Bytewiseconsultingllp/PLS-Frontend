import { NextResponse } from "next/server"
import * as z from "zod"

// Define the schema for validation (matching the client-side schema)
const freelancerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  yourPortfolio: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject1: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject2: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject3: z.string().url({ message: "Please enter a valid URL." }),
  detail: z.string().min(10, { message: "Details must be at least 10 characters." }),
  niche: z.string().min(2, { message: "Please specify your skills/niche." }),
  address: z.string().min(2, { message: "Please enter your address." }),
  country: z.string().min(2, { message: "Please enter your country." }),
  yearOfExperience: z.string().min(1, { message: "Please enter your years of experience." }),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request data
    const validatedData = freelancerSchema.parse(body)

    // Here you would typically:
    // 1. Store the data in a database
    // 2. Send confirmation emails
    // 3. Perform any other necessary operations

    console.log("Freelancer registration received:", validatedData)

    // For demonstration, let's log the data that matches the example provided
    console.log("Registration data matches example format:", {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      yourPortfolio: validatedData.yourPortfolio,
      yourTopProject1: validatedData.yourTopProject1,
      yourTopProject2: validatedData.yourTopProject2,
      yourTopProject3: validatedData.yourTopProject3,
      detail: validatedData.detail,
      niche: validatedData.niche,
      address: validatedData.address,
      country: validatedData.country,
      yearOfExperience: validatedData.yearOfExperience,
    })

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "Freelancer registration request received successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing freelancer registration:", error)

    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    // Handle other types of errors
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process registration",
      },
      { status: 500 },
    )
  }
}
