"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const staticPages = [
  { title: "About Us", href: "/about-us" },
  { title: "Contact Us", href: "/contact-us" },
  { title: "ESG Commitment", href: "/esg-commitment" },
  { title: "Our ESG Commitment", href: "/our-esg-commitment" },
  { title: "Social Responsibility", href: "/social-responsibility" },
  { title: "Governance and Compliance", href: "/governance-and-compliance" },
  { title: "Careers at Prime Logic Solutions", href: "/careers" },
  { title: "Refund Policy", href: "/refund-policy" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Cookies and Privacy Policy", href: "/cookies-and-privacy-policy" },
  { title: "Terms and Conditions", href: "/terms-and-conditions" },
  {
    title: "Client Service Agreement",
    href: "/client-vs-prime-logic-solutions-service-agreement",
  },
  { title: "Developers Service Agreement", href: "/freelancer-developers-vs-prime-logic-solutions" },
]

export default function StaticPageSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full md:w-64 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-[#003087] px-4 py-3">
        <h2 className="text-lg font-semibold text-white">Company Pages</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {staticPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === page.href ? "bg-blue-50 text-[#003087] font-medium" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
