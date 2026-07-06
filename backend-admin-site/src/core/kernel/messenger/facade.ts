import {
  emitMessengerKernelEvent,
  subscribeManyMessengerKernelEvents,
} from "./core/event-bus";
import {
  bindMessengerKernelRuntime,
  getMessengerKernelState,
  removeMessengerKernelMessages,
  removeMessengerKernelParticipants,
  removeMessengerKernelRooms,
  upsertMessengerKernelMessages,
  upsertMessengerKernelParticipants,
  upsertMessengerKernelRooms,
} from "./core/store";
import type {
  MessengerKernelMessageRecord,
  MessengerKernelParticipantRecord,
  MessengerKernelRoomRecord,
  MessengerKernelState,
} from "./core/types";
import {
  selectMessengerKernelCurrentUserId,
  selectMessengerKernelMessagesByRoomId,
  selectMessengerKernelMessageById,
  selectMessengerKernelParticipantsByRoomId,
  selectMessengerKernelPeerPresenceByRoomId,
  selectMessengerKernelRealtimeStatus,
  selectMessengerKernelRoomById,
  selectMessengerKernelRoomSummary,
  selectMessengerKernelRooms,
} from "./core/selectors";
import {
  connectMessengerRealtime,
  disconnectMessengerRealtime,
  getMessengerRealtimeServiceState,
  reconnectMessengerRealtime,
  resetMessengerRealtimeService,
  sendMessengerRealtimeClientEvent,
  subscribeMessengerRealtimeService,
} from "./realtime/service";
import type {
  MessengerRealtimeCallSignalPayload,
  MessengerRealtimeClientCommand,
  MessengerRealtimeClientEventName,
  MessengerRealtimeMessageAckPayload,
  MessengerRealtimeMessagePayload,
  MessengerRealtimeRoomJoinPayload,
  MessengerRealtimeRoomLeavePayload,
  MessengerRealtimeTypingPayload,
} from "./realtime/types";
import {
  getMessengerRoomById,
  listMessengerRooms,
} from "./rooms/service";
import type {
  KernelMessengerRoom,
  KernelMessengerRoomsQuery,
  KernelMessengerRoomsResponse,
} from "./rooms/types";
import {
  getMessengerMessageById,
  listMessengerMessagesByRoom,
  markMessengerMessageDelivered,
  markMessengerMessageRead,
  sendMessengerMessage,
  updateMessengerMessage,
  deleteMessengerMessage,
} from "./messages/service";
import type {
  KernelMessengerCreateMessageInput,
  KernelMessengerMessage,
  KernelMessengerMessagesQuery,
  KernelMessengerMessagesResponse,
  KernelMessengerUpdateMessageInput,
} from "./messages/types";
import {
  getMessengerParticipantById,
  listMessengerParticipantsByRoom,
} from "./participants/service";
import type {
  KernelMessengerParticipant,
  KernelMessengerParticipantsQuery,
  KernelMessengerParticipantsResponse,
} from "./participants/types";
import {
  deleteMessengerMedia,
  getMessengerMediaById,
  listMessengerMediaByRoom,
  uploadMessengerMedia,
} from "./media/service";
import type {
  KernelMessengerMediaAsset,
  KernelMessengerMediaListResponse,
  KernelMessengerMediaQuery,
  KernelMessengerUploadMediaInput,
} from "./media/types";

export type MessengerKernelRoomSubscriptionSnapshot = {
  room: KernelMessengerRoom | null;
  messages: KernelMessengerMessage[];
  participants: KernelMessengerParticipant[];
  peerPresence: ReturnType<typeof selectMessengerKernelPeerPresenceByRoomId>;
  summary: ReturnType<typeof selectMessengerKernelRoomSummary>;
  realtimeStatus: ReturnType<typeof selectMessengerKernelRealtimeStatus>;
  state: MessengerKernelState;
};

export type MessengerKernelRoomSubscriptionCallbacks = {
  onSnapshot?: (snapshot: MessengerKernelRoomSubscriptionSnapshot) => void;
  onMessagesChanged?: (messages: KernelMessengerMessage[]) => void;
  onParticipantsChanged?: (participants: KernelMessengerParticipant[]) => void;
  onPresenceChanged?: (
    presence: ReturnType<typeof selectMessengerKernelPeerPresenceByRoomId>,
  ) => void;
  onRoomChanged?: (room: KernelMessengerRoom | null) => void;
  onRealtimeStatusChanged?: (
    status: ReturnType<typeof selectMessengerKernelRealtimeStatus>,
  ) => void;
};

