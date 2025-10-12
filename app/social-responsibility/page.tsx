import StaticPageLayout from "@/components/static-page-layout"
import { Users, GraduationCap, Heart, Globe } from "lucide-react"

export default function SocialResponsibilityPage() {
  return (
    <StaticPageLayout title="Social Responsibility">
      <div className="space-y-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Prime Logic Solutions, we believe that technology should serve humanity. Our social responsibility
            initiatives focus on creating positive impact through innovation, education, and community engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B00]">Diversity & Inclusion</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We are committed to building a diverse and inclusive workplace where everyone feels valued, respected, and
              empowered to contribute their unique perspectives.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Inclusive hiring practices that prioritize diversity at all levels</li>
              <li>Regular diversity training and awareness programs for all employees</li>
              <li>Employee resource groups that support underrepresented communities</li>
              <li>Equal pay initiatives to ensure fair compensation regardless of gender, race, or background</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mr-4">
                <GraduationCap className="h-6 w-6 text-[#002B5B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#002B5B]">Education & Skills Development</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We believe in the power of education to transform lives and communities. Our initiatives focus on
              providing access to quality education and skills development opportunities.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Scholarship programs for underrepresented students in STEM fields</li>
              <li>Coding bootcamps and workshops for youth in underserved communities</li>
              <li>Mentorship programs connecting industry professionals with aspiring technologists</li>
              <li>Partnerships with educational institutions to develop relevant tech curricula</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6">Our Social Impact Programs</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mr-4">
                  <Heart className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FF6B00]">Community Outreach</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We actively engage with local communities to address social challenges and create positive change.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Volunteer programs that encourage employees to contribute their time and skills</li>
                <li>Pro bono technology services for non-profit organizations</li>
                <li>Digital literacy programs for seniors and underserved populations</li>
                <li>Support for local initiatives that address homelessness, hunger, and healthcare access</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#002B5B] bg-opacity-10 flex items-center justify-center mr-4">
                  <Globe className="h-5 w-5 text-[#002B5B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#002B5B]">Technology for Good</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We leverage our technological expertise to develop solutions that address social and environmental
                challenges.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>AI-powered solutions for healthcare accessibility in remote areas</li>
                <li>Digital platforms that connect volunteers with community service opportunities</li>
                <li>Environmental monitoring tools to track and reduce carbon emissions</li>
                <li>Assistive technologies for individuals with disabilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-6 text-center">Our Partnerships</h2>
          <p className="text-gray-700 text-center mb-8">
            We collaborate with organizations that share our commitment to social responsibility and sustainable
            development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Educational Institutions</h3>
              <p className="text-gray-700">
                Partnering with schools, colleges, and universities to develop tech talent and promote STEM education.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Non-Profit Organizations</h3>
              <p className="text-gray-700">
                Supporting NGOs that work on social issues such as poverty alleviation, healthcare, and environmental
                conservation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Industry Alliances</h3>
              <p className="text-gray-700">
                Collaborating with industry partners to develop standards and practices that promote ethical technology
                use.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#002B5B] text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Join Us in Making a Difference</h2>
          <p className="mb-6 text-center">
            At Prime Logic Solutions, we believe that technology has the power to transform lives and communities. We
            invite you to join us in our mission to create a more inclusive, equitable, and sustainable world through
            innovation and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#002B5B] bg-white hover:bg-gray-100"
            >
              Partner With Us
            </a>
            <a
              href="/careers"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FF6B00] hover:bg-[#FF6B00]/90"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  )
}
