import { MessengerKernelError } from "../core/errors"
import {
  deleteMessengerMediaPayload,
  fetchMessengerMediaListPayload,
  fetchMessengerMediaPayload,
  uploadMessengerMediaPayload,
} from "./client"
import type {
  KernelMessengerMediaAsset,
  KernelMessengerMediaKind,
  KernelMessengerMediaListResponse,
  KernelMessengerMediaQuery,
  KernelMessengerUploadMediaInput,
} from "./types"

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const normalized = value.trim()
  return normalized ? normalized : null
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return null
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value as Record<string, unknown>
}

function normalizeMediaKind(value: unknown): KernelMessengerMediaKind {
  switch (value) {
    case "image":
    case "video":
    case "audio":
    case "voice":
    case "file":
    case "gif":
    case "sticker":
      return value
    default:
      return "unknown"
  }
}

function extractItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload
  }

  const source = normalizeRecord(payload)

  if (Array.isArray(source.items)) {
    return source.items
  }

  if (Array.isArray(source.media)) {
    return source.media
  }

  const data = normalizeRecord(source.data)

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.media)) {
    return data.media
  }

  if (Array.isArray(source.results)) {
    return source.results
  }

  if (Array.isArray(data.results)) {
    return data.results
  }

  return []
}

function extractNextCursor(payload: unknown): string | null {
  const source = normalizeRecord(payload)
  const data = normalizeRecord(source.data)

  return (
    normalizeString(source.nextCursor) ??
    normalizeString(source.cursor) ??
    normalizeString(data.nextCursor) ??
    normalizeString(data.cursor) ??
    null
  )
}

function extractTotalCount(payload: unknown): number | null {
  const source = normalizeRecord(payload)
  const data = normalizeRecord(source.data)

  const total =
    source.totalCount ??
    source.total ??
    data.totalCount ??
    data.total

  return normalizeNumber(total)
}

function extractEntity(payload: unknown) {
  const source = normalizeRecord(payload)

  if (source.data && typeof source.data === "object" && !Array.isArray(source.data)) {
    return source.data
  }

  return source
}

function pickMediaId(source: Record<string, unknown>) {
  return (
    normalizeString(source.id) ??
    normalizeString(source.mediaId) ??
    normalizeString(source.assetId) ??
    null
  )
}

function pickRoomId(source: Record<string, unknown>, fallback?: string | null) {
  return (
    normalizeString(source.roomId) ??
    normalizeString(source.chatId) ??
    normalizeString(fallback) ??
    null
  )
}

function pickUrl(source: Record<string, unknown>) {
  return (
    normalizeString(source.url) ??
    normalizeString(source.mediaUrl) ??
    normalizeString(source.fileUrl) ??
    null
  )
}

function pickThumbnailUrl(source: Record<string, unknown>) {
  return (
    normalizeString(source.thumbnailUrl) ??
    normalizeString(source.previewUrl) ??
    normalizeString(source.posterUrl) ??
    null
  )
}

function pickTimestamp(source: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = normalizeString(source[key])
    if (value) {
      return value
    }
  }

  return null
}

export function normalizeMessengerMediaAsset(
  value: unknown,
  roomIdFallback?: string | null,
): KernelMessengerMediaAsset {
  const source = normalizeRecord(value)
  const id = pickMediaId(source)
  const roomId = pickRoomId(source, roomIdFallback)
  const url = pickUrl(source)

  if (!id) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger media payload is missing id",
    })
  }

  if (!roomId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger media payload is missing roomId",
    })
  }

  if (!url) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger media payload is missing url",
    })
  }

  return {
    id,
    roomId,
    messageId:
      normalizeString(source.messageId) ??
      normalizeString(source.linkedMessageId) ??
      null,
    ownerUserId:
      normalizeString(source.ownerUserId) ??
      normalizeString(source.userId) ??
      normalizeString(source.senderUserId) ??
      null,
    kind: normalizeMediaKind(source.kind ?? source.type),
    url,
    thumbnailUrl: pickThumbnailUrl(source),
    fileName:
      normalizeString(source.fileName) ??
      normalizeString(source.name) ??
      null,
    mimeType:
      normalizeString(source.mimeType) ??
      normalizeString(source.mediaType) ??
      null,
    sizeBytes: normalizeNumber(source.sizeBytes ?? source.size),
    width: normalizeNumber(source.width),
    height: normalizeNumber(source.height),
    durationMs: normalizeNumber(source.durationMs ?? source.duration),
    createdAt: pickTimestamp(source, "createdAt"),
    updatedAt: pickTimestamp(source, "updatedAt"),
    metadata: normalizeRecord(source.metadata),
  }
}

export async function listMessengerMediaByRoom(
  query: KernelMessengerMediaQuery,
): Promise<KernelMessengerMediaListResponse> {
  const payload = await fetchMessengerMediaListPayload(query)
  const roomId = query.roomId.trim()
  const items = extractItems(payload).map((item) =>
    normalizeMessengerMediaAsset(item, roomId),
  )

  return {
    roomId,
    items,
    nextCursor: extractNextCursor(payload),
    totalCount: extractTotalCount(payload),
  }
}

export async function getMessengerMediaById(
  mediaId: string,
): Promise<KernelMessengerMediaAsset> {
  const payload = await fetchMessengerMediaPayload(mediaId)
  return normalizeMessengerMediaAsset(extractEntity(payload))
}

export async function uploadMessengerMedia(
  input: KernelMessengerUploadMediaInput,
): Promise<KernelMessengerMediaAsset> {
  const payload = await uploadMessengerMediaPayload(input)
  return normalizeMessengerMediaAsset(extractEntity(payload), input.roomId)
}

export async function deleteMessengerMedia(
  mediaId: string,
): Promise<{ id: string }> {
  await deleteMessengerMediaPayload(mediaId)

  return {
    id: mediaId.trim(),
  }
}