import { ComponentForm } from "@/components/component-form"

export default function NewComponentPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create New Component</h2>
      </div>
      <ComponentForm />
    </div>
  )
}
