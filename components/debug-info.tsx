"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DebugInfoProps {
  data: any
  title?: string
}

export function DebugInfo({ data, title = "Debug Information" }: DebugInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-4 border-yellow-300">
      <CardHeader className="py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="py-2">
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-96">{JSON.stringify(data, null, 2)}</pre>
        </CardContent>
      )}
    </Card>
  )
}
