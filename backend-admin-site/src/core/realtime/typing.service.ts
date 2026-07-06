export type ChatTypingState = Record<
  string,
  {
    userId: string;
    typing: boolean;
    startedAt: string;
    updatedAt: string;
  }
>;

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export class TypingService {
  private readonly typingUsers = new Map<string, Map<string, { startedAt: string; updatedAt: string }>>();

  /*
  -----------------------
  INTERNAL HELPERS
  -----------------------
  */

  private ensureChat(chatId: string) {
    const safeChatId = normalizeString(chatId);
    const current = this.typingUsers.get(safeChatId);
    if (current) return current;

    const next = new Map<string, { startedAt: string; updatedAt: string }>();
    this.typingUsers.set(safeChatId, next);
    return next;
  }

  private cleanupChatIfEmpty(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const users = this.typingUsers.get(safeChatId);
    if (users && users.size > 0) return;

    this.typingUsers.delete(safeChatId);
  }

  /*
  -----------------------
  START TYPING
  -----------------------
  */

  startTyping(chatId: string, userId: string, at?: string | null) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);
    const safeAt = normalizeString(at) || nowIso();

    if (!safeChatId || !safeUserId) {
      return this.getTypingState(safeChatId);
    }

    const users = this.ensureChat(safeChatId);
    const current = users.get(safeUserId);

    users.set(safeUserId, {
      startedAt: current?.startedAt ?? safeAt,
      updatedAt: safeAt,
    });

    return this.getTypingState(safeChatId);
  }

  /*
  -----------------------
  STOP TYPING
  -----------------------
  */

  stopTyping(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) {
      return this.getTypingState(safeChatId);
    }

    const users = this.typingUsers.get(safeChatId);
    if (!users) return this.getTypingState(safeChatId);

    users.delete(safeUserId);
    this.cleanupChatIfEmpty(safeChatId);

    return this.getTypingState(safeChatId);
  }

  stopTypingForUser(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    for (const [chatId, users] of this.typingUsers.entries()) {
      users.delete(safeUserId);
      this.cleanupChatIfEmpty(chatId);
    }
  }

  /*
  -----------------------
  LOOKUPS
  -----------------------
  */

  isTyping(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) return false;

    const users = this.typingUsers.get(safeChatId);
    return Boolean(users?.has(safeUserId));
  }

  getTypingUsers(chatId: string): string[] {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return [];

    return Array.from(this.typingUsers.get(safeChatId)?.keys() ?? []);
  }

  getTypingState(chatId: string): ChatTypingState {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return {};

    const users = this.typingUsers.get(safeChatId);
    if (!users || !users.size) return {};

    const state: ChatTypingState = {};

    for (const [userId, meta] of users.entries()) {
      state[userId] = {
        userId,
        typing: true,
        startedAt: meta.startedAt,
        updatedAt: meta.updatedAt,
      };
    }

    return state;
  }

  getTypingChats(userId: string): string[] {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    const result: string[] = [];

    for (const [chatId, users] of this.typingUsers.entries()) {
      if (users.has(safeUserId)) {
        result.push(chatId);
      }
    }

    return result;
  }

  /*
  -----------------------
  MAINTENANCE
  -----------------------
  */

  clearChat(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    this.typingUsers.delete(safeChatId);
  }

  reset() {
    this.typingUsers.clear();
  }
}