import { MessengerKernelError } from "../core/errors"
import {
  fetchMessengerParticipantPayload,
  fetchMessengerParticipantsPayload,
} from "./client"
import type {
  KernelMessengerParticipant,
  KernelMessengerParticipantPresence,
  KernelMessengerParticipantRole,
  KernelMessengerParticipantsQuery,
  KernelMessengerParticipantsResponse,
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

function normalizeParticipantRole(
  value: unknown,
): KernelMessengerParticipantRole {
  switch (value) {
    case "owner":
    case "admin":
    case "member":
    case "guest":
    case "bot":
    case "system":
      return value
    default:
      return "unknown"
  }
}

function normalizeParticipantPresence(
  value: unknown,
): KernelMessengerParticipantPresence {
  switch (value) {
    case "online":
    case "offline":
    case "away":
    case "busy":
    case "typing":
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

  if (Array.isArray(source.participants)) {
    return source.participants
  }

  const data = normalizeRecord(source.data)

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.participants)) {
    return data.participants
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

function pickParticipantId(source: Record<string, unknown>) {
  return (
    normalizeString(source.id) ??
    normalizeString(source.participantId) ??
    normalizeString(source.membershipId) ??
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

function pickUserId(source: Record<string, unknown>) {
  return (
    normalizeString(source.userId) ??
    normalizeString(source.memberUserId) ??
    normalizeString(source.accountUserId) ??
    null
  )
}

function pickDisplayName(source: Record<string, unknown>) {
  return (
    normalizeString(source.displayName) ??
    normalizeString(source.fullName) ??
    normalizeString(source.name) ??
    normalizeString(source.username) ??
    "Unknown user"
  )
}

function pickUsername(source: Record<string, unknown>) {
  return (
    normalizeString(source.username) ??
    normalizeString(source.handle) ??
    null
  )
}

function pickAvatarUrl(source: Record<string, unknown>) {
  return (
    normalizeString(source.avatarUrl) ??
    normalizeString(source.photoUrl) ??
    normalizeString(source.imageUrl) ??
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

export function normalizeMessengerParticipant(
  value: unknown,
  roomIdFallback?: string,
): KernelMessengerParticipant {
  const source = normalizeRecord(value)
  const participantId = pickParticipantId(source)

  if (!participantId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger participant payload is missing id",
    })
  }

  const roomId = pickRoomId(source) ?? normalizeString(roomIdFallback)

  if (!roomId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger participant payload is missing roomId",
    })
  }

  const userId = pickUserId(source)

  if (!userId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: "Messenger participant payload is missing userId",
    })
  }

  return {
    id: participantId,
    roomId,
    userId,
    displayName: pickDisplayName(source),
    username: pickUsername(source),
    avatarUrl: pickAvatarUrl(source),
    role: normalizeParticipantRole(source.role),
    presence: normalizeParticipantPresence(source.presence),
    isSelf: normalizeBoolean(source.isSelf, false),
    isBlocked: normalizeBoolean(source.isBlocked, false),
    joinedAt: pickTimestamp(source, "joinedAt", "createdAt"),
    lastSeenAt: pickTimestamp(source, "lastSeenAt"),
    createdAt: pickTimestamp(source, "createdAt"),
    updatedAt: pickTimestamp(source, "updatedAt"),
    metadata: normalizeRecord(source.metadata),
  }
}

function extractParticipantEntity(payload: unknown) {
  const source = normalizeRecord(payload)

  if (source.data && typeof source.data === "object" && !Array.isArray(source.data)) {
    return source.data
  }

  return source
}

export async function listMessengerParticipantsByRoom(
  query: KernelMessengerParticipantsQuery,
): Promise<KernelMessengerParticipantsResponse> {
  const payload = await fetchMessengerParticipantsPayload(query)
  const roomId = query.roomId.trim()
  const items = extractItems(payload).map((item) =>
    normalizeMessengerParticipant(item, roomId),
  )

  return {
    roomId,
    items,
    nextCursor: extractNextCursor(payload),
    totalCount: extractTotalCount(payload),
  }
}

export async function getMessengerParticipantById(
  participantId: string,
): Promise<KernelMessengerParticipant> {
  const payload = await fetchMessengerParticipantPayload(participantId)
  return normalizeMessengerParticipant(extractParticipantEntity(payload))
}