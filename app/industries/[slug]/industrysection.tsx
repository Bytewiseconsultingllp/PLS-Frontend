"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChartIcon as ChartBar, AlertTriangle, CheckCircle2 } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface IndustrySectionProps {
  title: string
  industryStatus?: {
    title: string
    items: string[]
  }
  challenges: string[]
  requirements?: string[]
}

export default function IndustrySection({
  title = "",
  industryStatus = { title: "", items: [] },
  challenges = [],
  requirements = [],
}: IndustrySectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Add console logs to debug the data
  console.log("IndustrySection props:", { title, industryStatus, challenges, requirements })

  // Ensure we have arrays to map over even if the data is missing
  const statusItems = industryStatus?.items || []
  const challengeItems = challenges || []
  const requirementItems = requirements || []

  // Wrap the return in a try-catch to prevent rendering errors
  try {
    return (
      <div className="py-12">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Industry Status, Challenges & Requirements
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Industry Status Card */}
          <motion.div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
              ${hoveredCard === "status" ? "bg-[#003087] text-white scale-105" : ""}`}
            variants={fadeInUp}
            onMouseEnter={() => setHoveredCard("status")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center mb-4">
              <ChartBar className={`w-6 h-6 ${hoveredCard === "status" ? "text-white" : "text-[#003087]"} mr-2`} />
              <h3 className="text-xl font-bold">Industry Status</h3>
            </div>
            <div className="space-y-4">
              {statusItems.length > 0 ? (
                statusItems.map((item, index) => (
                  <motion.div key={index} className="transition-all duration-300" variants={fadeInUp}>
                    <p
                      className={`text-sm ${
                        hoveredCard === "status" ? "text-white" : "text-gray-600"
                      } group-hover:text-white`}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No status items available</p>
              )}
            </div>
          </motion.div>

          {/* Industry Challenges Card */}
          <motion.div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
              ${hoveredCard === "challenges" ? "bg-[#003087] text-white scale-105" : ""}`}
            variants={fadeInUp}
            onMouseEnter={() => setHoveredCard("challenges")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle
                className={`w-6 h-6 ${hoveredCard === "challenges" ? "text-white" : "text-[#003087]"} mr-2`}
              />
              <h3 className="text-xl font-bold">Industry Challenges</h3>
            </div>
            <div className="space-y-4">
              {challengeItems.length > 0 ? (
                challengeItems.map((challenge, index) => (
                  <motion.div key={index} className="transition-all duration-300" variants={fadeInUp}>
                    <p
                      className={`text-sm ${
                        hoveredCard === "challenges" ? "text-white" : "text-gray-600"
                      } group-hover:text-white`}
                    >
                      {challenge}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No challenges available</p>
              )}
            </div>
          </motion.div>

          {/* Industry Requirements Card */}
          <motion.div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
              ${hoveredCard === "requirements" ? "bg-[#003087] text-white scale-105" : ""}`}
            variants={fadeInUp}
            onMouseEnter={() => setHoveredCard("requirements")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center mb-4">
              <CheckCircle2
                className={`w-6 h-6 ${hoveredCard === "requirements" ? "text-white" : "text-[#003087]"} mr-2`}
              />
              <h3 className="text-xl font-bold">Industry Requirements</h3>
            </div>
            <div className="space-y-4">
              {requirementItems.length > 0 ? (
                requirementItems.map((requirement, index) => (
                  <motion.div key={index} className="transition-all duration-300" variants={fadeInUp}>
                    <p
                      className={`text-sm ${
                        hoveredCard === "requirements" ? "text-white" : "text-gray-600"
                      } group-hover:text-white`}
                    >
                      {requirement}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No requirements available</p>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-8 text-center text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-[#003087] font-bold">💡 Prime Logic Solutions</span> delivers tailored healthcare
          technology solutions to meet these evolving industry demands.
        </motion.p>
      </div>
    )
  } catch (error) {
    console.error("Error rendering IndustrySection:", error)
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8 text-center">Industry Status, Challenges & Requirements</h2>
        <p className="text-red-500">Error rendering this section. Please check the console for details.</p>
      </div>
    )
  }
}
