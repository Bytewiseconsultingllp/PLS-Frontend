import { getHomePage } from "@/lib/home-page"
import { HeroSection } from "@/components/home/hero-section"
import AllServices from "@/components/home/all-services"
import { IndustryCard } from "@/components/home/industry-card"
import { QualityServices } from "@/components/home/quality-services"
import { unstable_noStore as noStore } from "next/cache"
import SearchSection from "@/components/home/search-section"
import EnterpriseSuite from "@/components/home/enterprise-suite"
import DigitalServices from "@/components/home/digital-services"
import QualityDigital from "@/components/home/quality-digital"
import IndustryCardSection from "@/components/home/industry-card-section"
import { QualityIndustry } from "@/components/home/quality-industry"
import TechnologyCardSection from "@/components/home/technology-card-section"
import { TechnologyIndustry } from "@/components/home/technology_industry"
import Designers from "@/components/home/designers"
import Clientcard from "@/components/home/client-card"
import Testimonials from "@/components/home/testimonials"
import Talents from "@/components/home/talents"
import ProcessTimeline from "@/components/home/process-timeline"
import Appointment from "@/components/home/appointment"
import PLSAdvantage from "@/components/home/pls-advantage"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LazySection } from "@/components/ui/lazy-section"

// Simple loader component
function SectionLoader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
    </div>
  )
}

export default function Home() {
  return (
    <ErrorBoundary>
      <MainContent />
    </ErrorBoundary>
  )
}

async function MainContent() {
  // Disable caching to ensure fresh data
  noStore()

  // Fetch home page data
  const homePageData = await getHomePage()

  return (
    <main>
      <Suspense fallback={<SectionLoader />}>
        <HeroSection slides={homePageData?.heroSlides || []} />
      </Suspense>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <AllServices services={homePageData?.services || []} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <PLSAdvantage data={homePageData?.plsAdvantage || {}} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <SearchSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <IndustryCard itCards={homePageData?.itCards || []} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <QualityServices
            services={homePageData?.qualityServices || []}
            images={
              homePageData?.qualityServiceImages || {
                topImage: "/assets/17.png",
                bottomImage: "/assets/22.png",
              }
            }
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <DigitalServices services={homePageData?.digitalServices || []} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <QualityDigital
            services={homePageData?.qualityDigitalSection?.services || []}
            images={
              homePageData?.qualityDigitalSection?.images || {
                topImage: "/assets/9.png",
                bottomImage: "/assets/11.png",
              }
            }
            heading={homePageData?.qualityDigitalSection?.heading}
            subheading={homePageData?.qualityDigitalSection?.subheading}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <EnterpriseSuite />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <IndustryCardSection industryCards={homePageData?.industryCards || []} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <QualityIndustry
            industries={homePageData?.qualityIndustry || []}
            images={
              homePageData?.qualityIndustryImages || {
                topImage: "/assets/9.png",
                bottomImage: "/assets/15.png",
              }
            }
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <TechnologyCardSection technologyCards={homePageData?.technologyCards || []} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <TechnologyIndustry
            industries={homePageData?.technologyIndustry || []}
            images={
              homePageData?.technologyIndustryImages || {
                topImage: "/assets/6.png",
                bottomImage: "/assets/11.png",
              }
            }
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Designers />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Clientcard />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Talents />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <ProcessTimeline />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Appointment />
        </Suspense>
      </LazySection>
    </main>
  )
}
