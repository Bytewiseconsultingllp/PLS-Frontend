"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface FallbackProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export function Fallback({ title, description, actionLabel, onAction }: FallbackProps) {
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Button onClick={onAction} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
