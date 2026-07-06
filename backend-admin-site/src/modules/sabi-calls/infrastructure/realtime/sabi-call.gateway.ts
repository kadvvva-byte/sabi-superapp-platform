import type { Server, Socket } from "socket.io";
import type { SabiCallService } from "../../application";
import type {
  SabiCallContextType,
  SabiCallEffectKind,
  JsonPrimitive,
  SabiCallMetadata,
  SabiCallPresentationSource,
  SabiCallSignalKind,
} from "../../contracts";

type AnyPayload = Record<string, unknown>;

function nowIso(): string {
  return new Date().toISOString();
}

function readString(value: unknown): string | null {
  if (Array.isArray(value)) return readString(value[0]);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readTruthy(value: unknown): boolean {
  if (value === true) return true;
  const raw = String(value ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "group_call";
}

function readBody(payload: unknown): AnyPayload {
  return payload && typeof payload === "object" && !Array.isArray(payload)
    ? (payload as AnyPayload)
    : {};
}

function ackOf(value: unknown): ((result: unknown) => void) | undefined {
  return typeof value === "function" ? (value as (result: unknown) => void) : undefined;
}

function readTargetUserIds(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function isJsonPrimitive(value: unknown): value is JsonPrimitive {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  );
}

function readMetadata(value: unknown): SabiCallMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const source = value as Record<string, unknown>;
  const metadata: SabiCallMetadata = {};

  for (const [key, raw] of Object.entries(source)) {
    if (isJsonPrimitive(raw)) {
      metadata[key] = raw;
    }
  }

  return metadata;
}

function readSignalKind(value: unknown): SabiCallSignalKind {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "answer") return "answer";
  if (normalized === "ice" || normalized === "candidate" || normalized === "ice_candidate") return "ice_candidate";
  if (normalized === "renegotiate") return "renegotiate";
  if (normalized === "bye") return "bye";
  return "offer";
}

