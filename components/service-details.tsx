"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import * as Icons from "lucide-react"
import { CheckCircle, Ban, Rocket, MessageSquareMore, Code, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Service } from "@/types"
import { ServicesNavigation } from "@/components/services-navigation"

interface ServiceDetailsProps {
  service: Service
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  // Create a DynamicIcon component to handle icon rendering
  const DynamicIcon = ({ iconName, className }: { iconName?: string; className?: string }) => {
    if (!iconName) return <Code className={className} />

    // Check if the icon exists in the Icons object
    const IconComponent = (Icons[iconName as keyof typeof Icons] as React.ElementType) || Icons.Code
    return <IconComponent className={className} />
  }

  // Ensure service has all required properties
  const safeService = {
    ...service,
    description: service.description || { intro: [], conclusion: "" },
    challenges: service.challenges || [],
    techImperatives: service.techImperatives || [],
    businessNeeds: service.businessNeeds || [],
    scamProtection: service.scamProtection || [],
    serviceCards: service.serviceCards || [],
    advantageCards: service.advantageCards || [],
    standardCards: service.standardCards || [],
    ctaCards: service.ctaCards || [],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#003087] to-[#003087]">
        <div className="absolute inset-0 bg-[#003087]" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">{safeService.title}</h1>
          <div className="text-xl font-medium text-center">{safeService.subtitle}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Introduction */}
            <div>
              <div className="mb-8 rounded-xl overflow-hidden">
                <Image
                  src={safeService.image || "/placeholder.svg?height=400&width=800"}
                  alt={safeService.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <h2 className="text-3xl font-bold mb-6">{safeService.title}</h2>
              <div className="prose max-w-none text-gray-600">
                {safeService.description?.intro?.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Industry Challenges */}
            {safeService.challenges && safeService.challenges.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Key Industry Challenges</h3>
                <div className="bg-[#003087] p-6 rounded-lg">
                  <p className="text-white mb-4">
                    Modern enterprises face several challenges in building and maintaining cutting-edge digital
                    solutions:
                  </p>
                  <div className="grid gap-4">
                    {safeService.challenges?.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <span className="text-2xl text-white">🚫</span>
                        <span className="text-white">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technology Support Imperative */}
            {safeService.techImperatives && safeService.techImperatives.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">The Technology Support Imperative</h3>
                <div className="bg-[#003087] p-6 rounded-lg">
                  <p className="text-white mb-4">
                    To stay competitive in the digital economy, businesses require enterprise-grade web solutions that:
                  </p>
                  <div className="grid gap-4">
                    {safeService.techImperatives?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                        <span className="text-white">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Custom Web Development Services */}
            {safeService.serviceCards && safeService.serviceCards.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Custom Web Development Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {safeService.serviceCards?.map((serviceCard, index) => {
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:bg-[#003087] group"
                      >
                        <DynamicIcon
                          iconName={serviceCard.iconName}
                          className="w-10 h-10 text-[#003087] mb-4 group-hover:text-white transition-colors"
                        />
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                          {serviceCard.title}
                        </h4>
                        <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                          {serviceCard.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* The Prime Logic Advantage */}
            {safeService.advantageCards && safeService.advantageCards.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Advantage</h3>
                <div className="grid gap-4">
                  {safeService.advantageCards?.map((advantage, index) => {
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:bg-[#003087] group"
                      >
                        <DynamicIcon
                          iconName={advantage.iconName}
                          className="w-10 h-10 text-[#003087] mb-4 group-hover:text-white transition-colors"
                        />
                        <div>
                          <h4 className="font-semibold mb-1 group-hover:text-white transition-colors">
                            {advantage.title}
                          </h4>
                          <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                            {advantage.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Understanding Your Business Needs */}
            {safeService.businessNeeds && safeService.businessNeeds.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Understanding Your Business Needs</h3>
                <div className="bg-[#003087] p-6 rounded-lg">
                  <div className="grid gap-4">
                    {safeService.businessNeeds?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                        <span className="text-white">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quality & Security Standards */}
            {safeService.standardCards && safeService.standardCards.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Uncompromising Quality & Security Standards</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {safeService.standardCards?.map((standard, index) => {
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 transition-colors hover:bg-[#003087] group"
                      >
                        <DynamicIcon
                          iconName={standard.iconName}
                          className="w-10 h-10 text-[#003087] mb-4 group-hover:text-white transition-colors"
                        />
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                          {standard.title}
                        </h4>
                        <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                          {standard.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Avoid Scams Section */}
            {safeService.scamProtection && safeService.scamProtection.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Avoid Scams & Low-Quality Development</h3>
                <div className="bg-[#003087] p-6 rounded-lg">
                  <div className="grid gap-4">
                    {safeService.scamProtection?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20"
                      >
                        <Ban className="w-8 h-8 text-white flex-shrink-0" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Partnership Image */}
            <div className="mb-12">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=1200"
                  alt="Partnership and Collaboration"
                  width={1200}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r bg-[#003087] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Partner with Us</h3>
              <p className="mb-8 text-white text-lg">{safeService.description?.conclusion}</p>
              {safeService.ctaCards && safeService.ctaCards.length > 0 && (
                <div className="grid md:grid-cols-2 text-white gap-6 mb-8">
                  {safeService.ctaCards?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      className="p-4 rounded-lg border text-white border-white/20 backdrop-blur-sm transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-white/20 p-2 mt-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-[#003087] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" /> Get Started Now
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
                >
                  <MessageSquareMore className="w-5 h-5" /> Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Back to Services */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <Link href="/services">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                </Button>
              </Link>
            </div>

            {/* All Services */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8 sticky top-4">
              <h3 className="text-xl font-bold mb-4">All Services</h3>
              <ServicesNavigation currentSlug={safeService.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
