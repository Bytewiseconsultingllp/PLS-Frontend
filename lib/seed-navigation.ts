import dbConnect from "./mongodb"
import NavigationItem from "@/models/Navigation"

export async function seedNavigation() {
  await dbConnect()

  // Clear existing navigation items
  await NavigationItem.deleteMany({})

  // Create root items
  const home = await NavigationItem.create({
    title: "HOME",
    slug: "home",
    type: "link",
    url: "/",
    order: 0,
    isActive: true,
  })

  const services = await NavigationItem.create({
    title: "SERVICES",
    slug: "services",
    type: "dropdown",
    order: 1,
    isActive: true,
  })

  const industries = await NavigationItem.create({
    title: "INDUSTRIES",
    slug: "industries",
    type: "dropdown",
    order: 2,
    isActive: true,
  })

  const technologies = await NavigationItem.create({
    title: "TECHNOLOGIES",
    slug: "technologies",
    type: "dropdown",
    order: 3,
    isActive: true,
  })

  const blog = await NavigationItem.create({
    title: "BLOG",
    slug: "blog",
    type: "link",
    url: "/blog",
    order: 4,
    isActive: true,
  })

  const contact = await NavigationItem.create({
    title: "CONTACT",
    slug: "contact",
    type: "link",
    url: "/contact",
    order: 5,
    isActive: true,
  })

  const getStarted = await NavigationItem.create({
    title: "GET STARTED",
    slug: "get-started",
    type: "button",
    url: "/get-started",
    order: 6,
    isActive: true,
  })

  const getQuote = await NavigationItem.create({
    title: "GET QUOTE",
    slug: "get-quote",
    type: "button",
    url: "/get-quote",
    order: 7,
    isActive: true,
  })

  // Create industry children
  const healthcareIndustry = await NavigationItem.create({
    title: "Healthcare & Life Sciences",
    slug: "healthcare",
    type: "link",
    url: "/industries/healthcare",
    parentId: industries._id,
    order: 0,
    isActive: true,
  })

  const financialIndustry = await NavigationItem.create({
    title: "Financial Services",
    slug: "financial",
    type: "link",
    url: "/industries/financial",
    parentId: industries._id,
    order: 1,
    isActive: true,
  })

  const retailIndustry = await NavigationItem.create({
    title: "Retail & E-Commerce",
    slug: "retail",
    type: "link",
    url: "/industries/retail",
    parentId: industries._id,
    order: 2,
    isActive: true,
  })

  const manufacturingIndustry = await NavigationItem.create({
    title: "Manufacturing",
    slug: "manufacturing",
    type: "link",
    url: "/industries/manufacturing",
    parentId: industries._id,
    order: 3,
    isActive: true,
  })

  const educationIndustry = await NavigationItem.create({
    title: "Education & E-Learning",
    slug: "education",
    type: "link",
    url: "/industries/education",
    parentId: industries._id,
    order: 4,
    isActive: true,
  })

  const techIndustry = await NavigationItem.create({
    title: "Technology & SaaS",
    slug: "technology",
    type: "link",
    url: "/industries/technology",
    parentId: industries._id,
    order: 5,
    isActive: true,
  })

  // Healthcare subcategories
  await NavigationItem.create({
    title: "Regulatory Compliance",
    slug: "regulatory-compliance",
    type: "link",
    url: "/industries/healthcare/regulatory-compliance",
    parentId: healthcareIndustry._id,
    order: 0,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Data-Driven Care",
    slug: "data-driven-care",
    type: "link",
    url: "/industries/healthcare/data-driven-care",
    parentId: healthcareIndustry._id,
    order: 1,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Telehealth & IoT",
    slug: "telehealth-iot",
    type: "link",
    url: "/industries/healthcare/telehealth-iot",
    parentId: healthcareIndustry._id,
    order: 2,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Cloud & DevOps for Healthcare",
    slug: "cloud-devops-healthcare",
    type: "link",
    url: "/industries/healthcare/cloud-devops",
    parentId: healthcareIndustry._id,
    order: 3,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Medical Software Development",
    slug: "medical-software",
    type: "link",
    url: "/industries/healthcare/medical-software",
    parentId: healthcareIndustry._id,
    order: 4,
    isActive: true,
  })

  // Financial Services subcategories
  await NavigationItem.create({
    title: "Security & Compliance",
    slug: "security-compliance",
    type: "link",
    url: "/industries/financial/security-compliance",
    parentId: financialIndustry._id,
    order: 0,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Fraud Detection",
    slug: "fraud-detection",
    type: "link",
    url: "/industries/financial/fraud-detection",
    parentId: financialIndustry._id,
    order: 1,
    isActive: true,
  })

  await NavigationItem.create({
    title: "FinTech Innovation",
    slug: "fintech-innovation",
    type: "link",
    url: "/industries/financial/fintech-innovation",
    parentId: financialIndustry._id,
    order: 2,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Scalable Infrastructure",
    slug: "scalable-infrastructure",
    type: "link",
    url: "/industries/financial/scalable-infrastructure",
    parentId: financialIndustry._id,
    order: 3,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Blockchain for Finance",
    slug: "blockchain-finance",
    type: "link",
    url: "/industries/financial/blockchain",
    parentId: financialIndustry._id,
    order: 4,
    isActive: true,
  })

  // Retail & E-Commerce subcategories
  await NavigationItem.create({
    title: "E-Commerce Platforms",
    slug: "ecommerce-platforms",
    type: "link",
    url: "/industries/retail/ecommerce-platforms",
    parentId: retailIndustry._id,
    order: 0,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Omnichannel Solutions",
    slug: "omnichannel-solutions",
    type: "link",
    url: "/industries/retail/omnichannel-solutions",
    parentId: retailIndustry._id,
    order: 1,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Customer Analytics",
    slug: "customer-analytics",
    type: "link",
    url: "/industries/retail/customer-analytics",
    parentId: retailIndustry._id,
    order: 2,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Inventory Management",
    slug: "inventory-management",
    type: "link",
    url: "/industries/retail/inventory-management",
    parentId: retailIndustry._id,
    order: 3,
    isActive: true,
  })

  await NavigationItem.create({
    title: "Personalized Marketing",
    slug: "personalized-marketing",
    type: "link",
    url: "/industries/retail/personalized-marketing",
    parentId: retailIndustry._id,
    order: 4,
    isActive: true,
  })

  return {
    message: "Navigation seeded successfully",
    count: await NavigationItem.countDocuments(),
  }
}