function unique(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = typeof value === "string" ? value.trim() : "";
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

function getHandshakeUserId(socket: Socket): string | null {
  const auth =
    socket.handshake.auth && typeof socket.handshake.auth === "object"
      ? (socket.handshake.auth as AnyPayload)
      : {};

  return (
    readString(socket.handshake.query.userId) ||
    readString(auth.userId) ||
    readString(auth.currentUserId) ||
    readString(auth.id)
  );
}

function getCallId(body: AnyPayload): string | null {
  return readString(body.callId) || readString(body.id);
}

function getChatId(body: AnyPayload): string | null {
  return readString(body.chatId) || readString(body.roomId) || readString(body.conversationId);
}

function getRoomId(body: AnyPayload): string | null {
  return readString(body.roomId) || getChatId(body);
}

function getKind(body: AnyPayload): "audio" | "video" {
  const raw = String(body.kind ?? body.type ?? body.callKind ?? body.callType ?? "").toLowerCase();
  return raw.includes("video") ? "video" : "audio";
}

function getSenderUserId(socket: Socket, body: AnyPayload): string | null {
  return (
    readString(body.userId) ||
    readString(body.currentUserId) ||
    readString(body.fromUserId) ||
    readString(body.senderUserId) ||
    readString(body.callerId) ||
    getHandshakeUserId(socket)
  );
}

function getRelayTargetUserIds(socket: Socket, body: AnyPayload): string[] {
  const sender = getSenderUserId(socket, body);

  return unique([
    readString(body.targetUserId),
    readString(body.toUserId),
    readString(body.receiverUserId),
    readString(body.receiverId),
    readString(body.peerUserId),
    readString(body.peerId),
    readString(body.partnerId),
  ]).filter((userId) => userId !== sender);
}

function buildIncomingPayload(socket: Socket, raw: unknown): AnyPayload | null {
  const body = readBody(raw);
  const kind = getKind(body);
  const isGroupCall =
    readTruthy(body.groupCall) ||
    readTruthy(body.isGroupCall) ||
    String(body.roomType ?? "").trim().toLowerCase() === "group_call" ||
    String(body.event ?? "").trim().toLowerCase().includes("participant") ||
    String(body.event ?? "").trim().toLowerCase().includes("group");
  const fromUserId =
    readString(body.fromUserId) ||
    readString(body.callerId) ||
    readString(body.senderUserId) ||
    getSenderUserId(socket, body);

  const toUserId =
    readString(body.toUserId) ||
    readString(body.targetUserId) ||
    readString(body.receiverUserId) ||
    readString(body.peerUserId) ||
    readString(body.peerId);

  const chatId = getChatId(body);
  const roomId = getRoomId(body) || chatId;
  const callId =
    getCallId(body) ||
    (chatId && fromUserId && toUserId ? "call:" + chatId + ":" + fromUserId + ":" + toUserId : null);

  if (!fromUserId || !toUserId || fromUserId === toUserId || !callId || !chatId || !roomId) {
    return null;
  }

  const name =
    readString(body.contactName) ||
    readString(body.name) ||
    readString(body.callerName) ||
    (kind === "video" ? "Video call" : "Audio call");

  return {
    ...body,
    id: callId,
    callId,
    chatId,
    roomId,
    kind,
    type: kind,
    event: "incoming",
    relayEvent: "call:incoming",
    direction: "incoming",
    phase: "ringing",
    status: "ringing",
    signalState: "ringing",
    fromUserId,
    callerId: fromUserId,
    senderUserId: fromUserId,
    toUserId,
    targetUserId: toUserId,
    receiverUserId: toUserId,
    currentUserId: toUserId,
    userId: toUserId,
    peerId: fromUserId,
    peerUserId: fromUserId,
    contactName: name,
    name,
    callerName: name,
    avatarLetter: readString(body.avatarLetter) || name.slice(0, 1).toUpperCase() || "S",
    avatarUrl: readString(body.avatarUrl) || readString(body.photoUrl) || undefined,
    photoUrl: readString(body.photoUrl) || readString(body.avatarUrl) || undefined,
    roomType: isGroupCall ? "group_call" : readString(body.roomType) || "direct",
    groupCall: isGroupCall,
    isGroupCall,
    createdAt: nowIso(),
    at: nowIso(),
  };
}

function buildRelayPayload(socket: Socket, raw: unknown, patch: AnyPayload = {}): AnyPayload {
  const body = readBody(raw);
  const senderUserId = getSenderUserId(socket, body);
  const callId = getCallId(body);
  const chatId = getChatId(body);
  const roomId = getRoomId(body);

  return {
    ...body,
    ...patch,
    callId: callId || readString(patch.callId) || undefined,
    chatId: chatId || readString(patch.chatId) || undefined,
    roomId: roomId || chatId || readString(patch.roomId) || undefined,
    userId: senderUserId || readString(body.userId) || undefined,
    fromUserId: readString(body.fromUserId) || senderUserId || undefined,
    senderUserId: readString(body.senderUserId) || senderUserId || undefined,
    kind: getKind(body),
    type: getKind(body),
    at: nowIso(),
  };
}

export class SabiCallGateway {
  private registered = false;
  private readonly onConnectionBound = (socket: Socket) => this.onConnection(socket);

  constructor(private readonly io: Server, private readonly service: SabiCallService) {}

  register(): void {
    if (this.registered) return;
    this.io.on("connection", this.onConnectionBound);
    this.registered = true;
  }

  unregister(): void {
    if (!this.registered) return;

    if (typeof this.io.off === "function") {
      this.io.off("connection", this.onConnectionBound);
    } else {
      this.io.removeListener("connection", this.onConnectionBound);
    }

    this.registered = false;
  }

  isRegistered(): boolean {
    return this.registered;
  }

  private joinUser(socket: Socket, userId: string | null): void {
    if (!userId) return;
    socket.join("user:" + userId);
    socket.join("auth:user:" + userId);
    socket.join("notification:user:" + userId);
  }

  private joinCall(socket: Socket, callId: string | null): void {
    if (!callId) return;
    socket.join("call:" + callId);
  }

  private emitToTargets(
    socket: Socket,
    events: string[],
    payload: AnyPayload,
    targetUserIds: string[],
    ack?: (result: unknown) => void,
    includeCallRoom = true
  ): void {
    const callId = getCallId(payload);
    const targets = unique(targetUserIds);

    if (callId) {
      this.joinCall(socket, callId);
    }

    for (const targetUserId of targets) {
      for (const eventName of events) {
        this.io.to("user:" + targetUserId).emit(eventName, payload);
      }
    }

    if (callId && includeCallRoom) {
      for (const eventName of events) {
        socket.to("call:" + callId).emit(eventName, payload);
      }
    }

    console.log("[sabi-calls:bridge] relay", {
      events,
      callId: callId || null,
      fromUserId: readString(payload.fromUserId) || readString(payload.userId) || null,
      targetUserIds: targets,
    });

    ack?.({ ok: true, relayed: true, events, callId, targetUserIds: targets });
  }

  private relayIncoming(socket: Socket, raw: unknown, ack?: (result: unknown) => void): void {
    const payload = buildIncomingPayload(socket, raw);

    if (!payload) {
      ack?.({ ok: false, error: "invalid_call_incoming_payload" });
      return;
    }

    const kind = getKind(payload);
    const targetUserId = readString(payload.targetUserId);

    this.joinUser(socket, readString(payload.fromUserId));
    this.joinCall(socket, readString(payload.callId));

    const events =
      kind === "video"
        ? ["call:incoming", "call_incoming", "call:ringing", "video-call:incoming", "video_call_incoming", "video-call:ringing"]
        : ["call:incoming", "call_incoming", "call:ringing", "audio-call:incoming", "audio_call_incoming", "audio-call:ringing"];

    this.emitToTargets(socket, events, payload, targetUserId ? [targetUserId] : [], ack);
  }

  private relayState(
    socket: Socket,
    raw: unknown,
    events: string[],
    patch: AnyPayload,
    ack?: (result: unknown) => void
  ): void {
    const payload = buildRelayPayload(socket, raw, patch);
    const targets = getRelayTargetUserIds(socket, payload);

    this.joinUser(socket, getSenderUserId(socket, payload));
    this.joinCall(socket, getCallId(payload));

    this.emitToTargets(socket, events, payload, targets, ack);
  }

  private relayGroupIncoming(socket: Socket, raw: unknown, ack?: (result: unknown) => void): void {
    const payload = buildIncomingPayload(socket, {
      ...readBody(raw),
      roomType: "group_call",
      groupCall: true,
      isGroupCall: true,
      event: "participant_invite",
      phase: "ringing",
      status: "ringing",
      direction: "incoming",
      incoming: true,
    });

    if (!payload) {
      ack?.({ ok: false, error: "invalid_group_call_invite_payload" });
      return;
    }

    const targetUserId = readString(payload.targetUserId) || readString(payload.toUserId) || readString(payload.receiverUserId);

    this.joinUser(socket, readString(payload.fromUserId));
    this.joinCall(socket, readString(payload.callId));

    this.emitToTargets(
      socket,
      [
        "sabi-call:group:invite",
      ],
      payload,
      targetUserId ? [targetUserId] : [],
      ack,
      false
    );
  }

  private relayGroupState(socket: Socket, raw: unknown, ack?: (result: unknown) => void): void {
    const payload = buildRelayPayload(socket, raw, {
      roomType: "group_call",
      groupCall: true,
      isGroupCall: true,
      event: "participant_accepted",
      phase: "active",
      status: "active",
    });

    const targets = getRelayTargetUserIds(socket, payload);

    this.joinUser(socket, getSenderUserId(socket, payload));
    this.joinCall(socket, getCallId(payload));

    this.emitToTargets(
      socket,
      [
        "sabi-call:participant:accepted",
      ],
      payload,
      [],
      ack,
      true
    );
  }

  private relayGroupSignal(socket: Socket, raw: unknown, ack?: (result: unknown) => void): void {
    const payload = buildRelayPayload(socket, raw, {
      roomType: "group_call",
      groupCall: true,
      isGroupCall: true,
    });

    const targets = getRelayTargetUserIds(socket, payload);

    this.joinUser(socket, getSenderUserId(socket, payload));
    this.joinCall(socket, getCallId(payload));

    this.emitToTargets(
      socket,
      [
        "sabi-call:group:signal",
      ],
      payload,
      targets,
      ack,
      false
    );
  }

  private onConnection(socket: Socket): void {
    this.joinUser(socket, getHandshakeUserId(socket));

    socket.on("sabi-call:join-user", (...args: unknown[]) => {
      const body = readBody(args[0]);
      const userId = readString(body.userId) ?? getHandshakeUserId(socket);
      this.joinUser(socket, userId);
      ackOf(args[1])?.({ ok: true, userId });
    });

    socket.on("sabi-call:join-call", (...args: unknown[]) => {
      const callId = readString(readBody(args[0]).callId);
      this.joinCall(socket, callId);
      ackOf(args[1])?.({ ok: true, callId });
    });

    socket.on("call:room:join", (...args: unknown[]) => {
      const body = readBody(args[0]);
      this.joinUser(socket, getSenderUserId(socket, body));
      this.joinCall(socket, getCallId(body));
      ackOf(args[1])?.({ ok: true, callId: getCallId(body) });
    });

    socket.on("call:room:leave", (...args: unknown[]) => {
      const body = readBody(args[0]);
      const callId = getCallId(body);
      if (callId) socket.leave("call:" + callId);
      ackOf(args[1])?.({ ok: true, callId });
    });

    socket.on("call:start", (...args: unknown[]) => this.relayIncoming(socket, args[0], ackOf(args[1])));
    socket.on("call:incoming", (...args: unknown[]) => this.relayIncoming(socket, args[0], ackOf(args[1])));
    socket.on("call_incoming", (...args: unknown[]) => this.relayIncoming(socket, args[0], ackOf(args[1])));
    socket.on("audio-call:incoming", (...args: unknown[]) => this.relayIncoming(socket, args[0], ackOf(args[1])));
    socket.on("video-call:incoming", (...args: unknown[]) => this.relayIncoming(socket, args[0], ackOf(args[1])));

    socket.on("sabi-call:group:invite", (...args: unknown[]) => this.relayGroupIncoming(socket, args[0], ackOf(args[1])));
socket.on("sabi-call:participant:accepted", (...args: unknown[]) => this.relayGroupState(socket, args[0], ackOf(args[1])));
socket.on("sabi-call:group:signal", (...args: unknown[]) => this.relayGroupSignal(socket, args[0], ackOf(args[1])));
socket.on("call:ringing", (...args: unknown[]) =>
      this.relayState(socket, args[0], ["call:ringing", "call:state"], { phase: "ringing", status: "ringing" }, ackOf(args[1]))
    );

    socket.on("call:accept", (...args: unknown[]) =>
      this.relayState(socket, args[0], ["call:accepted", "call:connecting", "call:state"], {
        event: "accepted",
        phase: "connecting",
        status: "connecting",
        signalState: "connecting",
      }, ackOf(args[1]))
    );

    socket.on("call:decline", (...args: unknown[]) =>
      this.relayState(socket, args[0], ["call:declined", "call:ended", "call:state"], {
        event: "declined",
        phase: "ended",
        status: "declined",
        endReason: "declined",
      }, ackOf(args[1]))
    );

    socket.on("call:end", (...args: unknown[]) =>
      this.relayState(socket, args[0], ["call:ended", "call:webrtc:bye", "call:state"], {
        event: "ended",
        phase: "ended",
        status: "ended",
        endReason: readString(readBody(args[0]).endReason) || "remote_end",
      }, ackOf(args[1]))
    );

    const relaySignal = (eventName: string, raw: unknown, ack?: (result: unknown) => void) => {
      const payload = buildRelayPayload(socket, raw, { event: eventName });
      const targets = getRelayTargetUserIds(socket, payload);
      this.emitToTargets(socket, [eventName], payload, targets, ack);
    };

    socket.on("call:webrtc:offer", (...args: unknown[]) => relaySignal("call:webrtc:offer", args[0], ackOf(args[1])));
    socket.on("call:offer", (...args: unknown[]) => relaySignal("call:webrtc:offer", args[0], ackOf(args[1])));
    socket.on("call:webrtc:answer", (...args: unknown[]) => relaySignal("call:webrtc:answer", args[0], ackOf(args[1])));
    socket.on("call:answer", (...args: unknown[]) => relaySignal("call:webrtc:answer", args[0], ackOf(args[1])));
    socket.on("call:webrtc:ice", (...args: unknown[]) => relaySignal("call:webrtc:ice", args[0], ackOf(args[1])));
    socket.on("call:ice", (...args: unknown[]) => relaySignal("call:webrtc:ice", args[0], ackOf(args[1])));
    socket.on("call:ice-candidate", (...args: unknown[]) => relaySignal("call:webrtc:ice", args[0], ackOf(args[1])));
    socket.on("call:webrtc:ready", (...args: unknown[]) => relaySignal("call:webrtc:ready", args[0], ackOf(args[1])));
    socket.on("call:webrtc:bye", (...args: unknown[]) => relaySignal("call:webrtc:bye", args[0], ackOf(args[1])));

    // CALL_AV_120_2_SIGNAL_ALIAS_BRIDGE:
    // Mobile emits explicit call:webrtc:* plus generic signal aliases.
    // Accept aliases on backend and relay them as canonical WebRTC events.
 const relayGenericSignal = (...args: unknown[]) => {
      const body = readBody(args[0]);
      const signalKind = readSignalKind(
        readString(body.signalKind) ||
        readString(body.descriptionType) ||
        readString(body.event) ||
        readString(body.action) ||
        readString(body.type) ||
        readString(body.kind)
      );

      const eventName =
        signalKind === "answer"
          ? "call:webrtc:answer"
          : signalKind === "ice_candidate"
            ? "call:webrtc:ice"
            : signalKind === "bye"
              ? "call:webrtc:bye"
              : "call:webrtc:offer";

      relaySignal(eventName, args[0], ackOf(args[1]));
    };

    socket.on("call:signal", relayGenericSignal);
    socket.on("call_signal", relayGenericSignal);
    socket.on("call:webrtc:signal", relayGenericSignal);
    socket.on("sabi-call:signal", relayGenericSignal);

    socket.on("sabi-call:create", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.createCall({
          kind: body.kind === "video" ? "video" : "audio",
          initiatedByUserId: readString(body.initiatedByUserId) ?? readString(body.userId) ?? "",
          targetUserIds: readTargetUserIds(body.targetUserIds),
          contextType: (readString(body.contextType) ?? "direct") as SabiCallContextType,
          contextId: readString(body.contextId),
          metadata: readMetadata(body.metadata),
        });
      })
    );

    socket.on("sabi-call:accept", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.acceptCall({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
        });
      })
    );

    socket.on("sabi-call:decline", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.declineCall({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          reason: readString(body.reason),
        });
      })
    );

    socket.on("sabi-call:cancel", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.cancelCall({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          reason: readString(body.reason),
        });
      })
    );

    socket.on("sabi-call:end", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.endCall({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          reason: readString(body.reason),
        });
      })
    );

    socket.on("sabi-call:media", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.updateMedia({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          audioEnabled: readBoolean(body.audioEnabled),
          videoEnabled: readBoolean(body.videoEnabled),
          speakerEnabled: readBoolean(body.speakerEnabled),
          screenShareEnabled: readBoolean(body.screenShareEnabled),
        });
      })
    );

    socket.on("sabi-call:signal", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.createSignal({
          callId: readString(body.callId) ?? "",
          senderUserId: readString(body.senderUserId) ?? readString(body.userId) ?? "",
          receiverUserId: readString(body.receiverUserId),
          kind: readSignalKind(body.kind ?? body.type),
          payload: readMetadata(body.payload),
        });
      })
    );

    socket.on("sabi-call:presentation:start", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.startPresentation({
          callId: readString(body.callId) ?? "",
          presenterUserId: readString(body.presenterUserId) ?? readString(body.userId) ?? "",
          source: (readString(body.source) ?? "screen") as SabiCallPresentationSource,
        });
      })
    );

    socket.on("sabi-call:presentation:stop", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.stopPresentation({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          reason: readString(body.reason),
        });
      })
    );

    socket.on("sabi-call:effects", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.updateEffect({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          kind: (readString(body.kind) ?? "none") as SabiCallEffectKind,
          effectKey: readString(body.effectKey),
          enabled: body.enabled === true,
          config: readMetadata(body.config),
        });
      })
    );

    socket.on("sabi-call:translation:start", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.startTranslation({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          sourceLanguage: readString(body.sourceLanguage) ?? "auto",
          targetLanguage: readString(body.targetLanguage) ?? "en",
        });
      })
    );

    socket.on("sabi-call:translation:stop", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.stopTranslation({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
        });
      })
    );

    socket.on("sabi-call:translation:segment", (...args: unknown[]) =>
      this.handle(ackOf(args[1]), () => {
        const body = readBody(args[0]);
        return this.service.translateSegment({
          callId: readString(body.callId) ?? "",
          userId: readString(body.userId) ?? "",
          sourceLanguage: readString(body.sourceLanguage) ?? "auto",
          targetLanguage: readString(body.targetLanguage) ?? "en",
          text: readString(body.text) ?? "",
          segmentId: readString(body.segmentId),
          metadata: readMetadata(body.metadata),
        });
      })
    );
  }

  private async handle(
    ack: ((result: unknown) => void) | undefined,
    fn: () => Promise<unknown>
  ): Promise<void> {
    try {
      const data = await fn();
      ack?.({ ok: true, data });
    } catch (error) {
      ack?.({
        ok: false,
        error: error instanceof Error ? error.message : "sabi_call_error",
      });
    }
  }
}




