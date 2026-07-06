import { MessengerKernelError } from "../core/errors"
import {
  getMessengerKernelFetch,
  requireMessengerKernelSessionSnapshot,
} from "../session/service"
import type {
  KernelMessengerMediaQuery,
  KernelMessengerUploadMediaInput,
} from "./types"

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

function buildMediaQueryString(query: Omit<KernelMessengerMediaQuery, "roomId">) {
  const params = new URLSearchParams()

  if (query.cursor?.trim()) {
    params.set("cursor", query.cursor.trim())
  }

  if (typeof query.limit === "number" && Number.isFinite(query.limit)) {
    params.set("limit", String(query.limit))
  }

  if (query.kind && query.kind !== "all") {
    params.set("kind", query.kind)
  }

  if (query.messageId?.trim()) {
    params.set("messageId", query.messageId.trim())
  }

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ""
}

function normalizeHeaders(
  accessToken: string,
  headers?: HeadersInit,
  withJsonBody = false,
): Record<string, string> {
  const normalized: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  }

  if (withJsonBody) {
    normalized["Content-Type"] = "application/json"
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

async function performMessengerMediaRequest<TResponse>(
  path: string,
  init?: RequestInit,
  withJsonBody = false,
): Promise<TResponse> {
  const session = await requireMessengerKernelSessionSnapshot()
  const fetchImpl = getMessengerKernelFetch()
  const url = `${session.apiBaseUrl}${path}`

  const response = await fetchImpl(url, {
    ...init,
    headers: normalizeHeaders(session.accessToken, init?.headers, withJsonBody),
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    const fallbackMessage =
      typeof body === "string" && body.trim()
        ? body.trim()
        : `Messenger media request failed with status ${response.status}`

    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_REQUEST_FAILED",
      message: fallbackMessage,
    })
  }

  return body as TResponse
}

export async function fetchMessengerMediaListPayload(
  query: KernelMessengerMediaQuery,
) {
  const roomId = normalizeRequiredId(query.roomId, "roomId")

  return performMessengerMediaRequest<unknown>(
    `/messenger/rooms/${encodeURIComponent(roomId)}/media${buildMediaQueryString(
      query,
    )}`,
    {
      method: "GET",
    },
  )
}

export async function fetchMessengerMediaPayload(mediaId: string) {
  return performMessengerMediaRequest<unknown>(
    `/messenger/media/${encodeURIComponent(
      normalizeRequiredId(mediaId, "mediaId"),
    )}`,
    {
      method: "GET",
    },
  )
}

export async function uploadMessengerMediaPayload(
  input: KernelMessengerUploadMediaInput,
) {
  const roomId = normalizeRequiredId(input.roomId, "roomId")

  if (input.formData) {
    return performMessengerMediaRequest<unknown>(
      `/messenger/rooms/${encodeURIComponent(roomId)}/media`,
      {
        method: "POST",
        body: input.formData,
      },
      false,
    )
  }

  return performMessengerMediaRequest<unknown>(
    `/messenger/rooms/${encodeURIComponent(roomId)}/media`,
    {
      method: "POST",
      body: JSON.stringify({
        messageId: input.messageId ?? null,
        kind: input.kind ?? "file",
        fileName: input.fileName ?? null,
        mimeType: input.mimeType ?? null,
        localUri: input.localUri ?? null,
        remoteUrl: input.remoteUrl ?? null,
        sizeBytes: input.sizeBytes ?? null,
        width: input.width ?? null,
        height: input.height ?? null,
        durationMs: input.durationMs ?? null,
        metadata: input.metadata ?? {},
      }),
    },
    true,
  )
}

export async function deleteMessengerMediaPayload(mediaId: string) {
  return performMessengerMediaRequest<unknown>(
    `/messenger/media/${encodeURIComponent(
      normalizeRequiredId(mediaId, "mediaId"),
    )}`,
    {
      method: "DELETE",
    },
  )
}