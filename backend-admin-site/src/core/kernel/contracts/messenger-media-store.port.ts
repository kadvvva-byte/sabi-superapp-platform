export type MessengerMediaKind = "image" | "video" | "voice" | "file"

export type MessengerMediaAsset = {
  id: string
  ownerUserId: string
  chatId?: string | null
  messageId?: string | null
  type: MessengerMediaKind
  url: string
  fileName?: string | null
  mimeType?: string | null
  size?: number | null
  width?: number | null
  height?: number | null
  durationSec?: number | null
  previewUrl?: string | null
  createdAt: Date
}

export type SaveMessengerMediaInput = {
  ownerUserId: string
  chatId?: string | null
  messageId?: string | null
  type: MessengerMediaKind
  url: string
  fileName?: string | null
  mimeType?: string | null
  size?: number | null
  width?: number | null
  height?: number | null
  durationSec?: number | null
  previewUrl?: string | null
}

export interface MessengerMediaStorePort {
  saveMedia(input: SaveMessengerMediaInput): Promise<MessengerMediaAsset>
  getMediaById(mediaId: string): Promise<MessengerMediaAsset | null>
  listChatMedia(chatId: string, limit?: number): Promise<MessengerMediaAsset[]>
  listUserMedia(ownerUserId: string, limit?: number): Promise<MessengerMediaAsset[]>
}