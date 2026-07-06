import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

export type PresenceSnapshotEntry = {
  userId: string;
  online: boolean;
  socketIds: string[];
  updatedAt: string;
  lastSeenAt: string | null;
};

export type PresenceOfflineTransition = {
  userId: string;
  socketId: string;
  chatIds: string[];
  entry: PresenceSnapshotEntry;
  reason: "stale_socket" | "heartbeat_timeout";
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

function parseIsoMs(value: unknown): number | null {
  const normalized = normalizeString(value);
  if (!normalized) return null;

  const parsed = Date.parse(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function cloneSet<T>(value?: Set<T> | null): Set<T> {
  return value ? new Set(value) : new Set<T>();
}


type PersistedPresenceState = {
  version: 1;
  updatedAt: string;
  users: Record<
    string,
    {
      updatedAt: string | null;
      lastSeenAt: string | null;
    }
  >;
  chats: Record<string, string[]>;
};

function uniqueStrings(values: unknown[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => normalizeString(value))
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function readStringRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export class PresenceService {
  private readonly userSockets = new Map<string, Set<string>>();
  private readonly socketUsers = new Map<string, string>();
  private readonly socketSeenAt = new Map<string, string>();

  private readonly userLastSeenAt = new Map<string, string>();
  private readonly userUpdatedAt = new Map<string, string>();

  private readonly chatUsers = new Map<string, Set<string>>();
  private readonly userChats = new Map<string, Set<string>>();

  private readonly persistenceFilePath = join(
    process.cwd(),
    ".data",
    "messenger",
    "presence-state.json",
  );

  constructor() {
    this.loadPersistedState();
  }

  /*
  -----------------------
  PERSISTENCE
  -----------------------
  */

  private buildPersistedState(): PersistedPresenceState {
    const userIds = uniqueStrings([
      ...Array.from(this.userUpdatedAt.keys()),
      ...Array.from(this.userLastSeenAt.keys()),
      ...Array.from(this.userChats.keys()),
      ...Array.from(this.userSockets.keys()),
    ]);

    const users: PersistedPresenceState["users"] = {};
    for (const userId of userIds) {
      users[userId] = {
        updatedAt: this.userUpdatedAt.get(userId) ?? null,
        lastSeenAt: this.userLastSeenAt.get(userId) ?? null,
      };
    }

    const chats: PersistedPresenceState["chats"] = {};
    for (const [chatId, userIdsSet] of this.chatUsers.entries()) {
      const safeChatId = normalizeString(chatId);
      if (!safeChatId) continue;
      const safeUserIds = uniqueStrings(Array.from(userIdsSet));
      if (safeUserIds.length) {
        chats[safeChatId] = safeUserIds;
      }
    }

    return {
      version: 1,
      updatedAt: nowIso(),
      users,
      chats,
    };
  }

  private persistState() {
    try {
      mkdirSync(dirname(this.persistenceFilePath), { recursive: true });
      writeFileSync(
        this.persistenceFilePath,
        `${JSON.stringify(this.buildPersistedState(), null, 2)}\n`,
        "utf8",
      );
    } catch {
      // Presence must never crash realtime. Persistence is a recovery aid only.
    }
  }

  private loadPersistedState() {
    try {
      if (!existsSync(this.persistenceFilePath)) return;

      const parsed = JSON.parse(readFileSync(this.persistenceFilePath, "utf8")) as PersistedPresenceState;
      const users = readStringRecord(parsed.users);
      for (const [rawUserId, rawEntry] of Object.entries(users)) {
        const userId = normalizeString(rawUserId);
        if (!userId) continue;

        const entry = readStringRecord(rawEntry);
        const updatedAt = normalizeString(entry.updatedAt);
        const lastSeenAt = normalizeString(entry.lastSeenAt) || updatedAt;

        if (updatedAt) this.userUpdatedAt.set(userId, updatedAt);
        if (lastSeenAt) this.userLastSeenAt.set(userId, lastSeenAt);
      }

      const chats = readStringRecord(parsed.chats);
      for (const [rawChatId, rawUserIds] of Object.entries(chats)) {
        const chatId = normalizeString(rawChatId);
        if (!chatId || !Array.isArray(rawUserIds)) continue;

        const userIds = uniqueStrings(rawUserIds);
        if (!userIds.length) continue;

        const chatSet = this.ensureChatUserSet(chatId);
        for (const userId of userIds) {
          chatSet.add(userId);
          this.ensureUserChatSet(userId).add(chatId);
        }
      }
    } catch {
      // Corrupted local recovery data should not block socket boot.
    }
  }

  /*
  -----------------------
  INTERNAL HELPERS
  -----------------------
  */

  private touchUser(userId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    this.userUpdatedAt.set(safeUserId, normalizeString(at) || nowIso());
  }

  private ensureUserSocketSet(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.userSockets.get(safeUserId);
    if (current) return current;

    const next = new Set<string>();
    this.userSockets.set(safeUserId, next);
    return next;
  }

  private ensureChatUserSet(chatId: string) {
    const safeChatId = normalizeString(chatId);
    const current = this.chatUsers.get(safeChatId);
    if (current) return current;

    const next = new Set<string>();
    this.chatUsers.set(safeChatId, next);
    return next;
  }

  private ensureUserChatSet(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.userChats.get(safeUserId);
    if (current) return current;

    const next = new Set<string>();
    this.userChats.set(safeUserId, next);
    return next;
  }

  private cleanupUserIfEmpty(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.userSockets.get(safeUserId);
    if (sockets && sockets.size > 0) return;

    this.userSockets.delete(safeUserId);
  }

  private detachUserFromAllChats(userId: string) {
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

  userOnline(userId: string, socketId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    const safeSocketId = normalizeString(socketId);
    const safeAt = normalizeString(at) || nowIso();

    if (!safeUserId || !safeSocketId) return this.getPresenceEntry(safeUserId);

    const sockets = this.ensureUserSocketSet(safeUserId);
    sockets.add(safeSocketId);

    this.socketUsers.set(safeSocketId, safeUserId);
    this.socketSeenAt.set(safeSocketId, safeAt);
    // Keep the previous lastSeenAt while the user is online. The public snapshot
    // still returns null for online users, but retaining the value lets the backend
    // recover a safe offline label if it restarts before a disconnect event.
    this.userUpdatedAt.set(safeUserId, safeAt);
    this.persistState();

    return this.getPresenceEntry(safeUserId);
  }

  /*
  -----------------------
  USER OFFLINE
  -----------------------
  */

  userOffline(userId: string, socketId?: string | null, at?: string | null) {
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
      this.socketSeenAt.delete(safeSocketId);
    } else {
      const sockets = this.userSockets.get(safeUserId);
      if (sockets) {
        for (const existingSocketId of sockets) {
          this.socketUsers.delete(existingSocketId);
          this.socketSeenAt.delete(existingSocketId);
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
    this.persistState();

    return this.getPresenceEntry(safeUserId);
  }

  userOfflineBySocket(socketId: string, at?: string | null) {
    const safeSocketId = normalizeString(socketId);
    if (!safeSocketId) return null;

    const userId = this.socketUsers.get(safeSocketId);
    if (!userId) return null;

    return this.userOffline(userId, safeSocketId, at);
  }

  recordHeartbeat(userId: string, socketId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    const safeSocketId = normalizeString(socketId);
    const safeAt = normalizeString(at) || nowIso();

    if (!safeUserId || !safeSocketId) return this.getPresenceEntry(safeUserId);

    this.ensureUserSocketSet(safeUserId).add(safeSocketId);
    this.socketUsers.set(safeSocketId, safeUserId);
    this.socketSeenAt.set(safeSocketId, safeAt);
    this.userUpdatedAt.set(safeUserId, safeAt);

    return this.getPresenceEntry(safeUserId);
  }

  sweepStaleSockets(maxAgeMs = 90_000, at?: string | null): PresenceOfflineTransition[] {
    const safeAt = normalizeString(at) || nowIso();
    const sweepAtMs = parseIsoMs(safeAt) ?? Date.now();
    const safeMaxAgeMs = Number.isFinite(maxAgeMs) && maxAgeMs > 0 ? maxAgeMs : 90_000;
    const transitions: PresenceOfflineTransition[] = [];

    for (const [socketId, seenAt] of Array.from(this.socketSeenAt.entries())) {
      const seenAtMs = parseIsoMs(seenAt);
      if (seenAtMs === null || sweepAtMs - seenAtMs <= safeMaxAgeMs) continue;

      const userId = this.socketUsers.get(socketId);
      if (!userId) {
        this.socketSeenAt.delete(socketId);
        continue;
      }

      const chatIds = this.getUserChatIds(userId);
      const entry = this.userOffline(userId, socketId, safeAt);
      if (!entry || entry.online) continue;

      transitions.push({
        userId,
        socketId,
        chatIds,
        entry,
        reason: "stale_socket",
      });
    }

    return transitions;
  }

  /*
  -----------------------
  CHAT MEMBERSHIP
  -----------------------
  */

  joinChat(userId: string, chatId: string) {
    const safeUserId = normalizeString(userId);
    const safeChatId = normalizeString(chatId);

    if (!safeUserId || !safeChatId) return this.getChatPresenceSnapshot(safeChatId);

    this.ensureChatUserSet(safeChatId).add(safeUserId);
    this.ensureUserChatSet(safeUserId).add(safeChatId);
    this.touchUser(safeUserId);
    this.persistState();

    return this.getChatPresenceSnapshot(safeChatId);
  }

  leaveChat(userId: string, chatId: string) {
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
    this.persistState();

    return this.getChatPresenceSnapshot(safeChatId);
  }

  rememberChatUser(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) return this.getChatPresenceSnapshot(safeChatId);

    this.ensureChatUserSet(safeChatId).add(safeUserId);

    this.ensureUserChatSet(safeUserId).add(safeChatId);
    this.persistState();

    return this.getChatPresenceSnapshot(safeChatId);
  }

  /*
  -----------------------
  LOOKUPS
  -----------------------
  */

  isOnline(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return false;

    const sockets = this.userSockets.get(safeUserId);
    return Boolean(sockets && sockets.size > 0);
  }

  getSocket(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    const sockets = this.userSockets.get(safeUserId);
    if (!sockets || !sockets.size) return null;

    return Array.from(sockets)[0] ?? null;
  }

  getSockets(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.userSockets.get(safeUserId) ?? []);
  }

  getSocketSeenAt(socketId: string) {
    const safeSocketId = normalizeString(socketId);
    if (!safeSocketId) return null;

    return this.socketSeenAt.get(safeSocketId) ?? null;
  }

  getUserIdBySocket(socketId: string) {
    const safeSocketId = normalizeString(socketId);
    if (!safeSocketId) return null;

    return this.socketUsers.get(safeSocketId) ?? null;
  }

  getLastSeenAt(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    return this.userLastSeenAt.get(safeUserId) ?? null;
  }

  getUpdatedAt(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    return this.userUpdatedAt.get(safeUserId) ?? null;
  }

  getPresenceEntry(userId: string): PresenceSnapshotEntry | null {
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

  getChatPresenceSnapshot(chatId: string): ChatPresenceSnapshot {
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

  getChatUserIds(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return [];

    return Array.from(this.chatUsers.get(safeChatId) ?? []);
  }

  getUserChatIds(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.userChats.get(safeUserId) ?? []);
  }

  getOnlineUsers() {
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

  clearUser(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.userSockets.get(safeUserId);
    if (sockets) {
      for (const socketId of sockets) {
        this.socketUsers.delete(socketId);
        this.socketSeenAt.delete(socketId);
      }
    }

    this.userSockets.delete(safeUserId);
    this.userLastSeenAt.delete(safeUserId);
    this.userUpdatedAt.delete(safeUserId);
    this.detachUserFromAllChats(safeUserId);
    this.persistState();
  }

  reset() {
    this.userSockets.clear();
    this.socketUsers.clear();
    this.socketSeenAt.clear();
    this.userLastSeenAt.clear();
    this.userUpdatedAt.clear();
    this.chatUsers.clear();
    this.userChats.clear();
    this.persistState();
  }
}