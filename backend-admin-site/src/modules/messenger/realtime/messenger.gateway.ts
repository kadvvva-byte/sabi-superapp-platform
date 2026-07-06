import { Server, Socket } from "socket.io";
import { PresenceGateway } from "./presence.gateway";
import { PresenceService } from "./presence.service";
import { LiveLocationGateway } from "./live-location.gateway";
import { RealtimeChannels } from "../../../core/realtime/realtime.channels";

type ChatJoinPayload =
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
type TypingPayload =
  | string
  | {
      chatId?: string | null;
      roomId?: string | null;
      userId?: string | null;
    };

type DeliveryPayload = {
  chatId?: string | null;
  roomId?: string | null;
  messageId?: string | null;
  userId?: string | null;
  deliveredAt?: string | null;
  readAt?: string | null;
};

type MessageSendPayload = {
  chatId?: string | null;
  roomId?: string | null;
  userId?: string | null;
  clientId?: string | null;
  message?: unknown;
  payload?: unknown;
};

type SessionJoinPayload =
  | string
  | {
      userId?: string | null;
      currentUserId?: string | null;
      id?: string | null;
      actorUserId?: string | null;
    };

type EmitterLike = {
  emit(eventName: string, payload: Record<string, unknown>): unknown;
};

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getHandshakeUserId(socket: Socket): string {
  const queryUserId = normalizeString(socket.handshake.query.userId);
  if (queryUserId) return queryUserId;

  const authRecord =
    socket.handshake.auth && typeof socket.handshake.auth === "object"
      ? (socket.handshake.auth as Record<string, unknown>)
      : null;

  if (!authRecord) return "";

  return (
    normalizeString(authRecord.userId) ||
    normalizeString(authRecord.currentUserId) ||
    normalizeString(authRecord.id)
  );
}

function getChatId(
  payload: ChatJoinPayload | TypingPayload | DeliveryPayload | MessageSendPayload | null | undefined,
): string {
  if (typeof payload === "string") return normalizeString(payload);

  if (payload && typeof payload === "object") {
    const record = payload as { chatId?: unknown; roomId?: unknown };
    return normalizeString(record.chatId) || normalizeString(record.roomId);
  }

  return "";
}

function getUserId(
  socket: Socket,
  payload?: { userId?: string | null } | null,
  fallbackUserId?: string | null,
): string {
  return (
    normalizeString(payload?.userId) ||
    normalizeString(fallbackUserId) ||
    getHandshakeUserId(socket)
  );
}


function getSessionJoinUserId(
  socket: Socket,
  payload: SessionJoinPayload | null | undefined,
  fallbackUserId?: string | null,
): string {
  if (typeof payload === "string") {
    return normalizeString(payload) || normalizeString(fallbackUserId) || getHandshakeUserId(socket);
  }

  const record = payload && typeof payload === "object" ? payload : null;
  return (
    normalizeString(record?.userId) ||
    normalizeString(record?.currentUserId) ||
    normalizeString(record?.id) ||
    normalizeString(record?.actorUserId) ||
    normalizeString(fallbackUserId) ||
    getHandshakeUserId(socket)
  );
}

function uniqueStrings(values: string[]): string[] {
  return values.filter((value, index, array) => Boolean(value) && array.indexOf(value) === index);
}

