import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { MessageService } from "../../application/message.service";
import { emitChatRealtime, emitUserRealtime } from "../../../../core/realtime/realtime.emitter";

const prisma = new PrismaClient();

type MessageRecord = Record<string, unknown>;

type KernelMessageKind =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "voice"
  | "file"
  | "document"
  | "location"
  | "contact"
  | "system"
  | "unknown";

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeOptionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeOptionalNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizePositiveInteger(value: unknown, fallback: number): number {
  const parsed = normalizeOptionalNumber(value);

  if (parsed === null || parsed <= 0) {
    return fallback;
  }

  return Math.min(Math.floor(parsed), 100);
}

function normalizeKernelKind(value: unknown): KernelMessageKind {
  const normalized = normalizeString(value)?.toLowerCase() ?? "text";

  switch (normalized) {
    case "text":
    case "image":
    case "video":
    case "audio":
    case "voice":
    case "file":
    case "document":
    case "location":
    case "contact":
    case "system":
      return normalized;
    default:
      return "unknown";
  }
}

function isProductionMode(): boolean {
  return process.env.NODE_ENV === "production";
}

function isDevHeaderUserAllowed(): boolean {
  return !isProductionMode() && process.env.SABI_DEV_ALLOW_HEADER_USER === "1";
}

function getRequestUserId(req: Request): string | null {
  const requestRecord = req as Request & {
    messengerCurrentUser?: { id?: string | null };
    currentUser?: { id?: string | null; userId?: string | null; sub?: string | null };
    user?: { id?: string | null; userId?: string | null; sub?: string | null };
    sabiAuth?: { userId?: string | null };
  };

  const authenticatedUserId =
    normalizeString(requestRecord.sabiAuth?.userId) ??
    normalizeString(requestRecord.messengerCurrentUser?.id) ??
    normalizeString(requestRecord.currentUser?.id) ??
    normalizeString(requestRecord.currentUser?.userId) ??
    normalizeString(requestRecord.currentUser?.sub) ??
    normalizeString(requestRecord.user?.id) ??
    normalizeString(requestRecord.user?.userId) ??
    normalizeString(requestRecord.user?.sub);

  if (authenticatedUserId) {
    return authenticatedUserId;
  }

  if (!isDevHeaderUserAllowed()) {
    return null;
  }

  return (
    normalizeString(req.header("x-user-id")) ??
    normalizeString(req.header("x-current-user-id")) ??
    normalizeString(req.header("x-auth-user-id")) ??
    normalizeString(req.body?.userId) ??
    normalizeString(req.body?.senderId) ??
    normalizeString(req.body?.actorUserId) ??
    null
  );
}


function getPeerContext(req: Request) {
  return {
    peerUserId:
      normalizeString(req.body?.peerUserId) ??
      normalizeString(req.body?.targetUserId) ??
      normalizeString(req.body?.recipientUserId) ??
      null,
    peerId:
      normalizeString(req.body?.peerId) ??
      normalizeString(req.body?.contactId) ??
      null,
    targetUserId: normalizeString(req.body?.targetUserId),
    partnerId: normalizeString(req.body?.partnerId),
    contactId: normalizeString(req.body?.contactId),
    peerPhone:
      normalizeString(req.body?.peerPhone) ??
      normalizeString(req.body?.phone) ??
      normalizeString(req.body?.targetPhone) ??
      normalizeString(req.body?.contactPhone) ??
      null,
    peerUsername:
      normalizeString(req.body?.peerUsername) ??
      normalizeString(req.body?.username) ??
      normalizeString(req.body?.targetUsername) ??
      normalizeString(req.body?.contactUsername) ??
      null,
    peerEmail:
      normalizeString(req.body?.peerEmail) ??
      normalizeString(req.body?.email) ??
      normalizeString(req.body?.targetEmail) ??
      normalizeString(req.body?.contactEmail) ??
      null,
  };
}

function getMessageId(message: unknown): string | null {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return null;
  }

  const source = message as MessageRecord;
  return normalizeString(source.id) ?? normalizeString(source.messageId);
}

function getMessageRoomId(message: unknown): string | null {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return null;
  }

  const source = message as MessageRecord;
  return normalizeString(source.chatId) ?? normalizeString(source.roomId);
}

