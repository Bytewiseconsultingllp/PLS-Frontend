"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-600">{this.state.error?.message || "An unexpected error occurred"}</p>
        </div>
      )
    }

    return this.props.children
  }
}

export function ImageErrorBoundary({ children, alt = "Image" }: { children: ReactNode; alt?: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center bg-gray-100 rounded-md p-4">
          <span className="text-gray-500">{alt} could not be loaded</span>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
