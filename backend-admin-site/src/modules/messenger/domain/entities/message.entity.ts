export type MessageType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO"
  | "VOICE"
  | "FILE"
  | "LOCATION";

export type MediaType =
  | "IMAGE"
  | "VIDEO"
  | "FILE"
  | "VOICE";

export interface MessageMedia {
  url: string;
  type: MediaType;
  fileName?: string | null;
  fileSize?: number | null;
}

export interface MessageLocation {
  latitude: number;
  longitude: number;
}

export interface MessageDeliveryState {
  deliveredAt?: Date | null;
  readAt?: Date | null;
  editedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface MessageRelationState {
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface Message {
  id: string;

  chatId: string;
  userId: string;

  type: MessageType;

  content: string | null;

  mediaUrl: string | null;
  mediaType: MediaType | null;

  fileName: string | null;
  fileSize: number | null;

  latitude: number | null;
  longitude: number | null;

  replyToMessageId: string | null;
  forwardedFromMessageId: string | null;

  deliveredAt: Date | null;
  readAt: Date | null;

  editedAt: Date | null;
  deletedAt: Date | null;

  createdAt: Date;
}

export interface CreateTextMessageInput {
  chatId: string;
  userId: string;
  content: string;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface CreateVoiceMessageInput {
  chatId: string;
  userId: string;
  mediaUrl: string;
  fileName?: string | null;
  fileSize?: number | null;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface CreateVideoMessageInput {
  chatId: string;
  userId: string;
  mediaUrl: string;
  fileName?: string | null;
  fileSize?: number | null;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface CreateFileMessageInput {
  chatId: string;
  userId: string;
  mediaUrl: string;
  fileName: string;
  fileSize?: number | null;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface CreateImageMessageInput {
  chatId: string;
  userId: string;
  mediaUrl: string;
  fileName?: string | null;
  fileSize?: number | null;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}

export interface CreateLocationMessageInput {
  chatId: string;
  userId: string;
  latitude: number;
  longitude: number;
  content?: string | null;
  replyToMessageId?: string | null;
  forwardedFromMessageId?: string | null;
}