export type MessengerRealtimeGatewayStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error"

export type MessengerRealtimeMessageKind =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "voice"
  | "file"
  | "document"
  | "location"
  | "contact"
  | "gift"
  | "animated_reaction"
  | "animated_emoji"
  | "system"
  | "unknown"

export type MessengerRealtimeAnimatedKind =
  | "reaction"
  | "emoji"
  | "gift"

export type MessengerRealtimeAnimatedPayload = {
  id?: string | null
  emoji?: string | null
  title?: string | null
  subtitle?: string | null
  durationMs?: number | null
  kind?: MessengerRealtimeAnimatedKind | null
  premium?: boolean | null
}

export type MessengerRealtimeMessagePayload = {
  id?: string | null
  clientMessageId?: string | null
  roomId: string
  userId?: string | null
  type: MessengerRealtimeMessageKind
  content?: string | null
  replyToMessageId?: string | null
  previewTitle?: string | null
  previewSubtitle?: string | null
  fileLabel?: string | null
  mimeType?: string | null
  mediaUrl?: string | null
  thumbnailUrl?: string | null
  durationMs?: number | null
  durationLabel?: string | null
  latitude?: number | null
  longitude?: number | null
  animatedPayload?: MessengerRealtimeAnimatedPayload | null
  metadata?: Record<string, unknown> | null
}

export type MessengerRealtimeRoomJoinPayload = {
  roomId: string
  chatId?: string | null
  userId?: string | null
  peerUserId?: string | null
  partnerId?: string | null
  targetUserId?: string | null
  roomType?: string | null
}

export type MessengerRealtimeRoomLeavePayload = {
  roomId: string
  chatId?: string | null
  userId?: string | null
  peerUserId?: string | null
  partnerId?: string | null
  targetUserId?: string | null
}

export type MessengerRealtimeMessageAckPayload = {
  roomId: string
  chatId?: string | null
  messageId: string
  userId?: string | null
  at?: string | null
}

export type MessengerRealtimeTypingPayload = {
  roomId: string
  chatId?: string | null
  userId?: string | null
  peerUserId?: string | null
  at?: string | null
}

export type MessengerRealtimePresencePayload = {
  roomId: string
  chatId?: string | null
  userId: string
  peerUserId?: string | null
  partnerId?: string | null
  targetUserId?: string | null
  roomType?: string | null
  presence?: "online" | "offline" | "away" | "busy" | "typing" | "unknown" | null
  at?: string | null
  lastSeenAt?: string | null
  metadata?: Record<string, unknown> | null
}

export type MessengerRealtimeCallSignalPayload = {
  roomId: string
  callId?: string | null
  peerId?: string | null
  targetUserId?: string | null
  fromUserId?: string | null
  message: Record<string, unknown> | string | null
}

export type MessengerRealtimeClientEventMap = {
  "room.join": MessengerRealtimeRoomJoinPayload
  "room.leave": MessengerRealtimeRoomLeavePayload
  "message.send": MessengerRealtimeMessagePayload
  "message.delivered": MessengerRealtimeMessageAckPayload
  "message.read": MessengerRealtimeMessageAckPayload
  "participant.typing.start": MessengerRealtimeTypingPayload
  "participant.typing.stop": MessengerRealtimeTypingPayload
  "presence.online": MessengerRealtimePresencePayload
  "presence.offline": MessengerRealtimePresencePayload
  "call.signal": MessengerRealtimeCallSignalPayload
}

export type MessengerRealtimeClientEventName =
  keyof MessengerRealtimeClientEventMap

export type MessengerRealtimeClientCommand<
  TEventName extends MessengerRealtimeClientEventName = MessengerRealtimeClientEventName,
> = {
  name: TEventName
  payload: MessengerRealtimeClientEventMap[TEventName]
  occurredAt?: string | null
}

export type MessengerRealtimeServerEventName =
  | "room.created"
  | "room.updated"
  | "room.synced"
  | "room.deleted"
  | "room.removed"
  | "message.created"
  | "message.updated"
  | "message.sent"
  | "message.delivered"
  | "message.read"
  | "message.deleted"
  | "message.removed"
  | "presence.online"
  | "presence.offline"
  | "presence.snapshot"
  | "presence:state"
  | "presence_state"
  | "chat:presence:snapshot"
  | "typing.start"
  | "typing.stop"
  | "participant.typing.start"
  | "participant.typing.stop"
  | "participant.online"
  | "participant.offline"
  | "participant.joined"
  | "participant.updated"
  | "participant.presence"
  | "participant.left"
  | "participant.removed"
  | "call.created"
  | "call.updated"
  | "call.connected"
  | "call.ringing"
  | "call.incoming"
  | "call.ended"
  | "call.hangup"
  | "call.deleted"
  | "call.removed"

export type MessengerRealtimeEventName =
  | MessengerRealtimeClientEventName
  | MessengerRealtimeServerEventName
  | (string & {})

export type MessengerRealtimeEnvelope = {
  id: string | null
  name: MessengerRealtimeEventName
  payload: Record<string, unknown>
  occurredAt: string | null
  roomId: string | null
  userId: string | null
}

export type MessengerRealtimeTransportPayload =
  | string
  | Record<string, unknown>
  | null
  | undefined

export type MessengerRealtimeGatewayConfig = {
  wsUrl: string
  accessToken: string
  currentUserId: string
}

export type MessengerRealtimeGatewayState = {
  status: MessengerRealtimeGatewayStatus
  connectedAt: string | null
  disconnectedAt: string | null
  lastMessageAt: string | null
  errorMessage: string | null
  wsUrl: string | null
  currentUserId: string | null
}

export type MessengerRealtimeGatewayEvent =
  | {
      type: "status"
      status: MessengerRealtimeGatewayStatus
      errorMessage: string | null
      state: MessengerRealtimeGatewayState
    }
  | {
      type: "message"
      envelope: MessengerRealtimeEnvelope
      state: MessengerRealtimeGatewayState
    }

export type MessengerRealtimeGatewayListener = (
  event: MessengerRealtimeGatewayEvent,
) => void
