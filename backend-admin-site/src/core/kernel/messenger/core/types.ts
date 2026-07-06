export type MessengerKernelRuntimeStatus =
  | "idle"
  | "binding_session"
  | "ready"
  | "error";

export type MessengerKernelCollectionStatus =
  | "idle"
  | "loading"
  | "ready"
  | "error";

export type MessengerKernelRealtimeStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

export type MessengerKernelSessionBinding = {
  apiBaseUrl: string;
  accessToken: string;
  currentUserId: string;
  boundAt: string;
};

export type MessengerKernelBaseRecord = {
  id: string;
  [key: string]: unknown;
};

export type MessengerKernelRoomRecord = MessengerKernelBaseRecord;

export type MessengerKernelMessageRecord = MessengerKernelBaseRecord & {
  roomId?: string;
};

export type MessengerKernelParticipantRecord = MessengerKernelBaseRecord & {
  roomId?: string;
  userId?: string;
};

export type MessengerKernelCallRecord = MessengerKernelBaseRecord & {
  roomId?: string;
};

export type MessengerKernelCollectionState<
  TRecord extends MessengerKernelBaseRecord,
> = {
  ids: string[];
  records: Record<string, TRecord>;
  status: MessengerKernelCollectionStatus;
  error: string | null;
  lastSyncedAt: string | null;
};

export type MessengerKernelRealtimeState = {
  status: MessengerKernelRealtimeStatus;
  error: string | null;
  lastEventAt: string | null;
  lastConnectedAt: string | null;
};

export type MessengerKernelCallsState =
  MessengerKernelCollectionState<MessengerKernelCallRecord> & {
    activeCallId: string | null;
    incomingCallId: string | null;
  };

export type MessengerKernelState = {
  initialized: boolean;
  runtimeStatus: MessengerKernelRuntimeStatus;
  error: string | null;
  updatedAt: string | null;
  session: MessengerKernelSessionBinding | null;
  rooms: MessengerKernelCollectionState<MessengerKernelRoomRecord>;
  messages: MessengerKernelCollectionState<MessengerKernelMessageRecord>;
  participants: MessengerKernelCollectionState<MessengerKernelParticipantRecord>;
  calls: MessengerKernelCallsState;
  realtime: MessengerKernelRealtimeState;
};

export type MessengerKernelStoreListener = (
  state: MessengerKernelState,
) => void;

export type MessengerKernelStateUpdater =
  | MessengerKernelState
  | ((prev: MessengerKernelState) => MessengerKernelState);

export type MessengerKernelCollectionKey =
  | "rooms"
  | "messages"
  | "participants"
  | "calls";