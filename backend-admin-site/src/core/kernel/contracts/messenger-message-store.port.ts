export type MessengerMessageKind =
  | "text"
  | "image"
  | "video"
  | "voice"
  | "file"
  | "location"
  | "system"
  | "payment"

export type MessengerMessageAttachment = {
  id?: string
  type: "image" | "video" | "voice" | "file"
  url: string
  fileName?: string | null
  mimeType?: string | null
  size?: number | null
  width?: number | null
  height?: number | null
  durationSec?: number | null
  previewUrl?: string | null
}

export type MessengerMessageRecord = {
  id: string
  chatId: string
  senderUserId: string
  type: MessengerMessageKind
  text?: string | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
  paymentReferenceId?: string | null
  attachments: MessengerMessageAttachment[]
  createdAt: Date
  editedAt?: Date | null
  deletedAt?: Date | null
}

export type SendMessengerMessageInput = {
  chatId: string
  senderUserId: string
  type: MessengerMessageKind
  text?: string | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
  paymentReferenceId?: string | null
  attachments?: MessengerMessageAttachment[]
  clientMessageId?: string | null
}

export type EditMessengerMessageInput = {
  messageId: string
  editorUserId: string
  text?: string | null
}

export interface MessengerMessageStorePort {
  createMessage(input: SendMessengerMessageInput): Promise<MessengerMessageRecord>
  getMessageById(messageId: string): Promise<MessengerMessageRecord | null>
  listMessages(chatId: string, limit?: number, cursor?: string | null): Promise<MessengerMessageRecord[]>
  editMessage(input: EditMessengerMessageInput): Promise<MessengerMessageRecord>
  deleteMessage(messageId: string, actorUserId: string): Promise<void>
}