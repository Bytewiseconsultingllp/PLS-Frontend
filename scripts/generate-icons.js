const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Source image (high resolution logo)
const SOURCE_IMAGE = path.join(__dirname, "../public/logo-source.png")
// Output directory
const OUTPUT_DIR = path.join(__dirname, "../public")

// Icon sizes to generate
const ICON_SIZES = [
  { width: 16, height: 16, name: "favicon-16x16.png" },
  { width: 32, height: 32, name: "favicon-32x32.png" },
  { width: 48, height: 48, name: "favicon-48x48.png" },
  { width: 192, height: 192, name: "icon-192x192.png" },
  { width: 512, height: 512, name: "icon-512x512.png" },
  { width: 180, height: 180, name: "apple-touch-icon.png" },
  { width: 72, height: 72, name: "badge-72x72.png" },
]

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Generate favicon.ico (multi-size icon)
async function generateFavicon() {
  try {
    // Create 16x16, 32x32, and 48x48 versions
    const favicon16 = await sharp(SOURCE_IMAGE).resize(16, 16).toBuffer()

    const favicon32 = await sharp(SOURCE_IMAGE).resize(32, 32).toBuffer()

    const favicon48 = await sharp(SOURCE_IMAGE).resize(48, 48).toBuffer()

    // Use a third-party library or command-line tool to combine these into an .ico file
    // For simplicity, we'll just save the 32x32 version as favicon.ico
    await sharp(favicon32).toFile(path.join(OUTPUT_DIR, "favicon.ico"))

    console.log("Generated favicon.ico")
  } catch (error) {
    console.error("Error generating favicon:", error)
  }
}

// Generate all icon sizes
async function generateIcons() {
  try {
    // Process each icon size
    for (const icon of ICON_SIZES) {
      await sharp(SOURCE_IMAGE).resize(icon.width, icon.height).toFile(path.join(OUTPUT_DIR, icon.name))

      console.log(`Generated ${icon.name}`)
    }

    // Generate favicon.ico
    await generateFavicon()

    console.log("All icons generated successfully!")
  } catch (error) {
    console.error("Error generating icons:", error)
  }
}

// Run the script
generateIcons()
