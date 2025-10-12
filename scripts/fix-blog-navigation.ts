import mongoose from "mongoose"
import { config } from "dotenv"

// Load environment variables
config({ path: ".env.local" })

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment variables")
  process.exit(1)
}

// Define the NavigationItem schema
const NavigationItemSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  url: String,
  order: Number,
  isActive: Boolean,
  parentId: mongoose.Schema.Types.ObjectId,
  level: Number,
})

// Create the model
const NavigationItem = mongoose.models.NavigationItem || mongoose.model("NavigationItem", NavigationItemSchema)

async function fixBlogNavigation() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Find any navigation items with title containing "blog" (case insensitive)
    const blogItems = await NavigationItem.find({
      title: { $regex: "blog", $options: "i" },
    })

    if (blogItems.length === 0) {
      console.log("No blog navigation items found. Creating a new one...")

      // If no blog item exists, create one
      const newBlogItem = new NavigationItem({
        title: "Blog",
        type: "link",
        url: "/blog",
        slug: "blog",
        order: 999, // High number to place at end
        isActive: true,
        level: 0,
        parentId: null,
      })

      await newBlogItem.save()
      console.log("Blog navigation item created successfully")
    } else {
      console.log(`Found ${blogItems.length} blog navigation items. Updating...`)

      // Update all found blog items to have the correct URL
      let updated = 0
      for (const item of blogItems) {
        console.log(`Checking item: ${item.title} (${item._id}) - Current URL: ${item.url}`)

        if (item.url !== "/blog") {
          item.url = "/blog"
          item.type = "link" // Ensure it's a link type
          item.isActive = true // Ensure it's active
          await item.save()
          updated++
          console.log(`Updated item: ${item.title} (${item._id}) - New URL: ${item.url}`)
        } else {
          console.log(`Item already has correct URL: ${item.url}`)
        }
      }

      console.log(`${updated} blog navigation items updated with correct URL`)
    }

    console.log("Blog navigation fix completed successfully")
  } catch (error) {
    console.error("Error fixing blog navigation:", error)
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

// Run the function
fixBlogNavigation()
