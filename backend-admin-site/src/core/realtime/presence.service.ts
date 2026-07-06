export type PresenceSnapshotEntry = {
  userId: string;
  online: boolean;
  socketIds: string[];
  updatedAt: string;
  lastSeenAt: string | null;
};

export type ChatPresenceSnapshot = Record<
  string,
  {
    online: boolean;
    updatedAt: string;
    lastSeenAt: string | null;
    socketIds: string[];
  }
>;

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cloneSet<T>(value?: Set<T> | null): Set<T> {
  return value ? new Set(value) : new Set<T>();
}

export class PresenceService {
  private static readonly userSockets = new Map<string, Set<string>>();
  private static readonly socketUsers = new Map<string, string>();

  private static readonly userLastSeenAt = new Map<string, string>();
  private static readonly userUpdatedAt = new Map<string, string>();

  private static readonly chatUsers = new Map<string, Set<string>>();
  private static readonly userChats = new Map<string, Set<string>>();

  /*
  -----------------------
  INTERNAL HELPERS
  -----------------------
  */

  private static touchUser(userId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    this.userUpdatedAt.set(safeUserId, normalizeString(at) || nowIso());
  }

  private static ensureUserSocketSet(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.userSockets.get(safeUserId);
    if (current) return current;

    const next = new Set<string>();
    this.userSockets.set(safeUserId, next);
    return next;
  }

  private static ensureChatUserSet(chatId: string) {
    const safeChatId = normalizeString(chatId);
    const current = this.chatUsers.get(safeChatId);
    if (current) return current;

    const next = new Set<string>();
    this.chatUsers.set(safeChatId, next);
    return next;
  }

  private static ensureUserChatSet(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.userChats.get(safeUserId);
    if (current) return current;

    const next = new Set<string>();
    this.userChats.set(safeUserId, next);
    return next;
  }

  private static cleanupUserIfEmpty(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.userSockets.get(safeUserId);
    if (sockets && sockets.size > 0) return;

    this.userSockets.delete(safeUserId);
  }

  private static detachUserFromAllChats(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const joinedChats = cloneSet(this.userChats.get(safeUserId));

    for (const chatId of joinedChats) {
      const users = this.chatUsers.get(chatId);
      if (!users) continue;

      users.delete(safeUserId);

      if (!users.size) {
        this.chatUsers.delete(chatId);
      } else {
        this.chatUsers.set(chatId, users);
      }
    }

    this.userChats.delete(safeUserId);
  }

  /*
  -----------------------
  USER ONLINE
  -----------------------
  */

  static userOnline(userId: string, socketId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    const safeSocketId = normalizeString(socketId);
    const safeAt = normalizeString(at) || nowIso();

    if (!safeUserId || !safeSocketId) return this.getPresenceEntry(safeUserId);

    const sockets = this.ensureUserSocketSet(safeUserId);
    sockets.add(safeSocketId);

    this.socketUsers.set(safeSocketId, safeUserId);
    this.userLastSeenAt.delete(safeUserId);
    this.userUpdatedAt.set(safeUserId, safeAt);

    return this.getPresenceEntry(safeUserId);
  }

  /*
  -----------------------
  USER OFFLINE
  -----------------------
  */

  static userOffline(userId: string, socketId?: string | null, at?: string | null) {
    const safeUserId = normalizeString(userId);
    const safeSocketId = normalizeString(socketId);
    const safeAt = normalizeString(at) || nowIso();

    if (!safeUserId) return null;

    if (safeSocketId) {
      const sockets = this.userSockets.get(safeUserId);
      if (sockets) {
        sockets.delete(safeSocketId);

        if (!sockets.size) {
          this.userSockets.delete(safeUserId);
        } else {
          this.userSockets.set(safeUserId, sockets);
        }
      }

      this.socketUsers.delete(safeSocketId);
    } else {
      const sockets = this.userSockets.get(safeUserId);
      if (sockets) {
        for (const existingSocketId of sockets) {
          this.socketUsers.delete(existingSocketId);
        }
      }
      this.userSockets.delete(safeUserId);
    }

    const stillOnline = this.isOnline(safeUserId);

    this.userUpdatedAt.set(safeUserId, safeAt);

    if (!stillOnline) {
      this.userLastSeenAt.set(safeUserId, safeAt);
    }

    this.cleanupUserIfEmpty(safeUserId);

    return this.getPresenceEntry(safeUserId);
  }

  static userOfflineBySocket(socketId: string, at?: string | null) {
    const safeSocketId = normalizeString(socketId);
    if (!safeSocketId) return null;

    const userId = this.socketUsers.get(safeSocketId);
    if (!userId) return null;

    return this.userOffline(userId, safeSocketId, at);
  }

  /*
  -----------------------
  CHAT MEMBERSHIP
  -----------------------
  */

