import { MediaType, Message, MessageType } from "../entities/message.entity"

export type BuildMessageInput = {
  id: string
  chatId: string
  userId: string
  type: MessageType
  content?: string | null
  mediaUrl?: string | null
  mediaType?: MediaType | null
  fileName?: string | null
  fileSize?: number | null
  latitude?: number | null
  longitude?: number | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
  createdAt?: Date
}

export type BuildMessageResult = Message

export type CreateTextMessageInput = {
  chatId: string
  userId: string
  content: string
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export type CreateVoiceMessageInput = {
  chatId: string
  userId: string
  mediaUrl: string
  fileName?: string | null
  fileSize?: number | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export type CreateVideoMessageInput = {
  chatId: string
  userId: string
  mediaUrl: string
  fileName?: string | null
  fileSize?: number | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export type CreateImageMessageInput = {
  chatId: string
  userId: string
  mediaUrl: string
  fileName?: string | null
  fileSize?: number | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export type CreateFileMessageInput = {
  chatId: string
  userId: string
  mediaUrl: string
  fileName: string
  fileSize?: number | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export type CreateLocationMessageInput = {
  chatId: string
  userId: string
  latitude: number
  longitude: number
  content?: string | null
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}