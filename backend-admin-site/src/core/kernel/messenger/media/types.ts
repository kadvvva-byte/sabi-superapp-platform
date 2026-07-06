export type KernelMessengerMediaKind =
  | "image"
  | "video"
  | "audio"
  | "voice"
  | "file"
  | "gif"
  | "sticker"
  | "unknown"

export type KernelMessengerMediaAsset = {
  id: string
  roomId: string
  messageId: string | null
  ownerUserId: string | null
  kind: KernelMessengerMediaKind
  url: string
  thumbnailUrl: string | null
  fileName: string | null
  mimeType: string | null
  sizeBytes: number | null
  width: number | null
  height: number | null
  durationMs: number | null
  createdAt: string | null
  updatedAt: string | null
  metadata: Record<string, unknown>
}

export type KernelMessengerMediaQuery = {
  roomId: string
  cursor?: string | null
  limit?: number
  kind?: KernelMessengerMediaKind | "all"
  messageId?: string | null
}

export type KernelMessengerMediaListResponse = {
  roomId: string
  items: KernelMessengerMediaAsset[]
  nextCursor: string | null
  totalCount: number | null
}

export type KernelMessengerUploadMediaInput = {
  roomId: string
  messageId?: string | null
  kind?: KernelMessengerMediaKind
  fileName?: string | null
  mimeType?: string | null
  localUri?: string | null
  remoteUrl?: string | null
  formData?: FormData | null
  sizeBytes?: number | null
  width?: number | null
  height?: number | null
  durationMs?: number | null
  metadata?: Record<string, unknown>
}