import { FileText, Clock } from "lucide-react"
import StaticPageLayout from "@/components/static-page-layout"

export default function RefundPolicyPage() {
  return (
    <StaticPageLayout title="Refund Policy">
      <div className="space-y-6">
        <p className="text-gray-600">Last Updated: April 15, 2023</p>

        <div className="bg-[#002B5B] bg-opacity-5 p-6 rounded-lg mb-8 border-l-4 border-[#002B5B]">
          <p className="text-gray-700 mb-0">
            At Prime Logic Solutions, we are committed to providing high-quality software development and digital
            marketing services to meet our clients' needs. In the event that a refund is requested, the following policy
            applies. This policy ensures clarity for both parties and follows industry-standard practices.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#002B5B] mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-2" /> General Refund Conditions
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Refund requests are subject to the terms outlined in this policy.</li>
            <li>
              Refunds are only considered for services provided by Prime Logic Solutions, and the conditions for each
              service are as follows.
            </li>
            <li>
              All refund requests must be made in writing to{" "}
              <span className="text-[#FF6B00] font-semibold">support@primelogicsolutions.com</span> within 14 days from
              the project delivery or service initiation.
            </li>
            <li>
              Refunds are not available after project completion, website deployment, or when the service has been
              accepted by the client.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#002B5B] mb-4 flex items-center">
            <Clock className="h-6 w-6 mr-2" /> Software Development Services Refunds
          </h2>
          <p className="text-gray-700 mb-4">
            Refunds for software development projects are provided based on the following conditions:
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-2">Pre-Development Stage</h3>
              <p className="text-gray-700">
                If no development work has started or only initial discussions or planning phases have been completed, a
                full refund will be considered.
              </p>
            </div>

            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-2">Post-Development Stage</h3>
              <p className="text-gray-700">
                Once development work has started, the client is eligible for a partial refund based on the percentage
                of completed work. Refunds will not cover any incurred costs related to third-party tools, licenses, or
                services.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-2">Testing/Deployment</h3>
              <p className="text-gray-700">
                Once the project enters the testing phase or is deployed, no refunds will be provided unless there are
                significant issues with the project that were not caused by the client.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-[#002B5B] text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="mb-4">For any questions or concerns regarding our Refund Policy, please contact us:</p>
          <div className="space-y-1">
            <p>
              Email: <span className="text-[#FF6B00]">support@primelogicsolutions.com</span>
            </p>
            <p>Phone: +1 (800) 123-4567</p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
