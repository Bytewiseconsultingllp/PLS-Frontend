"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function QuoteSuccessPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "there"

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <CheckCircle className="h-24 w-24 text-green-500" />
        </motion.div>

        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h1>
            <p className="text-gray-600 mb-4">
              Thank you, {name}! Your project quote request has been successfully submitted.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <h2 className="font-medium text-gray-800 mb-2">What happens next?</h2>
              <ol className="text-sm text-left space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </span>
                  <span>Our team will review your project requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>We'll prepare a detailed quote based on your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>You'll receive your quote via email within 24-48 hours</span>
                </li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <p className="text-xs text-gray-500">
              Have questions? Contact us at <span className="font-medium">support@example.com</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
