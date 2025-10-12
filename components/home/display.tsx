"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { text: "AI & Automation" },
  { text: "Enterprise Security" },
  { text: "Cloud Mastery" },
  { text: "Data-Driven Growth" },
  { text: "Omnichannel Optimization" },
  { text: "Regulatory Compliance" },
]

export default function Display() {
  return (
    <section className="py-16 md:py-24 overflow-hidden dark:bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[#FF6B35] font-semibold">PLS Competitive Advantage</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Unmatched Competitive Edge: Future-Ready Solutions for American Businesses
            </h2>

            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-[#FF6B35]">25</div>
              <div>
                <h3 className="text-xl font-bold text-[#FF6B35] mb-2">Years of Industry Leadership</h3>
                <p className="text-gray-600">
                  Harness the power of AI, automation, and digital transformation to drive scalability, security, and
                  data-driven growth. With decades of expertise, we equip businesses with the tools to outperform,
                  adapt, and lead in an evolving market.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-black">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="text-[#FF6B35] ml-24 h-5 w-5 flex-shrink-0" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <Button className="group text-[#FF6B35] hover:text-[#003087] text-xl">
              <strong>LEARN MORE</strong>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right Column - Images */}
          <div className="relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 right-0 w-4/5 h-[400px]"
            >
              <Image
                src="/assets/13.png"
                alt="Team collaboration"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 40vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-3/5 h-[300px]"
            >
              <Image
                src="/assets/12.png"
                alt="Business meeting"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-20 right-20 w-2/5 h-[250px]"
            >
              <Image
                src="/assets/15.png"
                alt="Professional working"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
