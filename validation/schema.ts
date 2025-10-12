import { z } from "zod"

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const getQuoteSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  services: z
    .string()
    .min(1, "At least one service is required")
    .max(500, "Services description must be less than 500 characters"),
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  detail: z.string().max(500, "Details must be less than 500 characters").optional(),
  deadline: z
    .string()
    .optional()
    .refine(
      (value) => {
        // If the value is not provided, it's valid (since it's optional)
        if (!value) return true

        // Parse the date and ensure it's not in the past
        const selectedDate = new Date(value)
        const currentDate = new Date()

        // Convert dates to timestamps (numbers) for comparison
        return (
          selectedDate instanceof Date &&
          !isNaN(selectedDate.getTime()) &&
          selectedDate.getTime() >= currentDate.getTime()
        )
      },
      {
        message: "Deadline must be a future date", // Custom error message
      },
    ),
})

export type FormData = z.infer<typeof getQuoteSchema>
