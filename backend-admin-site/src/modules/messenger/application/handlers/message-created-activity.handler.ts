import { MessengerActivityPort } from "../../../../core/kernel"

export type MessageCreatedActivityEvent = {
  type: string
  chatId?: string
  messageId?: string
  actorUserId?: string
  recipientUserIds?: string[]
  data?: Record<string, unknown>
}

export class MessageCreatedActivityHandler {
  readonly eventType = "messenger.message.created"

  constructor(
    private readonly activity?: MessengerActivityPort,
  ) {}

  async handle(event: MessageCreatedActivityEvent) {
    if (!this.activity) return
    if (!event.recipientUserIds?.length) return

    for (const userId of event.recipientUserIds) {
      await this.activity.write({
        userId,
        actorUserId: event.actorUserId ?? null,
        chatId: event.chatId ?? null,
        messageId: event.messageId ?? null,
        type: this.eventType,
        data: event.data ?? {},
      })
    }
  }
}
