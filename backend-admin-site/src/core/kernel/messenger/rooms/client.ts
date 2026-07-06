import { MessengerKernelError } from "../core/errors"
import {
  getMessengerKernelFetch,
  requireMessengerKernelSessionSnapshot,
} from "../session/service"
import type { KernelMessengerRoomsQuery } from "./types"

function normalizeRoomId(roomId: string) {
  const normalized = roomId.trim()

  if (!normalized) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_ROOM_ID",
      message: "Messenger room id is required",
    })
  }

  return normalized
}

function buildQueryString(query: KernelMessengerRoomsQuery = {}) {
  const params = new URLSearchParams()

  if (query.cursor?.trim()) {
    params.set("cursor", query.cursor.trim())
  }

  if (typeof query.limit === "number" && Number.isFinite(query.limit)) {
    params.set("limit", String(query.limit))
  }

  if (query.search?.trim()) {
    params.set("search", query.search.trim())
  }

  if (typeof query.archived === "boolean") {
    params.set("archived", String(query.archived))
  }

  if (query.type && query.type !== "all") {
    params.set("type", query.type)
  }

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ""
}

function normalizeHeaders(
  accessToken: string,
  headers?: HeadersInit,
): Record<string, string> {
  const normalized: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  }

  if (!headers) {
    return normalized
  }

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key] = value
    })
    return normalized
  }

  if (Array.isArray(headers)) {
    headers.forEach(([key, value]) => {
      normalized[key] = value
    })
    return normalized
  }

  return {
    ...normalized,
    ...headers,
  }
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    return response.json()
  }

  return response.text()
}

async function performMessengerRoomsRequest<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const session = await requireMessengerKernelSessionSnapshot()
  const fetchImpl = getMessengerKernelFetch()
  const url = `${session.apiBaseUrl}${path}`

  const response = await fetchImpl(url, {
    ...init,
    headers: normalizeHeaders(session.accessToken, init?.headers),
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    const fallbackMessage =
      typeof body === "string" && body.trim()
        ? body.trim()
        : `Messenger rooms request failed with status ${response.status}`

    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_REQUEST_FAILED",
      message: fallbackMessage,
    })
  }

  return body as TResponse
}

export async function fetchMessengerRoomsPayload(
  query: KernelMessengerRoomsQuery = {},
) {
  return performMessengerRoomsRequest<unknown>(
    `/messenger/rooms${buildQueryString(query)}`,
    {
      method: "GET",
    },
  )
}

export async function fetchMessengerRoomPayload(roomId: string) {
  return performMessengerRoomsRequest<unknown>(
    `/messenger/rooms/${encodeURIComponent(normalizeRoomId(roomId))}`,
    {
      method: "GET",
    },
  )
}