function getPeerUserIds(payload: ChatJoinPayload | null | undefined): string[] {
  if (!payload || typeof payload !== "object") return [];

  const candidates = [
    normalizeString(payload.peerUserId),
    normalizeString(payload.partnerId),
    normalizeString(payload.targetUserId),
  ].filter((item): item is string => Boolean(item));

  return candidates.filter((value, index, array) => array.indexOf(value) === index);
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

function normalizeMessageForWire(
  raw: unknown,
  fallback: { chatId: string; userId: string; clientId?: string | null },
) {
  const source =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  return {
    ...source,
    chatId: normalizeString(source.chatId) || normalizeString(source.roomId) || fallback.chatId,
    roomId: normalizeString(source.roomId) || normalizeString(source.chatId) || fallback.chatId,
    userId: normalizeString(source.userId) || fallback.userId,
    clientId:
      normalizeString(source.clientId) ||
      normalizeString(fallback.clientId) ||
      undefined,
    createdAt: normalizeString(source.createdAt) || nowIso(),
    updatedAt: normalizeString(source.updatedAt) || nowIso(),
  };
}

export class MessengerGateway {
  private readonly presenceService: PresenceService;
  private readonly presenceGateway: PresenceGateway;
  private readonly liveLocationGateway: LiveLocationGateway;

  private registered = false;
  private readonly handleIoConnection = (socket: Socket) => {
    this.handleConnection(socket);
  };

  constructor(
    private readonly io: Server,
    deps?: {
      presenceService?: PresenceService;
      presenceGateway?: PresenceGateway;
      liveLocationGateway?: LiveLocationGateway;
    },
  ) {
    this.presenceService = deps?.presenceService ?? new PresenceService();
    this.presenceGateway =
      deps?.presenceGateway ?? new PresenceGateway(this.io, this.presenceService);
    this.liveLocationGateway =
      deps?.liveLocationGateway ?? new LiveLocationGateway();
  }

  register() {
    if (this.registered) return;
    this.registered = true;

    this.liveLocationGateway.register(this.io);

    this.io.on("connection", this.handleIoConnection);
  }

  unregister() {
    if (!this.registered) return;
    this.registered = false;

    this.io.off("connection", this.handleIoConnection);

    const liveLocationGateway = this.liveLocationGateway as {
      unregister?: (io?: Server) => void;
    };

    liveLocationGateway.unregister?.(this.io);
  }


  private joinUserRealtimeRooms(socket: Socket, userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const rooms = uniqueStrings([
      RealtimeChannels.user(safeUserId),
      RealtimeChannels.authUser(safeUserId),
      RealtimeChannels.userProfile(safeUserId),
      RealtimeChannels.notificationUser(safeUserId),
      RealtimeChannels.walletUser(safeUserId),
    ]);

    rooms.forEach((roomName) => socket.join(roomName));

    emitAliases(socket as unknown as EmitterLike, [
      "messenger:session:joined",
      "session:joined",
      "user:joined",
    ], {
      userId: safeUserId,
      rooms,
      at: nowIso(),
    });
  }

  private emitPresenceSnapshot(socket: Socket, chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const state = this.presenceService.getChatPresenceSnapshot(safeChatId);
    const items = Object.entries(state).map(([userId, value]) => ({
      userId,
      online: Boolean(value.online),
      status: value.online ? "online" : "offline",
      presence: value.online ? "online" : "offline",
      updatedAt: value.updatedAt,
      lastSeenAt: value.lastSeenAt,
      socketIds: value.socketIds,
    }));

    const payload = {
      chatId: safeChatId,
      roomId: safeChatId,
      state,
      presence: items,
      items,
      users: items,
      participants: items,
    };

    emitAliases(socket as unknown as EmitterLike, [
      "presence.snapshot",
      "presence:state",
      "presence_state",
      "chat:presence:snapshot",
    ], payload);
  }

  private relayTypingStart(socket: Socket, chatId: string, userId: string) {
    const payload = { chatId, userId };

    emitAliases(
      socket.to(chatId) as unknown as EmitterLike,
      [
        "typing:start",
        "typing_start",
        "typing",
        "chat:typing:start",
        "user_typing",
      ],
      payload,
    );
  }

  private relayTypingStop(socket: Socket, chatId: string, userId: string) {
    const payload = { chatId, userId };

    emitAliases(
      socket.to(chatId) as unknown as EmitterLike,
      [
        "typing:stop",
        "typing_stop",
        "stop_typing",
        "chat:typing:stop",
        "user_stop_typing",
      ],
      payload,
    );
  }

  private relayIncomingMessage(socket: Socket, payload: MessageSendPayload, fallbackUserId: string) {
    const chatId = getChatId(payload);
    const userId = getUserId(socket, payload, fallbackUserId);

    if (!chatId || !userId) return;

    this.presenceService.rememberChatUser(chatId, userId);

    const message = normalizeMessageForWire(payload.message ?? payload.payload ?? payload, {
      chatId,
      userId,
      clientId: payload.clientId ?? null,
    });

    emitAliases(
      socket.to(chatId) as unknown as EmitterLike,
      [
        "message:new",
        "new_message",
        "chat:message",
        "chat:message:new",
      ],
      message,
    );
  }

  private relayDelivered(socket: Socket, payload: DeliveryPayload, fallbackUserId: string) {
    const chatId = getChatId(payload);
    const messageId = normalizeString(payload.messageId);
    const userId = getUserId(socket, payload, fallbackUserId);

    if (!chatId || !messageId) return;

    const outgoing = {
      chatId,
      roomId: chatId,
      messageId,
      userId: userId || undefined,
      deliveredAt: normalizeString(payload.deliveredAt) || nowIso(),
    };

    emitAliases(
      socket.to(chatId) as unknown as EmitterLike,
      [
        "message:delivered",
        "message_delivered",
        "chat:message:delivered",
      ],
      outgoing,
    );
  }

  private relayRead(socket: Socket, payload: DeliveryPayload, fallbackUserId: string) {
    const chatId = getChatId(payload);
    const messageId = normalizeString(payload.messageId);
    const userId = getUserId(socket, payload, fallbackUserId);

    if (!chatId || !messageId) return;

    const outgoing = {
      chatId,
      roomId: chatId,
      messageId,
      userId: userId || undefined,
      readAt: normalizeString(payload.readAt) || nowIso(),
    };

    emitAliases(
      socket.to(chatId) as unknown as EmitterLike,
      [
        "message:read",
        "message_read",
        "chat:message:read",
      ],
      outgoing,
    );
  }

  private handleJoinChat(socket: Socket, payload: ChatJoinPayload, fallbackUserId: string) {
    const chatId = getChatId(payload);
    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
      fallbackUserId,
    );

    if (!chatId) return;

    socket.join(chatId);

    if (userId) {
      this.presenceService.joinChat(userId, chatId);

      for (const peerUserId of getPeerUserIds(payload)) {
        if (peerUserId && peerUserId !== userId) {
          this.presenceService.rememberChatUser(chatId, peerUserId);
        }
      }
    }

    this.emitPresenceSnapshot(socket, chatId);
  }

  private handleLeaveChat(socket: Socket, payload: ChatJoinPayload, fallbackUserId: string) {
    const chatId = getChatId(payload);
    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
      fallbackUserId,
    );

    if (!chatId) return;

    socket.leave(chatId);

    if (userId) {
      this.presenceService.leaveChat(userId, chatId);
    }
  }

  private handleConnection(socket: Socket) {
    const handshakeUserId = getHandshakeUserId(socket);

    this.presenceGateway.handleConnection(socket);

    if (handshakeUserId) {
      this.joinUserRealtimeRooms(socket, handshakeUserId);
    }

    const handleSessionJoin = (payload: SessionJoinPayload) => {
      const userId = getSessionJoinUserId(socket, payload, handshakeUserId);
      if (userId) this.joinUserRealtimeRooms(socket, userId);
    };

    socket.on("messenger:session:join", handleSessionJoin);
    socket.on("session:join", handleSessionJoin);
    socket.on("user:join", handleSessionJoin);

    socket.on("chat:join", (payload: ChatJoinPayload) => {
      this.handleJoinChat(socket, payload, handshakeUserId);
    });

    socket.on("join_chat", (payload: ChatJoinPayload) => {
      this.handleJoinChat(socket, payload, handshakeUserId);
    });

    socket.on("chat.join", (payload: ChatJoinPayload) => {
      this.handleJoinChat(socket, payload, handshakeUserId);
    });

    socket.on("room.join", (payload: ChatJoinPayload) => {
      this.handleJoinChat(socket, payload, handshakeUserId);
    });

    socket.on("room:join", (payload: ChatJoinPayload) => {
      this.handleJoinChat(socket, payload, handshakeUserId);
    });


    socket.on("chat:leave", (payload: ChatJoinPayload) => {
      this.handleLeaveChat(socket, payload, handshakeUserId);
    });

    socket.on("leave_chat", (payload: ChatJoinPayload) => {
      this.handleLeaveChat(socket, payload, handshakeUserId);
    });

    socket.on("chat.leave", (payload: ChatJoinPayload) => {
      this.handleLeaveChat(socket, payload, handshakeUserId);
    });

    socket.on("room.leave", (payload: ChatJoinPayload) => {
      this.handleLeaveChat(socket, payload, handshakeUserId);
    });

    socket.on("room:leave", (payload: ChatJoinPayload) => {
      this.handleLeaveChat(socket, payload, handshakeUserId);
    });


    socket.on("typing:start", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStart(socket, chatId, userId);
    });

    socket.on("typing_start", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStart(socket, chatId, userId);
    });

    socket.on("typing", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStart(socket, chatId, userId);
    });

    socket.on("participant.typing.start", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStart(socket, chatId, userId);
    });

    socket.on("typing:stop", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStop(socket, chatId, userId);
    });

    socket.on("typing_stop", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStop(socket, chatId, userId);
    });

    socket.on("stop_typing", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStop(socket, chatId, userId);
    });

    socket.on("participant.typing.stop", (payload: TypingPayload) => {
      const chatId = getChatId(payload);
      const userId = getUserId(
        socket,
        typeof payload === "object" ? payload : null,
        handshakeUserId,
      );

      if (!chatId || !userId) return;
      this.relayTypingStop(socket, chatId, userId);
    });

    socket.on("message:send", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("message.send", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("message_send", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("chat:message:send", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("message:new", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("chat:message:new", (payload: MessageSendPayload) => {
      this.relayIncomingMessage(socket, payload, handshakeUserId);
    });

    socket.on("message:delivered", (payload: DeliveryPayload) => {
      this.relayDelivered(socket, payload, handshakeUserId);
    });

    socket.on("message.delivered", (payload: DeliveryPayload) => {
      this.relayDelivered(socket, payload, handshakeUserId);
    });

    socket.on("message_delivered", (payload: DeliveryPayload) => {
      this.relayDelivered(socket, payload, handshakeUserId);
    });

    socket.on("message:read", (payload: DeliveryPayload) => {
      this.relayRead(socket, payload, handshakeUserId);
    });

    socket.on("message.read", (payload: DeliveryPayload) => {
      this.relayRead(socket, payload, handshakeUserId);
    });

    socket.on("message_read", (payload: DeliveryPayload) => {
      this.relayRead(socket, payload, handshakeUserId);
    });
  }

  getPresenceService() {
    return this.presenceService;
  }
}
