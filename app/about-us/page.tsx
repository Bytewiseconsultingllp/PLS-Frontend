import StaticPageLayout from "@/components/static-page-layout"

export default function AboutUsPage() {
  return (
    <StaticPageLayout title="About Us">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Who We Are</h2>
          <p className="mb-4">
            Prime Logic Solutions is a leading technology company that specializes in providing innovative software
            solutions and IT services to businesses of all sizes. Founded in 2015, we have grown from a small team of
            passionate developers to a full-service technology partner with expertise across multiple industries.
          </p>
          <p className="mb-4">
            Our mission is to empower organizations through technology, helping them achieve their business goals by
            delivering high-quality, scalable, and secure digital solutions. We believe in building long-term
            relationships with our clients based on trust, transparency, and exceptional results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Expertise</h2>
          <p className="mb-4">
            With a team of highly skilled professionals, we offer a comprehensive range of services including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Custom Software Development</li>
            <li>Web and Mobile Application Development</li>
            <li>Cloud Solutions and Migration</li>
            <li>DevOps and Infrastructure Management</li>
            <li>Data Analytics and Business Intelligence</li>
            <li>IT Consulting and Strategy</li>
            <li>Cybersecurity Services</li>
          </ul>
          <p>
            Our technical expertise spans across various technologies and platforms, allowing us to deliver tailored
            solutions that address the unique challenges and requirements of each client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Approach</h2>
          <p className="mb-4">
            At Prime Logic Solutions, we follow a collaborative and client-centric approach to every project. We begin
            by understanding your business objectives and challenges, then work closely with you to design and implement
            solutions that drive tangible results.
          </p>
          <p className="mb-4">
            Our development process is agile and transparent, ensuring that you are involved at every stage and have
            complete visibility into the progress of your project. We are committed to delivering high-quality solutions
            on time and within budget.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <span className="font-semibold">Excellence:</span> We strive for excellence in everything we do, from code
              quality to client communication.
            </li>
            <li>
              <span className="font-semibold">Innovation:</span> We embrace new technologies and methodologies to
              deliver innovative solutions.
            </li>
            <li>
              <span className="font-semibold">Integrity:</span> We conduct our business with honesty, transparency, and
              ethical practices.
            </li>
            <li>
              <span className="font-semibold">Collaboration:</span> We believe in the power of teamwork and partnership
              with our clients.
            </li>
            <li>
              <span className="font-semibold">Continuous Improvement:</span> We are committed to learning and improving
              our skills and processes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Team</h2>
          <p className="mb-4">
            Our greatest asset is our team of talented professionals who bring diverse skills, experiences, and
            perspectives to the table. From seasoned software architects and developers to creative designers and
            project managers, each member of our team is dedicated to delivering exceptional results.
          </p>
          <p>
            We invest in the continuous development of our team members, ensuring that they stay updated with the latest
            technologies and industry trends. This enables us to provide cutting-edge solutions that give our clients a
            competitive edge in their respective markets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#003087] mb-4">Join Us on Our Journey</h2>
          <p className="mb-4">
            We are excited about the future of technology and the opportunities it presents for businesses to innovate
            and grow. We invite you to partner with Prime Logic Solutions and experience the difference that our
            expertise, commitment, and passion can make to your business.
          </p>
          <p>
            Contact us today to discuss how we can help you achieve your technology goals and drive your business
            forward.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  )
}
