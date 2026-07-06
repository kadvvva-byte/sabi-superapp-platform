import { Server, Socket } from "socket.io";
import {
  PresenceService,
  type ChatPresenceSnapshot,
  type PresenceSnapshotEntry,
} from "./presence.service";

type PresencePayload =
  | string
  | {
      userId?: string | null;
      chatId?: string | null;
      roomId?: string | null;
      peerUserId?: string | null;
      partnerId?: string | null;
      targetUserId?: string | null;
      roomType?: string | null;
      activeProgram?: string | null;
      presenceScope?: string | null;
      reason?: string | null;
      online?: boolean | null;
      status?: string | null;
      at?: string | null;
    };

type ChatPayload =
  | string
  | {
      chatId?: string | null;
      roomId?: string | null;
      userId?: string | null;
      peerUserId?: string | null;
      partnerId?: string | null;
      targetUserId?: string | null;
      roomType?: string | null;
    };

type EmitterLike = {
  emit(eventName: string, payload: Record<string, unknown>): unknown;
};

const SABI_PRESENCE_STALE_SOCKET_MAX_AGE_MS = 90_000;
const SABI_PRESENCE_STALE_SOCKET_SWEEP_MS = 30_000;

type PresenceStatus = "online" | "offline";

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getUserIdFromPayload(payload: PresencePayload | null | undefined): string {
  if (typeof payload === "string") return normalizeString(payload);

  if (payload && typeof payload === "object") {
    return normalizeString(payload.userId);
  }

  return "";
}

function getChatIdFromPayload(payload: ChatPayload | PresencePayload | null | undefined): string {
  if (typeof payload === "string") return normalizeString(payload);

  if (payload && typeof payload === "object") {
    return normalizeString(payload.chatId) || normalizeString(payload.roomId);
  }

  return "";
}

function getAtFromPayload(payload: PresencePayload | null | undefined): string {
  if (payload && typeof payload === "object") {
    return normalizeString(payload.at) || nowIso();
  }

  return nowIso();
}

function getPeerUserIdsFromPayload(payload: ChatPayload | PresencePayload | null | undefined): string[] {
  if (!payload || typeof payload !== "object") return [];

  const candidates = [
    normalizeString(payload.peerUserId),
    normalizeString(payload.partnerId),
    normalizeString(payload.targetUserId),
  ].filter((item): item is string => Boolean(item));

  return candidates.filter((value, index, array) => array.indexOf(value) === index);
}

function isExplicitMessengerOnlinePayload(payload: PresencePayload | null | undefined): boolean {
  if (!payload || typeof payload !== "object") return false;

  const activeProgram = normalizeString(payload.activeProgram).toLowerCase();
  const presenceScope = normalizeString(payload.presenceScope).toLowerCase();
  const status = normalizeString(payload.status).toLowerCase();

  return (
    payload.online === true ||
    status === "online" ||
    activeProgram === "messenger" ||
    presenceScope === "messenger_screen" ||
    presenceScope === "messenger_route" ||
    presenceScope.startsWith("messenger_")
  );
}


function getHandshakeUserId(socket: Socket): string {
  const queryUserId = normalizeString(socket.handshake.query.userId);
  if (queryUserId) return queryUserId;

  const authRecord =
    socket.handshake.auth && typeof socket.handshake.auth === "object"
      ? (socket.handshake.auth as Record<string, unknown>)
      : null;

  if (authRecord) {
    const authUserId =
      normalizeString(authRecord.userId) ||
      normalizeString(authRecord.currentUserId) ||
      normalizeString(authRecord.id);

    if (authUserId) return authUserId;
  }

  return "";
}

function emitAliases(
  target: EmitterLike,
  events: string[],
  payload: Record<string, unknown>,
) {
  for (const eventName of events) {
    target.emit(eventName, payload);
  }
}

function resolvePresenceStatus(entry: Partial<PresenceSnapshotEntry> | null | undefined): PresenceStatus {
  return entry?.online ? "online" : "offline";
}

