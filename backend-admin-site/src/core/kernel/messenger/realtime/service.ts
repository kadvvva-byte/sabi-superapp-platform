import { emitMessengerKernelEvent } from "../core/event-bus"
import {
  bindMessengerKernelRuntime,
  getMessengerKernelState,
  markMessengerKernelRealtimeEvent,
  removeMessengerKernelCalls,
  removeMessengerKernelMessages,
  removeMessengerKernelParticipants,
  removeMessengerKernelRooms,
  setMessengerKernelActiveCallId,
  setMessengerKernelIncomingCallId,
  setMessengerKernelRealtimeStatus,
  upsertMessengerKernelCalls,
  upsertMessengerKernelMessages,
  upsertMessengerKernelParticipants,
  upsertMessengerKernelRooms,
} from "../core/store"
import type {
  MessengerKernelCallRecord,
  MessengerKernelMessageRecord,
  MessengerKernelParticipantRecord,
  MessengerKernelRoomRecord,
} from "../core/types"
import { getMessengerKernelSessionSnapshot } from "../session/service"
import {
  closeMessengerRealtimeGateway,
  connectMessengerRealtimeGateway,
  getMessengerRealtimeGatewayState,
  resetMessengerRealtimeGateway,
  sendMessengerRealtimeGatewayMessage,
  subscribeMessengerRealtimeGateway,
} from "./gateway"
import type {
  MessengerRealtimeEnvelope,
  MessengerRealtimeGatewayListener,
  MessengerRealtimeGatewayState,
} from "./types"

type MessengerRealtimeServiceListener = (
  state: MessengerRealtimeGatewayState,
) => void

let gatewayUnsubscribe: (() => void) | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
let manualDisconnect = false
const serviceListeners = new Set<MessengerRealtimeServiceListener>()

function nowIso() {
  return new Date().toISOString()
}

function emitServiceState(state: MessengerRealtimeGatewayState) {
  serviceListeners.forEach((listener) => listener(state))
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const normalized = value.trim()
  return normalized ? normalized : null
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value as Record<string, unknown>
}

function clearReconnectTimer() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
}

function buildRealtimeWsUrl(apiBaseUrl: string) {
  if (apiBaseUrl.startsWith("https://")) {
    return `${apiBaseUrl.replace(/^https:\/\//, "wss://")}/messenger/realtime`
  }

  if (apiBaseUrl.startsWith("http://")) {
    return `${apiBaseUrl.replace(/^http:\/\//, "ws://")}/messenger/realtime`
  }

  if (apiBaseUrl.startsWith("wss://") || apiBaseUrl.startsWith("ws://")) {
    return `${apiBaseUrl.replace(/\/+$/, "")}/messenger/realtime`
  }

  return `ws://${apiBaseUrl.replace(/\/+$/, "")}/messenger/realtime`
}

function emitRealtimeStatusEvent(
  status: MessengerRealtimeGatewayState["status"],
  errorMessage: string | null,
) {
  emitMessengerKernelEvent("realtime:status_changed", {
    status,
    error: errorMessage,
    state: getMessengerKernelState(),
  })
}

function emitCollectionReady(key: "rooms" | "messages" | "participants" | "calls") {
  emitMessengerKernelEvent("collection:ready", {
    key,
    state: getMessengerKernelState(),
  })
}

function emitCollectionError(
  key: "rooms" | "messages" | "participants" | "calls",
  message: string,
) {
  emitMessengerKernelEvent("collection:error", {
    key,
    message,
    state: getMessengerKernelState(),
  })
}

function getEntityPayload(payload: Record<string, unknown>) {
  const candidates = [
    payload.entity,
    payload.room,
    payload.message,
    payload.participant,
    payload.call,
    payload.data,
  ]

  for (const candidate of candidates) {
    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      return candidate as Record<string, unknown>
    }
  }

  return payload
}

