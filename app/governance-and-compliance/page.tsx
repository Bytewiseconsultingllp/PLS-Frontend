import StaticPageLayout from "@/components/static-page-layout"
import { Shield, Lock, FileText, CheckCircle } from "lucide-react"

export default function GovernanceAndCompliancePage() {
  return (
    <StaticPageLayout title="Governance and Compliance">
      <div className="space-y-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Prime Logic Solutions, we uphold the highest standards of corporate governance to ensure transparency,
            ethical conduct, and accountability in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-[#002B5B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#002B5B]">Corporate Governance</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Our governance framework is designed to ensure that we operate with integrity, transparency, and
              accountability at all levels of the organization.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Board oversight and independent directors</li>
              <li>Regular audits and financial transparency</li>
              <li>Ethical business practices and code of conduct</li>
              <li>Whistleblower protection and reporting mechanisms</li>
              <li>Risk management and mitigation strategies</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mr-4">
                <Lock className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B00]">Data Privacy & Security</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We are committed to protecting the privacy and security of our clients' data through robust policies,
              procedures, and technologies.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Comprehensive data protection policies</li>
              <li>Advanced encryption and security protocols</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Employee training on data privacy and security</li>
              <li>Incident response and breach notification procedures</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Regulatory Compliance</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-700 mb-6">
              We adhere to all applicable laws, regulations, and industry standards to ensure that our operations are
              compliant and ethical.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#002B5B]" />
                  Data Protection Compliance
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>GDPR (General Data Protection Regulation)</li>
                  <li>CCPA (California Consumer Privacy Act)</li>
                  <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
                  <li>PIPEDA (Personal Information Protection and Electronic Documents Act)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#002B5B]" />
                  Information Security Standards
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>ISO 27001 (Information Security Management)</li>
                  <li>SOC 2 (Service Organization Control)</li>
                  <li>NIST Cybersecurity Framework</li>
                  <li>PCI DSS (Payment Card Industry Data Security Standard)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#002B5B]" />
                  Industry-Specific Regulations
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>FISMA (Federal Information Security Management Act)</li>
                  <li>FedRAMP (Federal Risk and Authorization Management Program)</li>
                  <li>GLBA (Gramm-Leach-Bliley Act)</li>
                  <li>FERPA (Family Educational Rights and Privacy Act)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#002B5B]" />
                  International Standards
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>APEC Privacy Framework</li>
                  <li>EU-US Privacy Shield</li>
                  <li>APPI (Act on the Protection of Personal Information - Japan)</li>
                  <li>LGPD (Lei Geral de Proteção de Dados - Brazil)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Ethical Business Practices</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FF6B00]">Code of Conduct</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our Code of Conduct outlines the ethical standards and behaviors expected of all employees, contractors,
                and partners.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Integrity and honesty in all business dealings</li>
                <li>Respect for human rights and dignity</li>
                <li>Fair treatment of employees, clients, and partners</li>
                <li>Avoidance of conflicts of interest</li>
                <li>Protection of confidential information</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-[#002B5B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#002B5B]">Anti-Corruption & Anti-Bribery</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We have a zero-tolerance policy for corruption and bribery in all our business operations.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Compliance with the Foreign Corrupt Practices Act (FCPA) and UK Bribery Act</li>
                <li>Prohibition of facilitation payments and kickbacks</li>
                <li>Due diligence on third-party relationships</li>
                <li>Regular training and awareness programs</li>
                <li>Transparent gift and hospitality policies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6 text-center">Governance Structure</h2>
          <div className="bg-[#002B5B] bg-opacity-5 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Board of Directors</h3>
                <p className="text-gray-700">
                  Provides strategic oversight and ensures alignment with our mission, vision, and values.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Executive Leadership</h3>
                <p className="text-gray-700">
                  Implements the board's strategic direction and manages day-to-day operations with integrity and
                  accountability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Compliance Committee</h3>
                <p className="text-gray-700">
                  Monitors and ensures compliance with all applicable laws, regulations, and internal policies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#002B5B] text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to Ethical Leadership</h2>
          <p className="mb-6 text-center">
            At Prime Logic Solutions, we believe that good governance and ethical business practices are not just legal
            requirements but essential components of our corporate identity and long-term success. We are committed to
            maintaining the highest standards of integrity, transparency, and accountability in all our operations.
          </p>
          <div className="text-center">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#002B5B] bg-white hover:bg-gray-100"
            >
              Contact Our Compliance Team
            </a>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
