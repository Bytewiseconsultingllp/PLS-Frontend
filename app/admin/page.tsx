import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentPages } from "@/components/recent-pages"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Pages</CardTitle>
            <CardDescription>Recently created or updated pages</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPages />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
