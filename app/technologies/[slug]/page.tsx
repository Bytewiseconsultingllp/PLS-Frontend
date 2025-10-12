import { notFound } from "next/navigation"
import { getTechnologyBySlug } from "@/lib/technologies"
import TechnologyDetails from "./techdesign"
import type { Metadata } from "next"

interface TechnologyPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
  const technology = await getTechnologyBySlug(params.slug)

  if (!technology) {
    return {
      title: "Technology Not Found",
      description: "The requested technology could not be found",
    }
  }

  return {
    title: technology.title,
    description: technology.subtitle,
  }
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  console.log("Rendering technology with slug:", params.slug)
  const technology = await getTechnologyBySlug(params.slug)

  if (!technology) {
    console.log("Technology not found for slug:", params.slug)
    notFound()
  }

  return <TechnologyDetails data={technology} type="technology" />
}
