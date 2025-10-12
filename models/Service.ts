import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IServiceCard {
  title: string
  description: string
  iconName?: string
}

export interface IService extends Document {
  title: string
  slug: string
  subtitle: string
  image?: string
  isPublished: boolean
  status?: string
  createdAt: Date
  updatedAt: Date
  description: {
    intro: string[]
    conclusion: string
  }
  challenges: string[]
  techImperatives: string[]
  businessNeeds: string[]
  scamProtection: string[]
  serviceCards: IServiceCard[]
  advantageCards: IServiceCard[]
  standardCards: IServiceCard[]
  ctaCards: {
    title: string
    description: string
  }[]
}

const ServiceCardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String },
})

const CTACardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
})

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    image: { type: String },
    isPublished: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    description: {
      intro: [{ type: String }],
      conclusion: { type: String, default: "" },
    },
    challenges: [{ type: String }],
    techImperatives: [{ type: String }],
    businessNeeds: [{ type: String }],
    scamProtection: [{ type: String }],
    serviceCards: [ServiceCardSchema],
    advantageCards: [ServiceCardSchema],
    standardCards: [ServiceCardSchema],
    ctaCards: [CTACardSchema],
  },
  {
    timestamps: true,
    // Add this to make Mongoose more forgiving with validation
    strict: false,
  },
)

// Create a compound index for efficient queries
ServiceSchema.index({ slug: 1, isPublished: 1 })

// Prevent duplicate slugs
ServiceSchema.pre("save", async function (next) {
  if (this.isModified("slug")) {
    const slugExists = await this.constructor.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    })

    if (slugExists) {
      throw new Error(`Slug "${this.slug}" is already in use`)
    }
  }

  // Update status based on isPublished
  this.status = this.isPublished ? "published" : "draft"

  next()
})

// Use mongoose.models to prevent model recompilation error in development
const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema)

export default Service
