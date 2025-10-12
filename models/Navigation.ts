import mongoose, { Schema, type Document } from "mongoose"

export interface NavigationItem extends Document {
  title: string
  slug: string
  type: "link" | "dropdown" | "button" | "subheading" | "subitem" | "three-level-hierarchy"
  url?: string
  order: number
  isActive: boolean
  parentId?: mongoose.Types.ObjectId | null
  level?: number // 0 for root, 1 for sub-heading, 2 for sub-sub-heading
}

const NavigationItemSchema = new Schema<NavigationItem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["link", "dropdown", "button", "subheading", "subitem", "three-level-hierarchy"],
    },
    url: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NavigationItem",
      default: null,
    },
    level: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], // 0 for root, 1 for sub-heading, 2 for sub-sub-heading
    },
  },
  { timestamps: true },
)

export default mongoose.models.NavigationItem || mongoose.model<NavigationItem>("NavigationItem", NavigationItemSchema)
