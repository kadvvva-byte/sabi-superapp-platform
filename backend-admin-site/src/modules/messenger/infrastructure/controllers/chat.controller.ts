import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ChatService } from "../../application/services/chat.service";
import { UnreadService } from "../../application/services/unread.service";
import { emitUserRealtime } from "../../../../core/realtime/realtime.emitter";

const prisma = new PrismaClient();

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values));
}

function normalizeUsername(value: unknown): string | null {
  const raw = normalizeString(value);
  if (!raw) return null;
  const cleaned = raw.replace(/^@+/, "").trim();
  return cleaned.length > 0 ? cleaned : null;
}

function buildUserDisplayName(user: unknown): string | null {
  if (!user || typeof user !== "object" || Array.isArray(user)) {
    return null;
  }

  const record = user as Record<string, unknown>;

  return (
    normalizeString(record.displayName) ??
    normalizeUsername(record.username) ??
    normalizeString(record.phone) ??
    normalizeString(record.email)
  );
}

export class ChatController {
  private readonly chatService = new ChatService(prisma);
  private readonly unreadService = new UnreadService(prisma);

  async createPrivate(req: Request, res: Response) {
    try {
      const requestRecord = req as Request & {
        currentUser?: { id?: string | null; userId?: string | null; sub?: string | null; phone?: string | null; username?: string | null; email?: string | null };
        user?: { id?: string | null; userId?: string | null; sub?: string | null; phone?: string | null; username?: string | null; email?: string | null };
      };

      const currentUserPhone =
        normalizeString(req.body?.currentUserPhone) ??
        normalizeString(req.body?.selfPhone) ??
        normalizeString(requestRecord.currentUser?.phone) ??
        normalizeString(requestRecord.user?.phone) ??
        normalizeString(req.header("x-user-phone"));
      const currentUserUsername =
        normalizeString(req.body?.currentUserUsername) ??
        normalizeString(req.body?.selfUsername) ??
        normalizeString(requestRecord.currentUser?.username) ??
        normalizeString(requestRecord.user?.username) ??
        normalizeString(req.header("x-user-username"));
      const currentUserEmail =
        normalizeString(req.body?.currentUserEmail) ??
        normalizeString(requestRecord.currentUser?.email) ??
        normalizeString(requestRecord.user?.email) ??
        normalizeString(req.header("x-user-email"));

      const peerPhone =
        normalizeString(req.body?.peerPhone) ??
        normalizeString(req.body?.phone) ??
        normalizeString(req.body?.targetPhone) ??
        normalizeString(req.body?.contactPhone);
      const peerUsername =
        normalizeString(req.body?.peerUsername) ??
        normalizeString(req.body?.username) ??
        normalizeString(req.body?.targetUsername) ??
        normalizeString(req.body?.contactUsername);
      const peerEmail =
        normalizeString(req.body?.peerEmail) ??
        normalizeString(req.body?.email) ??
        normalizeString(req.body?.targetEmail) ??
        normalizeString(req.body?.contactEmail);

      const user1 =
        normalizeString(req.body?.user1) ??
        normalizeString(req.body?.currentUserId) ??
        normalizeString(req.body?.selfUserId) ??
        normalizeString(req.body?.userId) ??
        normalizeString(requestRecord.currentUser?.id) ??
        normalizeString(requestRecord.currentUser?.userId) ??
        normalizeString(requestRecord.currentUser?.sub) ??
        normalizeString(requestRecord.user?.id) ??
        normalizeString(requestRecord.user?.userId) ??
        normalizeString(requestRecord.user?.sub) ??
        normalizeString(req.header("x-user-id")) ??
        normalizeString(req.header("x-current-user-id")) ??
        currentUserPhone ??
        currentUserUsername ??
        currentUserEmail;

      const user2 =
        normalizeString(req.body?.user2) ??
        normalizeString(req.body?.peerUserId) ??
        normalizeString(req.body?.targetUserId) ??
        normalizeString(req.body?.partnerId) ??
        normalizeString(req.body?.contactId) ??
        peerPhone ??
        peerUsername ??
        peerEmail;

      console.log("[messenger:createPrivate:debug]", {
        body: req.body,
        resolved: {
          user1,
          user2,
          currentUserPhone,
          currentUserUsername,
          currentUserEmail,
          peerPhone,
          peerUsername,
          peerEmail,
        },
        headers: {
          xUserId: req.header("x-user-id"),
          xCurrentUserId: req.header("x-current-user-id"),
          xUserPhone: req.header("x-user-phone"),
          xUserUsername: req.header("x-user-username"),
        },
      });

      if (!user1 || !user2) {
        return res.status(400).json({
          success: false,
          error: "user1_user2_required",
        });
      }

      const chat = await this.chatService.createPrivateChat(user1, user2, {
        currentUserPhone,
        currentUserUsername,
        currentUserEmail,
        peerPhone,
        peerUsername,
        peerEmail,
        user1Candidates: [
          req.body?.currentUserId,
          req.body?.selfUserId,
          req.body?.userId,
          req.header("x-user-id"),
          req.header("x-current-user-id"),
          currentUserPhone,
          currentUserUsername,
          currentUserEmail,
        ],
        user2Candidates: [
          req.body?.peerUserId,
          req.body?.targetUserId,
          req.body?.partnerId,
          req.body?.contactId,
          peerPhone,
          peerUsername,
          peerEmail,
        ],
      });

      const chatId = normalizeString((chat as { chat?: { id?: unknown } }).chat?.id);
      const currentUserId =
        normalizeString((chat as { currentUserId?: unknown }).currentUserId) ?? user1;
      const peerUserId =
        normalizeString((chat as { peerUserId?: unknown }).peerUserId) ?? user2;

      if (!chatId) {
        return res.status(500).json({
          success: false,
          error: "private_chat_id_missing",
        });
      }

      const normalized = {
        ...chat,
        chatId,
        roomId: chatId,
        conversationId: chatId,
        currentUserId,
        peerUserId,
        peerPhone: (chat as any).peerUser?.phone ?? peerPhone ?? null,
        peerUsername: (chat as any).peerUser?.username ?? peerUsername ?? null,
        peerDisplayName: buildUserDisplayName((chat as any).peerUser),
        roomType: "direct",
      };

      const payload = {
        type: "private",
        ...normalized,
        createdAt: new Date().toISOString(),
      };

      emitUserRealtime(currentUserId, "chat:created", payload);
      emitUserRealtime(peerUserId, "chat:created", payload);

      return res.json({
        success: true,
        data: normalized,
        ...normalized,
      });
    } catch (error) {
      console.error("createPrivate error:", error);

      const message = error instanceof Error ? error.message : "failed_to_create_private_chat";
      const status = message.includes("not_found") ? 404 : 500;

      return res.status(status).json({
        success: false,
        error: message,
      });
    }
  }

  async createGroup(req: Request, res: Response) {
    try {
      const title = normalizeString(req.body?.title);
      const creatorId = normalizeString(req.body?.creatorId);
      const members = uniqueStrings(normalizeStringArray(req.body?.members));

      if (!title || !creatorId) {
        return res.status(400).json({
          error: "title_creator_id_required",
        });
      }

      const chat = await this.chatService.createGroupChat({
        title,
        creatorId,
        members,
      });

      const recipients = uniqueStrings([creatorId, ...members]);
      const payload = {
        type: "group",
        chat,
        createdAt: new Date().toISOString(),
      };

      for (const userId of recipients) {
        emitUserRealtime(userId, "chat:created", payload);
      }

      return res.json(chat);
    } catch (error) {
      console.error("createGroup error:", error);

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "failed_to_create_group_chat",
      });
    }
  }

  async unread(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.query?.chatId);
      const userId = normalizeString(req.query?.userId);

      if (!chatId || !userId) {
        return res.status(400).json({
          error: "chat_id_user_id_required",
        });
      }

      const count = await this.unreadService.countUnread(chatId, userId);

      return res.json({
        unread: count,
      });
    } catch (error) {
      console.error("unread error:", error);

      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "failed_to_get_unread",
      });
    }
  }
}

