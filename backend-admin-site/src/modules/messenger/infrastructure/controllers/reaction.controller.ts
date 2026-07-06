import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ReactionService } from "../../application/services/reaction.service";
import { emitChatRealtime } from "../../../../core/realtime/realtime.emitter";

const prisma = new PrismaClient();
const service = new ReactionService(prisma);

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export class ReactionController {
  async react(req: Request, res: Response) {
    try {
      const messageId = normalizeString(req.body?.messageId);
      const userId = normalizeString(req.body?.userId);
      const reaction = normalizeString(req.body?.reaction);
      const chatId = normalizeString(req.body?.chatId);

      if (!messageId || !userId || !reaction) {
        return res.status(400).json({
          error: "invalid_reaction_payload",
        });
      }

      const data = await service.react(messageId, userId, reaction);

      if (chatId) {
        const payload = {
          messageId,
          userId,
          reaction,
          chatId,
          updatedAt: new Date().toISOString(),
        };

        emitChatRealtime(chatId, "message_reaction", payload);
        emitChatRealtime(chatId, "reaction:add", payload);
        emitChatRealtime(chatId, "reaction:changed", {
          chatId,
          action: "add",
          payload,
        });
      }

      return res.json(data);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "reaction_failed",
      });
    }
  }
}