export type MessengerRealtimePresenceOnlinePayload = {
  roomId: string;
  chatId?: string | null;
  userId?: string | null;
  peerUserId?: string | null;
  partnerId?: string | null;
  targetUserId?: string | null;
  roomType?: string | null;
  at?: string | null;
};

export type MessengerRealtimePresenceOfflinePayload = {
  roomId: string;
  chatId?: string | null;
  userId?: string | null;
  peerUserId?: string | null;
  partnerId?: string | null;
  targetUserId?: string | null;
  roomType?: string | null;
  at?: string | null;
  lastSeenAt?: string | null;
};

function nowIso() {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
}

function getResolvedCurrentUserId(explicit?: string | null) {
  return normalizeString(explicit) ?? selectMessengerKernelCurrentUserId() ?? null;
}

function normalizeRoomId(value: unknown) {
  return normalizeString(value);
}

function normalizeOccurredAt(value?: string | null) {
  return normalizeString(value) ?? nowIso();
}

function getOptionalOccurredAt(
  payload: Record<string, unknown>,
): string | null {
  return normalizeString(payload.occurredAt) ?? null;
}

function emitRoomsUpserted(rooms: MessengerKernelRoomRecord[]) {
  emitMessengerKernelEvent("rooms:upserted", {
    rooms,
    state: getMessengerKernelState(),
  });
  emitMessengerKernelEvent("collection:ready", {
    key: "rooms",
    state: getMessengerKernelState(),
  });
}

function emitMessagesUpserted(messages: MessengerKernelMessageRecord[]) {
  emitMessengerKernelEvent("messages:upserted", {
    messages,
    state: getMessengerKernelState(),
  });
  emitMessengerKernelEvent("collection:ready", {
    key: "messages",
    state: getMessengerKernelState(),
  });
}

function emitParticipantsUpserted(participants: MessengerKernelParticipantRecord[]) {
  emitMessengerKernelEvent("participants:upserted", {
    participants,
    state: getMessengerKernelState(),
  });
  emitMessengerKernelEvent("collection:ready", {
    key: "participants",
    state: getMessengerKernelState(),
  });
}

function emitMessagesRemoved(ids: string[]) {
  emitMessengerKernelEvent("messages:removed", {
    ids,
    state: getMessengerKernelState(),
  });
  emitMessengerKernelEvent("collection:ready", {
    key: "messages",
    state: getMessengerKernelState(),
  });
}

function buildRoomSnapshot(
  roomId: string,
  currentUserId?: string | null,
): MessengerKernelRoomSubscriptionSnapshot {
  const state = getMessengerKernelState();
  const resolvedCurrentUserId = getResolvedCurrentUserId(currentUserId);

  return {
    room: selectMessengerKernelRoomById(roomId, state) as KernelMessengerRoom | null,
    messages: selectMessengerKernelMessagesByRoomId(roomId, state) as KernelMessengerMessage[],
    participants: selectMessengerKernelParticipantsByRoomId(
      roomId,
      state,
    ) as KernelMessengerParticipant[],
    peerPresence: selectMessengerKernelPeerPresenceByRoomId(
      roomId,
      resolvedCurrentUserId,
      state,
    ),
    summary: selectMessengerKernelRoomSummary(roomId, resolvedCurrentUserId, state),
    realtimeStatus: selectMessengerKernelRealtimeStatus(state),
    state,
  };
}

function pushRoomSnapshot(
  roomId: string,
  callbacks: MessengerKernelRoomSubscriptionCallbacks,
  currentUserId?: string | null,
) {
  const snapshot = buildRoomSnapshot(roomId, currentUserId);

  callbacks.onSnapshot?.(snapshot);
  callbacks.onRoomChanged?.(snapshot.room);
  callbacks.onMessagesChanged?.(snapshot.messages);
  callbacks.onParticipantsChanged?.(snapshot.participants);
  callbacks.onPresenceChanged?.(snapshot.peerPresence);
  callbacks.onRealtimeStatusChanged?.(snapshot.realtimeStatus);

  return snapshot;
}

