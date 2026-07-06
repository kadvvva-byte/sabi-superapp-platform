import { PrismaClient, MediaType } from "@prisma/client"
import { randomUUID } from "crypto"
import { ChatService } from "./chat.service"

type MessageKind = "TEXT" | "IMAGE" | "VIDEO" | "VOICE" | "FILE" | "LOCATION"

type MessageTargetInput = {
  chatId: string
  senderId: string
  peerUserId?: string | null
  peerId?: string | null
  targetUserId?: string | null
  partnerId?: string | null
  contactId?: string | null
  peerPhone?: string | null
  peerUsername?: string | null
  peerEmail?: string | null
}

type ResolvedTarget = {
  chatId: string
  senderId: string
}

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function normalizeUsername(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const cleaned = raw.replace(/^@+/, "").trim()
  return cleaned.length > 0 ? cleaned : null
}

function normalizePhone(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const cleaned = raw.replace(/[\s()\-.]/g, "").trim()
  return cleaned.length > 0 ? cleaned : null
}

function normalizePhoneDigits(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const digits = raw.replace(/\D/g, "").trim()
  return digits.length > 0 ? digits : null
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map((item) => normalizeString(item))
        .filter((item): item is string => Boolean(item)),
    ),
  )
}

function normalizeStoredMediaType(value: unknown): string | null {
  const normalized = normalizeString(value)?.toUpperCase() ?? null

  if (!normalized) {
    return null
  }

  if (normalized === "IMAGE" || normalized === "VIDEO") {
    return normalized
  }

  return null
}

function buildIdentifierCandidates(values: Array<string | null | undefined>): string[] {
  const expanded: Array<string | null | undefined> = []

  for (const value of values) {
    const raw = normalizeString(value)
    if (!raw) continue

    const username = normalizeUsername(raw)
    const phone = normalizePhone(raw)
    const digits = normalizePhoneDigits(raw)

    expanded.push(raw)
    expanded.push(raw.toLowerCase())
    expanded.push(username)
    expanded.push(username ? `@${username}` : null)
    expanded.push(phone)
    expanded.push(digits)
    expanded.push(digits ? `+${digits}` : null)
  }

  return uniqueStrings(expanded)
}

function getPhoneTail(digits: string | null, length: number): string | null {
  if (!digits || digits.length < length) return null
  return digits.slice(-length)
}

function buildUserLookupWhere(candidates: string[]) {
  const terms: any[] = []

  for (const candidate of candidates) {
    const username = normalizeUsername(candidate)
    const phone = normalizePhone(candidate)
    const digits = normalizePhoneDigits(candidate)
    const phoneTail9 = getPhoneTail(digits, 9)
    const phoneTail7 = getPhoneTail(digits, 7)
    const lower = candidate.toLowerCase()

    terms.push({ id: candidate })
    terms.push({ email: lower })
    terms.push({ phone: candidate })

    if (phone && phone !== candidate) {
      terms.push({ phone })
      terms.push({ phone: { contains: phone, mode: "insensitive" } })
    }

    if (digits) {
      terms.push({ phone: digits })
      terms.push({ phone: `+${digits}` })
      terms.push({ phone: { contains: digits, mode: "insensitive" } })
    }

    if (phoneTail9) {
      terms.push({ phone: { contains: phoneTail9, mode: "insensitive" } })
    }

    if (phoneTail7) {
      terms.push({ phone: { contains: phoneTail7, mode: "insensitive" } })
    }

    if (username) {
      terms.push({ username })
      terms.push({ username: `@${username}` })
      terms.push({ username: { equals: username, mode: "insensitive" } })
      terms.push({ username: { equals: `@${username}`, mode: "insensitive" } })
      terms.push({ username: { contains: username, mode: "insensitive" } })
    }
  }

  return {
    OR: terms,
  }
}

function scoreUserIdentifierMatch(user: any, candidates: string[]) {
  let best = 0
  const userId = String(user?.id ?? "").trim()
  const email = String(user?.email ?? "").trim().toLowerCase()
  const username = normalizeUsername(user?.username)
  const phone = normalizePhone(user?.phone)
  const phoneDigits = normalizePhoneDigits(user?.phone)

  for (const candidate of candidates) {
    const raw = normalizeString(candidate)
    if (!raw) continue

    const rawLower = raw.toLowerCase()
    const candidateUsername = normalizeUsername(raw)
    const candidatePhone = normalizePhone(raw)
    const candidateDigits = normalizePhoneDigits(raw)
    const candidateTail9 = getPhoneTail(candidateDigits, 9)
    const candidateTail7 = getPhoneTail(candidateDigits, 7)

    if (userId && userId === raw) best = Math.max(best, 100)
    if (email && email === rawLower) best = Math.max(best, 95)
    if (username && candidateUsername && username.toLowerCase() === candidateUsername.toLowerCase()) best = Math.max(best, 90)
    if (phone && candidatePhone && phone === candidatePhone) best = Math.max(best, 84)
    if (phoneDigits && candidateDigits && phoneDigits === candidateDigits) best = Math.max(best, 82)
    if (phoneDigits && candidateTail9 && phoneDigits.endsWith(candidateTail9)) best = Math.max(best, 72)
    if (phoneDigits && candidateTail7 && phoneDigits.endsWith(candidateTail7)) best = Math.max(best, 58)
  }

  return best
}

