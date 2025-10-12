import { connectToDatabase } from "../lib/mongodb"
import NavigationItem from "../models/Navigation"
import mongoose from "mongoose"

async function seedNavigation() {
  try {
    await connectToDatabase()

    // Clear existing navigation items
    await NavigationItem.deleteMany({})

    // Create root items
    const home = await NavigationItem.create({
      title: "Home",
      slug: "home",
      type: "link",
      url: "/",
      order: 0,
      isActive: true,
      level: 0,
    })

    const about = await NavigationItem.create({
      title: "About",
      slug: "about",
      type: "link",
      url: "/about",
      order: 1,
      isActive: true,
      level: 0,
    })

    const services = await NavigationItem.create({
      title: "Services",
      slug: "services",
      type: "dropdown",
      order: 2,
      isActive: true,
      level: 0,
    })

    // Add a Three-Level Hierarchy example
    const industries = await NavigationItem.create({
      title: "Industries",
      slug: "industries",
      type: "three-level-hierarchy",
      order: 3,
      isActive: true,
      level: 0,
    })

    // Create sub-headings for services dropdown
    const webDevelopment = await NavigationItem.create({
      title: "Web Development",
      slug: "web-development",
      type: "link",
      url: "/services/web-development",
      order: 0,
      isActive: true,
      parentId: services._id,
      level: 1,
    })

    const mobileDevelopment = await NavigationItem.create({
      title: "Mobile Development",
      slug: "mobile-development",
      type: "link",
      url: "/services/mobile-development",
      order: 1,
      isActive: true,
      parentId: services._id,
      level: 1,
    })

    // Create sub-headings for industries (Three-Level Hierarchy)
    const healthcare = await NavigationItem.create({
      title: "Healthcare & Life Sciences",
      slug: "healthcare",
      type: "subheading",
      order: 0,
      isActive: true,
      parentId: industries._id,
      level: 1,
    })

    const finance = await NavigationItem.create({
      title: "Financial Services",
      slug: "finance",
      type: "subheading",
      order: 1,
      isActive: true,
      parentId: industries._id,
      level: 1,
    })

    // Create sub-items for healthcare
    const regulatory = await NavigationItem.create({
      title: "Regulatory Compliance",
      slug: "regulatory",
      type: "subitem",
      url: "/industries/healthcare/regulatory",
      order: 0,
      isActive: true,
      parentId: healthcare._id,
      level: 2,
    })

    const clinicalTrials = await NavigationItem.create({
      title: "Clinical Trials",
      slug: "clinical-trials",
      type: "subitem",
      url: "/industries/healthcare/clinical-trials",
      order: 1,
      isActive: true,
      parentId: healthcare._id,
      level: 2,
    })

    // Create sub-items for finance
    const banking = await NavigationItem.create({
      title: "Banking Solutions",
      slug: "banking",
      type: "subitem",
      url: "/industries/finance/banking",
      order: 0,
      isActive: true,
      parentId: finance._id,
      level: 2,
    })

    const insurance = await NavigationItem.create({
      title: "Insurance",
      slug: "insurance",
      type: "subitem",
      url: "/industries/finance/insurance",
      order: 1,
      isActive: true,
      parentId: finance._id,
      level: 2,
    })

    console.log("Navigation items seeded successfully")
  } catch (error) {
    console.error("Error seeding navigation items:", error)
  } finally {
    await mongoose.disconnect()
  }
}

seedNavigation()