async function ensureRuntimeBound() {
  await bindMessengerKernelRuntime();
}

function sendFacadeRealtimeEvent(
  name: string,
  payload: Record<string, unknown>,
  occurredAt?: string | null,
) {
  sendMessengerRealtimeClientEvent(
    name as MessengerRealtimeClientEventName,
    {
      ...payload,
      occurredAt: normalizeOccurredAt(occurredAt),
    } as Record<string, unknown>,
  );
}

export async function connectMessengerKernelFacade() {
  await ensureRuntimeBound();
  return connectMessengerRealtime();
}

export function disconnectMessengerKernelFacade() {
  return disconnectMessengerRealtime();
}

export async function reconnectMessengerKernelFacade() {
  await ensureRuntimeBound();
  return reconnectMessengerRealtime();
}

export function resetMessengerKernelFacade() {
  return resetMessengerRealtimeService();
}

export function getMessengerKernelFacadeState() {
  return getMessengerKernelState();
}

export function getMessengerKernelFacadeRealtimeState() {
  return getMessengerRealtimeServiceState();
}

export function subscribeMessengerKernelFacadeRealtime(
  listener: Parameters<typeof subscribeMessengerRealtimeService>[0],
) {
  return subscribeMessengerRealtimeService(listener);
}

export async function syncMessengerKernelRooms(
  query: KernelMessengerRoomsQuery = {},
): Promise<KernelMessengerRoomsResponse> {
  await ensureRuntimeBound();
  const response = await listMessengerRooms(query);
  upsertMessengerKernelRooms(response.items);
  emitRoomsUpserted(response.items);
  return response;
}

export async function syncMessengerKernelRoomById(
  roomId: string,
): Promise<KernelMessengerRoom> {
  await ensureRuntimeBound();
  const room = await getMessengerRoomById(roomId);
  upsertMessengerKernelRooms([room]);
  emitRoomsUpserted([room]);
  return room;
}

export async function syncMessengerKernelMessagesByRoom(
  query: KernelMessengerMessagesQuery,
): Promise<KernelMessengerMessagesResponse> {
  await ensureRuntimeBound();
  const response = await listMessengerMessagesByRoom(query);
  upsertMessengerKernelMessages(response.items);
  emitMessagesUpserted(response.items);
  return response;
}

export async function syncMessengerKernelParticipantsByRoom(
  query: KernelMessengerParticipantsQuery,
): Promise<KernelMessengerParticipantsResponse> {
  await ensureRuntimeBound();
  const response = await listMessengerParticipantsByRoom(query);
  upsertMessengerKernelParticipants(response.items);
  emitParticipantsUpserted(response.items);
  return response;
}

export async function hydrateMessengerKernelRoomGraph(
  roomId: string,
  options?: {
    currentUserId?: string | null;
    messageLimit?: number;
    participantLimit?: number;
  },
) {
  await ensureRuntimeBound();

  const [room, messages, participants] = await Promise.all([
    syncMessengerKernelRoomById(roomId),
    syncMessengerKernelMessagesByRoom({
      roomId,
      limit: options?.messageLimit,
    }),
    syncMessengerKernelParticipantsByRoom({
      roomId,
      limit: options?.participantLimit,
    }),
  ]);

  return {
    room,
    messages,
    participants,
    snapshot: buildRoomSnapshot(roomId, options?.currentUserId),
  };
}

