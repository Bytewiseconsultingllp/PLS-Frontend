import { notFound } from "next/navigation"
import { getIndustryBySlug } from "@/lib/industries"
import IndustryDesign from "./industrydesign"
import type { Metadata } from "next"

interface IndustryPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = await getIndustryBySlug(params.slug)

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry could not be found",
    }
  }

  return {
    title: industry.title,
    description: industry.subtitle,
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  console.log("Rendering industry with slug:", params.slug)
  const industry = await getIndustryBySlug(params.slug)

  if (!industry) {
    console.log("Industry not found for slug:", params.slug)
    notFound()
  }

  return <IndustryDesign data={industry} type="industry" />
}
