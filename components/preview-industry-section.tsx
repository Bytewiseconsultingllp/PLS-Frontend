"use client"

import { useState } from "react"
import { BarChartIcon as ChartBar, AlertTriangle, CheckCircle2 } from "lucide-react"

interface IndustrySectionPreviewProps {
  title?: string
  industryStatus?: {
    title?: string
    items?: string[]
  }
  challenges?: string[]
  requirements?: string[]
}

export default function IndustrySectionPreview({
  title = "",
  industryStatus = { title: "", items: [] },
  challenges = [],
  requirements = [],
}: IndustrySectionPreviewProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Ensure we have arrays to map over even if the data is missing
  const statusItems = industryStatus?.items || []
  const challengeItems = challenges || []
  const requirementItems = requirements || []

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Industry Status, Challenges & Requirements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Industry Status Card */}
        <div
          className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
            ${hoveredCard === "status" ? "bg-[#003087] text-white" : ""}`}
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
                <div key={index} className="transition-all duration-300">
                  <p
                    className={`text-sm ${
                      hoveredCard === "status" ? "text-white" : "text-gray-600"
                    } group-hover:text-white`}
                  >
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No status items available</p>
            )}
          </div>
        </div>

        {/* Industry Challenges Card */}
        <div
          className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
            ${hoveredCard === "challenges" ? "bg-[#003087] text-white" : ""}`}
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
                <div key={index} className="transition-all duration-300">
                  <p
                    className={`text-sm ${
                      hoveredCard === "challenges" ? "text-white" : "text-gray-600"
                    } group-hover:text-white`}
                  >
                    {challenge}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No challenges available</p>
            )}
          </div>
        </div>

        {/* Industry Requirements Card */}
        <div
          className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-[#003087] hover:text-white group
            ${hoveredCard === "requirements" ? "bg-[#003087] text-white" : ""}`}
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
                <div key={index} className="transition-all duration-300">
                  <p
                    className={`text-sm ${
                      hoveredCard === "requirements" ? "text-white" : "text-gray-600"
                    } group-hover:text-white`}
                  >
                    {requirement}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No requirements available</p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-700">
        <span className="text-[#003087] font-bold">💡 Prime Logic Solutions</span> delivers tailored healthcare
        technology solutions to meet these evolving industry demands.
      </p>
    </div>
  )
}
