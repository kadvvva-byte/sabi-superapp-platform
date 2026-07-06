import {
  MessengerMediaStorePort,
  MessengerMessageAttachment,
  MessengerMessageStorePort,
} from "../../../../core/kernel"

export type AttachMediaToMessageInput = {
  messageId: string
  ownerUserId: string
  chatId: string
  attachments: MessengerMessageAttachment[]
}

export class MessengerMediaOrchestratorService {
  constructor(
    private readonly media: MessengerMediaStorePort,
    private readonly messages: MessengerMessageStorePort,
  ) {}

  async attachToMessage(input: AttachMediaToMessageInput) {
    const message = await this.messages.getMessageById(input.messageId)

    if (!message) {
      throw new Error(`Message not found: ${input.messageId}`)
    }

    const saved = []

    for (const attachment of input.attachments) {
      if (!attachment.url) continue

      const type =
        attachment.type === "voice"
          ? "voice"
          : attachment.type === "video"
            ? "video"
            : attachment.type === "file"
              ? "file"
              : "image"

      const asset = await this.media.saveMedia({
        ownerUserId: input.ownerUserId,
        chatId: input.chatId,
        messageId: input.messageId,
        type,
        url: attachment.url,
        fileName: attachment.fileName ?? null,
        mimeType: attachment.mimeType ?? null,
        size: attachment.size ?? null,
        width: attachment.width ?? null,
        height: attachment.height ?? null,
        durationSec: attachment.durationSec ?? null,
        previewUrl: attachment.previewUrl ?? null,
      })

      saved.push(asset)
    }

    return {
      messageId: input.messageId,
      saved,
    }
  }

  async listChatMedia(chatId: string, limit: number = 50) {
    return await this.media.listChatMedia(chatId, limit)
  }

  async listUserMedia(userId: string, limit: number = 50) {
    return await this.media.listUserMedia(userId, limit)
  }
}
