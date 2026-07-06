import { MessengerNotificationPort } from "../../../../core/kernel"

export type MessageCreatedEvent = {
  type: string
  chatId?: string
  messageId?: string
  actorUserId?: string
  recipientUserIds?: string[]
  title?: string
  body?: string
  data?: Record<string, unknown>
}

export class MessageCreatedNotificationHandler {
  readonly eventType = "messenger.message.created"

  constructor(
    private readonly notifications?: MessengerNotificationPort,
  ) {}

  async handle(event: MessageCreatedEvent) {
    if (!this.notifications) return
    if (!event.recipientUserIds?.length) return

    for (const recipientUserId of event.recipientUserIds) {
      await this.notifications.notify({
        recipientUserId,
        actorUserId: event.actorUserId ?? null,
        chatId: event.chatId ?? null,
        messageId: event.messageId ?? null,
        type: this.eventType,
        title: event.title ?? "New message",
        body: event.body ?? "You received a new message",
        data: event.data ?? {},
      })
    }
  }
}