  static joinChat(userId: string, chatId: string) {
    const safeUserId = normalizeString(userId);
    const safeChatId = normalizeString(chatId);

    if (!safeUserId || !safeChatId) return this.getChatPresenceSnapshot(safeChatId);

    this.ensureChatUserSet(safeChatId).add(safeUserId);
    this.ensureUserChatSet(safeUserId).add(safeChatId);
    this.touchUser(safeUserId);

    return this.getChatPresenceSnapshot(safeChatId);
  }

  static leaveChat(userId: string, chatId: string) {
    const safeUserId = normalizeString(userId);
    const safeChatId = normalizeString(chatId);

    if (!safeUserId || !safeChatId) return this.getChatPresenceSnapshot(safeChatId);

    /*
      Presence membership is a remembered room relation, not only an active screen subscription.
      Do not remove the user from chatUsers/userChats on screen leave; otherwise the room loses
      the peer after disconnect and cannot show "last seen" in the chat header.
    */
    this.ensureChatUserSet(safeChatId).add(safeUserId);
    this.ensureUserChatSet(safeUserId).add(safeChatId);
    this.touchUser(safeUserId);

    return this.getChatPresenceSnapshot(safeChatId);
  }

  static rememberChatUser(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) return this.getChatPresenceSnapshot(safeChatId);

    this.ensureChatUserSet(safeChatId).add(safeUserId);

    if (this.isOnline(safeUserId)) {
      this.ensureUserChatSet(safeUserId).add(safeChatId);
    }

    return this.getChatPresenceSnapshot(safeChatId);
  }

  /*
  -----------------------
  LOOKUPS
  -----------------------
  */

  static isOnline(userId: string): boolean {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return false;

    const sockets = this.userSockets.get(safeUserId);
    return Boolean(sockets && sockets.size > 0);
  }

  static getSocket(userId: string): string | undefined {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return undefined;

    const sockets = this.userSockets.get(safeUserId);
    if (!sockets || !sockets.size) return undefined;

    return Array.from(sockets)[0];
  }

  static getSockets(userId: string): string[] {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.userSockets.get(safeUserId) ?? []);
  }

  static getUserIdBySocket(socketId: string): string | undefined {
    const safeSocketId = normalizeString(socketId);
    if (!safeSocketId) return undefined;

    return this.socketUsers.get(safeSocketId);
  }

  static getLastSeenAt(userId: string): string | null {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    return this.userLastSeenAt.get(safeUserId) ?? null;
  }

  static getUpdatedAt(userId: string): string | null {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    return this.userUpdatedAt.get(safeUserId) ?? null;
  }

  static getPresenceEntry(userId: string): PresenceSnapshotEntry | null {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    const socketIds = this.getSockets(safeUserId);
    const online = socketIds.length > 0;
    const updatedAt =
      this.userUpdatedAt.get(safeUserId) ??
      (online ? nowIso() : this.userLastSeenAt.get(safeUserId) ?? nowIso());

    return {
      userId: safeUserId,
      online,
      socketIds,
      updatedAt,
      lastSeenAt: online ? null : this.userLastSeenAt.get(safeUserId) ?? null,
    };
  }

  static getChatPresenceSnapshot(chatId: string): ChatPresenceSnapshot {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return {};

    const users = this.chatUsers.get(safeChatId);
    if (!users || !users.size) return {};

    const snapshot: ChatPresenceSnapshot = {};

    for (const userId of users) {
      const entry = this.getPresenceEntry(userId);
      if (!entry) continue;

      snapshot[userId] = {
        online: entry.online,
        updatedAt: entry.updatedAt,
        lastSeenAt: entry.lastSeenAt,
        socketIds: entry.socketIds,
      };
    }

    return snapshot;
  }

  static getChatUserIds(chatId: string): string[] {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return [];

    return Array.from(this.chatUsers.get(safeChatId) ?? []);
  }

  static getUserChatIds(userId: string): string[] {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.userChats.get(safeUserId) ?? []);
  }

  static getOnlineUsers(): Map<string, string[]> {
    const result = new Map<string, string[]>();

    for (const [userId, sockets] of this.userSockets.entries()) {
      result.set(userId, Array.from(sockets));
    }

    return result;
  }

  /*
  -----------------------
  MAINTENANCE
  -----------------------
  */

  static clearUser(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.userSockets.get(safeUserId);
    if (sockets) {
      for (const socketId of sockets) {
        this.socketUsers.delete(socketId);
      }
    }

    this.userSockets.delete(safeUserId);
    this.userLastSeenAt.delete(safeUserId);
    this.userUpdatedAt.delete(safeUserId);
    this.detachUserFromAllChats(safeUserId);
  }

  static reset() {
    this.userSockets.clear();
    this.socketUsers.clear();
    this.userLastSeenAt.clear();
    this.userUpdatedAt.clear();
    this.chatUsers.clear();
    this.userChats.clear();
  }
}