export function subscribeMessengerKernelRoom(
  roomId: string,
  callbacks: MessengerKernelRoomSubscriptionCallbacks,
  options?: {
    currentUserId?: string | null;
  },
) {
  const resolvedCurrentUserId = getResolvedCurrentUserId(options?.currentUserId);

  pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);

  return subscribeManyMessengerKernelEvents({
    "rooms:upserted": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "rooms:removed": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "messages:upserted": (payload) => {
      if (!payload.messages.some((message) => message.roomId === roomId)) {
        return;
      }
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "messages:removed": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "participants:upserted": (payload) => {
      if (!payload.participants.some((participant) => participant.roomId === roomId)) {
        return;
      }
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "participants:removed": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "realtime:status_changed": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
    "runtime:cleared": () => {
      pushRoomSnapshot(roomId, callbacks, resolvedCurrentUserId);
    },
  });
}

export function subscribeMessengerKernelRoomRealtime(
  roomId: string,
  callbacks: MessengerKernelRoomSubscriptionCallbacks,
  options?: {
    currentUserId?: string | null;
  },
) {
  return subscribeMessengerKernelRoom(roomId, callbacks, options);
}

export function getMessengerKernelRoom(roomId: string) {
  return selectMessengerKernelRoomById(roomId) as KernelMessengerRoom | null;
}

export function getMessengerKernelRooms() {
  return selectMessengerKernelRooms() as KernelMessengerRoom[];
}

export function getMessengerKernelRoomMessages(roomId: string) {
  return selectMessengerKernelMessagesByRoomId(roomId) as KernelMessengerMessage[];
}

export function getMessengerKernelMessage(messageId: string) {
  return selectMessengerKernelMessageById(messageId) as KernelMessengerMessage | null;
}

export function getMessengerKernelRoomParticipants(roomId: string) {
  return selectMessengerKernelParticipantsByRoomId(
    roomId,
  ) as KernelMessengerParticipant[];
}

export function getMessengerKernelRoomPeerPresence(
  roomId: string,
  currentUserId?: string | null,
) {
  return selectMessengerKernelPeerPresenceByRoomId(
    roomId,
    getResolvedCurrentUserId(currentUserId),
  );
}

export function getMessengerKernelRoomSummary(
  roomId: string,
  currentUserId?: string | null,
) {
  return selectMessengerKernelRoomSummary(
    roomId,
    getResolvedCurrentUserId(currentUserId),
  );
}

export async function sendMessengerKernelMessage(
  input: KernelMessengerCreateMessageInput,
) {
  await ensureRuntimeBound();
  const message = await sendMessengerMessage(input);
  upsertMessengerKernelMessages([message]);
  emitMessagesUpserted([message]);
  return message;
}

export async function updateMessengerKernelMessage(
  input: KernelMessengerUpdateMessageInput,
) {
  await ensureRuntimeBound();
  const message = await updateMessengerMessage(input);
  upsertMessengerKernelMessages([message]);
  emitMessagesUpserted([message]);
  return message;
}

export async function deleteMessengerKernelMessage(messageId: string) {
  await ensureRuntimeBound();
  const result = await deleteMessengerMessage(messageId);
  removeMessengerKernelMessages([result.id]);
  emitMessagesRemoved([result.id]);
  return result;
}

export async function markMessengerKernelMessageDelivered(messageId: string) {
  await ensureRuntimeBound();
  const message = await markMessengerMessageDelivered(messageId);
  upsertMessengerKernelMessages([message]);
  emitMessagesUpserted([message]);
  return message;
}

export async function markMessengerKernelMessageRead(messageId: string) {
  await ensureRuntimeBound();
  const message = await markMessengerMessageRead(messageId);
  upsertMessengerKernelMessages([message]);
  emitMessagesUpserted([message]);
  return message;
}

export async function getMessengerKernelMessageById(messageId: string) {
  await ensureRuntimeBound();
  return getMessengerMessageById(messageId);
}

export async function getMessengerKernelParticipantById(participantId: string) {
  await ensureRuntimeBound();
  return getMessengerParticipantById(participantId);
}

export async function listMessengerKernelMediaByRoom(
  query: KernelMessengerMediaQuery,
): Promise<KernelMessengerMediaListResponse> {
  await ensureRuntimeBound();
  return listMessengerMediaByRoom(query);
}

export async function getMessengerKernelMediaById(
  mediaId: string,
): Promise<KernelMessengerMediaAsset> {
  await ensureRuntimeBound();
  return getMessengerMediaById(mediaId);
}

export async function uploadMessengerKernelMedia(
  input: KernelMessengerUploadMediaInput,
): Promise<KernelMessengerMediaAsset> {
  await ensureRuntimeBound();
  return uploadMessengerMedia(input);
}

export async function uploadMessengerKernelRealtimeMedia(
  input: KernelMessengerUploadMediaInput,
): Promise<KernelMessengerMediaAsset> {
  return uploadMessengerKernelMedia(input);
}

export async function deleteMessengerKernelMedia(mediaId: string) {
  await ensureRuntimeBound();
  return deleteMessengerMedia(mediaId);
}

export function sendMessengerKernelRealtimeCommand<
  TEventName extends MessengerRealtimeClientEventName,
>(
  command: MessengerRealtimeClientCommand<TEventName>,
) {
  sendFacadeRealtimeEvent(
    command.name,
    (command.payload ?? {}) as Record<string, unknown>,
    command.occurredAt,
  );
}

export function joinMessengerKernelRoomRealtime(
  payload: MessengerRealtimeRoomJoinPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  const occurredAt = getOptionalOccurredAt(
    payload as unknown as Record<string, unknown>,
  );

  sendFacadeRealtimeEvent(
    "room.join",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
    },
    occurredAt,
  );
}

