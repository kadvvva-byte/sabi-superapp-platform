export type MessengerNotificationInput = {
  recipientUserId: string
  actorUserId?: string | null
  chatId?: string | null
  messageId?: string | null
  type: string
  title: string
  body: string
  data?: Record<string, unknown>
}

export interface MessengerNotificationPort {
  notify(input: MessengerNotificationInput): Promise<void>
}