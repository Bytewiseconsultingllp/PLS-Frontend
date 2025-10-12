"use client"
import type React from "react"
import "@/app/globals.css"
import { SiteHeader } from "@/components/site-header"
import { Providers } from "@/components/providers"
import FooterCard from "@/components/footer-card"
import { Footer } from "@/components/footer"
import { ToastProvider } from "@/components/ui/toast"
// Import the PerformanceMonitor component
import { PerformanceMonitor } from "@/components/performance-monitor"
import { registerServiceWorker } from "@/lib/register-sw"
import { useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Add the PerformanceMonitor component to the layout
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker()
  }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#003087" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Prime Logic Solutions" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="description" content="A freelance IT development agency providing quality services" />
        <meta property="og:title" content="Prime Logic Solutions" />
        <meta property="og:description" content="A freelance IT development agency providing quality services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://primelogicsolutions.com" />
        <meta property="og:image" content="https://primelogicsolutions.com/og-image.jpg" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_IMAGE_PATH || "/assests"} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_IMAGE_PATH || "/assests"} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <PerformanceMonitor />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <ToastContainer />
              <div className="flex-1">{children}</div>
            <FooterCard />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
