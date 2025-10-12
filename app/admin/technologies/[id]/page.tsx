import { TechnologyForm } from "@/components/technology-form"

export default function EditTechnologyPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <TechnologyForm id={params.id} />
    </div>
  )
}
