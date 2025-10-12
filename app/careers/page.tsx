import { Briefcase, Users, MapPin, Mail, Clock } from "lucide-react"
import StaticPageLayout from "@/components/static-page-layout"

export default function CareersPage() {
  return (
    <StaticPageLayout title="Careers at Prime Logic Solutions">
      <div className="space-y-8">
        <p className="text-base sm:text-lg text-gray-600">
          At Prime Logic Solutions, we believe in building a future through technology. Join our team of talented
          professionals and make a real impact in the world of technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-16">
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mr-3 sm:mr-4">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-[#002B5B]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002B5B]">Why Work with Us?</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002B5B] mb-1">Innovative Environment</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Work on cutting-edge projects with a team of like-minded individuals who are pushing the boundaries of
                  technology.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002B5B] mb-1">Global Impact</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Be part of an organization that drives positive change across industries and communities worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002B5B] mb-1">Career Growth</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Benefit from continuous learning, mentorship programs, and leadership development opportunities.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002B5B] mb-1">Work-Life Balance</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Flexible working arrangements to ensure you can succeed both professionally and personally.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#002B5B] mb-1">Inclusive Culture</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  A culture of diversity, equity, and inclusion where every individual's voice is valued and respected.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mr-3 sm:mr-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B00]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#FF6B00]">Our Culture</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              At Prime Logic Solutions, we foster a culture that values innovation, collaboration, and continuous
              learning. We believe that our diverse perspectives and experiences make us stronger as a team.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#FF6B00] mb-1">Innovation</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  We encourage creative thinking and new ideas that challenge the status quo.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#FF6B00] mb-1">Collaboration</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  We work together across teams and disciplines to achieve common goals.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#FF6B00] mb-1">Excellence</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  We strive for excellence in everything we do, from code quality to client service.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#FF6B00] mb-1">Integrity</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  We act with honesty, transparency, and ethical behavior in all our interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md border border-gray-200 mb-8 md:mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Job Opportunities</h2>

          <div className="prose max-w-none">
            <p>
              Prime Logic Solutions is a leading provider of software development, digital marketing, and IT consulting
              services. We are expanding our team and looking for dynamic professionals to join us in various leadership
              and key roles. If you're passionate about driving operational excellence, managing international business,
              and leading teams to success, we want to hear from you!
            </p>

            <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-12">
              {/* Job 1: Chief Operational Officer */}
              <div className="border-b pb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#002B5B]">1. Chief Operational Officer (COO)</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Full-time</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B]">Job Description:</h4>
                <p>
                  As the Chief Operational Officer (COO) at Prime Logic Solutions, you will be responsible for
                  overseeing the company's daily operations, implementing efficient processes, and managing strategic
                  business functions to ensure the growth and operational efficiency of the company. You will
                  collaborate closely with the executive team to align operations with business goals and manage all
                  operational functions.
                </p>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Key Responsibilities:</h4>
                <ul className="list-disc pl-6">
                  <li>Lead and manage day-to-day operations across all departments.</li>
                  <li>Develop and implement operational strategies and plans.</li>
                  <li>Manage key performance metrics and ensure company goals are met.</li>
                  <li>Foster a culture of continuous improvement.</li>
                  <li>Collaborate with other senior executives on business strategy and planning.</li>
                </ul>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Requirements:</h4>
                <ul className="list-disc pl-6">
                  <li>Proven experience in senior operational roles (COO, VP Operations, etc.).</li>
                  <li>Strong leadership skills and experience managing teams.</li>
                  <li>Excellent strategic thinking and problem-solving abilities.</li>
                  <li>Strong financial acumen and budgeting experience.</li>
                  <li>Ability to drive operational efficiencies and implement best practices.</li>
                </ul>

                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-700 mb-3">Ready to apply for this position?</p>
                  <a
                    href="mailto:careers@primelogicsol.com?subject=Application for Chief Operational Officer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Your Application</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Please include your resume and cover letter in your email to careers@primelogicsol.com
                  </p>
                </div>
              </div>

              {/* Job 2: Delivery Manager */}
              <div className="border-b pb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#002B5B]">2. Delivery Manager</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Full-time</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B]">Job Description:</h4>
                <p>
                  We are seeking a highly organized and skilled Delivery Manager to lead our project delivery teams. You
                  will oversee the execution of client projects, ensuring they are delivered on time, within scope, and
                  on budget. You will work closely with both internal teams and clients to ensure exceptional service
                  delivery and client satisfaction.
                </p>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Key Responsibilities:</h4>
                <ul className="list-disc pl-6">
                  <li>Oversee the end-to-end delivery of client projects.</li>
                  <li>Manage timelines, scope, and budgets effectively.</li>
                  <li>Coordinate between cross-functional teams to ensure smooth delivery.</li>
                  <li>Monitor and manage risks throughout the project lifecycle.</li>
                  <li>Ensure client expectations are exceeded and satisfaction is maintained.</li>
                </ul>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Requirements:</h4>
                <ul className="list-disc pl-6">
                  <li>Strong project management skills, with a track record of successful project deliveries.</li>
                  <li>Excellent communication and stakeholder management skills.</li>
                  <li>Ability to manage multiple projects simultaneously.</li>
                  <li>Experience in IT and software development projects is a plus.</li>
                  <li>PMP, PRINCE2, or other project management certifications preferred.</li>
                </ul>

                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-700 mb-3">Ready to apply for this position?</p>
                  <a
                    href="mailto:careers@primelogicsol.com?subject=Application for Delivery Manager"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Your Application</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Please include your resume and cover letter in your email to careers@primelogicsol.com
                  </p>
                </div>
              </div>

              {/* Job 3: Operational Lead */}
              <div className="border-b pb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#002B5B]">3. Operational Lead</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Full-time</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B]">Job Description:</h4>
                <p>
                  We are looking for a motivated and experienced Operational Lead to manage and optimize day-to-day
                  business operations. The ideal candidate will be responsible for implementing operational processes,
                  improving efficiency, and leading the team to achieve key business objectives.
                </p>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Key Responsibilities:</h4>
                <ul className="list-disc pl-6">
                  <li>Oversee and improve daily operational activities.</li>
                  <li>Coordinate across teams to streamline processes and improve productivity.</li>
                  <li>Ensure that projects are delivered efficiently and meet quality standards.</li>
                  <li>Manage operational budgets and track costs.</li>
                  <li>Train and guide team members to achieve performance goals.</li>
                </ul>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Requirements:</h4>
                <ul className="list-disc pl-6">
                  <li>Proven experience in operational roles, with a focus on process optimization.</li>
                  <li>Strong leadership and communication skills.</li>
                  <li>Ability to analyze and solve complex operational challenges.</li>
                  <li>Experience in managing operational teams in the tech or digital sector is a plus.</li>
                  <li>Familiarity with operational tools and systems.</li>
                </ul>

                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-700 mb-3">Ready to apply for this position?</p>
                  <a
                    href="mailto:careers@primelogicsol.com?subject=Application for Operational Lead"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Your Application</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Please include your resume and cover letter in your email to careers@primelogicsol.com
                  </p>
                </div>
              </div>

              {/* Job 4: Overseas Representative */}
              <div className="border-b pb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#002B5B]">4. Overseas Representative</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Multiple International Locations</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Full-time</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B]">Job Description:</h4>
                <p>
                  Prime Logic Solutions is looking for an Overseas Representative to manage and grow our presence in
                  international markets. You will be the first point of contact for new business opportunities and
                  clients, developing relationships, and fostering the company's global growth.
                </p>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Key Responsibilities:</h4>
                <ul className="list-disc pl-6">
                  <li>Represent Prime Logic Solutions in international markets.</li>
                  <li>Build and maintain relationships with clients, partners, and stakeholders.</li>
                  <li>Identify new business opportunities and manage leads.</li>
                  <li>Coordinate with internal teams to ensure seamless service delivery to international clients.</li>
                  <li>Track market trends and competitor activities to refine business strategies.</li>
                </ul>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Requirements:</h4>
                <ul className="list-disc pl-6">
                  <li>Strong international business development experience.</li>
                  <li>Excellent communication and negotiation skills.</li>
                  <li>Ability to work independently and manage remote relationships.</li>
                  <li>Knowledge of overseas market dynamics in software development or digital marketing.</li>
                  <li>Fluent in English, additional languages are a plus.</li>
                </ul>

                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-700 mb-3">Ready to apply for this position?</p>
                  <a
                    href="mailto:careers@primelogicsol.com?subject=Application for Overseas Representative"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Your Application</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Please include your resume and cover letter in your email to careers@primelogicsol.com
                  </p>
                </div>
              </div>

              {/* Job 5: International Business Development Officer */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#002B5B]">
                  5. International Business Development Officer
                </h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Full-time</span>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B]">Job Description:</h4>
                <p>
                  We are looking for an International Business Development Officer to help us expand our footprint in
                  global markets. This role involves identifying new business opportunities, building relationships with
                  potential clients, and driving revenue through strategic partnerships in international markets.
                </p>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Key Responsibilities:</h4>
                <ul className="list-disc pl-6">
                  <li>Identify and evaluate new business opportunities in international markets.</li>
                  <li>Build relationships with global clients and partners.</li>
                  <li>Develop and execute business development strategies to grow international sales.</li>
                  <li>Conduct market research to understand regional demands and adapt strategies accordingly.</li>
                  <li>Prepare proposals, presentations, and contract negotiations with potential clients.</li>
                </ul>

                <h4 className="font-semibold text-base sm:text-lg text-[#002B5B] mt-4">Requirements:</h4>
                <ul className="list-disc pl-6">
                  <li>Proven experience in business development or sales in an international context.</li>
                  <li>Strong communication, negotiation, and networking skills.</li>
                  <li>Ability to travel for business development and client meetings.</li>
                  <li>Experience in B2B sales, ideally in IT services, software development, or digital marketing.</li>
                  <li>Knowledge of global markets, including regional trends and dynamics.</li>
                </ul>

                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-700 mb-3">Ready to apply for this position?</p>
                  <a
                    href="mailto:careers@primelogicsol.com?subject=Application for International Business Development Officer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span>Send Your Application</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Please include your resume and cover letter in your email to careers@primelogicsol.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-center">
                Prime Logic Solutions is an equal opportunity employer, committed to fostering a diverse and inclusive
                workplace. We offer competitive salaries, benefits, and opportunities for career advancement.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#002B5B] text-white p-4 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Join Our Team</h2>
          <p className="mb-4 sm:mb-6 text-center text-sm sm:text-base">
            Ready to take the next step in your career? Join Prime Logic Solutions and be part of a team that's shaping
            the future of technology. We're always looking for talented individuals who share our passion for innovation
            and excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-[#002B5B] bg-white hover:bg-gray-100"
            >
              Browse Open Positions
            </a>
            <a
              href="mailto:careers@primelogicsol.com"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#FF6B00] hover:bg-[#FF6B00]/90"
            >
              Submit Your Resume
            </a>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
