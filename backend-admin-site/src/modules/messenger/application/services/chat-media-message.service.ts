import { randomUUID } from "crypto"
import { Message } from "../../domain/entities/message.entity"
import {
  BuildMessageInput,
  BuildMessageResult,
  CreateFileMessageInput,
  CreateImageMessageInput,
  CreateLocationMessageInput,
  CreateTextMessageInput,
  CreateVideoMessageInput,
  CreateVoiceMessageInput,
} from "../../domain/types/chat-media-message.types"

export class ChatMediaMessageService {
  buildMessage(input: BuildMessageInput): BuildMessageResult {
    return {
      id: input.id,
      chatId: input.chatId,
      userId: input.userId,
      type: input.type,
      content: input.content ?? null,
      mediaUrl: input.mediaUrl ?? null,
      mediaType: input.mediaType ?? null,
      fileName: input.fileName ?? null,
      fileSize: input.fileSize ?? null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
      deliveredAt: null,
      readAt: null,
      editedAt: null,
      deletedAt: null,
      createdAt: input.createdAt ?? new Date(),
    }
  }

  buildTextMessage(input: CreateTextMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "TEXT",
      content: input.content,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }

  buildVoiceMessage(input: CreateVoiceMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "VOICE",
      mediaUrl: input.mediaUrl,
      mediaType: "VOICE",
      fileName: input.fileName ?? null,
      fileSize: input.fileSize ?? null,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }

  buildVideoMessage(input: CreateVideoMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "VIDEO",
      mediaUrl: input.mediaUrl,
      mediaType: "VIDEO",
      fileName: input.fileName ?? null,
      fileSize: input.fileSize ?? null,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }

  buildImageMessage(input: CreateImageMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "IMAGE",
      mediaUrl: input.mediaUrl,
      mediaType: "IMAGE",
      fileName: input.fileName ?? null,
      fileSize: input.fileSize ?? null,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }

  buildFileMessage(input: CreateFileMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "FILE",
      mediaUrl: input.mediaUrl,
      mediaType: "FILE",
      fileName: input.fileName,
      fileSize: input.fileSize ?? null,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }

  buildLocationMessage(input: CreateLocationMessageInput): Message {
    return this.buildMessage({
      id: randomUUID(),
      chatId: input.chatId,
      userId: input.userId,
      type: "LOCATION",
      content: input.content ?? null,
      latitude: input.latitude,
      longitude: input.longitude,
      replyToMessageId: input.replyToMessageId ?? null,
      forwardedFromMessageId: input.forwardedFromMessageId ?? null,
    })
  }
}