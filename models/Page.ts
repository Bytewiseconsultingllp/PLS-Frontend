import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ISection {
  id: string
  component: string
  data: Record<string, any>
}

export interface IPage extends Document {
  title: string
  slug: string
  description?: string
  isPublished: boolean
  sections: ISection[]
  createdAt: Date
  updatedAt: Date
  status?: string
}

const SectionSchema = new Schema({
  id: { type: String, required: true },
  component: { type: String, required: true },
  data: { type: Schema.Types.Mixed, default: {} },
})

const PageSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    isPublished: { type: Boolean, default: false },
    sections: [SectionSchema],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  {
    timestamps: true,
  },
)

// Create a compound index for efficient queries
PageSchema.index({ slug: 1, isPublished: 1 })

// Prevent duplicate slugs
PageSchema.pre("save", async function (next) {
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
const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema)

export default Page
