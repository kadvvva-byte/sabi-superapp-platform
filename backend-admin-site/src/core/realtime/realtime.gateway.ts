import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { PresenceService } from "./presence.service";
import { RealtimeChannels, RealtimeEvents } from "./realtime.channels";
import { TypingService } from "./typing.service";

type ChatPayload =
  | string
  | {
      chatId?: string | null;
      roomId?: string | null;
      conversationId?: string | null;
      id?: string | null;
      userId?: string | null;
      peerUserId?: string | null;
      peerId?: string | null;
      targetUserId?: string | null;
      at?: string | null;
    };

type TypingPayload =
  | string
  | {
      chatId?: string | null;
      roomId?: string | null;
      conversationId?: string | null;
      userId?: string | null;
      typing?: boolean | null;
      at?: string | null;
    };

type DeliveryPayload = {
  chatId?: string | null;
  roomId?: string | null;
  conversationId?: string | null;
  messageId?: string | null;
  userId?: string | null;
  deliveredAt?: string | null;
  readAt?: string | null;
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

function getChatId(payload: ChatPayload | TypingPayload | DeliveryPayload | null | undefined) {
  if (typeof payload === "string") return normalizeString(payload);

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    return (
      normalizeString(record.chatId) ||
      normalizeString(record.roomId) ||
      normalizeString(record.conversationId) ||
      normalizeString(record.id)
    );
  }

  return "";
}

function getPeerUserId(payload: ChatPayload | null | undefined) {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as Record<string, unknown>;
  return (
    normalizeString(record.peerUserId) ||
    normalizeString(record.peerId) ||
    normalizeString(record.targetUserId)
  );
}

function getUserId(
  socket: Socket,
  payload?: { userId?: string | null } | null,
  fallbackUserId?: string | null,
) {
  return (
    normalizeString(payload?.userId) ||
    normalizeString(fallbackUserId) ||
    normalizeString(PresenceService.getUserIdBySocket(socket.id)) ||
    getHandshakeUserId(socket)
  );
}

type EmitterLike = {
  emit(eventName: string, payload: Record<string, unknown>): unknown;
};