function getMessageSenderId(message: unknown): string | null {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return null;
  }

  const source = message as MessageRecord;
  return (
    normalizeString(source.userId) ??
    normalizeString(source.senderId) ??
    normalizeString(source.senderUserId)
  );
}

function buildKernelEnvelope(name: string, roomId: string, message: unknown) {
  const messageId = getMessageId(message);
  const userId = getMessageSenderId(message);
  const occurredAt =
    message && typeof message === "object" && !Array.isArray(message)
      ? normalizeString((message as MessageRecord).updatedAt) ??
        normalizeString((message as MessageRecord).createdAt)
      : null;

  return {
    id: messageId,
    name,
    event: name,
    roomId,
    userId,
    occurredAt: occurredAt ?? new Date().toISOString(),
    payload: {
      entity: message,
      message,
      roomId,
      userId,
    },
  };
}

function emitRealtimeAliases(chatId: string, aliases: string[], payload: unknown) {
  aliases.forEach((eventName) => emitChatRealtime(chatId, eventName, payload));
}

function emitMessageCreated(chatId: string, message: unknown) {
  emitRealtimeAliases(chatId, [
    "message:new",
    "new_message",
    "chat:message",
    "chat:message:new",
  ], message);

  const envelope = buildKernelEnvelope("message.created", chatId, message);
  emitRealtimeAliases(chatId, ["message.created", "message.sent"], envelope);
}

function emitMessageUpdated(chatId: string, message: unknown) {
  emitRealtimeAliases(chatId, ["message:edited", "message_edited"], message);

  const envelope = buildKernelEnvelope("message.updated", chatId, message);
  emitRealtimeAliases(chatId, ["message.updated"], envelope);
}

function emitMessageDelivered(chatId: string, message: unknown) {
  const messageId = getMessageId(message);
  const payload = {
    chatId,
    roomId: chatId,
    messageId,
    deliveredAt:
      message && typeof message === "object" && !Array.isArray(message)
        ? normalizeString((message as MessageRecord).deliveredAt) ?? new Date().toISOString()
        : new Date().toISOString(),
    message,
  };

  emitRealtimeAliases(chatId, [
    "message:delivered",
    "message_delivered",
    "chat:message:delivered",
  ], payload);

  const envelope = buildKernelEnvelope("message.delivered", chatId, message);
  emitRealtimeAliases(chatId, ["message.delivered"], envelope);
}

function emitMessageRead(chatId: string, message: unknown) {
  const messageId = getMessageId(message);
  const payload = {
    chatId,
    roomId: chatId,
    messageId,
    readAt:
      message && typeof message === "object" && !Array.isArray(message)
        ? normalizeString((message as MessageRecord).readAt) ?? new Date().toISOString()
        : new Date().toISOString(),
    message,
  };

  emitRealtimeAliases(chatId, [
    "message:read",
    "message_read",
    "chat:message:read",
  ], payload);

  const envelope = buildKernelEnvelope("message.read", chatId, message);
  emitRealtimeAliases(chatId, ["message.read"], envelope);
}

function emitMessageRemoved(chatId: string, payload: { messageId: string }) {
  emitRealtimeAliases(chatId, ["message:deleted", "message_deleted"], payload);

  const envelope = {
    id: payload.messageId,
    name: "message.deleted",
    event: "message.deleted",
    roomId: chatId,
    occurredAt: new Date().toISOString(),
    payload: {
      ...payload,
      roomId: chatId,
    },
  };

  emitRealtimeAliases(chatId, ["message.deleted", "message.removed"], envelope);
}


type ChatRoomRecordForRealtime = {
  id?: string | null;
  type?: string | null;
  title?: string | null;
  avatarUrl?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  members?: Array<{ userId?: string | null }>;
};

function normalizeRoomType(value: unknown): "direct" | "group" | "business" {
  const normalized = normalizeString(value)?.toUpperCase();
  if (normalized === "GROUP") return "group";
  if (normalized === "BUSINESS") return "business";
  return "direct";
}

function normalizeDateTime(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString();
  return normalizeString(value);
}

async function getChatWithMembers(chatId: string): Promise<ChatRoomRecordForRealtime | null> {
  const safeChatId = normalizeString(chatId);
  if (!safeChatId) return null;
  return prisma.chat.findUnique({ where: { id: safeChatId }, include: { members: true } } as any).then((chat: any) => (chat ? (chat as ChatRoomRecordForRealtime) : null)).catch(() => null);
}

