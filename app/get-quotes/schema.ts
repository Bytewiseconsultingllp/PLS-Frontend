import { z } from "zod"

export const getQuoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  services: z.string().min(1, "Services are required"),
  company: z.string().optional(),
  detail: z.string().min(3, "Project details must be at least 3 characters long"),
  deadline: z.string().optional(),

  // New fields for the enhanced form
  businessName: z.string().optional(),
  location: z.string().optional(),
  projectTypes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  otherFeatures: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  contentStatus: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  additionalNotes: z.string().optional(),
  uploadedFiles: z.array(z.any()).optional(),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  marketingConsent: z.boolean().optional(),
})

export type FormData = z.infer<typeof getQuoteSchema>
