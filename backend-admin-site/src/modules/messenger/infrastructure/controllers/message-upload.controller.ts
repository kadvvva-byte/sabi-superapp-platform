import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { MessageUploadService } from "../../application/services/message-upload.service";
import { emitChatRealtime } from "../../../../core/realtime/realtime.emitter";

const prisma = new PrismaClient();

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function emitMessageCreated(chatId: string, message: unknown) {
  emitChatRealtime(chatId, "message:new", message);
  emitChatRealtime(chatId, "new_message", message);
  emitChatRealtime(chatId, "chat:message", message);
  emitChatRealtime(chatId, "chat:message:new", message);
}

export class MessageUploadController {
  private readonly uploadService: MessageUploadService;

  constructor() {
    this.uploadService = new MessageUploadService(prisma);
  }

  async uploadVoiceMessage(req: Request, res: Response) {
    try {
      const file = req.file;
      const chatId = normalizeString(req.body?.chatId);
      const userId = normalizeString(req.body?.userId);
      const replyToMessageId = normalizeString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeString(req.body?.forwardedFromMessageId);

      if (!file) {
        return res.status(400).json({
          error: "file_required",
        });
      }

      if (!chatId || !userId) {
        return res.status(400).json({
          error: "chat_id_user_id_required",
        });
      }

      const message = await this.uploadService.uploadVoiceAndSend({
        chatId,
        userId,
        file,
        replyToMessageId: replyToMessageId ?? null,
        forwardedFromMessageId: forwardedFromMessageId ?? null,
      });

      emitMessageCreated(chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "upload_voice_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async uploadVideoMessage(req: Request, res: Response) {
    try {
      const file = req.file;
      const chatId = normalizeString(req.body?.chatId);
      const userId = normalizeString(req.body?.userId);
      const replyToMessageId = normalizeString(req.body?.replyToMessageId);
      const forwardedFromMessageId = normalizeString(req.body?.forwardedFromMessageId);

      if (!file) {
        return res.status(400).json({
          error: "file_required",
        });
      }

      if (!chatId || !userId) {
        return res.status(400).json({
          error: "chat_id_user_id_required",
        });
      }

      const message = await this.uploadService.uploadVideoAndSend({
        chatId,
        userId,
        file,
        replyToMessageId: replyToMessageId ?? null,
        forwardedFromMessageId: forwardedFromMessageId ?? null,
      });

      emitMessageCreated(chatId, message);

      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({
        error: "upload_video_message_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}