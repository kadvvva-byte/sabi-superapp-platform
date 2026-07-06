export type MessengerUnreadState = {
  userId: string
  chatId: string
  unreadCount: number
  lastReadMessageId?: string | null
  updatedAt: Date
}

export interface MessengerUnreadStorePort {
  incrementUnread(chatId: string, excludedUserId?: string | null): Promise<void>
  resetUnread(chatId: string, userId: string, lastReadMessageId?: string | null): Promise<MessengerUnreadState>
  getUnreadState(chatId: string, userId: string): Promise<MessengerUnreadState | null>
}