export type MessengerActivityInput = {
  userId: string
  actorUserId?: string | null
  chatId?: string | null
  messageId?: string | null
  type: string
  data?: Record<string, unknown>
}

export interface MessengerActivityPort {
  write(input: MessengerActivityInput): Promise<void>
}