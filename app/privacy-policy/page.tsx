import StaticPageLayout from "@/components/static-page-layout"

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <div className="prose max-w-none">
        <div className="flex justify-between items-center mb-6 text-gray-600 text-sm">
          <p>Effective Date: April 4, 2025</p>
          <p>Last Updated: April 4, 2025</p>
        </div>

        <h2 className="text-xl font-bold text-[#003087] mt-6 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          At Prime Logic Solutions, we take your privacy and data security seriously. This Privacy Policy outlines how
          we collect, use, store, and protect your personal and business data when you use our website, platforms,
          services, and products.
        </p>
        <p className="text-gray-700 mb-6">
          By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree, please
          refrain from using our services.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect different types of personal and non-personal data, including but not limited to:
        </p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">a. Information You Provide to Us</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Personal Identifiable Information (PII):</span> Name, email address, phone
            number, job title, company name, billing details, and payment information.
          </li>
          <li>
            <span className="font-semibold">Account Information:</span> Username, passwords, and authentication
            credentials when you create an account.
          </li>
          <li>
            <span className="font-semibold">Business Information:</span> Business name, tax ID, entity number, NAICS
            codes, and DUNS registration (if applicable).
          </li>
          <li>
            <span className="font-semibold">Communication Data:</span> Emails, messages, and chat interactions with our
            support team.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">b. Information Collected Automatically</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Device & Usage Data:</span> IP addresses, browser type, device type,
            operating system, and browsing behavior.
          </li>
          <li>
            <span className="font-semibold">Cookies & Tracking Technologies:</span> We use cookies, beacons, and
            analytics tools (e.g., Google Analytics) to monitor site usage.
          </li>
          <li>
            <span className="font-semibold">Log Data:</span> Server logs, timestamps, and errors for security monitoring
            and fraud prevention.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">c. Information from Third-Party Sources</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Business Partners & Vendors:</span> We may collect additional information
            from our affiliates, partners, or data providers.
          </li>
          <li>
            <span className="font-semibold">Public Databases:</span> We verify business credentials using SAM.gov, DUNS,
            and regulatory sources.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">We use your information to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Provide, improve, and secure our services</li>
          <li>Process transactions and manage accounts</li>
          <li>Personalize user experience and service recommendations</li>
          <li>Ensure compliance with legal and security requirements</li>
          <li>Send service updates, marketing communications (with opt-out options), and system alerts</li>
          <li>Analyze trends, website usage, and business performance</li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">4. Data Sharing & Disclosure</h2>
        <p className="text-gray-700 mb-4">
          We never sell or rent your personal data. However, we may share your information under the following
          conditions:
        </p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">a. Service Providers & Partners</h3>
        <p className="text-gray-700 mb-4">
          We may share data with trusted vendors, cloud providers, payment processors, and security firms who help us
          operate our services.
        </p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">b. Legal & Compliance Requirements</h3>
        <p className="text-gray-700 mb-4">
          We may disclose information when required by law, subpoenas, or regulatory authorities to protect our legal
          rights and prevent fraud or cyber threats.
        </p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">c. Business Transfers</h3>
        <p className="text-gray-700 mb-4">
          If Prime Logic Solutions undergoes a merger, acquisition, or restructuring, user data may be transferred as
          part of the business transition.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">5. Data Security & Protection Measures</h2>
        <p className="text-gray-700 mb-4">
          We implement industry-leading security protocols to protect your data, including:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Encryption (AES-256) & Secure Transmission (SSL/TLS)</li>
          <li>Zero-trust architecture & multi-factor authentication (MFA)</li>
          <li>Regular vulnerability testing & penetration audits</li>
          <li>Access control & role-based data permissions</li>
        </ul>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">6. Your Rights & Control Over Your Data</h2>
        <p className="text-gray-700 mb-4">Depending on your jurisdiction, you may have the following rights:</p>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">For GDPR (EU/UK) Users:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Right to Access:</span> Request copies of your data.
          </li>
          <li>
            <span className="font-semibold">Right to Rectification:</span> Correct inaccurate data.
          </li>
          <li>
            <span className="font-semibold">Right to Erasure ("Right to be Forgotten"):</span> Request deletion of
            personal data.
          </li>
          <li>
            <span className="font-semibold">Right to Restrict Processing:</span> Limit how we use your data.
          </li>
          <li>
            <span className="font-semibold">Right to Data Portability:</span> Receive data in a structured format.
          </li>
          <li>
            <span className="font-semibold">Right to Object:</span> Opt-out of direct marketing and automated
            decision-making.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-[#003087] mt-6 mb-3">For CCPA (California) Users:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Right to Know:</span> Request details of what data we collect.
          </li>
          <li>
            <span className="font-semibold">Right to Delete:</span> Request deletion of personal information.
          </li>
          <li>
            <span className="font-semibold">Right to Opt-Out:</span> Opt-out of data selling (we do not sell data).
          </li>
          <li>
            <span className="font-semibold">Right to Non-Discrimination:</span> We do not penalize users for exercising
            their rights.
          </li>
        </ul>

        <p className="text-gray-700 mb-6">To exercise your rights, please contact us at [Insert Contact Email].</p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">7. Data Retention Policy</h2>
        <p className="text-gray-700 mb-4">We retain personal data only as long as necessary for:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Service provision and legal compliance</li>
          <li>Security, fraud prevention, and dispute resolution</li>
        </ul>
        <p className="text-gray-700 mb-6">We securely delete or anonymize data when no longer needed.</p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">8. Third-Party Links & External Services</h2>
        <p className="text-gray-700 mb-6">
          Our website may contain links to third-party websites. We are not responsible for their privacy practices.
          Please review their policies before sharing personal data.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">9. Children's Privacy</h2>
        <p className="text-gray-700 mb-6">
          Our services are not intended for children under 16. We do not knowingly collect data from minors.
        </p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">10. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this policy from time to time. The latest version will always be available at [Website Link].
        </p>
        <p className="text-gray-700 mb-6">Last Updated: April 4, 2025</p>

        <h2 className="text-xl font-bold text-[#003087] mt-8 mb-4">11. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          For any privacy-related concerns, questions, or data access requests, contact us:
        </p>
        <div className="mb-6">
          <p className="font-semibold text-gray-800">Prime Logic Solutions</p>
          <p className="text-gray-700">Headquarters: [Insert Address]</p>
          <p className="text-gray-700">Email: [Insert Email]</p>
        </div>
      </div>
    </StaticPageLayout>
  )
}