function buildPresencePayload(args: {
  userId: string;
  status: PresenceStatus;
  at?: string | null;
  updatedAt?: string | null;
  lastSeenAt?: string | null;
  chatId?: string | null;
}) {
  const updatedAt = normalizeString(args.updatedAt) || normalizeString(args.at) || nowIso();
  const status = args.status;

  return {
    ...(normalizeString(args.chatId)
      ? { chatId: normalizeString(args.chatId), roomId: normalizeString(args.chatId) }
      : {}),
    userId: args.userId,
    online: status === "online",
    status,
    presence: status,
    state: status,
    at: normalizeString(args.at) || updatedAt,
    updatedAt,
    lastSeenAt: status === "online" ? null : normalizeString(args.lastSeenAt) || updatedAt,
  };
}

function normalizeSnapshotItems(snapshot: ChatPresenceSnapshot | undefined) {
  const source = (snapshot ?? null) as
    | ({
        items?: unknown;
        entries?: unknown;
        users?: unknown;
        participants?: unknown;
        list?: unknown;
        state?: unknown;
        presence?: unknown;
      } & Record<string, unknown>)
    | null;

  if (!source) return [] as PresenceSnapshotEntry[];

  const candidates = [
    source.items,
    source.entries,
    source.users,
    source.participants,
    source.list,
    source.state,
    source.presence,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter(Boolean) as PresenceSnapshotEntry[];
    }
  }

  if (Array.isArray(source)) {
    return source.filter(Boolean) as PresenceSnapshotEntry[];
  }

  if (source && typeof source === "object") {
    const entries = Object.entries(source)
      .map(([userId, value]) => {
        if (!value || typeof value !== "object") return null;

        const record = value as Record<string, unknown>;
        return {
          userId: normalizeString(record.userId) || normalizeString(userId),
          online: Boolean(record.online),
          updatedAt: normalizeString(record.updatedAt) || nowIso(),
          lastSeenAt: normalizeString(record.lastSeenAt) || null,
          socketIds: Array.isArray(record.socketIds)
            ? record.socketIds.filter((item): item is string => typeof item === "string")
            : [],
        } satisfies PresenceSnapshotEntry;
      })
      .filter((item): item is PresenceSnapshotEntry => Boolean(item?.userId));

    if (entries.length) {
      return entries;
    }
  }

  return [] as PresenceSnapshotEntry[];
}

function buildSnapshotPayload(chatId: string, snapshot?: ChatPresenceSnapshot) {
  const state = snapshot ?? null;
  const rawItems = normalizeSnapshotItems(snapshot);

  const items = rawItems
    .map((entry) => {
      const userId = normalizeString(entry.userId);
      if (!userId) return null;

      const status = resolvePresenceStatus(entry);
      return buildPresencePayload({
        chatId,
        userId,
        status,
        at: normalizeString(entry.updatedAt),
        updatedAt: normalizeString(entry.updatedAt),
        lastSeenAt: normalizeString(entry.lastSeenAt),
      });
    })
    .filter(Boolean);

  return {
    chatId,
    roomId: chatId,
    items,
    users: items,
    participants: items,
    list: items,
    state,
    presence: items,
  };
}

