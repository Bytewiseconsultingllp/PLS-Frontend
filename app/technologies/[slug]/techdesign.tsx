"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { techSelection, whyChooseUs } from "@/components/data/techdata"
import ContactForm from "@/app/components/layout/contactform"
// Import the ImageWithFallback component
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface TechnologyData {
  id: string
  title: string
  subtitle: string
  description: {
    intro: string[]
    conclusion: string
  }
  features: {
    title: string
    description: string
    details: string[]
  }[]
  benefits: {
    title: string
    description: string
  }[]
  techStack: {
    title: string
    stack: {
      category: string
      items: string[]
    }[]
  }
  services: {
    title: string
    description: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
}

interface Props {
  data: TechnologyData
  type: "technology"
  parentTitle?: string
}

const sidebarCategories = ["Overview", "Features", "Benefits", "Tech Stack", "Services", "FAQ"]

const webTechnologies = ["React", "Angular", "Vue", "Node.js", "Django", "Rails", "ASP.NET", "PHP", "Laravel", "Spring"]

export default function TechnologyDetails({ data, type, parentTitle }: Props) {
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [techStackData, setTechStackData] = useState<any>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Process and normalize tech stack data
    if (data) {
      console.log("Original tech stack data:", data.techStack)

      const processedTechStack = {
        title: "Technology Stack",
        stack: [],
      }

      // Case 1: data.techStack exists in expected format
      if (data.techStack && typeof data.techStack === "object") {
        processedTechStack.title = data.techStack.title || "Technology Stack"

        // Handle stack array
        if (Array.isArray(data.techStack.stack)) {
          processedTechStack.stack = data.techStack.stack
        }
      }

      // Case 2: Legacy format - techStacks array at root level
      else if (data.techStacks && Array.isArray(data.techStacks)) {
        processedTechStack.stack = data.techStacks.map((stack: any) => ({
          category: stack.title || "Category",
          items: Array.isArray(stack.technologies) ? stack.technologies : [],
        }))
      }

      // Fallback for empty data
      if (!processedTechStack.stack || processedTechStack.stack.length === 0) {
        // Create a default stack with empty items
        processedTechStack.stack = [
          {
            category: "Frontend",
            items: [],
          },
          {
            category: "Backend",
            items: [],
          },
        ]
      }

      console.log("Processed tech stack data:", processedTechStack)
      setTechStackData(processedTechStack)
    }
  }, [data])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleImageError = () => {
    console.error("Failed to load hero image")
    setImageError(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="relative bg-gray-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src="/interconnected-network.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#003087] text-white opacity-80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">{data.title}</h1>
            <div className="flex items-center justify-center space-x-2">
              <Link href="/" className="text-white hover:text-[#FF6B35]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/technologies" className="text-white hover:text-[#FF6B35]">
                Technologies
              </Link>
              {parentTitle && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href={`/technologies/${parentTitle.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white hover:text-[#FF6B35]"
                  >
                    {parentTitle}
                  </Link>
                </>
              )}
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#FF6B35]">{data.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-200 relative">
                  Web Technologies
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FF6B35]"></span>
                </h2>
                <ul className="space-y-3">
                  {webTechnologies.map((tech, index) => (
                    <li key={index}>
                      <Link
                        href={`/technologies/web-tech/${tech.toLowerCase().replace(/\./g, "")}`}
                        className={`group flex items-center justify-between p-3 border border-gray-200 text-black rounded-md transition-all duration-300 hover:bg-[#003087] ${
                          data.title.includes(tech) ? "bg-[#003087] text-white" : ""
                        }`}
                      >
                        <span className="font-medium group-hover:text-white">{tech}</span>
                        <Plus
                          className={`h-4 w-4 ${
                            data.title.includes(tech) ? "text-white" : "text-[#FF6B35] group-hover:text-white"
                          }`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-6">
                  Get expert guidance on implementing {data.title} for your specific business needs.
                </p>
                <Button className="w-full bg-[#003087] hover:bg-[#004087]">Contact Our Experts</Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Overview Section */}
              <section id="overview" className="mb-8">
                <Card className="p-8">
                  <div className="mb-6 rounded-lg overflow-hidden relative h-[300px]">
                    <ImageWithFallback
                      src="/assets/17.png"
                      alt={`${data.title} Overview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      fallbackSrc="/interconnected-future.png"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{data.subtitle}</h2>
                  {data.description.intro.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </Card>
              </section>

              {/* Features Section */}
              <section id="features" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid gap-6">
                    {data.features.map((feature, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-[#003087] group-hover:text-white mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold mb-2 group-hover:text-white">{feature.title}</h3>
                            <p className="text-gray-600 mb-2 group-hover:text-gray-200">{feature.description}</p>
                            <ul className="space-y-2">
                              {feature.details.map((detail, idx) => (
                                <li
                                  key={idx}
                                  className="text-gray-600 group-hover:text-gray-200 text-sm flex items-start"
                                >
                                  <span className="mr-2">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Technology Selection Section */}
              <section id="tech-selection" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-4">We Know What Technology Suits Your Requirements</h2>
                  <p className="text-gray-600 mb-8">
                    Technology is not one-size-fits-all. At Prime Logic Solutions, we analyze your business objectives,
                    industry regulations, scalability needs, and security concerns to implement the most effective
                    digital solutions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {techSelection.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-white">{item.title}</h3>
                        <p className="text-gray-600 text-sm group-hover:text-gray-200">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Why Choose Us Section */}
              <section id="why-choose-us" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Why Prime Logic Solutions?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyChooseUs.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-white">{item.title}</h3>
                        <p className="text-gray-600 text-sm group-hover:text-gray-200">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Benefits Section */}
              <section id="benefits" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-white">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm group-hover:text-gray-200">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Tech Stack Section */}
              <section id="tech-stack" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">{techStackData?.title || "Technology Stack"}</h2>
                  <div className="grid gap-6">
                    {techStackData && Array.isArray(techStackData.stack) && techStackData.stack.length > 0 ? (
                      techStackData.stack.map((stack: any, index: number) => (
                        <div
                          key={index}
                          className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                        >
                          <h3 className="font-bold mb-4 group-hover:text-white">{stack.category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(stack.items) && stack.items.length > 0 ? (
                              stack.items.map((item: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 group-hover:bg-gray-100 group-hover:text-[#003087]"
                                >
                                  {item}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 group-hover:bg-gray-100 group-hover:text-[#003087]">
                                No items available
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-600">No technology stack information available</p>
                      </div>
                    )}
                  </div>
                </Card>
              </section>

              {/* Services Section */}
              <section id="services" className="mb-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Our Services</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.services.map((service, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-white">{service.title}</h3>
                        <p className="text-gray-600 text-sm group-hover:text-gray-200">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <Card className="p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="grid gap-6">
                    {data.faq.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-[#003087]"
                      >
                        <h3 className="font-bold mb-2 group-hover:text-white">{item.question}</h3>
                        <p className="text-gray-600 text-sm group-hover:text-gray-200">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
