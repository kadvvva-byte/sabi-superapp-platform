import { MessengerKernelError } from "../core/errors"
import type {
  MessengerRealtimeEnvelope,
  MessengerRealtimeGatewayConfig,
  MessengerRealtimeGatewayEvent,
  MessengerRealtimeGatewayListener,
  MessengerRealtimeGatewayState,
  MessengerRealtimeGatewayStatus,
  MessengerRealtimeTransportPayload,
} from "./types"

type RealtimeSocketLike = {
  readyState: number
  close: (code?: number, reason?: string) => void
  send: (data: string) => void
  onopen: ((event: unknown) => void) | null
  onmessage: ((event: { data?: unknown }) => void) | null
  onerror: ((event: unknown) => void) | null
  onclose: ((event: { code?: number; reason?: string }) => void) | null
}

type RealtimeSocketConstructor = new (url: string) => RealtimeSocketLike

const SOCKET_CONNECTING = 0
const SOCKET_OPEN = 1

let socket: RealtimeSocketLike | null = null
let socketConfig: MessengerRealtimeGatewayConfig | null = null
let suppressNextCloseStatus = false

let gatewayState: MessengerRealtimeGatewayState = {
  status: "idle",
  connectedAt: null,
  disconnectedAt: null,
  lastMessageAt: null,
  errorMessage: null,
  wsUrl: null,
  currentUserId: null,
}

const listeners = new Set<MessengerRealtimeGatewayListener>()

function nowIso() {
  return new Date().toISOString()
}

function getSocketConstructor(): RealtimeSocketConstructor {
  const candidate = (globalThis as unknown as { WebSocket?: RealtimeSocketConstructor })
    .WebSocket

  if (typeof candidate === "function") {
    return candidate
  }

  throw new MessengerKernelError({
    code: "MESSENGER_KERNEL_NOT_CONFIGURED",
    message: "Global WebSocket implementation is not available",
  })
}

function emit(event: MessengerRealtimeGatewayEvent) {
  listeners.forEach((listener) => listener(event))
}

