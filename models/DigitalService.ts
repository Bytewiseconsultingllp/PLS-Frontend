import { Schema, model, models, type Document, type Model } from "mongoose"

export interface DigitalServiceDocument extends Document {
  title: string
  description: string
  image: string
  icon: string
  link?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const DigitalServiceSchema = new Schema<DigitalServiceDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    link: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const DigitalService: Model<DigitalServiceDocument> =
  models.DigitalService || model<DigitalServiceDocument>("DigitalService", DigitalServiceSchema)

export default DigitalService
