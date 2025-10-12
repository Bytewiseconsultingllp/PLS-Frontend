import Link from "next/link"
import { FileDown } from "lucide-react"
import StaticPageLayout from "@/components/static-page-layout"
import { Button } from "@/components/ui/button"

export default function FreelancerVsPrimeLogicPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <StaticPageLayout title="Freelancer Developers vs Prime Logic Solutions">
      <div className="space-y-8">
        {/* Responsive header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-gray-500">Last Updated: {currentDate}</p>
          <Link href="/documents/freelancer-vs-prime-logic.pdf" target="_blank" passHref>
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#003087]">
              <FileDown className="h-5 w-5" />
              <span className="sm:inline">View Service Agreement PDF</span>
            </Button>
          </Link>
        </div>

        {/* Mobile-only floating button for quick access */}
        <div className="sm:hidden fixed bottom-6 right-6 z-50">
          <Link href="/documents/freelancer-vs-prime-logic.pdf" target="_blank" passHref>
            <Button size="icon" className="h-12 w-12 rounded-full bg-[#003087] hover:bg-[#003087] shadow-lg">
              <FileDown className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-[#003087] mb-4">
            Freelancer Developers vs Prime Logic Solutions Service Agreement
          </h2>

          {/* Rest of the content remains the same */}
          <p className="text-gray-700">
            This Service Agreement (the "Agreement") is entered into between Prime Logic Solutions ("Service Provider"
            or "Prime Logic Solutions") and the Freelancer Developer ("Freelancer" or "Contractor"). This Agreement
            outlines the terms and conditions governing the relationship between both parties regarding the provision of
            development and other related services.
          </p>

          <div className="bg-blue-50 p-4 rounded-md my-6">
            <p>
              <strong>Effective Date:</strong> [Effective Date of Agreement]
            </p>
            <p>
              <strong>Service Provider:</strong> Prime Logic Solutions
            </p>
            <p>
              <strong>Freelancer:</strong> [Freelancer Name]
            </p>
            <p>
              <strong>Agreement Reference Number:</strong> [Unique Reference Number]
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">1. Scope of Services</h3>
          <p>Prime Logic Solutions engages the Freelancer to provide the following services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Software Development:</strong> Development of web and mobile applications, APIs, and database
              integration.
            </li>
            <li>
              <strong>Digital Marketing:</strong> SEO services, content creation, social media campaigns, and digital
              advertising.
            </li>
            <li>
              <strong>Consulting:</strong> Providing expert advice in areas like technology selection, software
              architecture, and business solutions.
            </li>
            <li>
              <strong>Specific Deliverables:</strong> The Freelancer will deliver the agreed-upon work according to the
              milestones, timelines, and specifications outlined in the project scope document.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">2. Project Timeline and Deliverables</h3>
          <p>The following timelines apply to the specific project being worked on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Start Date:</strong> [Start Date]
            </li>
            <li>
              <strong>Completion Date:</strong> [Completion Date]
            </li>
            <li>
              <strong>Milestone Deliverables:</strong> The project will be broken down into deliverable milestones
              (e.g., design phase, development phase, testing phase). Each phase will be clearly defined in the project
              scope document.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">3. Payment Terms</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Total Project Fee:</strong> [Total Fee Amount]
            </li>
            <li>
              <strong>Payment Schedule:</strong>
              <ul className="list-circle pl-6 space-y-1 mt-2">
                <li>
                  <strong>Initial Deposit:</strong> [Amount/Percentage] due upon signing this Agreement.
                </li>
                <li>
                  <strong>Milestone Payments:</strong> Payments will be made upon the completion of each milestone, as
                  outlined in the project scope document.
                </li>
                <li>
                  <strong>Final Payment:</strong> The final payment will be made upon project completion and client
                  acceptance of all deliverables.
                </li>
              </ul>
            </li>
            <li>
              <strong>Late Payments:</strong> A late fee of [Late Fee Percentage] per month will be charged on overdue
              payments.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">4. Freelancer Responsibilities</h3>
          <p>The Freelancer will be responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meeting project deadlines and delivering work as per the scope and quality standards.</li>
            <li>Communicating regularly with Prime Logic Solutions and providing progress reports.</li>
            <li>
              Ensuring that all deliverables are bug-free and meet the requirements outlined in the project scope.
            </li>
            <li>
              Using the agreed-upon technologies and frameworks for development, as discussed in the project
              specification.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">5. Prime Logic Solutions Responsibilities</h3>
          <p>Prime Logic Solutions will:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide the Freelancer with access to necessary tools, resources, and documentation.</li>
            <li>Act as the main point of contact for any client-related queries or approvals.</li>
            <li>Oversee the quality assurance process and ensure that the deliverables meet client expectations.</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">6. Intellectual Property</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Ownership:</strong> Upon full payment, the Freelancer transfers all rights, ownership, and
              intellectual property of the project deliverables to Prime Logic Solutions.
            </li>
            <li>
              <strong>License:</strong> Prime Logic Solutions retains the right to use the Freelancer's work for
              marketing or portfolio purposes but grants the Freelancer no rights to use the deliverables without
              express permission.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">
            7. Confidentiality and Non-Disclosure Agreement (NDA)
          </h3>
          <p>
            Both parties agree to the following terms regarding confidentiality and non-disclosure of sensitive
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Confidential Information:</strong> Any information disclosed by either party that is marked
              confidential or can be reasonably understood as confidential, including business plans, software, customer
              information, trade secrets, and any proprietary information.
            </li>
            <li>
              <strong>Obligations of the Freelancer:</strong>
              <ul className="list-circle pl-6 space-y-1 mt-2">
                <li>
                  The Freelancer agrees not to disclose, share, or use any confidential information for any purpose
                  other than performing their duties under this Agreement.
                </li>
                <li>
                  The Freelancer will take all necessary precautions to safeguard the confidential information and
                  ensure its security.
                </li>
              </ul>
            </li>
            <li>
              <strong>Obligations of Prime Logic Solutions:</strong>
              <ul className="list-circle pl-6 space-y-1 mt-2">
                <li>
                  Prime Logic Solutions agrees not to disclose any confidential information shared by the Freelancer in
                  the course of the engagement, including their professional skills, methodologies, and any proprietary
                  tools.
                </li>
              </ul>
            </li>
            <li>
              <strong>Exceptions:</strong> Confidential information does not include:
              <ul className="list-circle pl-6 space-y-1 mt-2">
                <li>Information that becomes publicly known without breach of this Agreement.</li>
                <li>Information that the receiving party can demonstrate was already known prior to disclosure.</li>
              </ul>
            </li>
            <li>
              <strong>Duration of NDA:</strong> The obligations in this section shall remain in effect for two years
              after the termination or expiration of this Agreement.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">8. Warranties and Support</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Freelancer Warranties:</strong> The Freelancer warrants that the deliverables will meet the agreed
              specifications and will be free of defects.
            </li>
            <li>
              <strong>Post-Delivery Support:</strong> The Freelancer will provide [X] weeks/months of support after the
              delivery for bug fixes or minor changes, unless otherwise stated.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">9. Termination</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>By the Freelancer:</strong> The Freelancer may terminate this Agreement with written notice if
              Prime Logic Solutions fails to make payments or breaches the terms of the Agreement.
            </li>
            <li>
              <strong>By Prime Logic Solutions:</strong> Prime Logic Solutions may terminate this Agreement if the
              Freelancer fails to deliver services on time, breaches the terms, or fails to meet the quality standards.
            </li>
            <li>
              <strong>Refunds:</strong> No refunds will be issued for services already rendered, unless otherwise agreed
              upon.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">10. Limitation of Liability</h3>
          <p>
            Prime Logic Solutions will not be liable for any indirect, special, incidental, or consequential damages
            arising from the Freelancer's work. The liability of Prime Logic Solutions will be limited to the amount
            paid by the Client for the work in question.
          </p>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">11. Dispute Resolution</h3>
          <p>
            In the event of any dispute arising out of this Agreement, the parties will first attempt to resolve the
            issue through informal negotiation. If unresolved, the dispute will be settled through binding arbitration
            according to the rules of [Arbitration Organization] in [Location].
          </p>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">12. Miscellaneous</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Amendments:</strong> This Agreement may only be amended in writing and signed by both parties.
            </li>
            <li>
              <strong>Force Majeure:</strong> Neither party will be held liable for delays or failure to perform due to
              circumstances beyond their control, such as natural disasters or other unforeseen events.
            </li>
            <li>
              <strong>Governing Law:</strong> This Agreement will be governed by the laws of [Jurisdiction].
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#003087] mt-8">13. Acceptance</h3>
          <p>By signing below, both parties agree to the terms and conditions outlined in this Service Agreement.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-12">
            <div className="border p-4 rounded-md">
              <p className="font-semibold mb-4">For Prime Logic Solutions</p>
              <p className="mb-2">Signature: ________________________</p>
              <p className="mb-2">Name: [Authorized Person's Name]</p>
              <p className="mb-2">Title: [Title]</p>
              <p className="mb-2">Date: ________________________</p>
            </div>
            <div className="border p-4 rounded-md">
              <p className="font-semibold mb-4">For Freelancer</p>
              <p className="mb-2">Signature: ________________________</p>
              <p className="mb-2">Name: [Freelancer's Name]</p>
              <p className="mb-2">Title: [Title]</p>
              <p className="mb-2">Date: ________________________</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold text-[#003087] mb-4">Why Work With Prime Logic Solutions?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-[#003087] mr-2">✓</span>
              <span>
                <strong>Consistent Work:</strong> Access to a steady stream of projects without having to constantly
                search for new clients.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003087] mr-2">✓</span>
              <span>
                <strong>Professional Growth:</strong> Opportunity to work on diverse projects and expand your skill set.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003087] mr-2">✓</span>
              <span>
                <strong>Timely Payments:</strong> Reliable payment schedule without the worry of client payment issues.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003087] mr-2">✓</span>
              <span>
                <strong>Support System:</strong> Access to a team of professionals for collaboration and
                problem-solving.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003087] mr-2">✓</span>
              <span>
                <strong>Reduced Administrative Burden:</strong> Focus on development work while we handle client
                communication and project management.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Interested in joining our freelancer network?</h3>
          <p className="mb-6">Contact us today to discuss opportunities and how we can work together.</p>
          <Link href="/contact-us" passHref>
            <Button className="bg-[#003087] hover:bg-[#003087]">Contact Us Now</Button>
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  )
}
