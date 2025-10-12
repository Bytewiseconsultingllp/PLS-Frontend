import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IIndustryFeature {
  title: string
  description: string
  image?: string
}

export interface IIndustryBenefit {
  title: string
  description: string
}

export interface IIndustryFAQ {
  question: string
  answer: string
}

export interface ISolution {
  title: string
  items: string[]
}

export interface IIndustry extends Document {
  title: string
  slug: string
  subtitle: string
  image?: string
  isPublished: boolean
  status?: string
  createdAt: Date
  updatedAt: Date
  parentIndustry?: string
  description: {
    intro: string[]
    conclusion: string
  }
  industryStatus?: {
    title: string
    items: string[]
  }
  challenges: string[]
  requirements?: string[]
  solutions: ISolution[]
  benefits: IIndustryBenefit[]
  features: IIndustryFeature[]
  faq: IIndustryFAQ[]
}

const IndustryFeatureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
})

const IndustryBenefitSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
})

const IndustryFAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
})

const SolutionSchema = new Schema({
  title: { type: String, required: true },
  items: [{ type: String }],
})

const IndustrySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    image: { type: String },
    isPublished: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    parentIndustry: { type: String },
    description: {
      intro: [{ type: String }],
      conclusion: { type: String, default: "" },
    },
    industryStatus: {
      title: { type: String },
      items: [{ type: String }],
    },
    challenges: [{ type: String }],
    requirements: [{ type: String }],
    solutions: [SolutionSchema],
    benefits: [IndustryBenefitSchema],
    features: [IndustryFeatureSchema],
    faq: [IndustryFAQSchema],
  },
  {
    timestamps: true,
    strict: false,
  },
)

// Create a compound index for efficient queries
IndustrySchema.index({ slug: 1, isPublished: 1 })

// Prevent duplicate slugs
IndustrySchema.pre("save", async function (next) {
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
const Industry: Model<IIndustry> = mongoose.models.Industry || mongoose.model<IIndustry>("Industry", IndustrySchema)

export default Industry
