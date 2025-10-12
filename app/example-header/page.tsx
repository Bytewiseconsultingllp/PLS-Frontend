import { SiteHeader } from "@/components/site-header"

export default function ExampleHeaderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Example Page with Dynamic Header</h1>
        <p className="text-lg">
          This page demonstrates the dynamic header component that fetches real navigation data from the database.
        </p>
      </main>
    </div>
  )
}
