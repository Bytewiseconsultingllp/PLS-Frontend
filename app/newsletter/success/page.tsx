import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Confirmed!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for subscribing to the PLS Newsletter. You'll start receiving valuable insights and updates tailored
          to your needs.
        </p>

        <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
          <p className="text-sm text-green-800">
            A confirmation email has been sent to your inbox. Please check your email to verify your subscription.
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
