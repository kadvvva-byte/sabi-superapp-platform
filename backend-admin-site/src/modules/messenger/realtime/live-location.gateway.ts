import type { Server, Socket } from "socket.io";

type LiveLocationPayload = {
  chatId?: string | null;
  userId?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
  expiresAt?: string | null;
};

type EmitterLike = {
  emit(eventName: string, payload: Record<string, unknown>): unknown;
};

function nowIso() {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
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

function emitAliases(
  target: EmitterLike,
  events: string[],
  payload: Record<string, unknown>,
) {
  for (const eventName of events) {
    target.emit(eventName, payload);
  }
}

export class LiveLocationGateway {
  private io: Server | null = null;
  private readonly boundSockets = new WeakSet<Socket>();
  private readonly handleIoConnection = (socket: Socket) => {
    this.handleConnection(socket);
  };

  register(io: Server) {
    if (this.io === io) return;

    if (this.io) {
      this.unregister(this.io);
    }

    this.io = io;
    this.io.on("connection", this.handleIoConnection);
  }

  unregister(io?: Server) {
    const target = io ?? this.io;
    if (!target) return;
    target.off("connection", this.handleIoConnection);
    if (this.io === target) {
      this.io = null;
    }
  }

  private handleConnection(socket: Socket) {
    if (this.boundSockets.has(socket)) return;
    this.boundSockets.add(socket);

    const handshakeUserId = getHandshakeUserId(socket);

    const relay = (
      kind: "start" | "update" | "stop",
      payload: LiveLocationPayload,
    ) => {
      const io = this.io;
      if (!io) return;

      const chatId = normalizeString(payload.chatId);
      const userId = normalizeString(payload.userId) || handshakeUserId;
      if (!chatId || !userId) return;

      const outgoing = {
        chatId,
        userId,
        latitude: normalizeNumber(payload.latitude),
        longitude: normalizeNumber(payload.longitude),
        accuracy: normalizeNumber(payload.accuracy),
        heading: normalizeNumber(payload.heading),
        speed: normalizeNumber(payload.speed),
        expiresAt: normalizeString(payload.expiresAt) || null,
        updatedAt: nowIso(),
      };

      emitAliases(socket.to(chatId) as unknown as EmitterLike, [
        `live_location:${kind}`,
        `liveLocation:${kind}`,
        `live_location_${kind}`,
      ], outgoing);
    };

    socket.on("live_location:start", (payload: LiveLocationPayload) => {
      relay("start", payload);
    });

    socket.on("liveLocation:start", (payload: LiveLocationPayload) => {
      relay("start", payload);
    });

    socket.on("live_location:update", (payload: LiveLocationPayload) => {
      relay("update", payload);
    });

    socket.on("liveLocation:update", (payload: LiveLocationPayload) => {
      relay("update", payload);
    });

    socket.on("live_location:stop", (payload: LiveLocationPayload) => {
      relay("stop", payload);
    });

    socket.on("liveLocation:stop", (payload: LiveLocationPayload) => {
      relay("stop", payload);
    });
  }
}
