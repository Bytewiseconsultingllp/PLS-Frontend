"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const JobCard = () => {
  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-7xl mx-auto bg-[#003087] rounded-2xl overflow-hidden text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid md:grid-cols-3 items-center">
          {/* Image Section */}
          <motion.div
            className="col-span-2 relative h-full min-h-[600px] bg-[#003087]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/assets/work.png" alt="Enterprise" layout="fill" objectFit="cover" />
          </motion.div>

          {/* Content Section */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Heading */}
              <motion.h2
                className="text-3xl text-white font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Work with Us
              </motion.h2>

              {/* Animated Paragraph */}
              <motion.p
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join our dynamic team and work on exciting projects with top clients worldwide.
              </motion.p>

              {/* Animated Button */}
              <motion.a
                href={`${process.env.DASHBOARD_URL}`}
                className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Find Work
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default JobCard
