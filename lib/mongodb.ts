import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: MongooseCache
    }
  }
}

let cached: MongooseCache = (global as any).mongoose

if (!cached) {
  cached = (global as NodeJS.Global).mongoose = { conn: null, promise: null }
}

// Named export required by the codebase
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Add timeout for server selection
      connectTimeoutMS: 10000, // Add connection timeout
    }

    console.log(
      "Connecting to MongoDB with URI:",
      (MONGODB_URI as string).replace(/([^:]+):\/\/([^:]+):([^@]+)@/, "$1://$2:****@"),
    ) // Log URI with password hidden

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB successfully")
        return mongoose
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error("Error establishing database connection:", error)
    throw error
  }
}

// Keep dbConnect for backward compatibility if it's used elsewhere
export async function dbConnect() {
  return connectToDatabase()
}

export default dbConnect
