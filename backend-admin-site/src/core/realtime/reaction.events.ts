import { Server } from "socket.io";

import { RealtimeChannels } from "./realtime.channels";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type ReactionPayload = {
  chatId?: string | null;
  messageId?: string | null;
  userId?: string | null;
  reaction?: string | null;
  createdAt?: string | null;
  removedAt?: string | null;
};

function normalizeReactionPayload(data: ReactionPayload) {
  return {
    chatId: normalizeString(data.chatId),
    messageId: normalizeString(data.messageId),
    userId: normalizeString(data.userId),
    reaction: normalizeString(data.reaction),
    createdAt:
      normalizeString(data.createdAt) || new Date().toISOString(),
    removedAt:
      normalizeString(data.removedAt) || new Date().toISOString(),
  };
}

export class ReactionEvents {
  constructor(private readonly server: Server) {}

  addReaction(chatId: string, data: ReactionPayload) {
    const safeChatId = normalizeString(chatId) || normalizeString(data.chatId);
    if (!safeChatId) return;

    const payload = {
      ...normalizeReactionPayload(data),
      chatId: safeChatId,
    };

    this.server.to(RealtimeChannels.chat(safeChatId)).emit("reaction:add", payload);
    this.server.to(RealtimeChannels.chat(safeChatId)).emit("message_reaction", payload);
    this.server.to(RealtimeChannels.chat(safeChatId)).emit("reaction:changed", {
      chatId: safeChatId,
      action: "add",
      payload,
    });
  }

  removeReaction(chatId: string, data: ReactionPayload) {
    const safeChatId = normalizeString(chatId) || normalizeString(data.chatId);
    if (!safeChatId) return;

    const payload = {
      ...normalizeReactionPayload(data),
      chatId: safeChatId,
    };

    this.server.to(RealtimeChannels.chat(safeChatId)).emit("reaction:remove", payload);
    this.server.to(RealtimeChannels.chat(safeChatId)).emit("message_reaction_removed", payload);
    this.server.to(RealtimeChannels.chat(safeChatId)).emit("reaction:changed", {
      chatId: safeChatId,
      action: "remove",
      payload,
    });
  }
}