function emitAliases(
  target: EmitterLike,
  events: string[],
  payload: Record<string, unknown>,
) {
  for (const eventName of events) {
    target.emit(eventName, payload);
  }
}

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly typingService = new TypingService();

  private joinCoreRooms(socket: Socket, userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    socket.join(RealtimeChannels.user(safeUserId));
    socket.join(RealtimeChannels.authUser(safeUserId));
    socket.join(RealtimeChannels.userProfile(safeUserId));
    socket.join(RealtimeChannels.notificationUser(safeUserId));
    socket.join(RealtimeChannels.walletUser(safeUserId));
  }

  private emitPresenceSnapshot(socket: Socket, chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const snapshot = PresenceService.getChatPresenceSnapshot(safeChatId);
    const payload = {
      chatId: safeChatId,
      roomId: safeChatId,
      state: snapshot,
      presence: snapshot,
    };

    emitAliases(socket as unknown as EmitterLike, [
      RealtimeEvents.presenceSnapshot,
      RealtimeEvents.presenceState,
      "presence_state",
      "chat:presence:snapshot",
    ], payload);
  }

  private emitGlobalPresenceOnline(userId: string, at: string) {
    const payload = { userId, status: "online", online: true, at, lastSeenAt: null };

    emitAliases(this.server as unknown as EmitterLike, [
      RealtimeEvents.presenceOnline,
      "user.online",
      "user_online",
    ], payload);
  }

  private emitGlobalPresenceOffline(userId: string, at: string, lastSeenAt: string | null) {
    const payload = { userId, status: "offline", online: false, at, lastSeenAt };

    emitAliases(this.server as unknown as EmitterLike, [
      RealtimeEvents.presenceOffline,
      "user.offline",
      "user_offline",
    ], payload);
  }

  private emitChatPresenceOnline(chatId: string, userId: string, at: string) {
    const payload = {
      chatId,
      roomId: chatId,
      userId,
      status: "online",
      online: true,
      at,
      lastSeenAt: null,
    };

    emitAliases(this.server.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      "chat:presence:online",
      "chat_presence_online",
      "presence.online",
      RealtimeEvents.presenceOnline,
      "user_online",
    ], payload);
  }

  private emitChatPresenceOffline(chatId: string, userId: string, at: string, lastSeenAt: string | null) {
    const payload = {
      chatId,
      roomId: chatId,
      userId,
      status: "offline",
      online: false,
      at,
      lastSeenAt,
    };

    emitAliases(this.server.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      "chat:presence:offline",
      "chat_presence_offline",
      "presence.offline",
      RealtimeEvents.presenceOffline,
      "user_offline",
    ], payload);
  }

  private markOnline(socket: Socket, userId: string, at?: string | null, explicitChatId?: string | null) {
    const safeUserId = normalizeString(userId);
    const safeAt = normalizeString(at) || nowIso();
    const safeChatId = normalizeString(explicitChatId);

    if (!safeUserId) return;

    const entry = PresenceService.userOnline(safeUserId, socket.id, safeAt);
    if (!entry) return;

    this.joinCoreRooms(socket, safeUserId);
    this.emitGlobalPresenceOnline(safeUserId, safeAt);

    const chatIds = new Set<string>([
      ...PresenceService.getUserChatIds(safeUserId),
      ...(safeChatId ? [safeChatId] : []),
    ]);

    for (const chatId of chatIds) {
      socket.join(RealtimeChannels.chat(chatId));
      PresenceService.joinChat(safeUserId, chatId);
      this.emitChatPresenceOnline(chatId, safeUserId, safeAt);
      this.emitPresenceSnapshot(socket, chatId);
    }
  }

  private markOffline(socket: Socket, userId?: string | null, at?: string | null) {
    const safeUserId =
      normalizeString(userId) ||
      normalizeString(PresenceService.getUserIdBySocket(socket.id)) ||
      getHandshakeUserId(socket);

    if (!safeUserId) return;

    const chatIds = PresenceService.getUserChatIds(safeUserId);
    const entry = PresenceService.userOffline(safeUserId, socket.id, normalizeString(at) || nowIso());

    this.typingService.stopTypingForUser(safeUserId);

    if (!entry || entry.online) return;

    this.emitGlobalPresenceOffline(safeUserId, entry.updatedAt, entry.lastSeenAt);

    for (const chatId of chatIds) {
      this.emitChatPresenceOffline(chatId, safeUserId, entry.updatedAt, entry.lastSeenAt);
    }
  }

  handleConnection(socket: Socket) {
    const handshakeUserId = getHandshakeUserId(socket);
    if (handshakeUserId) {
      this.markOnline(socket, handshakeUserId, nowIso());
    }
  }

  handleDisconnect(socket: Socket) {
    this.markOffline(socket, undefined, nowIso());
  }

  @SubscribeMessage("presence:online")
  handlePresenceOnline(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    const payloadRecord = typeof payload === "object" ? payload : null;
    const userId = getUserId(socket, payloadRecord);
    if (!userId) return;

    this.markOnline(
      socket,
      userId,
      typeof payload === "object" ? normalizeString(payload.at) || nowIso() : nowIso(),
      getChatId(payload),
    );
  }

  @SubscribeMessage("user_online")
  handlePresenceOnlineAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceOnline(socket, payload);
  }

  @SubscribeMessage("presence:offline")
  handlePresenceOffline(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { userId?: string | null; at?: string | null },
  ) {
    const userId = getUserId(socket, payload);
    if (!userId) return;

    this.markOffline(socket, userId, normalizeString(payload?.at) || nowIso());
  }

  @SubscribeMessage("user_offline")
  handlePresenceOfflineAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { userId?: string | null; at?: string | null },
  ) {
    this.handlePresenceOffline(socket, payload);
  }

  @SubscribeMessage("chat:join")
  handleJoinChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    const chatId = getChatId(payload);
    if (!chatId) return;

    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
    );

    socket.join(RealtimeChannels.chat(chatId));

    if (userId) {
      PresenceService.joinChat(userId, chatId);
      this.emitChatPresenceOnline(
        chatId,
        userId,
        typeof payload === "object" ? normalizeString(payload.at) || nowIso() : nowIso(),
      );
    }

    const peerUserId = getPeerUserId(typeof payload === "object" ? payload : null);
    if (peerUserId) {
      PresenceService.rememberChatUser(chatId, peerUserId);
    }

    this.emitPresenceSnapshot(socket, chatId);
  }

  @SubscribeMessage("join_chat")
  handleJoinChatAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleJoinChat(socket, payload);
  }

  @SubscribeMessage("room:join")
  handleJoinRoomAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleJoinChat(socket, payload);
  }

  @SubscribeMessage("room.join")
  handleJoinRoomDotAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleJoinChat(socket, payload);
  }

  @SubscribeMessage("messenger:room:join")
  handleJoinMessengerRoomAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleJoinChat(socket, payload);
  }

  @SubscribeMessage("presence:snapshot:request")
  handlePresenceSnapshotRequest(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    const chatId = getChatId(payload);
    if (!chatId) return;

    const userId = getUserId(socket, typeof payload === "object" ? payload : null);
    if (userId) {
      PresenceService.joinChat(userId, chatId);
    }

    const peerUserId = getPeerUserId(typeof payload === "object" ? payload : null);
    if (peerUserId) {
      PresenceService.rememberChatUser(chatId, peerUserId);
    }

    this.emitPresenceSnapshot(socket, chatId);
  }

  @SubscribeMessage("presence.snapshot.request")
  handlePresenceSnapshotRequestDotAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceSnapshotRequest(socket, payload);
  }

  @SubscribeMessage("presence:state:request")
  handlePresenceStateRequestAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceSnapshotRequest(socket, payload);
  }

  @SubscribeMessage("chat:presence:snapshot:request")
  handleChatPresenceSnapshotRequestAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceSnapshotRequest(socket, payload);
  }

  @SubscribeMessage("presence_snapshot_request")
  handlePresenceSnapshotRequestSnakeAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceSnapshotRequest(socket, payload);
  }

  @SubscribeMessage("presence:request")
  handlePresenceRequestAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handlePresenceSnapshotRequest(socket, payload);
  }

  @SubscribeMessage("chat:leave")
  handleLeaveChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    const chatId = getChatId(payload);
    if (!chatId) return;

    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
    );

    socket.leave(RealtimeChannels.chat(chatId));

    if (userId) {
      PresenceService.leaveChat(userId, chatId);
      this.typingService.stopTyping(chatId, userId);
    }
  }

  @SubscribeMessage("leave_chat")
  handleLeaveChatAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleLeaveChat(socket, payload);
  }

  @SubscribeMessage("room:leave")
  handleLeaveRoomAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleLeaveChat(socket, payload);
  }

  @SubscribeMessage("room.leave")
  handleLeaveRoomDotAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleLeaveChat(socket, payload);
  }

  @SubscribeMessage("messenger:room:leave")
  handleLeaveMessengerRoomAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ChatPayload,
  ) {
    this.handleLeaveChat(socket, payload);
  }

  @SubscribeMessage("typing.start")
  handleTypingStart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    const chatId = getChatId(payload);
    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
    );

    if (!chatId || !userId) return;

    this.typingService.startTyping(chatId, userId, typeof payload === "object" ? payload.at : undefined);

    const outgoing = {
      chatId,
      roomId: chatId,
      userId,
      typing: true,
      at: typeof payload === "object" ? normalizeString(payload.at) || nowIso() : nowIso(),
      state: this.typingService.getTypingState(chatId),
    };

    emitAliases(socket.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      RealtimeEvents.typingStart,
      "typing.start",
      "typing_start",
      "typing",
      "chat:typing:start",
      "user_typing",
    ], outgoing);
  }

  @SubscribeMessage("typing.start.alias")
  handleTypingStartAliasExplicit(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStart(socket, payload);
  }

  @SubscribeMessage("typing.start.legacy")
  handleTypingStartLegacyExplicit(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStart(socket, payload);
  }

  @SubscribeMessage("typing.start.event")
  handleTypingStartEventExplicit(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStart(socket, payload);
  }

  @SubscribeMessage("typing_start")
  handleTypingStartSnake(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStart(socket, payload);
  }

  @SubscribeMessage("typing")
  handleTypingStartLegacy(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStart(socket, payload);
  }

  @SubscribeMessage("typing.stop")
  handleTypingStop(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    const chatId = getChatId(payload);
    const userId = getUserId(
      socket,
      typeof payload === "object" ? payload : null,
    );

    if (!chatId || !userId) return;

    this.typingService.stopTyping(chatId, userId);

    const outgoing = {
      chatId,
      roomId: chatId,
      userId,
      typing: false,
      at: typeof payload === "object" ? normalizeString(payload.at) || nowIso() : nowIso(),
      state: this.typingService.getTypingState(chatId),
    };

    emitAliases(socket.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      RealtimeEvents.typingStop,
      "typing.stop",
      "typing_stop",
      "stop_typing",
      "chat:typing:stop",
      "user_stop_typing",
    ], outgoing);
  }

  @SubscribeMessage("typing_stop")
  handleTypingStopAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStop(socket, payload);
  }

  @SubscribeMessage("stop_typing")
  handleTypingStopLegacy(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    this.handleTypingStop(socket, payload);
  }

  @SubscribeMessage("message:delivered")
  handleMessageDelivered(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: DeliveryPayload,
  ) {
    const chatId = getChatId(payload);
    const messageId = normalizeString(payload?.messageId);
    const userId = getUserId(socket, payload);

    if (!chatId || !messageId) return;

    const outgoing = {
      chatId,
      roomId: chatId,
      messageId,
      userId: userId || undefined,
      deliveredAt: normalizeString(payload?.deliveredAt) || nowIso(),
    };

    emitAliases(socket.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      RealtimeEvents.messageDelivered,
      "message_delivered",
      "chat:message:delivered",
    ], outgoing);
  }

  @SubscribeMessage("message_delivered")
  handleMessageDeliveredAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: DeliveryPayload,
  ) {
    this.handleMessageDelivered(socket, payload);
  }

  @SubscribeMessage("message:read")
  handleMessageRead(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: DeliveryPayload,
  ) {
    const chatId = getChatId(payload);
    const messageId = normalizeString(payload?.messageId);
    const userId = getUserId(socket, payload);

    if (!chatId || !messageId) return;

    const outgoing = {
      chatId,
      roomId: chatId,
      messageId,
      userId: userId || undefined,
      readAt: normalizeString(payload?.readAt) || nowIso(),
    };

    emitAliases(socket.to(RealtimeChannels.chat(chatId)) as unknown as EmitterLike, [
      RealtimeEvents.messageRead,
      "message_read",
      "chat:message:read",
    ], outgoing);
  }

  @SubscribeMessage("message_read")
  handleMessageReadAlias(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: DeliveryPayload,
  ) {
    this.handleMessageRead(socket, payload);
  }
}