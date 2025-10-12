import type React from "react"
import StaticPageSidebar from "./static-page-sidebar"

interface StaticPageLayoutProps {
  title: string
  children: React.ReactNode
}

export default function StaticPageLayout({ title, children }: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Hidden on mobile, shown as a drawer */}
          <div className="hidden md:block">
            <StaticPageSidebar />
          </div>

          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden mb-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[#003087] px-4 py-2 text-white">
                <span className="text-sm font-medium">Company Pages</span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-2">
                <StaticPageSidebar />
              </div>
            </details>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-[#003087] px-6 py-4">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
              </div>
              <div className="px-6 py-8">{children}</div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  © {new Date().getFullYear()} Prime Logic Solutions. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
