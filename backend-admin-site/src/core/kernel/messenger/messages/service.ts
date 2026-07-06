import { MessengerKernelError } from "../core/errors"
import {
  createMessengerMessagePayload,
  deleteMessengerMessagePayload,
  fetchMessengerMessagePayload,
  fetchMessengerMessagesPayload,
  markMessengerMessageDeliveredPayload,
  markMessengerMessageReadPayload,
  updateMessengerMessagePayload,
} from "./client"
import type {
  KernelMessengerCreateMessageInput,
  KernelMessengerMessage,
  KernelMessengerMessageDirection,
  KernelMessengerMessageKind,
  KernelMessengerMessagesQuery,
  KernelMessengerMessagesResponse,
  KernelMessengerMessageStatus,
  KernelMessengerUpdateMessageInput,
} from "./types"

function normalizeString(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim()
    return normalized ? normalized : null
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return null
}

function normalizeBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "string") {
    if (value === "true") return true
    if (value === "false") return false
  }

  return fallback
}

function normalizeNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return fallback
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value as Record<string, unknown>
}

function normalizeMessageKind(value: unknown): KernelMessengerMessageKind {
  const normalized = normalizeString(value)?.toLowerCase() ?? "unknown"

  switch (normalized) {
    case "text":
    case "image":
    case "video":
    case "audio":
    case "file":
    case "location":
    case "contact":
    case "system":
      return normalized
    case "voice":
      return "audio"
    case "document":
      return "file"
    default:
      return "unknown"
  }
}

function normalizeMessageStatus(value: unknown): KernelMessengerMessageStatus {
  const normalized = normalizeString(value)?.toLowerCase() ?? "unknown"

  switch (normalized) {
    case "pending":
    case "sent":
    case "delivered":
    case "read":
    case "failed":
    case "deleted":
      return normalized
    default:
      return "unknown"
  }
}

function deriveMessageStatus(source: Record<string, unknown>): KernelMessengerMessageStatus {
  const explicit = normalizeMessageStatus(source.status)
  if (explicit !== "unknown") {
    return explicit
  }

  if (normalizeString(source.deletedAt) || normalizeBoolean(source.isDeleted, false)) {
    return "deleted"
  }

  if (normalizeString(source.readAt)) {
    return "read"
  }

  if (normalizeString(source.deliveredAt)) {
    return "delivered"
  }

  if (normalizeString(source.sentAt) || normalizeString(source.createdAt)) {
    return "sent"
  }

  return "unknown"
}

function normalizeMessageDirection(
  value: unknown,
): KernelMessengerMessageDirection {
  switch (normalizeString(value)?.toLowerCase()) {
    case "incoming":
    case "outgoing":
    case "system":
      return normalizeString(value)?.toLowerCase() as KernelMessengerMessageDirection
    default:
      return "incoming"
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

  if (Array.isArray(source.messages)) {
    return source.messages
  }

  const data = normalizeRecord(source.data)

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.messages)) {
    return data.messages
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

  if (typeof total === "undefined" || total === null) {
    return null
  }

  return normalizeNumber(total, 0)
}

function pickMessageId(source: Record<string, unknown>) {
  return (
    normalizeString(source.id) ??
    normalizeString(source.messageId) ??
    normalizeString(source.clientGeneratedId) ??
    null
  )
}

function pickRoomId(source: Record<string, unknown>) {
  return (
    normalizeString(source.roomId) ??
    normalizeString(source.chatId) ??
    null
  )
}

function pickSenderUserId(source: Record<string, unknown>) {
  return (
    normalizeString(source.senderUserId) ??
    normalizeString(source.authorUserId) ??
    normalizeString(source.senderId) ??
    normalizeString(source.userId) ??
    null
  )
}

function pickText(source: Record<string, unknown>) {
  return (
    normalizeString(source.text) ??
    normalizeString(source.content) ??
    normalizeString(source.message) ??
    null
  )
}

function pickPreviewText(source: Record<string, unknown>) {
  return (
    normalizeString(source.previewText) ??
    normalizeString(source.preview) ??
    pickText(source)
  )
}

function pickMediaUrl(source: Record<string, unknown>) {
  return (
    normalizeString(source.mediaUrl) ??
    normalizeString(source.fileUrl) ??
    normalizeString(source.url) ??
    null
  )
}

function pickThumbnailUrl(source: Record<string, unknown>) {
  return (
    normalizeString(source.thumbnailUrl) ??
    normalizeString(source.previewUrl) ??
    null
  )
}

function pickFileName(source: Record<string, unknown>) {
  return (
    normalizeString(source.fileName) ??
    normalizeString(source.name) ??
    null
  )
}

