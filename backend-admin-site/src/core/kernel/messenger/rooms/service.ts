import { MessengerKernelError } from "../core/errors"
import {
  fetchMessengerRoomPayload,
  fetchMessengerRoomsPayload,
} from "./client"
import type {
  KernelMessengerRoom,
  KernelMessengerRoomsQuery,
  KernelMessengerRoomsResponse,
  KernelMessengerRoomType,
} from "./types"

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const normalized = value.trim()
  return normalized ? normalized : null
}

function normalizeBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()
    if (normalized === "true" || normalized === "1" || normalized === "yes") {
      return true
    }
    if (normalized === "false" || normalized === "0" || normalized === "no") {
      return false
    }
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

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => normalizeString(item))
    .filter((item): item is string => Boolean(item))
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value as Record<string, unknown>
}

function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const normalized = value.replace(/[^\d+]/g, "").trim()
  return normalized ? normalized : null
}

function normalizeUsername(value: unknown): string | null {
  const normalized = normalizeString(value)
  if (!normalized) {
    return null
  }

  return normalized.startsWith("@") ? normalized : `@${normalized}`
}

function normalizeHandle(value: unknown): string | null {
  return normalizeUsername(value)
}

function normalizeRoomType(value: unknown): KernelMessengerRoomType {
  switch (value) {
    case "direct":
    case "group":
    case "channel":
    case "bot":
    case "business":
    case "system":
      return value
    default:
      return "unknown"
  }
}

function pickRoomId(source: Record<string, unknown>) {
  return (
    normalizeString(source.id) ??
    normalizeString(source.roomId) ??
    normalizeString(source.chatId) ??
    null
  )
}

function pickRoomTitle(source: Record<string, unknown>) {
  return (
    normalizeString(source.title) ??
    normalizeString(source.name) ??
    normalizeString(source.displayName) ??
    "Untitled room"
  )
}

function pickRoomSubtitle(source: Record<string, unknown>) {
  return (
    normalizeString(source.subtitle) ??
    normalizeString(source.secondaryTitle) ??
    normalizeString(source.username) ??
    normalizeString(source.handle) ??
    null
  )
}

function pickRoomAvatar(source: Record<string, unknown>) {
  return (
    normalizeString(source.avatarUrl) ??
    normalizeString(source.photoUrl) ??
    normalizeString(source.imageUrl) ??
    null
  )
}

function pickRoomAvatarLetter(source: Record<string, unknown>) {
  const explicit =
    normalizeString(source.avatarLetter) ??
    normalizeString(source.initial) ??
    normalizeString(source.letter)

  if (explicit) {
    return explicit.slice(0, 1).toUpperCase()
  }

  const title = pickRoomTitle(source)
  return title.slice(0, 1).toUpperCase()
}

function pickRoomDescription(source: Record<string, unknown>) {
  return normalizeString(source.description) ?? null
}

function pickRoomPhone(source: Record<string, unknown>) {
  return (
    normalizePhone(source.phone) ??
    normalizePhone(source.contactPhone) ??
    normalizePhone(source.publicPhone) ??
    null
  )
}

function pickRoomUsername(source: Record<string, unknown>) {
  return (
    normalizeUsername(source.username) ??
    normalizeUsername(source.publicUsername) ??
    null
  )
}

function pickRoomHandle(source: Record<string, unknown>) {
  return (
    normalizeHandle(source.handle) ??
    normalizeHandle(source.username) ??
    normalizeHandle(source.publicUsername) ??
    null
  )
}

function pickLastMessageText(source: Record<string, unknown>) {
  return (
    normalizeString(source.lastMessageText) ??
    normalizeString(source.lastMessagePreview) ??
    normalizeString(source.lastMessageContent) ??
    normalizeString(source.preview) ??
    null
  )
}

function pickLastMessageAt(source: Record<string, unknown>) {
  return (
    normalizeString(source.lastMessageAt) ??
    normalizeString(source.lastActivityAt) ??
    normalizeString(source.updatedAt) ??
    null
  )
}

function pickCreatedAt(source: Record<string, unknown>) {
  return normalizeString(source.createdAt) ?? null
}

function pickUpdatedAt(source: Record<string, unknown>) {
  return normalizeString(source.updatedAt) ?? null
}

export function normalizeMessengerRoom(
  value: unknown,
): KernelMessengerRoom {
  const source = normalizeRecord(value)
  const roomId = pickRoomId(source)

  if (!roomId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_ROOM",
      message: "Messenger room payload is missing id",
    })
  }

  const participantIds = normalizeStringArray(
    source.participantIds ?? source.memberIds ?? source.userIds,
  )

  return {
    id: roomId,
    type: normalizeRoomType(source.type),
    title: pickRoomTitle(source),
    subtitle: pickRoomSubtitle(source),
    avatarUrl: pickRoomAvatar(source),
    avatarLetter: pickRoomAvatarLetter(source),
    description: pickRoomDescription(source),
    participantIds,
    participantCount: normalizeNumber(
      source.participantCount ?? participantIds.length,
      participantIds.length,
    ),
    unreadCount: normalizeNumber(source.unreadCount, 0),
    lastMessageId:
      normalizeString(source.lastMessageId) ??
      normalizeString(source.latestMessageId) ??
      null,
    lastMessageText: pickLastMessageText(source),
    lastMessageAt: pickLastMessageAt(source),
    pinned: normalizeBoolean(source.pinned, false),
    muted: normalizeBoolean(source.muted, false),
    archived: normalizeBoolean(source.archived, false),
    isOnline: normalizeBoolean(source.isOnline, false),
    verified: normalizeBoolean(source.verified, false),
    phone: pickRoomPhone(source),
    username: pickRoomUsername(source),
    handle: pickRoomHandle(source),
    createdAt: pickCreatedAt(source),
    updatedAt: pickUpdatedAt(source),
    metadata: normalizeRecord(source.metadata),
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

  if (Array.isArray(source.rooms)) {
    return source.rooms
  }

  const data = normalizeRecord(source.data)

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.rooms)) {
    return data.rooms
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

export async function listMessengerRooms(
  query: KernelMessengerRoomsQuery = {},
): Promise<KernelMessengerRoomsResponse> {
  const payload = await fetchMessengerRoomsPayload(query)
  const items = extractItems(payload).map((item) => normalizeMessengerRoom(item))

  return {
    items,
    nextCursor: extractNextCursor(payload),
    totalCount: extractTotalCount(payload),
  }
}

export async function getMessengerRoomById(
  roomId: string,
): Promise<KernelMessengerRoom> {
  const payload = await fetchMessengerRoomPayload(roomId)
  const source = normalizeRecord(payload)

  const data =
    source.data && typeof source.data === "object" && !Array.isArray(source.data)
      ? source.data
      : source

  return normalizeMessengerRoom(data)
}