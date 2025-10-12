import type { Metadata } from "next"
import { HeaderManager } from "@/components/header-manager"

export const metadata: Metadata = {
  title: "Header Management",
  description: "Manage website header navigation",
}

export default async function HeaderManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Header Management</h1>
      </div>
      <div className="space-y-6">
        <HeaderManager />
      </div>
    </div>
  )
}