function setGatewayStatus(
  status: MessengerRealtimeGatewayStatus,
  errorMessage: string | null = null,
) {
  const now = nowIso()

  gatewayState = {
    ...gatewayState,
    status,
    errorMessage,
    connectedAt:
      status === "connected" ? now : gatewayState.connectedAt,
    disconnectedAt:
      status === "disconnected" || status === "error"
        ? now
        : gatewayState.disconnectedAt,
  }

  emit({
    type: "status",
    status,
    errorMessage,
    state: gatewayState,
  })
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

function normalizeTransportPayload(
  raw: MessengerRealtimeTransportPayload,
): Record<string, unknown> {
  if (typeof raw === "string") {
    const normalized = raw.trim()
    if (!normalized) {
      return {}
    }

    try {
      const parsed = JSON.parse(normalized)
      return normalizeRecord(parsed)
    } catch {
      return {
        name: "unknown",
        payload: {
          raw: normalized,
        },
      }
    }
  }

  return normalizeRecord(raw)
}

function buildEnvelope(
  raw: MessengerRealtimeTransportPayload,
): MessengerRealtimeEnvelope {
  const source = normalizeTransportPayload(raw)
  const payload =
    source.payload && typeof source.payload === "object" && !Array.isArray(source.payload)
      ? (source.payload as Record<string, unknown>)
      : source

  const entity =
    payload.entity && typeof payload.entity === "object" && !Array.isArray(payload.entity)
      ? (payload.entity as Record<string, unknown>)
      : null

  return {
    id:
      normalizeString(source.id) ??
      normalizeString(payload.id) ??
      normalizeString(entity?.id) ??
      null,
    name:
      normalizeString(source.name) ??
      normalizeString(source.event) ??
      normalizeString(source.type) ??
      "unknown",
    payload,
    occurredAt:
      normalizeString(source.occurredAt) ??
      normalizeString(source.createdAt) ??
      normalizeString(payload.occurredAt) ??
      normalizeString(payload.createdAt) ??
      null,
    roomId:
      normalizeString(source.roomId) ??
      normalizeString(source.chatId) ??
      normalizeString(payload.roomId) ??
      normalizeString(payload.chatId) ??
      normalizeString(entity?.roomId) ??
      normalizeString(entity?.chatId) ??
      null,
    userId:
      normalizeString(source.userId) ??
      normalizeString(payload.userId) ??
      normalizeString(entity?.userId) ??
      null,
  }
}

function bindSocketEvents(activeSocket: RealtimeSocketLike) {
  activeSocket.onopen = () => {
    setGatewayStatus("connected", null)
  }

  activeSocket.onmessage = (event) => {
    gatewayState = {
      ...gatewayState,
      lastMessageAt: nowIso(),
    }

    emit({
      type: "message",
      envelope: buildEnvelope(event?.data as MessengerRealtimeTransportPayload),
      state: gatewayState,
    })
  }

  activeSocket.onerror = () => {
    setGatewayStatus("error", "Messenger realtime socket error")
  }

  activeSocket.onclose = () => {
    socket = null

    if (suppressNextCloseStatus) {
      suppressNextCloseStatus = false
      return
    }

    setGatewayStatus("disconnected", null)
  }
}

function buildGatewayUrl(config: MessengerRealtimeGatewayConfig) {
  const url = new URL(config.wsUrl)
  url.searchParams.set("accessToken", config.accessToken)
  url.searchParams.set("userId", config.currentUserId)
  return url.toString()
}

export function getMessengerRealtimeGatewayState() {
  return gatewayState
}

export function subscribeMessengerRealtimeGateway(
  listener: MessengerRealtimeGatewayListener,
) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function connectMessengerRealtimeGateway(
  config: MessengerRealtimeGatewayConfig,
) {
  const normalizedUrl = config.wsUrl.trim()
  const normalizedAccessToken = config.accessToken.trim()
  const normalizedCurrentUserId = config.currentUserId.trim()

  if (!normalizedUrl || !normalizedAccessToken || !normalizedCurrentUserId) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_NOT_CONFIGURED",
      message: "Messenger realtime gateway config is incomplete",
    })
  }

  if (
    socket &&
    socket.readyState === SOCKET_OPEN &&
    socketConfig?.wsUrl === normalizedUrl &&
    socketConfig?.currentUserId === normalizedCurrentUserId
  ) {
    return gatewayState
  }

  if (socket && socket.readyState === SOCKET_CONNECTING) {
    return gatewayState
  }

  closeMessengerRealtimeGateway()

  const SocketConstructor = getSocketConstructor()
  const nextConfig: MessengerRealtimeGatewayConfig = {
    wsUrl: normalizedUrl,
    accessToken: normalizedAccessToken,
    currentUserId: normalizedCurrentUserId,
  }

  socketConfig = nextConfig
  gatewayState = {
    ...gatewayState,
    status: "connecting",
    errorMessage: null,
    wsUrl: normalizedUrl,
    currentUserId: normalizedCurrentUserId,
  }

  emit({
    type: "status",
    status: "connecting",
    errorMessage: null,
    state: gatewayState,
  })

  socket = new SocketConstructor(buildGatewayUrl(nextConfig))
  bindSocketEvents(socket)

  return gatewayState
}

export function closeMessengerRealtimeGateway(
  code = 1000,
  reason = "manual_disconnect",
) {
  if (socket) {
    const currentSocket = socket
    socket = null
    suppressNextCloseStatus = true
    currentSocket.close(code, reason)
  }

  socketConfig = null
  gatewayState = {
    ...gatewayState,
    status: "disconnected",
    disconnectedAt: nowIso(),
    errorMessage: null,
  }

  emit({
    type: "status",
    status: "disconnected",
    errorMessage: null,
    state: gatewayState,
  })

  return gatewayState
}

export function sendMessengerRealtimeGatewayMessage(
  payload: Record<string, unknown>,
) {
  if (!socket || socket.readyState !== SOCKET_OPEN) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_NOT_CONFIGURED",
      message: "Messenger realtime gateway is not connected",
    })
  }

  socket.send(JSON.stringify(payload))
}

export function resetMessengerRealtimeGateway() {
  closeMessengerRealtimeGateway()
  gatewayState = {
    status: "idle",
    connectedAt: null,
    disconnectedAt: null,
    lastMessageAt: null,
    errorMessage: null,
    wsUrl: null,
    currentUserId: null,
  }

  return gatewayState
}