export class PresenceGateway {
  private staleSocketSweepTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly io: Server,
    private readonly presence: PresenceService,
  ) {
    this.startStaleSocketSweep();
  }

  private startStaleSocketSweep() {
    if (this.staleSocketSweepTimer) return;

    this.staleSocketSweepTimer = setInterval(() => {
      this.sweepStaleSockets();
    }, SABI_PRESENCE_STALE_SOCKET_SWEEP_MS);

    const maybeTimer = this.staleSocketSweepTimer as unknown as { unref?: () => void };
    if (typeof maybeTimer.unref === "function") {
      maybeTimer.unref();
    }
  }

  private sweepStaleSockets() {
    const at = nowIso();
    const transitions = this.presence.sweepStaleSockets(
      SABI_PRESENCE_STALE_SOCKET_MAX_AGE_MS,
      at,
    );

    for (const transition of transitions) {
      const entry = transition.entry;
      this.emitGlobalOffline(entry.userId, at, entry.lastSeenAt ?? at);

      for (const chatId of transition.chatIds) {
        this.emitChatOffline(chatId, entry);
        this.emitChatSnapshotToRoom(chatId);
      }
    }
  }

  private emitGlobalOnline(userId: string, at: string) {
    const payload = buildPresencePayload({
      userId,
      status: "online",
      at,
      updatedAt: at,
      lastSeenAt: null,
    });

    emitAliases(this.io as unknown as EmitterLike, [
      "user.online",
      "presence:online",
      "presence.online",
      "user_online",
    ], payload);
  }

  private emitGlobalOffline(userId: string, at: string, lastSeenAt: string | null) {
    const payload = buildPresencePayload({
      userId,
      status: "offline",
      at,
      updatedAt: at,
      lastSeenAt,
    });

    emitAliases(this.io as unknown as EmitterLike, [
      "user.offline",
      "presence:offline",
      "presence.offline",
      "user_offline",
    ], payload);
  }

  private emitChatOnline(chatId: string, entry: PresenceSnapshotEntry) {
    const payload = buildPresencePayload({
      chatId,
      userId: entry.userId,
      status: "online",
      at: entry.updatedAt,
      updatedAt: entry.updatedAt,
      lastSeenAt: entry.lastSeenAt ?? null,
    });

    emitAliases(this.io.to(chatId) as unknown as EmitterLike, [
      "chat:presence:online",
      "chat_presence_online",
      "presence.online",
      "presence:online",
      "participant.online",
      "participant.presence",
      "user_online",
    ], payload);
  }

  private emitChatOffline(chatId: string, entry: PresenceSnapshotEntry) {
    const payload = buildPresencePayload({
      chatId,
      userId: entry.userId,
      status: "offline",
      at: entry.updatedAt,
      updatedAt: entry.updatedAt,
      lastSeenAt: entry.lastSeenAt ?? entry.updatedAt ?? null,
    });

    emitAliases(this.io.to(chatId) as unknown as EmitterLike, [
      "chat:presence:offline",
      "chat_presence_offline",
      "presence.offline",
      "presence:offline",
      "participant.offline",
      "participant.presence",
      "user_offline",
    ], payload);
  }

  private emitChatSnapshot(socket: Socket, chatId: string, state?: ChatPresenceSnapshot) {
    const snapshot = state ?? this.presence.getChatPresenceSnapshot(chatId);
    const payload = buildSnapshotPayload(chatId, snapshot);

    emitAliases(socket as unknown as EmitterLike, [
      "presence:snapshot",
      "presence.snapshot",
      "presence:state",
      "presence:state:response",
      "presence.snapshot.response",
      "presence_state",
      "chat:presence:snapshot",
      "chat_presence_snapshot",
    ], payload);
  }

  private emitChatSnapshotToRoom(chatId: string, state?: ChatPresenceSnapshot) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const snapshot = state ?? this.presence.getChatPresenceSnapshot(safeChatId);
    const payload = buildSnapshotPayload(safeChatId, snapshot);

    emitAliases(this.io.to(safeChatId) as unknown as EmitterLike, [
      "presence:snapshot",
      "presence.snapshot",
      "presence:state",
      "presence:state:response",
      "presence.snapshot.response",
      "presence_state",
      "chat:presence:snapshot",
      "chat_presence_snapshot",
    ], payload);
  }

  private markOnline(
    socket: Socket,
    userId: string,
    at: string,
    explicitChatId?: string | null,
    peerUserIds: string[] = [],
  ) {
    const safeUserId = normalizeString(userId);
    const safeAt = normalizeString(at) || nowIso();
    const safeChatId = normalizeString(explicitChatId);

    if (!safeUserId) return;

    const entry = this.presence.userOnline(safeUserId, socket.id, safeAt);
    if (!entry) return;

    this.emitGlobalOnline(safeUserId, safeAt);

    const chatIds = new Set<string>([
      ...this.presence.getUserChatIds(safeUserId),
      ...(safeChatId ? [safeChatId] : []),
    ]);

    for (const chatId of chatIds) {
      socket.join(chatId);
      this.presence.joinChat(safeUserId, chatId);

      for (const peerUserId of peerUserIds) {
        if (peerUserId && peerUserId !== safeUserId) {
          this.presence.rememberChatUser(chatId, peerUserId);
        }
      }

      this.emitChatOnline(chatId, entry);
      this.emitChatSnapshot(socket, chatId);
      this.emitChatSnapshotToRoom(chatId);
    }
  }

  private markOffline(socket: Socket, userId?: string | null, at?: string | null) {
    const safeAt = normalizeString(at) || nowIso();
    const resolvedUserId =
      normalizeString(userId) || normalizeString(this.presence.getUserIdBySocket(socket.id));

    if (!resolvedUserId) return;

    const relatedChatIds = this.presence.getUserChatIds(resolvedUserId);
    const entry = this.presence.userOffline(resolvedUserId, socket.id, safeAt);

    if (!entry) return;

    if (!entry.online) {
      this.emitGlobalOffline(resolvedUserId, safeAt, entry.lastSeenAt ?? safeAt);

      for (const chatId of relatedChatIds) {
        this.emitChatOffline(chatId, entry);
        this.emitChatSnapshotToRoom(chatId);
      }
    }
  }

  private handleJoinChat(socket: Socket, payload: ChatPayload | PresencePayload) {
    const chatId = getChatIdFromPayload(payload);
    if (!chatId) return;

    socket.join(chatId);

    const userId =
      normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
      getUserIdFromPayload(payload);

    if (userId) {
      this.presence.joinChat(userId, chatId);

      for (const peerUserId of getPeerUserIdsFromPayload(payload)) {
        if (peerUserId && peerUserId !== userId) {
          this.presence.rememberChatUser(chatId, peerUserId);
        }
      }

      const entry = this.presence.getPresenceEntry(userId);
      if (entry?.online) {
        this.emitChatOnline(chatId, entry);
      } else if (entry) {
        this.emitChatOffline(chatId, entry);
        this.emitChatSnapshotToRoom(chatId);
      }
    }

    this.emitChatSnapshot(socket, chatId);
    this.emitChatSnapshotToRoom(chatId);
  }

  private handleLeaveChat(socket: Socket, payload: ChatPayload | PresencePayload) {
    const chatId = getChatIdFromPayload(payload);
    if (!chatId) return;

    socket.leave(chatId);

    const userId =
      normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
      getUserIdFromPayload(payload);

    if (userId) {
      this.presence.leaveChat(userId, chatId);
      this.emitChatSnapshot(socket, chatId);
    }
  }

  private handleHeartbeat(socket: Socket, payload?: PresencePayload | null) {
    const userId =
      getUserIdFromPayload(payload) ||
      normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
      getHandshakeUserId(socket);

    if (!userId) return;

    const at = getAtFromPayload(payload);
    const entry = this.presence.recordHeartbeat(userId, socket.id, at);

    const chatId = getChatIdFromPayload(payload);
    if (chatId) {
      socket.join(chatId);
      this.presence.rememberChatUser(chatId, userId);

      for (const peerUserId of getPeerUserIdsFromPayload(payload)) {
        if (peerUserId && peerUserId !== userId) {
          this.presence.rememberChatUser(chatId, peerUserId);
        }
      }

      if (entry?.online) {
        this.emitChatOnline(chatId, entry);
      }

      this.emitChatSnapshot(socket, chatId);
      this.emitChatSnapshotToRoom(chatId);
    }
  }

  private handleSnapshotRequest(socket: Socket, payload?: ChatPayload | PresencePayload | null) {
    const chatId = getChatIdFromPayload(payload);
    if (!chatId) return;
    this.emitChatSnapshot(socket, chatId);
  }

  handleConnection(socket: Socket) {
    const handshakeUserId = getHandshakeUserId(socket);

    const onlineHandler = (payload: PresencePayload) => {
      const userId =
        getUserIdFromPayload(payload) ||
        normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
        handshakeUserId;

      if (!userId) return;

      this.markOnline(
        socket,
        userId,
        getAtFromPayload(payload),
        getChatIdFromPayload(payload),
        getPeerUserIdsFromPayload(payload),
      );
    };

    const offlineHandler = (payload: PresencePayload) => {
      const userId =
        getUserIdFromPayload(payload) ||
        normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
        handshakeUserId;

      this.markOffline(socket, userId, getAtFromPayload(payload));
    };

    socket.on("presence:online", onlineHandler);
    socket.on("presence.online", onlineHandler);
    socket.on("user_online", onlineHandler);

    socket.on("presence:offline", offlineHandler);
    socket.on("presence.offline", offlineHandler);
    socket.on("user_offline", offlineHandler);

    socket.on("presence:heartbeat", (payload: PresencePayload) => {
      this.handleHeartbeat(socket, payload);
    });
    socket.on("presence.heartbeat", (payload: PresencePayload) => {
      this.handleHeartbeat(socket, payload);
    });
    socket.on("messenger:presence:heartbeat", (payload: PresencePayload) => {
      this.handleHeartbeat(socket, payload);
    });
    socket.on("user_heartbeat", (payload: PresencePayload) => {
      this.handleHeartbeat(socket, payload);
    });

    socket.on("messenger:session:join", (payload: PresencePayload) => {
      const userId =
        getUserIdFromPayload(payload) ||
        normalizeString(this.presence.getUserIdBySocket(socket.id)) ||
        handshakeUserId;

      if (!userId) return;

      if (isExplicitMessengerOnlinePayload(payload)) {
        this.markOnline(
          socket,
          userId,
          getAtFromPayload(payload),
          getChatIdFromPayload(payload),
          getPeerUserIdsFromPayload(payload),
        );
        return;
      }

      const chatId = getChatIdFromPayload(payload);
      if (chatId) {
        this.presence.rememberChatUser(chatId, userId);
        this.emitChatSnapshot(socket, chatId);
      }
    });

    socket.on("chat:join", (payload: ChatPayload | PresencePayload) => {
      this.handleJoinChat(socket, payload);
    });
    socket.on("chat.join", (payload: ChatPayload | PresencePayload) => {
      this.handleJoinChat(socket, payload);
    });
    socket.on("join_chat", (payload: ChatPayload | PresencePayload) => {
      this.handleJoinChat(socket, payload);
    });
    socket.on("room.join", (payload: ChatPayload | PresencePayload) => {
      this.handleJoinChat(socket, payload);
    });
    socket.on("room:join", (payload: ChatPayload | PresencePayload) => {
      this.handleJoinChat(socket, payload);
    });


    socket.on("chat:leave", (payload: ChatPayload | PresencePayload) => {
      this.handleLeaveChat(socket, payload);
    });
    socket.on("chat.leave", (payload: ChatPayload | PresencePayload) => {
      this.handleLeaveChat(socket, payload);
    });
    socket.on("leave_chat", (payload: ChatPayload | PresencePayload) => {
      this.handleLeaveChat(socket, payload);
    });
    socket.on("room.leave", (payload: ChatPayload | PresencePayload) => {
      this.handleLeaveChat(socket, payload);
    });
    socket.on("room:leave", (payload: ChatPayload | PresencePayload) => {
      this.handleLeaveChat(socket, payload);
    });


    socket.on("presence:snapshot:request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });
    socket.on("presence.snapshot.request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });
    socket.on("presence:state:request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });
    socket.on("chat:presence:snapshot:request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });
    socket.on("presence_snapshot_request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });
    socket.on("presence:request", (payload: ChatPayload | PresencePayload) => {
      this.handleSnapshotRequest(socket, payload);
    });

    socket.on("disconnect", () => {
      this.markOffline(socket, handshakeUserId, nowIso());
    });
  }
}
