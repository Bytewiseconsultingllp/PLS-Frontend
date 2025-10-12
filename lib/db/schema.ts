import type { ObjectId } from "mongodb"

// Define the Industry schema
export interface Industry {
  _id?: ObjectId | string
  name: string
  slug: string
  description?: string
  icon?: string
  coverImage?: string
  content?: string
  status?: "draft" | "published" | "archived"
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type NewIndustry = Omit<Industry, "_id" | "createdAt" | "updatedAt">

// Collection name for industries
export const industries = "industries"

// Define the Service schema
export interface Service {
  _id?: ObjectId | string
  name: string
  slug: string
  description?: string
  icon?: string
  coverImage?: string
  content?: string
  industryId?: ObjectId | string
  status?: "draft" | "published" | "archived"
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Collection name for services
export const services = "services"
