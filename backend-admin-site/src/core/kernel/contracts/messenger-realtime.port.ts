export type MessengerRealtimePayload = {
  type: string
  chatId?: string
  messageId?: string
  actorUserId?: string
  targetUserId?: string
  data?: Record<string, unknown>
}

export interface MessengerRealtimePort {
  emitToChat(chatId: string, event: string, payload: MessengerRealtimePayload): Promise<void> | void
  emitToUser(userId: string, event: string, payload: MessengerRealtimePayload): Promise<void> | void
}