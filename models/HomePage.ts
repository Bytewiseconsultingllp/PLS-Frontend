import mongoose, { Schema, type Document } from "mongoose"

// Slide document interface
export interface SlideDocument extends Document {
  image: string
  head: string
  heading: string
  text: string
  buttonLink?: string
  order?: number
}

// Service document interface
export interface ServiceDocument extends Document {
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

// IT card document interface
export interface ITCardDocument extends Document {
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

// Industry card document interface
export interface IndustryCardDocument extends Document {
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

// Technology card document interface
export interface TechnologyCardDocument extends Document {
  title: string
  description: string
  image: string
  icon: string
  order?: number
}

// Quality service document interface
export interface QualityServiceDocument extends Document {
  number: string
  title: string
  description: string
  order?: number
}

// Quality industry document interface
export interface QualityIndustryDocument extends Document {
  number: string
  title: string
  description: string
  order?: number
}

// Technology industry document interface
export interface TechnologyIndustryDocument extends Document {
  number: string
  title: string
  description: string
  order?: number
}

// Quality service images document interface
export interface QualityServiceImagesDocument extends Document {
  topImage: string
  bottomImage: string
}

// Quality industry images document interface
export interface QualityIndustryImagesDocument extends Document {
  topImage: string
  bottomImage: string
}

// Technology industry images document interface
export interface TechnologyIndustryImagesDocument extends Document {
  topImage: string
  bottomImage: string
}

// Quality digital service document interface
export interface QualityDigitalServiceDocument extends Document {
  number: string
  title: string
  description: string
  order?: number
}

// Quality digital images document interface
export interface QualityDigitalImagesDocument extends Document {
  topImage: string
  bottomImage: string
}

// Quality digital section document interface
export interface QualityDigitalSectionDocument extends Document {
  heading: string
  subheading: string
  services: QualityDigitalServiceDocument[]
  images: QualityDigitalImagesDocument
}

// PLS Advantage Feature document interface
export interface PLSAdvantageFeatureDocument extends Document {
  text: string
}

// PLS Advantage document interface
export interface PLSAdvantageDocument extends Document {
  title: string
  subtitle: string
  description: string
  yearsExperience: number
  yearsTitle: string
  features: PLSAdvantageFeatureDocument[]
  buttonText: string
  buttonLink: string
  images: {
    mainImage: string
    secondaryImage: string
    tertiaryImage: string
  }
}

// Home page document interface
export interface HomePageDocument extends Document {
  heroSlides: SlideDocument[]
  services: ServiceDocument[]
  itCards: ITCardDocument[]
  industryCards: IndustryCardDocument[]
  technologyCards: TechnologyCardDocument[]
  qualityServices: QualityServiceDocument[]
  qualityIndustry: QualityIndustryDocument[]
  technologyIndustry: TechnologyIndustryDocument[]
  qualityServiceImages: QualityServiceImagesDocument
  qualityIndustryImages: QualityIndustryImagesDocument
  technologyIndustryImages: TechnologyIndustryImagesDocument
  digitalServices?: any[]
  qualityDigitalSection?: QualityDigitalSectionDocument
  plsAdvantage?: PLSAdvantageDocument
}

// Slide schema
const SlideSchema = new Schema<SlideDocument>({
  image: { type: String, required: true },
  head: { type: String, required: true },
  heading: { type: String, required: true },
  text: { type: String, required: true },
  buttonLink: { type: String, default: "/contact" },
  order: { type: Number, default: 0 },
})

// Service schema
const ServiceSchema = new Schema<ServiceDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// IT card schema
const ITCardSchema = new Schema<ITCardDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Industry card schema
const IndustryCardSchema = new Schema<IndustryCardDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Technology card schema
const TechnologyCardSchema = new Schema<TechnologyCardDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Quality service schema
const QualityServiceSchema = new Schema<QualityServiceDocument>({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Quality industry schema
const QualityIndustrySchema = new Schema<QualityIndustryDocument>({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Technology industry schema
const TechnologyIndustrySchema = new Schema<TechnologyIndustryDocument>({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Quality service images schema
const QualityServiceImagesSchema = new Schema<QualityServiceImagesDocument>({
  topImage: { type: String, required: true },
  bottomImage: { type: String, required: true },
})

// Quality industry images schema
const QualityIndustryImagesSchema = new Schema<QualityIndustryImagesDocument>({
  topImage: { type: String, required: true },
  bottomImage: { type: String, required: true },
})

// Technology industry images schema
const TechnologyIndustryImagesSchema = new Schema<TechnologyIndustryImagesDocument>({
  topImage: { type: String, required: true },
  bottomImage: { type: String, required: true },
})

// Quality digital service schema
const QualityDigitalServiceSchema = new Schema<QualityDigitalServiceDocument>({
  number: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
})

// Quality digital images schema
const QualityDigitalImagesSchema = new Schema<QualityDigitalImagesDocument>({
  topImage: { type: String, required: true },
  bottomImage: { type: String, required: true },
})

// Quality digital section schema
const QualityDigitalSectionSchema = new Schema<QualityDigitalSectionDocument>({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  services: [QualityDigitalServiceSchema],
  images: QualityDigitalImagesSchema,
})

// PLS Advantage Feature schema
const PLSAdvantageFeatureSchema = new Schema<PLSAdvantageFeatureDocument>({
  text: { type: String, required: true },
})

// PLS Advantage schema
const PLSAdvantageSchema = new Schema<PLSAdvantageDocument>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  yearsExperience: { type: Number, required: true },
  yearsTitle: { type: String, required: true },
  features: [PLSAdvantageFeatureSchema],
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  images: {
    mainImage: { type: String, required: true },
    secondaryImage: { type: String, required: true },
    tertiaryImage: { type: String, required: true },
  },
})

// Home page schema
const HomePageSchema = new Schema<HomePageDocument>({
  heroSlides: [SlideSchema],
  services: [ServiceSchema],
  itCards: [ITCardSchema],
  industryCards: [IndustryCardSchema],
  technologyCards: [TechnologyCardSchema],
  qualityServices: [QualityServiceSchema],
  qualityIndustry: [QualityIndustrySchema],
  technologyIndustry: [TechnologyIndustrySchema],
  qualityServiceImages: QualityServiceImagesSchema,
  qualityIndustryImages: QualityIndustryImagesSchema,
  technologyIndustryImages: TechnologyIndustryImagesSchema,
  digitalServices: [{ type: Schema.Types.ObjectId, ref: "DigitalService" }],
  qualityDigitalSection: QualityDigitalSectionSchema,
  plsAdvantage: PLSAdvantageSchema,
})

// Create or get the model
export const HomePage = mongoose.models.HomePage || mongoose.model<HomePageDocument>("HomePage", HomePageSchema)
