import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IComponent extends Document {
  name: string
  type: string
  description?: string
  schema: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const ComponentSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    schema: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  },
)

// Create indexes for efficient queries
ComponentSchema.index({ name: 1 })
ComponentSchema.index({ type: 1 })

// Use mongoose.models to prevent model recompilation error in development
const Component: Model<IComponent> =
  mongoose.models.Component || mongoose.model<IComponent>("Component", ComponentSchema)

export default Component
