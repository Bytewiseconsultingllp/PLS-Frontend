import { Cookie } from "lucide-react"
import StaticPageLayout from "@/components/static-page-layout"

export default function CookiesAndPrivacyPolicyPage() {
  return (
    <StaticPageLayout title="Cookies and Privacy Policy">
      <div className="space-y-6">
        <p className="text-gray-600">Last Updated: April 15, 2023</p>

        <div className="bg-[#002B5B] bg-opacity-5 p-6 rounded-lg mb-8 border-l-4 border-[#002B5B]">
          <p className="text-gray-700 mb-0">
            At Prime Logic Solutions, we value your privacy and are committed to protecting your personal information.
            This Cookies and Privacy Policy outlines the information we collect, how we use it, and how we protect it
            when you visit our website or use our services.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#002B5B] mb-4 flex items-center">
            <Cookie className="h-6 w-6 mr-2" /> What Are Cookies?
          </h2>
          <p className="text-gray-700 mb-4">
            Cookies are small text files stored on your device (computer, tablet, smartphone) that help websites
            remember information about your visit. This may include login details, language preferences, or tracking
            information to enhance your experience on our website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#002B5B] mb-4">How We Use Cookies</h2>
          <p className="text-gray-700 mb-4">We use cookies for the following purposes:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-2">Essential Cookies</h3>
              <p className="text-gray-700">
                These cookies are necessary for the website to function properly and are essential for you to navigate
                and use the site's features.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-2">Analytical Cookies</h3>
              <p className="text-gray-700">
                These cookies help us understand how visitors use our website. We use tools like Google Analytics to
                gather data on page views, bounce rates, and user engagement to improve the website and our services.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-[#002B5B] text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about our Cookies and Privacy Policy, please contact us:
          </p>
          <div className="space-y-1">
            <p>
              Email: <span className="text-[#FF6B00]">privacy@primelogicsolutions.com</span>
            </p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
