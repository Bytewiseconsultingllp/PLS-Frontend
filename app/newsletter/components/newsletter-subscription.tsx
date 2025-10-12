"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PotentialClientForm from "./potential-client-form"
import ActiveClientForm from "./active-client-form"
import DeliveredClientForm from "./delivered-client-form"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsletterSubscription() {
  const [activeTab, setActiveTab] = useState("potential")

  return (
    <div className="space-y-8">
      <Tabs defaultValue="potential" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="potential" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            Potential Clients
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900">
            Active Clients
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-black-900"
          >
            Delivered Clients
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card
              className={`h-full border-l-4 ${
                activeTab === "potential"
                  ? "border-l-blue-500"
                  : activeTab === "active"
                    ? "border-l-green-500"
                    : "border-l-orange-500"
              }`}
            >
              <CardContent className="p-6">
                {activeTab === "potential" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="text-blue-500 mr-2">🔹</span> 1. Potential Clients
                    </h2>
                    <p className="font-medium text-gray-700">"Evaluate Before You Engage"</p>
                    <p className="text-gray-600">
                      You're exploring your next tech partner. We're here to offer context, clarity, and confidence.
                    </p>
                    <p className="text-gray-600">
                      Get industry insights, stack strategies, and real use cases that help you decide if PLS is the
                      right fit.
                    </p>
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 mb-2">What You'll Receive:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>PLS Innovation Digest</li>
                        <li>CMS & Web Platform Showcases</li>
                        <li>Stack Strategy Briefs</li>
                        <li>Engagement Roadmaps</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "active" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="text-green-500 mr-2">🔹</span> 2. Active Clients
                    </h2>
                    <p className="font-medium text-gray-700">"Stay Synchronized While We Build"</p>
                    <p className="text-gray-600">You're in development with us. Now stay updated in real time.</p>
                    <p className="text-gray-600">
                      From sprint recaps to deployment alerts, we'll keep your team informed — and ahead of blockers.
                    </p>
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 mb-2">What You'll Receive:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Sprint Reports & Progress Briefings</li>
                        <li>Feature Deployment Announcements</li>
                        <li>Architecture & Stack Commentary</li>
                        <li>Security & Infra Optimization Notes</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "delivered" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="text-orange-500 mr-2">🔹</span> 3. Delivered Clients
                    </h2>
                    <p className="font-medium text-gray-700">"Post-Launch is Just the Beginning"</p>
                    <p className="text-gray-600">
                      Your solution is live — now let's keep it sharp, secure, and scalable.
                    </p>
                    <p className="text-gray-600">
                      We'll keep you posted on performance enhancements, support add-ons, and modular expansions.
                    </p>
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 mb-2">What You'll Receive:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Post-Deployment Optimization Tips</li>
                        <li>Maintenance & Upgrade Alerts</li>
                        <li>Security Patch Notices</li>
                        <li>Lifecycle Extension Strategies</li>
                        <li>CMS Add-on Previews</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <TabsContent value="potential" className="mt-0">
              <PotentialClientForm />
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <ActiveClientForm />
            </TabsContent>

            <TabsContent value="delivered" className="mt-0">
              <DeliveredClientForm />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
