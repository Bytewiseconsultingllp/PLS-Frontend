import { Button } from "@/components/ui/button"
import { ComponentsTable } from "@/components/components-table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Components</h2>
        <div className="flex items-center space-x-2">
          <Link href="/admin/components/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Component
            </Button>
          </Link>
        </div>
      </div>
      <ComponentsTable />
    </div>
  )
}
