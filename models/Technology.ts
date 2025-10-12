import mongoose, { Schema } from "mongoose"

// Define the schema for the Technology model
const TechnologySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "review", "published", "archived"],
      default: "draft",
    },
    parentTechnology: {
      type: String,
      default: "",
    },
    // New structured description field
    description: {
      intro: {
        type: [String],
        default: [],
      },
      conclusion: {
        type: String,
        default: "",
      },
    },
    // Features array
    features: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
        details: {
          type: [String],
          default: [],
        },
      },
    ],
    // Benefits array
    benefits: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    // Tech Stack structure
    techStack: {
      title: {
        type: String,
        default: "Technology Stack",
      },
      stack: [
        {
          category: {
            type: String,
            required: true,
          },
          items: {
            type: [String],
            default: [],
          },
        },
      ],
    },
    // Legacy field for backward compatibility
    techStacks: [
      {
        title: String,
        technologies: [String],
      },
    ],
    // Services array
    services: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    // FAQ array
    faq: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    strict: false, // Allow fields not specified in the schema
  },
)

// Create and export the Technology model
export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema)