function getRoomMemberUserIds(chat: ChatRoomRecordForRealtime | null): string[] {
  return Array.from(new Set((chat?.members || []).map((member) => normalizeString(member.userId)).filter((userId): userId is string => Boolean(userId))));
}

function buildRoomPayloadForUser(chat: ChatRoomRecordForRealtime, currentUserId: string) {
  const chatId = normalizeString(chat.id) || "";
  const participantIds = getRoomMemberUserIds(chat);
  const roomType = normalizeRoomType(chat.type);
  const peerUserId = participantIds.find((userId) => userId !== currentUserId) || null;
  return { id: chatId, chatId, roomId: chatId, title: normalizeString(chat.title), name: normalizeString(chat.title), avatarUrl: normalizeString(chat.avatarUrl), type: roomType, roomType, currentUserId, peerUserId, participantIds, messageIds: [], createdAt: normalizeDateTime(chat.createdAt), updatedAt: normalizeDateTime(chat.updatedAt) ?? new Date().toISOString(), hydratedAt: new Date().toISOString() };
}

async function emitRoomUpsertToMembers(chatId: string, memberUserIds?: string[]) {
  const chat = await getChatWithMembers(chatId);
  const userIds = memberUserIds?.length ? memberUserIds : getRoomMemberUserIds(chat);
  if (!chat || !userIds.length) return;
  userIds.forEach((userId) => {
    const roomPayload = buildRoomPayloadForUser(chat, userId);
    emitUserRealtime(userId, "chat:created", roomPayload);
    emitUserRealtime(userId, "room:upserted", roomPayload);
    emitUserRealtime(userId, "rooms:upserted", { room: roomPayload, rooms: [roomPayload] });
  });
}

async function emitMessageCreatedEverywhere(fallbackChatId: string, message: unknown) {
  const chatId = getMessageRoomId(message) ?? fallbackChatId;
  emitMessageCreated(chatId, message);
  const chat = await getChatWithMembers(chatId);
  const memberUserIds = getRoomMemberUserIds(chat);
  if (!memberUserIds.length) return;
  await emitRoomUpsertToMembers(chatId, memberUserIds);
  const envelope = buildKernelEnvelope("message.created", chatId, message);
  memberUserIds.forEach((userId) => {
    emitUserRealtime(userId, "message:new", message);
    emitUserRealtime(userId, "new_message", message);
    emitUserRealtime(userId, "chat:message", message);
    emitUserRealtime(userId, "chat:message:new", message);
    emitUserRealtime(userId, "message.created", envelope);
    emitUserRealtime(userId, "message.sent", envelope);
  });
}

function makeMessagesResponse(roomId: string, messages: unknown[], limit: number) {
  const nextCursor =
    messages.length >= limit
      ? getMessageId(messages[0])
      : null;

  return {
    roomId,
    items: messages,
    messages,
    nextCursor,
    totalCount: null,
  };
}

export class MessageController {
  private readonly messageService: MessageService;

  constructor() {
    this.messageService = new MessageService(prisma);
  }

  async getChatMessages(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.params.chatId);

      if (!chatId) {
        return res.status(400).json({
          error: "chat_id_required",
        });
      }

      const messages = await this.messageService.getChatMessages(chatId);

