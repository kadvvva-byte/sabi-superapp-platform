import { getMessengerKernelState } from "./store";
import type {
  MessengerKernelCallRecord,
  MessengerKernelCollectionKey,
  MessengerKernelCollectionState,
  MessengerKernelMessageRecord,
  MessengerKernelParticipantRecord,
  MessengerKernelRealtimeState,
  MessengerKernelRoomRecord,
  MessengerKernelSessionBinding,
  MessengerKernelState,
} from "./types";

export type MessengerKernelPeerPresenceSnapshot = {
  participant: MessengerKernelParticipantRecord | null;
  userId: string | null;
  presence: string | null;
  isOnline: boolean;
  isTyping: boolean;
  isBlocked: boolean;
  lastSeenAt: string | null;
  updatedAt: string | null;
};

function getState(state?: MessengerKernelState) {
  return state ?? getMessengerKernelState();
}

function getCollectionByKey(
  state: MessengerKernelState,
  key: MessengerKernelCollectionKey,
):
  | MessengerKernelState["rooms"]
  | MessengerKernelState["messages"]
  | MessengerKernelState["participants"]
  | MessengerKernelState["calls"] {
  return state[key];
}

function mapCollectionRecords<TRecord extends { id: string }>(
  collection: MessengerKernelCollectionState<TRecord>,
): TRecord[] {
  return collection.ids
    .map((id) => collection.records[id])
    .filter(Boolean) as TRecord[];
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function normalizeBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1" || normalized === "yes") {
      return true;
    }
    if (normalized === "false" || normalized === "0" || normalized === "no") {
      return false;
    }
  }

  return null;
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function getIsoTimestampMs(value: string | null | undefined) {
  if (!value) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getMessageTimestamp(message: MessengerKernelMessageRecord) {
  return Math.max(
    getIsoTimestampMs(normalizeString(message.sentAt)),
    getIsoTimestampMs(normalizeString(message.createdAt)),
    getIsoTimestampMs(normalizeString(message.updatedAt)),
    getIsoTimestampMs(normalizeString(message.deliveredAt)),
    getIsoTimestampMs(normalizeString(message.readAt)),
  );
}

function compareMessagesByTimeline(
  left: MessengerKernelMessageRecord,
  right: MessengerKernelMessageRecord,
) {
  const timestampDiff = getMessageTimestamp(left) - getMessageTimestamp(right);

  if (timestampDiff !== 0) {
    return timestampDiff;
  }

  return left.id.localeCompare(right.id);
}

function getParticipantMetadata(
  participant: MessengerKernelParticipantRecord | null | undefined,
) {
  return normalizeRecord(participant?.metadata);
}

function getParticipantPresenceLabel(
  participant: MessengerKernelParticipantRecord | null | undefined,
) {
  return normalizeString(participant?.presence);
}

function getParticipantPresenceBoolean(
  participant: MessengerKernelParticipantRecord | null | undefined,
  key: string,
) {
  const metadata = getParticipantMetadata(participant);
  return normalizeBoolean(metadata[key]);
}

function isPresenceTyping(
  participant: MessengerKernelParticipantRecord | null | undefined,
) {
  const explicit = getParticipantPresenceBoolean(participant, "typing");
  if (explicit !== null) {
    return explicit;
  }

  const presence = getParticipantPresenceLabel(participant)?.toLowerCase();
  return presence === "typing";
}

function isPresenceOnline(
  participant: MessengerKernelParticipantRecord | null | undefined,
) {
  const explicit = getParticipantPresenceBoolean(participant, "online");
  if (explicit !== null) {
    return explicit;
  }

  const presence = getParticipantPresenceLabel(participant)?.toLowerCase();
  if (!presence) {
    return false;
  }

  return (
    presence === "online" ||
    presence === "active" ||
    presence === "available" ||
    presence === "typing" ||
    presence === "live"
  );
}

function getParticipantUpdatedAt(
  participant: MessengerKernelParticipantRecord | null | undefined,
) {
  return (
    normalizeString(participant?.updatedAt) ??
    normalizeString(participant?.lastSeenAt) ??
    null
  );
}

function getRoomUnreadCountFromRecord(room: MessengerKernelRoomRecord | null) {
  if (!room) {
    return null;
  }

  const source = normalizeRecord(room);

  return (
    normalizeNumber(source.unreadCount) ??
    normalizeNumber(source.unread) ??
    normalizeNumber(source.totalUnreadCount) ??
    normalizeNumber(source.unreadMessagesCount)
  );
}

function isDeletedMessage(message: MessengerKernelMessageRecord) {
  return message.isDeleted === true || message.status === "deleted";
}

function isIncomingForUser(
  message: MessengerKernelMessageRecord,
  currentUserId: string | null,
) {
  if (message.direction === "incoming") {
    return true;
  }

  if (!currentUserId) {
    return message.direction !== "outgoing";
  }

  return normalizeString(message.senderUserId) !== currentUserId;
}

export function selectMessengerKernelState(state?: MessengerKernelState) {
  return getState(state);
}

export function selectMessengerKernelInitialized(state?: MessengerKernelState) {
  return getState(state).initialized;
}

export function selectMessengerKernelRuntimeStatus(state?: MessengerKernelState) {
  return getState(state).runtimeStatus;
}

export function selectMessengerKernelError(state?: MessengerKernelState) {
  return getState(state).error;
}

export function selectMessengerKernelUpdatedAt(state?: MessengerKernelState) {
  return getState(state).updatedAt;
}

export function selectMessengerKernelSession(
  state?: MessengerKernelState,
): MessengerKernelSessionBinding | null {
  return getState(state).session;
}

export function selectMessengerKernelHasBoundSession(
  state?: MessengerKernelState,
) {
  return Boolean(getState(state).session);
}

export function selectMessengerKernelCurrentUserId(
  state?: MessengerKernelState,
) {
  return getState(state).session?.currentUserId ?? null;
}

export function selectMessengerKernelAccessToken(
  state?: MessengerKernelState,
) {
  return getState(state).session?.accessToken ?? null;
}

export function selectMessengerKernelApiBaseUrl(
  state?: MessengerKernelState,
) {
  return getState(state).session?.apiBaseUrl ?? null;
}

export function selectMessengerKernelRealtimeState(
  state?: MessengerKernelState,
): MessengerKernelRealtimeState {
  return getState(state).realtime;
}

export function selectMessengerKernelRealtimeStatus(
  state?: MessengerKernelState,
) {
  return getState(state).realtime.status;
}

export function selectMessengerKernelRealtimeError(
  state?: MessengerKernelState,
) {
  return getState(state).realtime.error;
}

export function selectMessengerKernelCollectionStatus(
  key: MessengerKernelCollectionKey,
  state?: MessengerKernelState,
) {
  const safeState = getState(state);
  return getCollectionByKey(safeState, key).status;
}

export function selectMessengerKernelCollectionError(
  key: MessengerKernelCollectionKey,
  state?: MessengerKernelState,
) {
  const safeState = getState(state);
  return getCollectionByKey(safeState, key).error;
}

export function selectMessengerKernelCollectionLastSyncedAt(
  key: MessengerKernelCollectionKey,
  state?: MessengerKernelState,
) {
  const safeState = getState(state);
  return getCollectionByKey(safeState, key).lastSyncedAt;
}

export function selectMessengerKernelIsCollectionLoading(
  key: MessengerKernelCollectionKey,
  state?: MessengerKernelState,
) {
  return selectMessengerKernelCollectionStatus(key, state) === "loading";
}

export function selectMessengerKernelRooms(
  state?: MessengerKernelState,
): MessengerKernelRoomRecord[] {
  return mapCollectionRecords(getState(state).rooms);
}

export function selectMessengerKernelRoomById(
  roomId: string,
  state?: MessengerKernelState,
): MessengerKernelRoomRecord | null {
  const normalizedRoomId = roomId.trim();
  if (!normalizedRoomId) {
    return null;
  }

  return getState(state).rooms.records[normalizedRoomId] ?? null;
}

export function selectMessengerKernelMessages(
  state?: MessengerKernelState,
): MessengerKernelMessageRecord[] {
  return mapCollectionRecords(getState(state).messages).sort(compareMessagesByTimeline);
}

export function selectMessengerKernelMessageById(
  messageId: string,
  state?: MessengerKernelState,
): MessengerKernelMessageRecord | null {
  const normalizedMessageId = messageId.trim();
  if (!normalizedMessageId) {
    return null;
  }

  return getState(state).messages.records[normalizedMessageId] ?? null;
}

export function selectMessengerKernelMessagesByRoomId(
  roomId: string,
  state?: MessengerKernelState,
): MessengerKernelMessageRecord[] {
  const normalizedRoomId = roomId.trim();
  if (!normalizedRoomId) {
    return [];
  }

  return selectMessengerKernelMessages(state)
    .filter((message) => message.roomId === normalizedRoomId)
    .sort(compareMessagesByTimeline);
}

export function selectMessengerKernelLastMessageByRoomId(
  roomId: string,
  state?: MessengerKernelState,
): MessengerKernelMessageRecord | null {
  const items = selectMessengerKernelMessagesByRoomId(roomId, state).filter(
    (message) => !isDeletedMessage(message),
  );

  return items.length ? items[items.length - 1] : null;
}

export function selectMessengerKernelParticipants(
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord[] {
  return mapCollectionRecords(getState(state).participants);
}

export function selectMessengerKernelParticipantById(
  participantId: string,
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord | null {
  const normalizedParticipantId = participantId.trim();
  if (!normalizedParticipantId) {
    return null;
  }

  return getState(state).participants.records[normalizedParticipantId] ?? null;
}

export function selectMessengerKernelParticipantsByRoomId(
  roomId: string,
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord[] {
  const normalizedRoomId = roomId.trim();
  if (!normalizedRoomId) {
    return [];
  }

  return selectMessengerKernelParticipants(state)
    .filter((participant) => participant.roomId === normalizedRoomId)
    .sort((left, right) => {
      if (left.isSelf !== right.isSelf) {
        return left.isSelf ? 1 : -1;
      }

      const updatedDiff =
        getIsoTimestampMs(getParticipantUpdatedAt(right)) -
        getIsoTimestampMs(getParticipantUpdatedAt(left));

      if (updatedDiff !== 0) {
        return updatedDiff;
      }

      return left.id.localeCompare(right.id);
    });
}

export function selectMessengerKernelParticipantByUserId(
  userId: string,
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord | null {
  const normalizedUserId = userId.trim();
  if (!normalizedUserId) {
    return null;
  }

  return (
    selectMessengerKernelParticipants(state).find(
      (participant) => participant.userId === normalizedUserId,
    ) ?? null
  );
}

export function selectMessengerKernelParticipantByRoomAndUserId(
  roomId: string,
  userId: string,
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord | null {
  const normalizedRoomId = roomId.trim();
  const normalizedUserId = userId.trim();

  if (!normalizedRoomId || !normalizedUserId) {
    return null;
  }

  return (
    selectMessengerKernelParticipantsByRoomId(normalizedRoomId, state).find(
      (participant) => participant.userId === normalizedUserId,
    ) ?? null
  );
}

export function selectMessengerKernelDirectPeerByRoomId(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
): MessengerKernelParticipantRecord | null {
  const normalizedRoomId = roomId.trim();
  if (!normalizedRoomId) {
    return null;
  }

  const resolvedCurrentUserId =
    normalizeString(currentUserId) ??
    selectMessengerKernelCurrentUserId(state);

  const participants = selectMessengerKernelParticipantsByRoomId(
    normalizedRoomId,
    state,
  );

  const preferred =
    participants.find((participant) => participant.isSelf === false) ??
    participants.find(
      (participant) =>
        participant.userId &&
        resolvedCurrentUserId &&
        participant.userId !== resolvedCurrentUserId,
    ) ??
    participants.find((participant) => !participant.isBlocked) ??
    participants[0] ??
    null;

  if (!preferred) {
    return null;
  }

  if (
    resolvedCurrentUserId &&
    participants.length > 1 &&
    preferred.userId === resolvedCurrentUserId
  ) {
    return (
      participants.find((participant) => participant.userId !== resolvedCurrentUserId) ??
      null
    );
  }

  return preferred;
}

export function selectMessengerKernelPeerPresenceByRoomId(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
): MessengerKernelPeerPresenceSnapshot {
  const participant = selectMessengerKernelDirectPeerByRoomId(
    roomId,
    currentUserId,
    state,
  );

  const presence = getParticipantPresenceLabel(participant);
  const lastSeenAt =
    normalizeString(participant?.lastSeenAt) ??
    getParticipantUpdatedAt(participant);

  return {
    participant,
    userId: participant?.userId ?? null,
    presence,
    isOnline: isPresenceOnline(participant),
    isTyping: isPresenceTyping(participant),
    isBlocked: Boolean(participant?.isBlocked),
    lastSeenAt: isPresenceOnline(participant) ? null : lastSeenAt,
    updatedAt: getParticipantUpdatedAt(participant),
  };
}

export function selectMessengerKernelPeerTypingByRoomId(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
) {
  return selectMessengerKernelPeerPresenceByRoomId(
    roomId,
    currentUserId,
    state,
  ).isTyping;
}

export function selectMessengerKernelPeerOnlineByRoomId(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
) {
  return selectMessengerKernelPeerPresenceByRoomId(
    roomId,
    currentUserId,
    state,
  ).isOnline;
}

export function selectMessengerKernelCalls(
  state?: MessengerKernelState,
): MessengerKernelCallRecord[] {
  return mapCollectionRecords(getState(state).calls);
}

export function selectMessengerKernelCallById(
  callId: string,
  state?: MessengerKernelState,
): MessengerKernelCallRecord | null {
  const normalizedCallId = callId.trim();
  if (!normalizedCallId) {
    return null;
  }

  return getState(state).calls.records[normalizedCallId] ?? null;
}

export function selectMessengerKernelCallsByRoomId(
  roomId: string,
  state?: MessengerKernelState,
): MessengerKernelCallRecord[] {
  const normalizedRoomId = roomId.trim();
  if (!normalizedRoomId) {
    return [];
  }

  return selectMessengerKernelCalls(state).filter(
    (call) => call.roomId === normalizedRoomId,
  );
}

export function selectMessengerKernelActiveCallId(
  state?: MessengerKernelState,
) {
  return getState(state).calls.activeCallId;
}

export function selectMessengerKernelIncomingCallId(
  state?: MessengerKernelState,
) {
  return getState(state).calls.incomingCallId;
}

export function selectMessengerKernelActiveCall(
  state?: MessengerKernelState,
): MessengerKernelCallRecord | null {
  const callId = selectMessengerKernelActiveCallId(state);
  return callId ? selectMessengerKernelCallById(callId, state) : null;
}

export function selectMessengerKernelIncomingCall(
  state?: MessengerKernelState,
): MessengerKernelCallRecord | null {
  const callId = selectMessengerKernelIncomingCallId(state);
  return callId ? selectMessengerKernelCallById(callId, state) : null;
}

export function selectMessengerKernelRoomUnreadCount(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
) {
  const room = selectMessengerKernelRoomById(roomId, state);
  const roomUnreadCount = getRoomUnreadCountFromRecord(room);

  if (roomUnreadCount !== null) {
    return Math.max(0, roomUnreadCount);
  }

  const resolvedCurrentUserId =
    normalizeString(currentUserId) ??
    selectMessengerKernelCurrentUserId(state);

  return selectMessengerKernelMessagesByRoomId(roomId, state).filter((message) => {
    if (isDeletedMessage(message)) {
      return false;
    }

    if (!isIncomingForUser(message, resolvedCurrentUserId)) {
      return false;
    }

    return message.status !== "read";
  }).length;
}

export function selectMessengerKernelRoomSummary(
  roomId: string,
  currentUserId?: string | null,
  state?: MessengerKernelState,
) {
  const room = selectMessengerKernelRoomById(roomId, state);
  const lastMessage = selectMessengerKernelLastMessageByRoomId(roomId, state);
  const unreadCount = selectMessengerKernelRoomUnreadCount(
    roomId,
    currentUserId,
    state,
  );
  const peerPresence = selectMessengerKernelPeerPresenceByRoomId(
    roomId,
    currentUserId,
    state,
  );

  return {
    room,
    lastMessage,
    unreadCount,
    peerPresence,
  };
}

export function selectMessengerKernelCounts(state?: MessengerKernelState) {
  const safeState = getState(state);

  return {
    rooms: safeState.rooms.ids.length,
    messages: safeState.messages.ids.length,
    participants: safeState.participants.ids.length,
    calls: safeState.calls.ids.length,
  };
}

export function selectMessengerKernelIsReady(state?: MessengerKernelState) {
  const safeState = getState(state);
  return safeState.initialized && safeState.runtimeStatus === "ready";
}