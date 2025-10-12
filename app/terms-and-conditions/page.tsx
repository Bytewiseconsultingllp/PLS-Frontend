import StaticPageLayout from "@/components/static-page-layout"

export default function TermsAndConditionsPage() {
  return (
    <StaticPageLayout title="Terms and Conditions">
      <div className="prose max-w-none">
        <div className="flex justify-between items-center mb-6 text-gray-600 text-sm">
          <p>Effective Date: January 1, 2023</p>
          <p>Last Updated: March 15, 2023</p>
        </div>

        <h2 className="text-xl font-bold text-[#003087] mt-6 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Prime Logic Solutions ("Company", "we", "us", or "our"). These Terms and Conditions ("Terms")
          govern your access and use of our IT solutions, digital marketing services, software, platforms, and other
          offerings ("Services").
        </p>
        <p className="text-gray-700 mb-6">
          By using our services, you agree to these Terms. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">2. Definitions</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">"Client" / "User"</span> – Any individual, business, or organization using
            our services.
          </li>
          <li>
            <span className="font-semibold">"Services"</span> – Any IT solutions, software development, marketing, or
            consultancy provided by us.
          </li>
          <li>
            <span className="font-semibold">"Agreement"</span> – The binding contract between the client and Prime Logic
            Solutions.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">3. Use of Services</h2>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">a. Eligibility</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>You must be at least 18 years old to use our services.</li>
          <li>By signing up, you confirm that all information provided is accurate, complete, and up-to-date.</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">b. Prohibited Activities</h3>
        <p className="text-gray-700 mb-2">You agree not to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Use our services for fraudulent, illegal, or unethical purposes.</li>
          <li>Attempt to hack, reverse-engineer, or disrupt our platforms.</li>
          <li>Misrepresent yourself or violate intellectual property rights.</li>
          <li>Share unauthorized login credentials with third parties.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">4. Payments & Billing</h2>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">a. Pricing & Fees</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>All services are billed according to the pricing agreed upon at the time of purchase.</li>
          <li>Prices are subject to change with prior notice.</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">b. Payment Terms</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Payments must be made before service delivery, unless otherwise agreed.</li>
          <li>Late payments may result in suspension of services.</li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">c. Taxes</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Clients are responsible for any applicable local, state, or international taxes.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">5. Intellectual Property Rights</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            All software, content, trademarks, and proprietary materials developed by Prime Logic Solutions remain our
            exclusive property.
          </li>
          <li>
            Clients may use our products only as licensed. Unauthorized duplication or resale is strictly prohibited.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">6. Data Protection & Privacy</h2>
        <p className="text-gray-700 mb-6">
          We protect user data under our Privacy Policy and comply with GDPR, CCPA, and industry best practices.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">7. Service Warranties & Disclaimers</h2>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">a. No Guarantee of Results</h3>
        <p className="text-gray-700 mb-4">
          We strive for high-quality performance, but we do not guarantee specific outcomes for marketing, software, or
          IT services.
        </p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">b. Limitation of Liability</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            Prime Logic Solutions is not liable for any indirect, incidental, or consequential damages arising from
            service use.
          </li>
          <li>
            Our total liability shall not exceed the amount paid by the client for the specific service in question.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">8. Termination</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Either party may terminate services with written notice as specified in the service agreement.</li>
          <li>We reserve the right to terminate services for violations of these Terms.</li>
          <li>Upon termination, all outstanding payments become immediately due.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">9. Modifications to Terms</h2>
        <p className="text-gray-700 mb-6">
          We may update these Terms periodically. Continued use of our services after changes constitutes acceptance of
          the revised Terms.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">10. Governing Law</h2>
        <p className="text-gray-700 mb-6">
          These Terms are governed by the laws of [Jurisdiction], without regard to its conflict of law principles.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">11. Dispute Resolution</h2>
        <p className="text-gray-700 mb-6">
          Any disputes shall be resolved through arbitration in accordance with the rules of [Arbitration Association]
          before pursuing legal action.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">12. Contact Information</h2>
        <p className="text-gray-700 mb-6">
          For questions about these Terms, please contact us at:
          <br />
          Email: legal@primelogicsolutions.com
          <br />
          Address: 123 Tech Avenue, Suite 500, Innovation City, IC 12345
        </p>

        <div className="border-t border-gray-300 mt-10 pt-6 text-gray-600 text-sm">
          <p>© 2025 Prime Logic Solutions. All rights reserved.</p>
        </div>
      </div>
    </StaticPageLayout>
  )
}
