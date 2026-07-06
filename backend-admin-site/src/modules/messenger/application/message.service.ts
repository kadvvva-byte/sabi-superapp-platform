import { PrismaClient } from "@prisma/client"
import { MessageService as BaseMessageService } from "./services/message.service"

declare global {
  var __messengerCompatPrisma: PrismaClient | undefined
}

function getCompatPrisma() {
  if (!globalThis.__messengerCompatPrisma) {
    globalThis.__messengerCompatPrisma = new PrismaClient()
  }

  return globalThis.__messengerCompatPrisma
}

type LegacyMessagePayload = {
  chatId: string
  senderId?: string
  userId?: string
  actorUserId?: string
  peerUserId?: string | null
  peerId?: string | null
  targetUserId?: string | null
  partnerId?: string | null
  contactId?: string | null
  peerPhone?: string | null
  peerUsername?: string | null
  peerEmail?: string | null
  text?: string
  content?: string
  mediaUrl?: string
  fileUrl?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
  latitude?: number
  longitude?: number
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

function pickSenderId(data: LegacyMessagePayload) {
  return data.senderId ?? data.userId ?? data.actorUserId ?? ""
}

function pickPeerContext(data: LegacyMessagePayload) {
  return {
    peerUserId: data.peerUserId ?? null,
    peerId: data.peerId ?? null,
    targetUserId: data.targetUserId ?? null,
    partnerId: data.partnerId ?? null,
    contactId: data.contactId ?? null,
    peerPhone: data.peerPhone ?? null,
    peerUsername: data.peerUsername ?? null,
    peerEmail: data.peerEmail ?? null,
  }
}

export class MessageService {
  private readonly base: BaseMessageService

  constructor(prisma: PrismaClient = getCompatPrisma()) {
    this.base = new BaseMessageService(prisma)
  }

  async getMessages(chatId: string, cursor?: string, limit: number = 20) {
    return await this.base.getMessages(chatId, cursor, limit)
  }

  async getChatMessages(chatId: string) {
    return await this.base.getMessages(chatId, undefined, 50)
  }

  async sendMessage(data: {
    chatId: string
    senderId: string
    content?: string
    mediaUrl?: string
    fileName?: string | null
    mimeType?: string | null
    fileSize?: number | null
    latitude?: number | null
    longitude?: number | null
    type?: string
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    peerUserId?: string | null
    peerId?: string | null
    targetUserId?: string | null
    partnerId?: string | null
    contactId?: string | null
    peerPhone?: string | null
    peerUsername?: string | null
    peerEmail?: string | null
  }) {
    return await this.base.sendMessage(data as any)
  }

  async sendTextMessage(data: LegacyMessagePayload) {
    return await this.base.sendMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      content: data.text ?? data.content ?? "",
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      type: "TEXT",
      ...pickPeerContext(data),
    } as any)
  }

  async sendVoiceMessage(data: LegacyMessagePayload) {
    return await this.base.sendVoiceMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      mediaUrl: data.mediaUrl ?? data.fileUrl ?? "",
      fileName: data.fileName ?? null,
      fileSize: data.fileSize ?? null,
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      ...pickPeerContext(data),
    } as any)
  }

  async sendVideoMessage(data: LegacyMessagePayload) {
    return await this.base.sendMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      mediaUrl: data.mediaUrl ?? data.fileUrl ?? "",
      fileName: data.fileName ?? null,
      fileSize: data.fileSize ?? null,
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      mediaType: "VIDEO",
      type: "VIDEO",
      ...pickPeerContext(data),
    } as any)
  }

  async sendImageMessage(data: LegacyMessagePayload) {
    return await this.base.sendMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      mediaUrl: data.mediaUrl ?? data.fileUrl ?? "",
      fileName: data.fileName ?? null,
      fileSize: data.fileSize ?? null,
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      mediaType: "IMAGE",
      type: "IMAGE",
      ...pickPeerContext(data),
    } as any)
  }

  async sendFileMessage(data: LegacyMessagePayload) {
    return await this.base.sendMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      mediaUrl: data.mediaUrl ?? data.fileUrl ?? "",
      fileName: data.fileName ?? null,
      fileSize: data.fileSize ?? null,
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      mediaType: "FILE",
      type: "FILE",
      ...pickPeerContext(data),
    } as any)
  }

  async sendLocationMessage(data: LegacyMessagePayload) {
    return await this.base.sendMessage({
      chatId: data.chatId,
      senderId: pickSenderId(data),
      content: `${data.latitude ?? 0},${data.longitude ?? 0}`,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      replyToMessageId: data.replyToMessageId ?? null,
      forwardedFromMessageId: data.forwardedFromMessageId ?? null,
      type: "LOCATION",
      ...pickPeerContext(data),
    } as any)
  }

  async editMessage(messageId: string, content: string) {
    return await this.base.editMessage(messageId, content)
  }

  async editTextMessage(messageId: string, content: string) {
    return await this.base.editMessage(messageId, content)
  }

  async deleteMessage(messageId: string) {
    return await this.base.deleteMessage(messageId)
  }

  async softDeleteMessage(messageId: string) {
    return await this.base.deleteMessage(messageId)
  }

  async markDelivered(messageId: string) {
    return await this.base.markDelivered(messageId)
  }

  async markRead(messageId: string) {
    return await this.base.markRead(messageId)
  }
}
