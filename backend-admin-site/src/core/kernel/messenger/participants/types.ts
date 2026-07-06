import type { MessengerKernelParticipantRecord } from "../core/types"

export type KernelMessengerParticipantRole =
  | "owner"
  | "admin"
  | "member"
  | "guest"
  | "bot"
  | "system"
  | "unknown"

export type KernelMessengerParticipantPresence =
  | "online"
  | "offline"
  | "away"
  | "busy"
  | "typing"
  | "unknown"

export type KernelMessengerParticipant = MessengerKernelParticipantRecord & {
  id: string
  roomId: string
  userId: string
  displayName: string
  username: string | null
  avatarUrl: string | null
  role: KernelMessengerParticipantRole
  presence: KernelMessengerParticipantPresence
  isSelf: boolean
  isBlocked: boolean
  joinedAt: string | null
  lastSeenAt: string | null
  createdAt: string | null
  updatedAt: string | null
  metadata: Record<string, unknown>
}

export type KernelMessengerParticipantsQuery = {
  roomId: string
  cursor?: string | null
  limit?: number
  search?: string | null
}

export type KernelMessengerParticipantsResponse = {
  roomId: string
  items: KernelMessengerParticipant[]
  nextCursor: string | null
  totalCount: number | null
}

export type KernelMessengerParticipantsState = {
  items: KernelMessengerParticipant[]
  byId: Record<string, KernelMessengerParticipant>
  participantIdsByRoomId: Record<string, string[]>
  selectedRoomId: string | null
  isLoading: boolean
  isRefreshing: boolean
  isHydrated: boolean
  errorMessage: string | null
  nextCursorByRoomId: Record<string, string | null>
  totalCountByRoomId: Record<string, number | null>
  lastFetchedAtByRoomId: Record<string, string | null>
}