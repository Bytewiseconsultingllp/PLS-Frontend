import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroSlidesManager } from "@/components/hero-slides-manager"
import { ServicesManager } from "@/components/services-manager"
import { ITCardsManager } from "@/components/it-cards-manager"
import { IndustryCardsManager } from "@/components/industry-cards-manager"
import { TechnologyCardsManager } from "@/components/technology-cards-manager"
import { QualityServicesManager } from "@/components/quality-services-manager"
import { QualityIndustryManager } from "@/components/quality-industry-manager"
import { TechnologyIndustryManager } from "@/components/technology-industry-manager"
import { PLSAdvantageManager } from "@/components/pls-advantage-manager"
import { DebugInfo } from "@/components/debug-info"
import { getHomePage } from "@/lib/home-page"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { unstable_noStore as noStore } from "next/cache"
import { DigitalServicesManager } from "@/components/digital-services-manager"
import QualityDigitalManager from "@/components/quality-digital-manager"

export default async function AdminHomePage() {
  // Prevent caching
  noStore()

  console.log("Admin home page is rendering...")

  try {
    // Fetch home page data
    console.log("Fetching home page data...")
    const homePage = await getHomePage()

    console.log("Home page data fetched:", homePage ? "success" : "null")

    if (!homePage) {
      console.error("Home page data is null")
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Home Page Management</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            Error loading home page data. Please try again later.
          </div>
        </div>
      )
    }

    // Extract data for each section
    const heroSlides = homePage.heroSlides || []
    const services = homePage.services || []
    const itCards = homePage.itCards || []
    const industryCards = homePage.industryCards || []
    const technologyCards = homePage.technologyCards || []
    const qualityServices = homePage.qualityServices || []
    const qualityIndustry = homePage.qualityIndustry || []
    const technologyIndustry = homePage.technologyIndustry || []
    const qualityServiceImages = homePage.qualityServiceImages || {
      topImage: "/assets/17.png",
      bottomImage: "/assets/22.png",
    }
    const qualityIndustryImages = homePage.qualityIndustryImages || {
      topImage: "/assets/9.png",
      bottomImage: "/assets/15.png",
    }
    const technologyIndustryImages = homePage.technologyIndustryImages || {
      topImage: "/assets/6.png",
      bottomImage: "/assets/11.png",
    }
    const qualityDigitalSection = homePage.qualityDigitalSection || {
      heading: "Elevate Your Digital Brand with Cutting-Edge Marketing",
      subheading: "DIGITAL MARKETING SOLUTIONS FOR EXPERIENCED PROFESSIONALS 2025",
      services: [],
      images: {
        topImage: "/assets/9.png",
        bottomImage: "/assets/11.png",
      },
    }
    const plsAdvantage = homePage.plsAdvantage || {
      title: "PLS Competitive Advantage",
      subtitle: "Unmatched Competitive Edge: Future-Ready Solutions for American Businesses",
      description:
        "Harness the power of AI, automation, and digital transformation to drive scalability, security, and data-driven growth. With decades of expertise, we equip businesses with the tools to outperform, adapt, and lead in an evolving market.",
      yearsExperience: 25,
      yearsTitle: "Years of Industry Leadership",
      features: [
        { text: "AI & Automation" },
        { text: "Enterprise Security" },
        { text: "Cloud Mastery" },
        { text: "Data-Driven Growth" },
        { text: "Omnichannel Optimization" },
        { text: "Regulatory Compliance" },
      ],
      buttonText: "LEARN MORE",
      buttonLink: "/services",
      images: {
        mainImage: "/assets/13.png",
        secondaryImage: "/assets/12.png",
        tertiaryImage: "/assets/15.png",
      },
    }

    const debugData = {
      heroSlides: heroSlides.length,
      services: services.length,
      itCards: itCards.length,
      industryCards: industryCards.length,
      technologyCards: technologyCards.length,
      qualityServices: qualityServices.length,
      qualityIndustry: qualityIndustry.length,
      technologyIndustry: technologyIndustry.length,
      qualityServiceImages: Boolean(qualityServiceImages),
      qualityIndustryImages: Boolean(qualityIndustryImages),
      technologyIndustryImages: Boolean(technologyIndustryImages),
      digitalServices: homePage.digitalServices?.length || 0,
      qualityDigitalSection: Boolean(qualityDigitalSection),
      plsAdvantage: Boolean(plsAdvantage),
    }

    console.log("Data extracted:", debugData)

    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Home Page Management</h1>
          <Button asChild>
            <Link href="/" target="_blank">
              View Home Page
            </Link>
          </Button>
        </div>

        <DebugInfo data={debugData} title="Data Overview" />

        <Tabs defaultValue="hero">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="services">Services Section</TabsTrigger>
            <TabsTrigger value="itcards">IT Cards Section</TabsTrigger>
            <TabsTrigger value="industrycards">Industry Cards Section</TabsTrigger>
            <TabsTrigger value="technologycards">Technology Cards Section</TabsTrigger>
            <TabsTrigger value="quality">Quality Services</TabsTrigger>
            <TabsTrigger value="qualityindustry">Quality Industry</TabsTrigger>
            <TabsTrigger value="technologyindustry">Technology Industry</TabsTrigger>
            <TabsTrigger value="digital">Digital Services</TabsTrigger>
            <TabsTrigger value="qualitydigital">Quality Digital</TabsTrigger>
            <TabsTrigger value="plsadvantage">PLS Advantage</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroSlidesManager initialSlides={heroSlides} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager initialServices={services} />
          </TabsContent>

          <TabsContent value="itcards">
            <ITCardsManager initialITCards={itCards} />
          </TabsContent>

          <TabsContent value="industrycards">
            <IndustryCardsManager initialIndustryCards={industryCards} />
          </TabsContent>

          <TabsContent value="technologycards">
            <TechnologyCardsManager initialTechnologyCards={technologyCards} />
          </TabsContent>

          <TabsContent value="quality">
            <QualityServicesManager initialQualityServices={qualityServices} initialImages={qualityServiceImages} />
          </TabsContent>

          <TabsContent value="qualityindustry">
            <QualityIndustryManager initialQualityIndustry={qualityIndustry} initialImages={qualityIndustryImages} />
          </TabsContent>

          <TabsContent value="technologyindustry">
            <TechnologyIndustryManager
              initialTechnologyIndustry={technologyIndustry}
              initialImages={technologyIndustryImages}
            />
          </TabsContent>

          <TabsContent value="digital">
            <DigitalServicesManager initialServices={homePage.digitalServices || []} />
          </TabsContent>

          <TabsContent value="qualitydigital">
            <QualityDigitalManager initialSection={qualityDigitalSection} />
          </TabsContent>

          <TabsContent value="plsadvantage">
            <PLSAdvantageManager initialAdvantage={plsAdvantage} />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error in admin home page:", error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Home Page Management</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          An error occurred while loading the page: {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    )
  }
}