export function leaveMessengerKernelRoomRealtime(
  payload: MessengerRealtimeRoomLeavePayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  const occurredAt = getOptionalOccurredAt(
    payload as unknown as Record<string, unknown>,
  );

  sendFacadeRealtimeEvent(
    "room.leave",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
    },
    occurredAt,
  );
}

export function sendMessengerKernelRealtimeMessage(
  payload: MessengerRealtimeMessagePayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "message.send",
    {
      ...payload,
      roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
    },
    normalizeString((payload as { occurredAt?: string | null }).occurredAt) ?? null,
  );
}

export function emitMessengerKernelMessageDelivered(
  payload: MessengerRealtimeMessageAckPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  const messageId = normalizeString(payload.messageId);
  if (!roomId || !messageId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "message.delivered",
    {
      ...payload,
      roomId,
      messageId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: normalizeOccurredAt(payload.at),
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelMessageRead(
  payload: MessengerRealtimeMessageAckPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  const messageId = normalizeString(payload.messageId);
  if (!roomId || !messageId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "message.read",
    {
      ...payload,
      roomId,
      messageId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: normalizeOccurredAt(payload.at),
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelTypingStart(
  payload: MessengerRealtimeTypingPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "participant.typing.start",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: normalizeOccurredAt(payload.at),
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelTypingStop(
  payload: MessengerRealtimeTypingPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "participant.typing.stop",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: normalizeOccurredAt(payload.at),
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelPresenceOnline(
  payload: MessengerRealtimePresenceOnlinePayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "presence.online",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: normalizeOccurredAt(payload.at),
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelPresenceOffline(
  payload: MessengerRealtimePresenceOfflinePayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  const occurredAt = normalizeOccurredAt(payload.at);

  sendFacadeRealtimeEvent(
    "presence.offline",
    {
      ...payload,
      roomId,
      chatId: (payload as { chatId?: string | null }).chatId ?? roomId,
      userId: getResolvedCurrentUserId(payload.userId) ?? undefined,
      at: occurredAt,
      lastSeenAt: normalizeString(payload.lastSeenAt) ?? occurredAt,
    },
    payload.at ?? null,
  );
}

export function emitMessengerKernelCallSignal(
  payload: MessengerRealtimeCallSignalPayload,
) {
  const roomId = normalizeRoomId(payload.roomId);
  if (!roomId) {
    return;
  }

  sendFacadeRealtimeEvent(
    "call.signal",
    {
      ...payload,
      roomId,
      fromUserId:
        getResolvedCurrentUserId(payload.fromUserId) ??
        getResolvedCurrentUserId(null) ??
        undefined,
    },
    normalizeString((payload as { occurredAt?: string | null }).occurredAt) ?? null,
  );
}

export function removeMessengerKernelRoomLocalState(roomId: string) {
  const normalizedRoomId = normalizeString(roomId);
  if (!normalizedRoomId) {
    return;
  }

  const messages = selectMessengerKernelMessagesByRoomId(normalizedRoomId);
  const participants = selectMessengerKernelParticipantsByRoomId(normalizedRoomId);

  if (messages.length) {
    removeMessengerKernelMessages(messages.map((message) => message.id));
    emitMessagesRemoved(messages.map((message) => message.id));
  }

  if (participants.length) {
    removeMessengerKernelParticipants(participants.map((participant) => participant.id));
    emitMessengerKernelEvent("participants:removed", {
      ids: participants.map((participant) => participant.id),
      state: getMessengerKernelState(),
    });
  }

  removeMessengerKernelRooms([normalizedRoomId]);
  emitMessengerKernelEvent("rooms:removed", {
    ids: [normalizedRoomId],
    state: getMessengerKernelState(),
  });
}