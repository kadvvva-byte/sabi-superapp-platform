import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ChatListService } from "../../application/services/chat-list.service";

const prisma = new PrismaClient();

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export class ChatListController {
  private readonly service = new ChatListService(prisma);

  async getList(req: Request, res: Response) {
    try {
      const userId = normalizeString(req.params?.userId);

      if (!userId) {
        return res.status(400).json({
          error: "user_id_required",
        });
      }

      const chats = await this.service.getChatList(userId);

      return res.json(chats);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "failed_to_get_chat_list",
      });
    }
  }
}