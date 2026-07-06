export type MessengerChatKind = "private" | "group" | "channel"

export type MessengerChatParticipant = {
  userId: string
  role?: string
  joinedAt?: Date
  mutedUntil?: Date | null
}

export type MessengerChatSummary = {
  id: string
  type: MessengerChatKind
  title?: string | null
  avatarUrl?: string | null
  createdBy?: string | null
  createdAt: Date
  updatedAt: Date
}

export type MessengerChatDetails = MessengerChatSummary & {
  participants: MessengerChatParticipant[]
}

export type CreateMessengerChatInput = {
  type: MessengerChatKind
  title?: string | null
  avatarUrl?: string | null
  createdBy?: string | null
  participantUserIds: string[]
}

export interface MessengerChatStorePort {
  createChat(input: CreateMessengerChatInput): Promise<MessengerChatDetails>
  getChatById(chatId: string): Promise<MessengerChatDetails | null>
  listUserChats(userId: string): Promise<MessengerChatSummary[]>
  addParticipants(chatId: string, userIds: string[]): Promise<void>
  removeParticipant(chatId: string, userId: string): Promise<void>
  updateChatMeta(
    chatId: string,
    patch: {
      title?: string | null
      avatarUrl?: string | null
    },
  ): Promise<void>
}