      return res.json(messages);
    } catch (error) {
      return res.status(500).json({
        error: "get_chat_messages_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getRoomMessages(req: Request, res: Response) {
    try {
      const roomId = normalizeString(req.params.roomId);
      const cursor = normalizeOptionalString(req.query.cursor);
      const limit = normalizePositiveInteger(req.query.limit, 50);

      if (!roomId) {
        return res.status(400).json({
          error: "room_id_required",
        });
      }

      const messages = await this.messageService.getMessages(roomId, cursor ?? undefined, limit);

      return res.json(makeMessagesResponse(roomId, messages, limit));
    } catch (error) {
      return res.status(500).json({
        error: "get_room_messages_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getMessageById(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.params.messageId);

      if (!messageId) {
        return res.status(400).json({
          error: "message_id_required",
        });
      }

      const message = await prisma.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        return res.status(404).json({
          error: "message_not_found",
        });
      }

      return res.json(message);
    } catch (error) {
      return res.status(500).json({
        error: "get_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendRoomMessage(req: Request, res: Response) {
    try {
      const roomId = normalizeString(req.params.roomId);
      const userId = getRequestUserId(req);
      const kind = normalizeKernelKind(req.body?.kind ?? req.body?.type);
      const content = normalizeString(req.body?.text) ?? normalizeString(req.body?.content);
      const mediaUrl = normalizeString(req.body?.mediaUrl) ?? normalizeString(req.body?.fileUrl);
      const fileName = normalizeOptionalString(req.body?.fileName);
      const fileSize = normalizeOptionalNumber(req.body?.fileSize);
      const mimeType = normalizeOptionalString(req.body?.mimeType);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);
      const latitude = normalizeOptionalNumber(req.body?.latitude);
      const longitude = normalizeOptionalNumber(req.body?.longitude);

      if (!roomId || !userId) {
        return res.status(400).json({
          error: "room_id_user_id_required",
        });
      }

      let message: unknown;

      if (kind === "location") {
        if (latitude === null || longitude === null) {
          return res.status(400).json({
            error: "latitude_longitude_required",
          });
        }

        message = await this.messageService.sendLocationMessage({
          chatId: roomId,
          userId,
          latitude,
          longitude,
          content: content ?? undefined,
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      } else if (kind === "voice" || kind === "audio") {
        if (!mediaUrl) {
          return res.status(400).json({
            error: "media_url_required",
          });
        }

        message = await this.messageService.sendVoiceMessage({
          chatId: roomId,
          userId,
          mediaUrl,
          fileName: fileName ?? undefined,
          fileSize: fileSize ?? undefined,
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      } else if (kind === "video") {
        if (!mediaUrl) {
          return res.status(400).json({
            error: "media_url_required",
          });
        }

        message = await this.messageService.sendVideoMessage({
          chatId: roomId,
          userId,
          mediaUrl,
          fileName: fileName ?? undefined,
          fileSize: fileSize ?? undefined,
          mimeType: mimeType ?? "video/mp4",
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      } else if (kind === "image") {
        if (!mediaUrl) {
          return res.status(400).json({
            error: "media_url_required",
          });
        }

        message = await this.messageService.sendImageMessage({
          chatId: roomId,
          userId,
          mediaUrl,
          fileName: fileName ?? undefined,
          fileSize: fileSize ?? undefined,
          mimeType: mimeType ?? "image/jpeg",
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      } else if (kind === "file" || kind === "document") {
        if (!mediaUrl || !fileName) {
          return res.status(400).json({
            error: "media_url_file_name_required",
          });
        }

        message = await this.messageService.sendFileMessage({
          chatId: roomId,
          userId,
          mediaUrl,
          fileName: fileName ?? undefined,
          fileSize: fileSize ?? undefined,
          mimeType: mimeType ?? "application/octet-stream",
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      } else {
        if (!content) {
          return res.status(400).json({
            error: "text_required",
          });
        }

        message = await this.messageService.sendTextMessage({
          chatId: roomId,
          userId,
          content: content ?? undefined,
          replyToMessageId,
          forwardedFromMessageId,
          ...getPeerContext(req),
        });
      }

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? roomId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_room_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendTextMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const content = normalizeString(req.body?.content);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || !content) {
        return res.status(400).json({
          error: "chat_id_user_id_content_required",
        });
      }

      const message = await this.messageService.sendTextMessage({
        chatId,
        userId,
        content: content ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_text_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendVoiceMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const mediaUrl = normalizeString(req.body?.mediaUrl);
      const fileName = normalizeOptionalString(req.body?.fileName);
      const fileSize = normalizeOptionalNumber(req.body?.fileSize);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || !mediaUrl) {
        return res.status(400).json({
          error: "chat_id_user_id_media_url_required",
        });
      }

      const message = await this.messageService.sendVoiceMessage({
        chatId,
        userId,
        mediaUrl,
        fileName: fileName ?? undefined,
        fileSize: fileSize ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_voice_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendVideoMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const mediaUrl = normalizeString(req.body?.mediaUrl);
      const fileName = normalizeOptionalString(req.body?.fileName);
      const fileSize = normalizeOptionalNumber(req.body?.fileSize);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || !mediaUrl) {
        return res.status(400).json({
          error: "chat_id_user_id_media_url_required",
        });
      }

      const message = await this.messageService.sendVideoMessage({
        chatId,
        userId,
        mediaUrl,
        fileName: fileName ?? undefined,
        fileSize: fileSize ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_video_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendImageMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const mediaUrl = normalizeString(req.body?.mediaUrl);
      const fileName = normalizeOptionalString(req.body?.fileName);
      const fileSize = normalizeOptionalNumber(req.body?.fileSize);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || !mediaUrl) {
        return res.status(400).json({
          error: "chat_id_user_id_media_url_required",
        });
      }

      const message = await this.messageService.sendImageMessage({
        chatId,
        userId,
        mediaUrl,
        fileName: fileName ?? undefined,
        fileSize: fileSize ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_image_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendFileMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const mediaUrl = normalizeString(req.body?.mediaUrl);
      const fileName = normalizeString(req.body?.fileName);
      const fileSize = normalizeOptionalNumber(req.body?.fileSize);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || !mediaUrl || !fileName) {
        return res.status(400).json({
          error: "chat_id_user_id_media_url_file_name_required",
        });
      }

      const message = await this.messageService.sendFileMessage({
        chatId,
        userId,
        mediaUrl,
        fileName: fileName ?? undefined,
        fileSize: fileSize ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_file_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async sendLocationMessage(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.body?.chatId) ?? normalizeString(req.body?.roomId);
      const userId = getRequestUserId(req);
      const latitude = normalizeOptionalNumber(req.body?.latitude);
      const longitude = normalizeOptionalNumber(req.body?.longitude);
      const content = normalizeOptionalString(req.body?.content);
      const replyToMessageId = normalizeOptionalString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeOptionalString(req.body?.forwardedFromMessageId);

      if (!chatId || !userId || latitude === null || longitude === null) {
        return res.status(400).json({
          error: "chat_id_user_id_latitude_longitude_required",
        });
      }

      const message = await this.messageService.sendLocationMessage({
        chatId,
        userId,
        latitude,
        longitude,
        content: content ?? undefined,
        replyToMessageId,
        forwardedFromMessageId,
        ...getPeerContext(req),
      });

      await emitMessageCreatedEverywhere(getMessageRoomId(message) ?? chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "send_location_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async markDelivered(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.params.messageId);

      if (!messageId) {
        return res.status(400).json({
          error: "message_id_required",
        });
      }

      const message = await this.messageService.markDelivered(messageId);

      if (!message) {
        return res.status(404).json({
          error: "message_not_found",
        });
      }

      const chatId = getMessageRoomId(message);
      if (chatId) {
        emitMessageDelivered(chatId, message);
      }

      return res.json(message);
    } catch (error) {
      return res.status(500).json({
        error: "mark_delivered_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async markRead(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.params.messageId);

      if (!messageId) {
        return res.status(400).json({
          error: "message_id_required",
        });
      }

      const message = await this.messageService.markRead(messageId);

      if (!message) {
        return res.status(404).json({
          error: "message_not_found",
        });
      }

      const chatId = getMessageRoomId(message);
      if (chatId) {
        emitMessageRead(chatId, message);
      }

      return res.json(message);
    } catch (error) {
      return res.status(500).json({
        error: "mark_read_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async editTextMessage(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.params.messageId);
      const content = normalizeString(req.body?.content) ?? normalizeString(req.body?.text);

      if (!messageId || !content) {
        return res.status(400).json({
          error: "message_id_content_required",
        });
      }

      const message = await this.messageService.editTextMessage(messageId, content);
      const chatId = getMessageRoomId(message);

      if (chatId) {
        emitMessageUpdated(chatId, message);
      }

      return res.json(message);
    } catch (error) {
      return res.status(500).json({
        error: "edit_text_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async softDeleteMessage(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.params.messageId);

      if (!messageId) {
        return res.status(400).json({
          error: "message_id_required",
        });
      }

      const message = await this.messageService.softDeleteMessage(messageId);
      const chatId = getMessageRoomId(message);
      const id = getMessageId(message);

      if (chatId && id) {
        emitMessageRemoved(chatId, { messageId: id });
      }

      return res.json(message);
    } catch (error) {
      return res.status(500).json({
        error: "soft_delete_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
