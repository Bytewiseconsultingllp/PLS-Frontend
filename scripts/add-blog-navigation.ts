import { MongoClient } from "mongodb"

async function addBlogNavigation() {
  // Replace with your MongoDB connection string
  const uri = process.env.MONGODB_URI || ""

  if (!uri) {
    console.error("MONGODB_URI environment variable is not set")
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Check if blog navigation item already exists
    const existingBlogItem = await db.collection("navigation").findOne({
      title: "Blog",
      parentId: null, // Top-level navigation item
    })

    if (existingBlogItem) {
      console.log("Blog navigation item already exists:", existingBlogItem)
      return
    }

    // Get the highest order number to place our new item at the end
    const highestOrderItem = await db
      .collection("navigation")
      .find({ parentId: null })
      .sort({ order: -1 })
      .limit(1)
      .toArray()

    const nextOrder = highestOrderItem.length > 0 ? highestOrderItem[0].order + 1 : 1

    // Insert the blog navigation item
    const blogItem = {
      title: "Blog",
      slug: "blog",
      url: "/blog",
      type: "link",
      order: nextOrder,
      isActive: true,
      parentId: null,
      level: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("navigation").insertOne(blogItem)
    console.log("Blog navigation item added successfully:", result.insertedId)
  } catch (error) {
    console.error("Error adding blog navigation item:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

// Run the function
addBlogNavigation()
  .then(() => console.log("Script completed"))
  .catch((error) => console.error("Script failed:", error))
