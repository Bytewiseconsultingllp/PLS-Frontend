import { Button } from "@/components/ui/button"
import { PagesTable } from "@/components/pages-table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function PagesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
        <div className="flex items-center space-x-2">
          <Link href="/admin/pages/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </Link>
        </div>
      </div>
      <PagesTable />
    </div>
  )
}
