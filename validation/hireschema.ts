import { z } from "zod"

export const HireUsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  company: z.string().optional(),
  address: z.string().optional(),
  details: z.string().min(10, { message: "Please provide more details about your request" }),
  files: z
    .array(
      z
        .instanceof(File, { message: "Invalid file" })
        .refine((file) => file.type === "application/pdf", { message: "Only PDF files are allowed" })
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB" }),
    )
    .max(5, { message: "You can upload a maximum of 5 files" })
    .optional(),
})

export type HireUsFormData = z.infer<typeof HireUsSchema>
