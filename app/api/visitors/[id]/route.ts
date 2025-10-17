import type { NextRequest } from "next/server"

const API_TOKEN = process.env.VISITORS_API_TOKEN
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

function authHeaders() {
  return API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}
}

function buildApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL environment variable is not set. Please configure it in your Vercel project settings or .env.local file.",
    )
  }
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    const auth = authHeaders()
    if (auth.Authorization) {
      headers["Authorization"] = auth.Authorization
    }
    const url = buildApiUrl(`api/visitor/${params.id}`)
    const upstream = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    })
    const data = await upstream.json().catch(() => ({}))
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        status: 500,
        message: "Failed to update visitor",
        error: err?.message || "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const headers: Record<string, string> = {}
    const auth = authHeaders()
    if (auth.Authorization) {
      headers["Authorization"] = auth.Authorization
    }
    const url = buildApiUrl(`api/visitor/${params.id}`)
    const upstream = await fetch(url, {
      method: "DELETE",
      headers,
    })
    const data = await upstream.json().catch(() => ({}))
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        status: 500,
        message: "Failed to delete visitor",
        error: err?.message || "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
