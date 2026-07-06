import { MessengerKernelError } from "../core/errors"
import {
  getMessengerKernelFetch,
  requireMessengerKernelSessionSnapshot,
} from "../session/service"
import type { KernelMessengerParticipantsQuery } from "./types"

function normalizeRequiredId(value: string, fieldName: string) {
  const normalized = value.trim()

  if (!normalized) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: `Messenger ${fieldName} is required`,
    })
  }

  return normalized
}

function buildParticipantsQueryString(
  query: Omit<KernelMessengerParticipantsQuery, "roomId">,
) {
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
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    return response.json()
  }

  return response.text()
}

async function performMessengerParticipantsRequest<TResponse>(
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
        : `Messenger participants request failed with status ${response.status}`

    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_REQUEST_FAILED",
      message: fallbackMessage,
    })
  }

  return body as TResponse
}

export async function fetchMessengerParticipantsPayload(
  query: KernelMessengerParticipantsQuery,
) {
  const roomId = normalizeRequiredId(query.roomId, "roomId")

  return performMessengerParticipantsRequest<unknown>(
    `/messenger/rooms/${encodeURIComponent(roomId)}/participants${buildParticipantsQueryString(
      query,
    )}`,
    {
      method: "GET",
    },
  )
}

export async function fetchMessengerParticipantPayload(participantId: string) {
  return performMessengerParticipantsRequest<unknown>(
    `/messenger/participants/${encodeURIComponent(
      normalizeRequiredId(participantId, "participantId"),
    )}`,
    {
      method: "GET",
    },
  )
}