function pickPeerIdentifier(data: MessageTargetInput): string | null {
  return (
    normalizeString(data.peerUserId) ??
    normalizeString(data.peerId) ??
    normalizeString(data.targetUserId) ??
    normalizeString(data.partnerId) ??
    normalizeString(data.contactId) ??
    normalizeString(data.peerPhone) ??
    normalizeString(data.peerUsername) ??
    normalizeString(data.peerEmail)
  )
}

function isReservedMessengerRoomIdentifier(value: unknown): boolean {
  const normalized = normalizeString(value)?.toLowerCase() ?? null
  if (!normalized) return true

  if (
    normalized.startsWith("group:") ||
    normalized.startsWith("channel:") ||
    normalized.startsWith("bot:") ||
    normalized.startsWith("business:") ||
    normalized.startsWith("merchant:") ||
    normalized.startsWith("system:") ||
    normalized === "sabi-info"
  ) {
    return true
  }

  return false
}

function pickPeerIdentifierWithChatIdFallback(data: MessageTargetInput): string | null {
  const explicitPeer = pickPeerIdentifier(data)
  if (explicitPeer) return explicitPeer

  const requestedChatId = normalizeString(data.chatId)
  const senderIdentifier = normalizeString(data.senderId)

  if (!requestedChatId) return null
  if (senderIdentifier && requestedChatId === senderIdentifier) return null
  if (isReservedMessengerRoomIdentifier(requestedChatId)) return null

  return requestedChatId
}

export class MessageService {
  private prisma: PrismaClient
  private chatService: ChatService

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
    this.chatService = new ChatService(prisma)
  }

  private async resolveUserId(
    identifiers: Array<string | null | undefined>,
    errorCode: string,
  ): Promise<string> {
    const candidates = buildIdentifierCandidates(identifiers)

    if (candidates.length === 0) {
      throw new Error(errorCode)
    }

    const users = await this.prisma.user.findMany({
      where: buildUserLookupWhere(candidates),
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      take: 25,
      select: {
        id: true,
        email: true,
        phone: true,
        username: true,
      },
    })

    let ranked = users
      .map((user: any) => ({ user, score: scoreUserIdentifierMatch(user, candidates) }))
      .filter((item: any) => item.user?.id && item.score > 0)
      .sort((left: any, right: any) => right.score - left.score)

    if (ranked.length === 0 && candidates.some((candidate) => normalizePhoneDigits(candidate))) {
      const phoneUsers = await this.prisma.user.findMany({
        where: { phone: { not: null } },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
        take: 500,
        select: {
          id: true,
          email: true,
          phone: true,
          username: true,
        },
      })

      ranked = phoneUsers
        .map((user: any) => ({ user, score: scoreUserIdentifierMatch(user, candidates) }))
        .filter((item: any) => item.user?.id && item.score >= 72)
        .sort((left: any, right: any) => right.score - left.score)
    }

    const user = ranked[0]?.user

    if (!user?.id) {
      throw new Error(errorCode)
    }

    return String(user.id)
  }

  // SABI_GROUP_CHAT_AUTO_ENSURE
  private async ensureSabiGroupChatForSender(requestedChatId: string, senderId: string): Promise<string> {
    const title =
      requestedChatId
        .replace(/^group[:_-]*/i, "")
        .replace(/[-_]+/g, " ")
        .trim() || "Group"

    const existing = await this.prisma.chat.findUnique({
      where: { id: requestedChatId },
      select: { id: true },
    })

    if (!existing?.id) {
      await this.prisma.chat
        .create({
          data: {
            id: requestedChatId,
            type: "GROUP",
            title,
            createdBy: senderId,
          } as any,
        })
        .catch(async (error: unknown) => {
          const fallback = await this.prisma.chat.findUnique({
            where: { id: requestedChatId },
            select: { id: true },
          })

          if (!fallback?.id) throw error
        })
    }

    const member = await this.prisma.chatMember.findFirst({
      where: {
        chatId: requestedChatId,
        userId: senderId,
      },
      select: { id: true },
    })

    if (!member?.id) {
      await this.prisma.chatMember
        .create({
          data: {
            chatId: requestedChatId,
            userId: senderId,
            role: "OWNER",
            isArchived: false,
          } as any,
        })
        .catch(() => undefined)
    }

    return requestedChatId
  }
  // SABI_GROUP_MESSAGE_CHAT_ENSURE
  private async ensureSabiGroupMessageChat(chatId: string, senderId: string): Promise<string> {
    const existing = await this.prisma.chat.findUnique({
      where: { id: chatId },
      select: { id: true },
    })

    if (!existing?.id) {
      const title =
        chatId
          .replace(/^group[:_-]*/i, "")
          .replace(/[-_]+/g, " ")
          .trim() || "Group"

      await this.prisma.chat
        .create({
          data: {
            id: chatId,
            type: "GROUP",
            title,
            createdBy: senderId,
          } as any,
        })
        .catch(async (error: unknown) => {
          const fallback = await this.prisma.chat.findUnique({
            where: { id: chatId },
            select: { id: true },
          })

          if (!fallback?.id) throw error
        })
    }

    const member = await this.prisma.chatMember.findFirst({
      where: {
        chatId,
        userId: senderId,
      },
      select: { id: true },
    })

    if (!member?.id) {
      await this.prisma.chatMember
        .create({
          data: {
            chatId,
            userId: senderId,
            role: "OWNER",
            isArchived: false,
          } as any,
        })
        .catch(() => undefined)
    }

    return chatId
  }
  private async resolveMessageTarget(data: MessageTargetInput): Promise<ResolvedTarget> {
    const requestedChatId = normalizeString(data.chatId)
    const senderIdentifier = normalizeString(data.senderId)

    if (!requestedChatId || !senderIdentifier) {
      throw new Error("message_chat_sender_required")
    }

    const senderId = await this.resolveUserId([senderIdentifier], "message_sender_user_not_found")

    if (requestedChatId.startsWith("group:")) {
      const groupChatId = await this.ensureSabiGroupMessageChat(requestedChatId, senderId)
      return { chatId: groupChatId, senderId }
    }

    const existingChat = await this.prisma.chat.findUnique({
      where: { id: requestedChatId },
      select: { id: true },
    })

    if (existingChat?.id) {
      const membership = await this.prisma.chatMember.findFirst({
        where: {
          chatId: existingChat.id,
          userId: senderId,
        },
        select: { id: true },
      })

      if (membership?.id) {
        return {
          chatId: String(existingChat.id),
          senderId,
        }
      }
    }

    const peerIdentifier = pickPeerIdentifierWithChatIdFallback(data)

    if (!peerIdentifier) {
      if (!existingChat?.id) {
        throw new Error("message_chat_not_found")
      }

      throw new Error("message_sender_not_chat_member")
    }

    const direct = await this.chatService.createPrivateChat(senderId, peerIdentifier, {
      user1Candidates: [senderIdentifier],
      user2Candidates: [
        data.peerUserId,
        data.peerId,
        data.targetUserId,
        data.partnerId,
        data.contactId,
        data.peerPhone,
        data.peerUsername,
        data.peerEmail,
      ],
      peerPhone: data.peerPhone,
      peerUsername: data.peerUsername,
      peerEmail: data.peerEmail,
    })

    const chatId = normalizeString((direct as any).chat?.id)
    const resolvedSenderId = normalizeString((direct as any).currentUserId) ?? senderId

    if (!chatId) {
      throw new Error("message_direct_chat_create_failed")
    }

    return {
      chatId,
      senderId: resolvedSenderId,
    }
  }

  private async safeMessageReference(messageId: string | null | undefined, chatId?: string) {
    const normalized = normalizeString(messageId)

    if (!normalized) {
      return null
    }

    const message = await this.prisma.message.findUnique({
      where: { id: normalized },
      select: { id: true, chatId: true },
    })

    if (!message?.id) {
      return null
    }

    if (chatId && String(message.chatId) !== chatId) {
      return null
    }

    return String(message.id)
  }

  private async createSafeMessage(data: {
    chatId: string
    senderId: string
    content?: string | null
    mediaUrl?: string | null
    mediaType?: MediaType | string | null
    fileName?: string | null
    fileSize?: number | null
    latitude?: number | null
    longitude?: number | null
    type?: MessageKind | string | null
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
    const target = await this.resolveMessageTarget(data)
    const replyToMessageId = await this.safeMessageReference(data.replyToMessageId, target.chatId)
    const forwardedFromMessageId = await this.safeMessageReference(data.forwardedFromMessageId)

    const message = await this.prisma.message.create({
      data: {
        id: randomUUID(),
        chatId: target.chatId,
        userId: target.senderId,
        type: data.type ?? "TEXT",
        content: data.content ?? null,
        mediaUrl: data.mediaUrl ?? null,
        mediaType: normalizeStoredMediaType(data.mediaType),
        fileName: data.fileName ?? null,
        fileSize: data.fileSize ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        replyToMessageId,
        forwardedFromMessageId,
      } as any,
    })

    await this.prisma.chat
      .update({
        where: { id: target.chatId },
        data: { updatedAt: new Date() } as any,
      })
      .catch(() => undefined)

    return message
  }

  async sendMessage(data: {
    chatId: string
    senderId: string
    content?: string
    mediaUrl?: string
    mediaType?: MediaType | string
    fileName?: string | null
    fileSize?: number | null
    latitude?: number | null
    longitude?: number | null
    type?: MessageKind | string | null
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
    return this.createSafeMessage(data)
  }

  async sendVoiceMessage(data: {
    chatId: string
    senderId?: string
    userId?: string
    mediaUrl: string
    fileName?: string | null
    fileSize?: number | null
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
    return this.createSafeMessage({
      ...data,
      senderId: data.senderId ?? data.userId ?? "",
      type: "VOICE",
      mediaType: null,
      content: null,
    })
  }

  async editMessage(messageId: string, content: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        editedAt: new Date(),
      },
    })
  }

  async deleteMessage(messageId: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async getMessages(chatId: string, cursor?: string, limit: number = 20) {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
    })

    return messages.reverse()
  }

  async forwardMessage(data: {
    chatId: string
    senderId: string
    messageId: string
    peerUserId?: string | null
    peerId?: string | null
    targetUserId?: string | null
    partnerId?: string | null
    contactId?: string | null
    peerPhone?: string | null
    peerUsername?: string | null
    peerEmail?: string | null
  }) {
    const originalMessage = await this.prisma.message.findUnique({
      where: { id: data.messageId },
    })

    if (!originalMessage) {
      throw new Error("message_not_found")
    }

    return this.createSafeMessage({
      chatId: data.chatId,
      senderId: data.senderId,
      type: originalMessage.type,
      content: originalMessage.content,
      mediaUrl: originalMessage.mediaUrl,
      mediaType: originalMessage.mediaType,
      fileName: originalMessage.fileName,
      fileSize: originalMessage.fileSize,
      latitude: originalMessage.latitude,
      longitude: originalMessage.longitude,
      forwardedFromMessageId: originalMessage.id,
      peerUserId: data.peerUserId,
      peerId: data.peerId,
      targetUserId: data.targetUserId,
      partnerId: data.partnerId,
      contactId: data.contactId,
      peerPhone: data.peerPhone,
      peerUsername: data.peerUsername,
      peerEmail: data.peerEmail,
    })
  }

  async markDelivered(messageId: string) {
    const existing = await this.prisma.message.findUnique({
      where: { id: messageId },
    })

    if (!existing) {
      return null
    }

    if (existing.deliveredAt) {
      return existing
    }

    const deliveredAt = new Date()

    await this.prisma.message.updateMany({
      where: {
        id: messageId,
        deliveredAt: null,
      },
      data: {
        deliveredAt,
      },
    })

    return this.prisma.message.findUnique({
      where: { id: messageId },
    })
  }

  async markRead(messageId: string) {
    const existing = await this.prisma.message.findUnique({
      where: { id: messageId },
    })

    if (!existing) {
      return null
    }

    if (existing.readAt) {
      return existing
    }

    const readAt = new Date()
    const deliveredAt = existing.deliveredAt ?? readAt

    await this.prisma.message.updateMany({
      where: {
        id: messageId,
        readAt: null,
      },
      data: {
        readAt,
        deliveredAt,
      },
    })

    return this.prisma.message.findUnique({
      where: { id: messageId },
    })
  }

  async searchMessages(data: {
    chatId?: string
    query: string
    limit?: number
  }) {
    const messages = await this.prisma.message.findMany({
      where: {
        ...(data.chatId && { chatId: data.chatId }),
        content: {
          contains: data.query,
          mode: "insensitive",
        },
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: data.limit || 20,
    })

    return messages
  }

  async getChatMedia(data: {
    chatId: string
    mediaType?: string
    limit?: number
  }) {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: data.chatId,
        deletedAt: null,
        ...(data.mediaType && {
          mediaType: data.mediaType as any,
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: data.limit || 50,
    })

    return messages
  }
}


