import StaticPageLayout from "@/components/static-page-layout"
import { Leaf, Users, Shield } from "lucide-react"

export default function OurESGCommitmentPage() {
  return (
    <StaticPageLayout title="Our ESG Commitment">
      <div className="space-y-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Prime Logic Solutions, we are committed to being a responsible corporate citizen. Our Environmental,
            Social, and Governance (ESG) framework is not just a set of practices but a core element of our business
            model.
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-[#002B5B] bg-opacity-5 p-8 rounded-lg border-l-4 border-[#002B5B] mb-8">
            <p className="text-gray-700">
              Our commitment to ESG principles underscores our focus on building a future-driven, inclusive, and
              sustainable business that benefits all stakeholders. We aim to lead by example, creating long-term value
              while minimizing our environmental impact and contributing positively to society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-[#002B5B]" />
              </div>
              <h2 className="text-xl font-bold text-[#002B5B] mb-2">Environmental</h2>
              <p className="text-gray-700">
                We are committed to reducing our environmental footprint and promoting sustainable practices throughout
                our operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <h2 className="text-xl font-bold text-[#FF6B00] mb-2">Social</h2>
              <p className="text-gray-700">
                We believe in empowering communities and making a meaningful difference in the lives of individuals
                through diversity, equity, and inclusion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#002B5B]" />
              </div>
              <h2 className="text-xl font-bold text-[#002B5B] mb-2">Governance</h2>
              <p className="text-gray-700">
                We uphold the highest standards of corporate governance to ensure transparency, ethical conduct, and
                accountability in everything we do.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Environmental Responsibility</h2>
          <p className="text-gray-700 mb-6">
            We recognize the urgent need to address climate change, and we are taking bold steps to reduce our
            environmental footprint.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Carbon-Neutral Operations</h3>
              <p className="text-gray-700 mb-4">
                We are committed to becoming carbon-neutral by 2030. Our efforts include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Renewable Energy Sources:</span> We power our operations with clean,
                  renewable energy sourced from solar, wind, and sustainable energy providers.
                </li>
                <li>
                  <span className="font-semibold">Energy-Efficient Data Centers:</span> We have transitioned our cloud
                  infrastructure to energy-efficient data centers, lowering our energy consumption while maintaining the
                  highest performance standards.
                </li>
                <li>
                  <span className="font-semibold">Green IT Practices:</span> Our development and operational practices
                  focus on optimizing software efficiency and reducing the energy demands of the digital solutions we
                  deliver.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Waste Reduction and Circular Economy</h3>
              <p className="text-gray-700 mb-4">
                Our commitment to reducing waste goes beyond recycling. We are dedicated to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">E-Waste Recycling Programs:</span> We ensure that our outdated
                  electronic devices are responsibly recycled and reused through certified e-waste disposal partners.
                </li>
                <li>
                  <span className="font-semibold">Sustainable Product Lifecycle:</span> We incorporate circular economy
                  principles into the products and services we develop, ensuring that they can be reused, refurbished,
                  or recycled.
                </li>
                <li>
                  <span className="font-semibold">Reducing Material Waste:</span> Our operations minimize the use of
                  single-use plastics and other disposable materials, opting for reusable and biodegradable
                  alternatives.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Sustainable Supply Chain</h3>
              <p className="text-gray-700 mb-4">
                We work with suppliers and partners who adhere to environmental best practices. Our goal is to ensure
                that our entire value chain is aligned with our sustainability objectives.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Supplier Sustainability Standards:</span> We assess suppliers based on
                  their environmental practices, promoting collaboration with those who share our commitment to
                  sustainability.
                </li>
                <li>
                  <span className="font-semibold">Eco-Friendly Packaging:</span> We have shifted to using sustainable,
                  recyclable, and biodegradable packaging for any physical product distribution.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#FF6B00] mb-6">Social Responsibility</h2>
          <p className="text-gray-700 mb-6">
            At Prime Logic Solutions, we believe in empowering communities and making a meaningful difference in the
            lives of individuals. Our approach to social responsibility is anchored in diversity, equity, and inclusion,
            along with community development.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#FF6B00] mb-4">Diversity, Equity, and Inclusion (DEI)</h3>
              <p className="text-gray-700 mb-4">
                We are passionate about building a workforce that reflects the diversity of the world around us and
                fosters an environment of inclusion and equity.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Inclusive Hiring Practices:</span> We actively recruit individuals
                  from diverse backgrounds and ensure that all candidates have equal opportunities.
                </li>
                <li>
                  <span className="font-semibold">Workplace Equality:</span> We provide a safe and inclusive environment
                  where every employee has access to professional growth opportunities, regardless of gender, race,
                  ethnicity, or background.
                </li>
                <li>
                  <span className="font-semibold">Leadership Representation:</span> We are committed to increasing women
                  and underrepresented groups in leadership positions across our organization.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#FF6B00] mb-4">Empowering the Next Generation</h3>
              <p className="text-gray-700 mb-4">
                We believe in the power of education and skills development to create lasting change.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Tech Apprenticeships and Internships:</span> We offer apprenticeship
                  and internship programs to empower young professionals with the skills and experience needed for
                  success in the tech industry.
                </li>
                <li>
                  <span className="font-semibold">STEM Education Support:</span> We sponsor initiatives aimed at
                  promoting STEM education in underprivileged communities, particularly focusing on girls and women in
                  technology.
                </li>
                <li>
                  <span className="font-semibold">Community Engagement:</span> We support non-profit organizations and
                  community projects that focus on education, healthcare, and infrastructure, particularly in the
                  regions where we operate.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#FF6B00] mb-4">Employee Well-being</h3>
              <p className="text-gray-700 mb-4">
                The well-being of our employees is central to our values. We prioritize:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Work-Life Balance:</span> We offer flexible working hours, remote work
                  opportunities, and initiatives that promote a healthy work-life balance.
                </li>
                <li>
                  <span className="font-semibold">Mental Health Support:</span> Our employees have access to mental
                  health resources, including counseling and wellness programs.
                </li>
                <li>
                  <span className="font-semibold">Fair Compensation and Benefits:</span> We offer competitive salaries
                  and benefits packages that support the well-being of our employees and their families.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Governance and Compliance</h2>
          <p className="text-gray-700 mb-6">
            We uphold the highest standards of corporate governance to ensure transparency, ethical conduct, and
            accountability in everything we do.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Ethical Business Practices</h3>
              <p className="text-gray-700 mb-4">
                Integrity is at the heart of Prime Logic Solutions. We adhere to strict ethical guidelines and ensure
                that our actions align with our core values.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Anti-Corruption and Anti-Bribery Policies:</span> We have a
                  zero-tolerance policy for corruption or unethical practices in our business dealings.
                </li>
                <li>
                  <span className="font-semibold">Transparency and Accountability:</span> We ensure open and transparent
                  communication with our clients, partners, and employees about all business practices.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Data Privacy and Cybersecurity</h3>
              <p className="text-gray-700 mb-4">
                We take data privacy and cybersecurity seriously, ensuring that all client and employee information is
                protected to the highest standards.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">GDPR Compliance:</span> We comply with the General Data Protection
                  Regulation (GDPR) to ensure the privacy and security of EU citizens' data.
                </li>
                <li>
                  <span className="font-semibold">Cybersecurity Frameworks:</span> We have implemented state-of-the-art
                  cybersecurity protocols to safeguard client data and maintain business continuity.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-4">Regulatory Compliance</h3>
              <p className="text-gray-700 mb-4">
                We ensure compliance with international standards and local laws, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>SOC 2 and ISO 27001 for information security management.</li>
                <li>CCPA (California Consumer Privacy Act) for consumer privacy rights in the state of California.</li>
                <li>
                  Global Regulatory Compliance for businesses operating across various regions, such as HIPAA and FISMA
                  for the healthcare and government sectors.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6 text-center">Commitment to Continuous Improvement</h2>
          <div className="bg-[#002B5B] bg-opacity-5 p-8 rounded-lg">
            <p className="text-gray-700 mb-4">
              Our ESG commitment is not a one-time effort. We are dedicated to continually evolving and improving our
              sustainability practices. We measure our impact using KPIs and are transparent about our progress. Through
              regular reports and reviews, we ensure we remain accountable to our clients, employees, and the broader
              community.
            </p>
          </div>
        </div>

        <div className="bg-[#002B5B] text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Together, We Shape a Sustainable Future</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            We invite our stakeholders—clients, partners, and employees—to join us on this journey toward a more
            sustainable, equitable, and innovative future. Through collaborative action, we can create meaningful change
            and ensure that technology benefits all of humanity.
          </p>
          <div className="mt-4">
            <p>For more information about our ESG initiatives, please contact us at:</p>
            <p className="text-[#FF6B00] font-semibold">esg@primelogicsolutions.com</p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
