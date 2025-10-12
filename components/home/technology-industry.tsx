"use client"
import { motion } from "framer-motion"

export function TechnologyIndustry() {
  // If this component already exists elsewhere, you should move the implementation here
  // This is a placeholder implementation
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Industry Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Innovative technology solutions tailored for various industries to drive digital transformation and business
            growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Content would go here */}
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Enterprise Solutions</h3>
            <p className="text-gray-600">Comprehensive technology solutions for enterprise-level businesses.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Cloud Services</h3>
            <p className="text-gray-600">Scalable cloud infrastructure and services for modern businesses.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Digital Transformation</h3>
            <p className="text-gray-600">End-to-end digital transformation strategies and implementation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnologyIndustry
