import { PrismaClient } from "@prisma/client"

type UploadVoiceAndSendInput = {
  chatId: string
  userId: string
  file: Express.Multer.File
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

type UploadVideoAndSendInput = {
  chatId: string
  userId: string
  file: Express.Multer.File
  replyToMessageId?: string | null
  forwardedFromMessageId?: string | null
}

export class MessageUploadService {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  private buildFileUrl(file: Express.Multer.File) {
    return `/uploads/${file.filename}`
  }

  private async syncChatListAfterMessage(
    chatId: string,
    messageId: string,
    previewText: string,
  ) {
    const chatMembers = await this.prisma.chatMember.findMany({
      where: { chatId },
      select: { userId: true },
    })

    await Promise.all(
      chatMembers.map((member: any) =>
        this.prisma.chatList.upsert({
          where: {
            userId_chatId: {
              userId: member.userId,
              chatId,
            },
          },
          create: {
            userId: member.userId,
            chatId,
            lastMessageId: messageId,
            lastMessageText: previewText,
            unreadCount: 0,
          },
          update: {
            lastMessageId: messageId,
            lastMessageText: previewText,
            updatedAt: new Date(),
          },
        }),
      ),
    )
  }

  async uploadVoiceAndSend(input: UploadVoiceAndSendInput) {
    const mediaUrl = this.buildFileUrl(input.file)

    const message = await this.prisma.message.create({
      data: {
        chatId: input.chatId,
        userId: input.userId,
        type: "VOICE",
        content: null,
        mediaUrl,
        mediaType: "VOICE",
        fileName: input.file.originalname ?? input.file.filename,
        fileSize: input.file.size ?? null,
        replyToMessageId: input.replyToMessageId ?? null,
        forwardedFromMessageId: input.forwardedFromMessageId ?? null,
      },
    })

    await this.syncChatListAfterMessage(
      message.chatId,
      message.id,
      "Voice message",
    )

    return message
  }

  async uploadVideoAndSend(input: UploadVideoAndSendInput) {
    const mediaUrl = this.buildFileUrl(input.file)

    const message = await this.prisma.message.create({
      data: {
        chatId: input.chatId,
        userId: input.userId,
        type: "VIDEO",
        content: null,
        mediaUrl,
        mediaType: "VIDEO",
        fileName: input.file.originalname ?? input.file.filename,
        fileSize: input.file.size ?? null,
        replyToMessageId: input.replyToMessageId ?? null,
        forwardedFromMessageId: input.forwardedFromMessageId ?? null,
      },
    })

    await this.syncChatListAfterMessage(
      message.chatId,
      message.id,
      "Video message",
    )

    return message
  }
}