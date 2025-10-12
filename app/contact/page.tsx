import ContactForm from "@/app/components/layout/contactform"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Your Company",
  description: "Get in touch with our team for any inquiries or support",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help. Fill out the form below and we'll get back to
            you as soon as possible.
          </p>
        </div>

        <ContactForm />

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600">
              4445 Corporation Ln Ste 264
              <br />
              Virginia Beach, Virginia 23462
              <br />
              USA
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600">
              +1 (916) 699-0091
              <br />
              Monday - Friday: 9am - 5pm
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600">
              b2b@dekoshurcrafts.com
              <br />
              support@yourcompany.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
