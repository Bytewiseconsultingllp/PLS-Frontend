import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

const recentPages = [
  {
    id: "1",
    title: "Home Page",
    slug: "/",
    status: "published",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    title: "About Us",
    slug: "/about",
    status: "published",
    createdAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    title: "Web Development",
    slug: "/services/web-development",
    status: "published",
    type: "service",
    createdAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    title: "Mobile App Development",
    slug: "/services/mobile-app-development",
    status: "published",
    type: "service",
    createdAt: new Date("2023-01-04"),
  },
  {
    id: "5",
    title: "Blog",
    slug: "/blog",
    status: "draft",
    createdAt: new Date("2023-01-05"),
  },
]

export function RecentPages() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentPages.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">{page.title}</TableCell>
            <TableCell>{page.type || "page"}</TableCell>
            <TableCell>
              <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
            </TableCell>
            <TableCell>{formatDate(page.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
