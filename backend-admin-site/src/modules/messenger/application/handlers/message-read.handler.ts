import {
  MessengerActivityPort,
  MessengerRealtimePort,
  MessengerUnreadStorePort,
} from "../../../../core/kernel"

export type MessageReadEvent = {
  type: string
  chatId: string
  actorUserId: string
  messageId?: string | null
}

export class MessageReadHandler {
  readonly eventType = "messenger.message.read"

  constructor(
    private readonly unread?: MessengerUnreadStorePort,
    private readonly realtime?: MessengerRealtimePort,
    private readonly activity?: MessengerActivityPort,
  ) {}

  async handle(event: MessageReadEvent) {
    const unreadState = this.unread
      ? await this.unread.resetUnread(
          event.chatId,
          event.actorUserId,
          event.messageId ?? null,
        )
      : null

    if (this.realtime) {
      await this.realtime.emitToChat(event.chatId, "message:read", {
        type: this.eventType,
        chatId: event.chatId,
        actorUserId: event.actorUserId,
        messageId: event.messageId ?? undefined,
        data: unreadState
          ? {
              unreadCount: unreadState.unreadCount,
              lastReadMessageId: unreadState.lastReadMessageId ?? null,
            }
          : {},
      })
    }

    if (this.activity) {
      await this.activity.write({
        userId: event.actorUserId,
        actorUserId: event.actorUserId,
        chatId: event.chatId,
        messageId: event.messageId ?? null,
        type: this.eventType,
        data: unreadState
          ? {
              unreadCount: unreadState.unreadCount,
            }
          : {},
      })
    }

    return unreadState
  }
}
