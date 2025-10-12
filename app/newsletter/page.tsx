import NewsletterSubscription from "./components/newsletter-subscription"

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">PLS Newsletter Subscription</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic Briefings. Lifecycle Insights. Built for Every Phase of Your Journey with Prime Logic Solutions.
          </p>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Whether you're exploring a partnership, actively building with us, or optimizing your delivered product —
            this stream keeps you informed, aligned, and technically empowered.
          </p>
        </div>

        <NewsletterSubscription />

        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Your Data, Protected
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              All subscriptions are secured with encrypted delivery.
              <br />
              We never spam. We never share. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