function pickMimeType(source: Record<string, unknown>) {
  return (
    normalizeString(source.mimeType) ??
    normalizeString(source.mediaType) ??
    null
  )
}

function pickTimestamp(
  source: Record<string, unknown>,
  ...keys: string[]
) {
  for (const key of keys) {
    const value = normalizeString(source[key])
    if (value) {
      return value
    }
  }

  return null
}

export function normalizeMessengerMessage(
  value: unknown,
  roomIdFallback?: string,
): KernelMessengerMessage {
  const source = normalizeRecord(value)
  const messageId = pickMessageId(source)

  if (!messageId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger message payload is missing id",
    })
  }

  const roomId = pickRoomId(source) ?? normalizeString(roomIdFallback)

  if (!roomId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger message payload is missing roomId",
    })
  }

  return {
    id: messageId,
    roomId,
    senderUserId: pickSenderUserId(source),
    kind: normalizeMessageKind(source.kind ?? source.type ?? source.mediaType),
    direction: normalizeMessageDirection(source.direction),
    status: deriveMessageStatus(source),
    text: pickText(source),
    previewText: pickPreviewText(source),
    mediaUrl: pickMediaUrl(source),
    thumbnailUrl: pickThumbnailUrl(source),
    fileName: pickFileName(source),
    mimeType: pickMimeType(source),
    replyToMessageId: normalizeString(source.replyToMessageId),
    forwardedFromMessageId: normalizeString(source.forwardedFromMessageId),
    clientMessageId: normalizeString(source.clientMessageId),
    isEdited: normalizeBoolean(source.isEdited, Boolean(normalizeString(source.editedAt))),
    isDeleted: normalizeBoolean(source.isDeleted, Boolean(normalizeString(source.deletedAt))),
    sentAt: pickTimestamp(source, "sentAt", "createdAt"),
    deliveredAt: pickTimestamp(source, "deliveredAt"),
    readAt: pickTimestamp(source, "readAt"),
    createdAt: pickTimestamp(source, "createdAt"),
    updatedAt: pickTimestamp(source, "updatedAt", "editedAt"),
    metadata: normalizeRecord(source.metadata),
  }
}

function extractMessageEntity(payload: unknown) {
  const source = normalizeRecord(payload)

  if (source.data && typeof source.data === "object" && !Array.isArray(source.data)) {
    return source.data
  }

  if (source.payload && typeof source.payload === "object" && !Array.isArray(source.payload)) {
    const payloadRecord = source.payload as Record<string, unknown>
    if (payloadRecord.entity && typeof payloadRecord.entity === "object") {
      return payloadRecord.entity
    }
    if (payloadRecord.message && typeof payloadRecord.message === "object") {
      return payloadRecord.message
    }
  }

  return source
}

export async function listMessengerMessagesByRoom(
  query: KernelMessengerMessagesQuery,
): Promise<KernelMessengerMessagesResponse> {
  const payload = await fetchMessengerMessagesPayload(query)
  const roomId = query.roomId.trim()
  const items = extractItems(payload).map((item) =>
    normalizeMessengerMessage(item, roomId),
  )

  return {
    roomId,
    items,
    nextCursor: extractNextCursor(payload),
    totalCount: extractTotalCount(payload),
  }
}

export async function getMessengerMessageById(
  messageId: string,
): Promise<KernelMessengerMessage> {
  const payload = await fetchMessengerMessagePayload(messageId)
  return normalizeMessengerMessage(extractMessageEntity(payload))
}

export async function sendMessengerMessage(
  input: KernelMessengerCreateMessageInput,
): Promise<KernelMessengerMessage> {
  const payload = await createMessengerMessagePayload(input)
  return normalizeMessengerMessage(extractMessageEntity(payload), input.roomId)
}

export async function updateMessengerMessage(
  input: KernelMessengerUpdateMessageInput,
): Promise<KernelMessengerMessage> {
  const payload = await updateMessengerMessagePayload(input)
  return normalizeMessengerMessage(extractMessageEntity(payload))
}

export async function deleteMessengerMessage(
  messageId: string,
): Promise<{ id: string }> {
  await deleteMessengerMessagePayload(messageId)

  return {
    id: messageId.trim(),
  }
}

export async function markMessengerMessageDelivered(
  messageId: string,
): Promise<KernelMessengerMessage> {
  const payload = await markMessengerMessageDeliveredPayload(messageId)
  return normalizeMessengerMessage(extractMessageEntity(payload))
}

export async function markMessengerMessageRead(
  messageId: string,
): Promise<KernelMessengerMessage> {
  const payload = await markMessengerMessageReadPayload(messageId)
  return normalizeMessengerMessage(extractMessageEntity(payload))
}
