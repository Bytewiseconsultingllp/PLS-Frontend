"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center py-4">
      <motion.div
        className="w-4 h-4 bg-blue-600 rounded-full mr-1"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
        }}
      />
      <motion.div
        className="w-4 h-4 bg-blue-600 rounded-full mr-1"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-4 h-4 bg-blue-600 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0.4,
        }}
      />
    </div>
  )
}