function getEntityId(payload: Record<string, unknown>, fallbackId?: string | null) {
  const entity = getEntityPayload(payload)

  return (
    normalizeString(fallbackId) ??
    normalizeString(payload.id) ??
    normalizeString(payload.roomId) ??
    normalizeString(payload.messageId) ??
    normalizeString(payload.participantId) ??
    normalizeString(payload.callId) ??
    normalizeString(entity.id) ??
    normalizeString(entity.roomId) ??
    normalizeString(entity.messageId) ??
    normalizeString(entity.participantId) ??
    normalizeString(entity.callId) ??
    null
  )
}

function getEnvelopeRoomId(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)

  return (
    normalizeString(entity.roomId) ??
    normalizeString(entity.chatId) ??
    normalizeString(envelope.payload.roomId) ??
    normalizeString(envelope.payload.chatId) ??
    envelope.roomId ??
    null
  )
}

function getEnvelopeUserId(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)

  return (
    normalizeString(entity.userId) ??
    normalizeString(entity.peerId) ??
    normalizeString(envelope.payload.userId) ??
    normalizeString(envelope.payload.peerId) ??
    envelope.userId ??
    null
  )
}

function getParticipantByRoomAndUser(roomId: string, userId: string) {
  const state = getMessengerKernelState() as Record<string, unknown>
  const participantsState = normalizeRecord(state.participants)
  const entities = {
    ...normalizeRecord(participantsState.records),
    ...normalizeRecord(participantsState.entities),
  }

  for (const candidate of Object.values(entities)) {
    const participant = normalizeRecord(candidate)
    if (
      normalizeString(participant.roomId) === roomId &&
      normalizeString(participant.userId) === userId
    ) {
      return participant
    }
  }

  return null
}

function upsertRoomFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)
  const roomId =
    normalizeString(entity.id) ??
    normalizeString(entity.roomId) ??
    envelope.roomId

  if (!roomId) {
    return
  }

  const roomRecord: MessengerKernelRoomRecord = {
    ...entity,
    id: roomId,
  }

  upsertMessengerKernelRooms([roomRecord])
  emitMessengerKernelEvent("rooms:upserted", {
    rooms: [roomRecord],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("rooms")
}

function removeRoomFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const roomId = getEntityId(envelope.payload, envelope.roomId)

  if (!roomId) {
    return
  }

  removeMessengerKernelRooms([roomId])
  emitMessengerKernelEvent("rooms:removed", {
    ids: [roomId],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("rooms")
}

function upsertMessageFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)
  const messageId =
    normalizeString(entity.id) ??
    normalizeString(entity.messageId) ??
    envelope.id
  const roomId =
    normalizeString(entity.roomId) ??
    envelope.roomId

  if (!messageId || !roomId) {
    return
  }

  const state = getMessengerKernelState() as Record<string, unknown>
  const messagesState = normalizeRecord(state.messages)
  const existing = normalizeRecord(normalizeRecord(messagesState.entities)[messageId])

  const messageRecord: MessengerKernelMessageRecord = {
    ...existing,
    ...entity,
    id: messageId,
    roomId,
  }

  upsertMessengerKernelMessages([messageRecord])
  emitMessengerKernelEvent("messages:upserted", {
    messages: [messageRecord],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("messages")
}

function removeMessageFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const messageId = getEntityId(envelope.payload, envelope.id)

  if (!messageId) {
    return
  }

  removeMessengerKernelMessages([messageId])
  emitMessengerKernelEvent("messages:removed", {
    ids: [messageId],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("messages")
}

function upsertParticipantFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)
  const roomId =
    normalizeString(entity.roomId) ??
    envelope.roomId
  const userId =
    normalizeString(entity.userId) ??
    envelope.userId

  if (!roomId || !userId) {
    return
  }

  const existing = getParticipantByRoomAndUser(roomId, userId)
  const participantId =
    normalizeString(entity.id) ??
    normalizeString(entity.participantId) ??
    normalizeString(existing?.id) ??
    `${roomId}:${userId}`

  const participantRecord: MessengerKernelParticipantRecord = {
    ...existing,
    ...entity,
    id: participantId,
    roomId,
    userId,
  }

  upsertMessengerKernelParticipants([participantRecord])
  emitMessengerKernelEvent("participants:upserted", {
    participants: [participantRecord],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("participants")
}

function upsertParticipantPresenceFromEnvelope(
  envelope: MessengerRealtimeEnvelope,
  mode: "online" | "offline" | "typing" | "typing_stopped",
) {
  const entity = getEntityPayload(envelope.payload)
  const roomId = getEnvelopeRoomId(envelope)
  const userId = getEnvelopeUserId(envelope)

  if (!roomId || !userId) {
    return
  }

  const existing = getParticipantByRoomAndUser(roomId, userId)
  const participantId =
    normalizeString(entity.id) ??
    normalizeString(entity.participantId) ??
    normalizeString(existing?.id) ??
    `${roomId}:${userId}`

  const existingMetadata = normalizeRecord(existing?.metadata)
  const entityMetadata = normalizeRecord(entity.metadata)
  const occurredAt =
    normalizeString(entity.updatedAt) ??
    normalizeString(entity.at) ??
    normalizeString(envelope.occurredAt) ??
    nowIso()

  const online = mode === "online" || mode === "typing"
  const typing = mode === "typing"
  const lastSeenAt =
    mode === "offline"
      ? normalizeString(entity.lastSeenAt) ?? occurredAt
      : mode === "typing_stopped"
        ? normalizeString(entity.lastSeenAt) ?? normalizeString(existing?.lastSeenAt) ?? null
        : null

  const participantRecord: MessengerKernelParticipantRecord = {
    ...existing,
    ...entity,
    id: participantId,
    roomId,
    userId,
    presence:
      mode === "typing"
        ? "typing"
        : online
          ? "online"
          : "offline",
    lastSeenAt: online ? null : lastSeenAt,
    updatedAt: occurredAt,
    metadata: {
      ...existingMetadata,
      ...entityMetadata,
      online,
      typing,
      updatedAt: occurredAt,
      lastSeenAt: online ? null : lastSeenAt,
    },
  }

  upsertMessengerKernelParticipants([participantRecord])
  emitMessengerKernelEvent("participants:upserted", {
    participants: [participantRecord],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("participants")
}

function normalizePresenceItemsFromPayload(payload: Record<string, unknown>) {
  const candidates = [
    payload.items,
    payload.users,
    payload.participants,
    payload.list,
    payload.presence,
    payload.state,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
        .map((item) => normalizeRecord(item))
        .filter((item) => normalizeString(item.userId))
    }

    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      return Object.entries(candidate as Record<string, unknown>)
        .map(([userId, value]) => ({
          ...normalizeRecord(value),
          userId: normalizeString(normalizeRecord(value).userId) ?? userId,
        }))
        .filter((item) => normalizeString(item.userId))
    }
  }

  return [] as Record<string, unknown>[]
}

function normalizePresenceOnlineFlag(entry: Record<string, unknown>) {
  if (typeof entry.online === "boolean") {
    return entry.online
  }

  const status =
    normalizeString(entry.status) ??
    normalizeString(entry.presence) ??
    normalizeString(entry.state)

  if (!status) {
    return false
  }

  const normalized = status.toLowerCase()
  return (
    normalized === "online" ||
    normalized === "active" ||
    normalized === "available" ||
    normalized === "typing" ||
    normalized === "live"
  )
}

function upsertPresenceSnapshotFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const roomId = getEnvelopeRoomId(envelope)
  if (!roomId) {
    return
  }

  const payload = normalizeRecord(envelope.payload)
  const items = normalizePresenceItemsFromPayload(payload)
  if (!items.length) {
    return
  }

  const nextParticipants: MessengerKernelParticipantRecord[] = []

  for (const rawItem of items) {
    const item = normalizeRecord(rawItem)
    const userId = normalizeString(item.userId)
    if (!userId) {
      continue
    }

    const existing = getParticipantByRoomAndUser(roomId, userId)
    const participantId =
      normalizeString(item.id) ??
      normalizeString(item.participantId) ??
      normalizeString(existing?.id) ??
      `${roomId}:${userId}`

    const online = normalizePresenceOnlineFlag(item)
    const occurredAt =
      normalizeString(item.updatedAt) ??
      normalizeString(item.at) ??
      normalizeString(envelope.occurredAt) ??
      nowIso()
    const lastSeenAt = online
      ? null
      : normalizeString(item.lastSeenAt) ?? occurredAt

    const existingMetadata = normalizeRecord(existing?.metadata)
    const itemMetadata = normalizeRecord(item.metadata)

    nextParticipants.push({
      ...existing,
      ...item,
      id: participantId,
      roomId,
      userId,
      presence: online ? "online" : "offline",
      lastSeenAt,
      updatedAt: occurredAt,
      metadata: {
        ...existingMetadata,
        ...itemMetadata,
        online,
        typing:
          normalizeString(item.status)?.toLowerCase() === "typing" ||
          normalizeString(item.presence)?.toLowerCase() === "typing",
        updatedAt: occurredAt,
        lastSeenAt,
      },
    })
  }

  if (!nextParticipants.length) {
    return
  }

  upsertMessengerKernelParticipants(nextParticipants)
  emitMessengerKernelEvent("participants:upserted", {
    participants: nextParticipants,
    state: getMessengerKernelState(),
  })
  emitCollectionReady("participants")
}

function removeParticipantFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const participantId = getEntityId(envelope.payload, envelope.id)

  if (!participantId) {
    return
  }

  removeMessengerKernelParticipants([participantId])
  emitMessengerKernelEvent("participants:removed", {
    ids: [participantId],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("participants")
}

function upsertCallFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const entity = getEntityPayload(envelope.payload)
  const callId =
    normalizeString(entity.id) ??
    normalizeString(entity.callId) ??
    envelope.id
  const roomId =
    normalizeString(entity.roomId) ??
    envelope.roomId

  if (!callId) {
    return
  }

  const callRecord: MessengerKernelCallRecord = {
    ...entity,
    id: callId,
    roomId: roomId ?? undefined,
  }

  upsertMessengerKernelCalls([callRecord])
  emitMessengerKernelEvent("calls:upserted", {
    calls: [callRecord],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("calls")
}

function removeCallFromEnvelope(envelope: MessengerRealtimeEnvelope) {
  const callId = getEntityId(envelope.payload, envelope.id)

  if (!callId) {
    return
  }

  removeMessengerKernelCalls([callId])

  const state = getMessengerKernelState()
  if (state.calls.activeCallId === callId) {
    setMessengerKernelActiveCallId(null)
    emitMessengerKernelEvent("calls:active_changed", {
      callId: null,
      state: getMessengerKernelState(),
    })
  }

  if (state.calls.incomingCallId === callId) {
    setMessengerKernelIncomingCallId(null)
    emitMessengerKernelEvent("calls:incoming_changed", {
      callId: null,
      state: getMessengerKernelState(),
    })
  }

  emitMessengerKernelEvent("calls:removed", {
    ids: [callId],
    state: getMessengerKernelState(),
  })
  emitCollectionReady("calls")
}

function applyCallActivityFromEnvelope(
  envelope: MessengerRealtimeEnvelope,
  mode: "incoming" | "active" | "clear",
) {
  const callId = getEntityId(envelope.payload, envelope.id)

  if (mode === "clear") {
    setMessengerKernelIncomingCallId(null)
    setMessengerKernelActiveCallId(null)

    emitMessengerKernelEvent("calls:incoming_changed", {
      callId: null,
      state: getMessengerKernelState(),
    })
    emitMessengerKernelEvent("calls:active_changed", {
      callId: null,
      state: getMessengerKernelState(),
    })
    return
  }

  if (!callId) {
    return
  }

  if (mode === "incoming") {
    setMessengerKernelIncomingCallId(callId)
    emitMessengerKernelEvent("calls:incoming_changed", {
      callId,
      state: getMessengerKernelState(),
    })
    return
  }

  setMessengerKernelActiveCallId(callId)
  emitMessengerKernelEvent("calls:active_changed", {
    callId,
    state: getMessengerKernelState(),
  })
}

export function handleMessengerRealtimeEnvelope(
  envelope: MessengerRealtimeEnvelope,
) {
  markMessengerKernelRealtimeEvent()

  emitMessengerKernelEvent("realtime:event_received", {
    at: envelope.occurredAt ?? nowIso(),
    state: getMessengerKernelState(),
  })

  const eventName = envelope.name.toLowerCase()

  try {
    if (
      eventName === "room.created" ||
      eventName === "room.updated" ||
      eventName === "room.synced"
    ) {
      upsertRoomFromEnvelope(envelope)
      return
    }

    if (eventName === "room.deleted" || eventName === "room.removed") {
      removeRoomFromEnvelope(envelope)
      return
    }

    if (
      eventName === "message.created" ||
      eventName === "message.updated" ||
      eventName === "message.sent" ||
      eventName === "message.delivered" ||
      eventName === "message.read"
    ) {
      upsertMessageFromEnvelope(envelope)
      return
    }

    if (eventName === "message.deleted" || eventName === "message.removed") {
      removeMessageFromEnvelope(envelope)
      return
    }

    if (
      eventName === "presence.snapshot" ||
      eventName === "presence:snapshot" ||
      eventName === "presence.state" ||
      eventName === "presence:state" ||
      eventName === "presence_state" ||
      eventName === "presence.snapshot.response" ||
      eventName === "presence:state:response" ||
      eventName === "chat:presence:snapshot" ||
      eventName === "chat_presence_snapshot"
    ) {
      upsertPresenceSnapshotFromEnvelope(envelope)
      return
    }

    if (
      eventName === "presence.online" ||
      eventName === "participant.online"
    ) {
      upsertParticipantPresenceFromEnvelope(envelope, "online")
      return
    }

    if (
      eventName === "presence.offline" ||
      eventName === "participant.offline"
    ) {
      upsertParticipantPresenceFromEnvelope(envelope, "offline")
      return
    }

    if (
      eventName === "participant.typing.start" ||
      eventName === "typing.start"
    ) {
      upsertParticipantPresenceFromEnvelope(envelope, "typing")
      return
    }

    if (
      eventName === "participant.typing.stop" ||
      eventName === "typing.stop"
    ) {
      upsertParticipantPresenceFromEnvelope(envelope, "typing_stopped")
      return
    }

    if (
      eventName === "participant.joined" ||
      eventName === "participant.updated" ||
      eventName === "participant.presence"
    ) {
      upsertParticipantFromEnvelope(envelope)
      return
    }

    if (eventName === "participant.left" || eventName === "participant.removed") {
      removeParticipantFromEnvelope(envelope)
      return
    }

    if (
      eventName === "call.created" ||
      eventName === "call.updated" ||
      eventName === "call.connected"
    ) {
      upsertCallFromEnvelope(envelope)

      if (eventName === "call.connected") {
        applyCallActivityFromEnvelope(envelope, "active")
      }

      return
    }

    if (eventName === "call.ringing" || eventName === "call.incoming") {
      upsertCallFromEnvelope(envelope)
      applyCallActivityFromEnvelope(envelope, "incoming")
      return
    }

    if (eventName === "call.ended" || eventName === "call.hangup") {
      upsertCallFromEnvelope(envelope)
      applyCallActivityFromEnvelope(envelope, "clear")
      return
    }

    if (eventName === "call.deleted" || eventName === "call.removed") {
      removeCallFromEnvelope(envelope)
      return
    }
  } catch (error) {
    emitCollectionError(
      "messages",
      error instanceof Error ? error.message : "Realtime event handling failed",
    )
  }
}

function clearGatewaySubscription() {
  if (gatewayUnsubscribe) {
    gatewayUnsubscribe()
    gatewayUnsubscribe = null
  }
}

function scheduleReconnect() {
  if (manualDisconnect || reconnectTimer) {
    return
  }

  reconnectTimer = setTimeout(async () => {
    reconnectTimer = null

    try {
      await connectMessengerRealtime()
    } catch {
      scheduleReconnect()
    }
  }, 2000)
}

function handleGatewayStateEvent(
  status: MessengerRealtimeGatewayState["status"],
  errorMessage: string | null,
  state: MessengerRealtimeGatewayState,
) {
  if (status === "connected") {
    clearReconnectTimer()
    setMessengerKernelRealtimeStatus("connected", null)
    emitRealtimeStatusEvent("connected", null)
    emitServiceState(state)
    return
  }

  if (status === "connecting") {
    setMessengerKernelRealtimeStatus("connecting", null)
    emitRealtimeStatusEvent("connecting", null)
    emitServiceState(state)
    return
  }

  if (status === "disconnected") {
    setMessengerKernelRealtimeStatus(
      manualDisconnect ? "disconnected" : "reconnecting",
      null,
    )
    emitRealtimeStatusEvent(
      manualDisconnect ? "disconnected" : "reconnecting",
      null,
    )
    emitServiceState(state)

    if (!manualDisconnect) {
      scheduleReconnect()
    }

    return
  }

  if (status === "error") {
    setMessengerKernelRealtimeStatus("error", errorMessage)
    emitRealtimeStatusEvent("error", errorMessage)
    emitServiceState(state)

    if (!manualDisconnect) {
      scheduleReconnect()
    }

    return
  }

  setMessengerKernelRealtimeStatus(status, errorMessage)
  emitRealtimeStatusEvent(status, errorMessage)
  emitServiceState(state)
}

function ensureGatewayListener() {
  if (gatewayUnsubscribe) {
    return
  }

  const listener: MessengerRealtimeGatewayListener = (event) => {
    if (event.type === "status") {
      handleGatewayStateEvent(event.status, event.errorMessage, event.state)
      return
    }

    handleMessengerRealtimeEnvelope(event.envelope)
    emitServiceState(event.state)
  }

  gatewayUnsubscribe = subscribeMessengerRealtimeGateway(listener)
}

export function getMessengerRealtimeServiceState() {
  return getMessengerRealtimeGatewayState()
}

export function subscribeMessengerRealtimeService(
  listener: MessengerRealtimeServiceListener,
) {
  serviceListeners.add(listener)

  return () => {
    serviceListeners.delete(listener)
  }
}

export async function connectMessengerRealtime() {
  manualDisconnect = false
  clearReconnectTimer()
  ensureGatewayListener()

  await bindMessengerKernelRuntime()

  const session = await getMessengerKernelSessionSnapshot()
  const state = connectMessengerRealtimeGateway({
    wsUrl: buildRealtimeWsUrl(session.apiBaseUrl),
    accessToken: session.accessToken,
    currentUserId: session.currentUserId,
  })

  emitServiceState(state)
  return state
}

export function disconnectMessengerRealtime() {
  manualDisconnect = true
  clearReconnectTimer()

  const state = closeMessengerRealtimeGateway()
  emitServiceState(state)

  return state
}

export async function reconnectMessengerRealtime() {
  manualDisconnect = false
  clearReconnectTimer()
  closeMessengerRealtimeGateway()
  return connectMessengerRealtime()
}

export function resetMessengerRealtimeService() {
  manualDisconnect = true
  clearReconnectTimer()

  const closedState = closeMessengerRealtimeGateway()
  emitServiceState(closedState)

  clearGatewaySubscription()

  const idleState = resetMessengerRealtimeGateway()
  setMessengerKernelRealtimeStatus("idle", null)
  emitRealtimeStatusEvent("idle", null)
  emitServiceState(idleState)

  return idleState
}

export function sendMessengerRealtimeClientEvent(
  name: string,
  payload: Record<string, unknown> = {},
) {
  sendMessengerRealtimeGatewayMessage({
    name,
    payload,
    occurredAt: nowIso(),
  })
}
