import type {
  MessengerKernelCallRecord,
  MessengerKernelCollectionKey,
  MessengerKernelMessageRecord,
  MessengerKernelParticipantRecord,
  MessengerKernelRealtimeStatus,
  MessengerKernelRoomRecord,
  MessengerKernelSessionBinding,
  MessengerKernelState,
} from "./types";

export type MessengerKernelEventMap = {
  "runtime:bound": {
    session: MessengerKernelSessionBinding;
    state: MessengerKernelState;
  };
  "runtime:cleared": {
    state: MessengerKernelState;
  };
  "runtime:error": {
    message: string;
    state: MessengerKernelState;
  };

  "rooms:replaced": {
    rooms: MessengerKernelRoomRecord[];
    state: MessengerKernelState;
  };
  "rooms:upserted": {
    rooms: MessengerKernelRoomRecord[];
    state: MessengerKernelState;
  };
  "rooms:removed": {
    ids: string[];
    state: MessengerKernelState;
  };

  "messages:replaced": {
    messages: MessengerKernelMessageRecord[];
    state: MessengerKernelState;
  };
  "messages:upserted": {
    messages: MessengerKernelMessageRecord[];
    state: MessengerKernelState;
  };
  "messages:removed": {
    ids: string[];
    state: MessengerKernelState;
  };

  "participants:replaced": {
    participants: MessengerKernelParticipantRecord[];
    state: MessengerKernelState;
  };
  "participants:upserted": {
    participants: MessengerKernelParticipantRecord[];
    state: MessengerKernelState;
  };
  "participants:removed": {
    ids: string[];
    state: MessengerKernelState;
  };

  "calls:replaced": {
    calls: MessengerKernelCallRecord[];
    state: MessengerKernelState;
  };
  "calls:upserted": {
    calls: MessengerKernelCallRecord[];
    state: MessengerKernelState;
  };
  "calls:removed": {
    ids: string[];
    state: MessengerKernelState;
  };
  "calls:active_changed": {
    callId: string | null;
    state: MessengerKernelState;
  };
  "calls:incoming_changed": {
    callId: string | null;
    state: MessengerKernelState;
  };

  "realtime:status_changed": {
    status: MessengerKernelRealtimeStatus;
    error: string | null;
    state: MessengerKernelState;
  };
  "realtime:event_received": {
    at: string;
    state: MessengerKernelState;
  };

  "collection:loading": {
    key: MessengerKernelCollectionKey;
    state: MessengerKernelState;
  };
  "collection:ready": {
    key: MessengerKernelCollectionKey;
    state: MessengerKernelState;
  };
  "collection:error": {
    key: MessengerKernelCollectionKey;
    message: string;
    state: MessengerKernelState;
  };

  "state:changed": {
    previousState: MessengerKernelState;
    state: MessengerKernelState;
  };
};

export type MessengerKernelEventName = keyof MessengerKernelEventMap;

export type MessengerKernelEventListener<
  TEventName extends MessengerKernelEventName,
> = (payload: MessengerKernelEventMap[TEventName]) => void;

type AnyMessengerKernelEventListener = (
  payload: MessengerKernelEventMap[MessengerKernelEventName],
) => void;

const listeners = new Map<
  MessengerKernelEventName,
  Set<AnyMessengerKernelEventListener>
>();

function getOrCreateListenerSet<TEventName extends MessengerKernelEventName>(
  eventName: TEventName,
) {
  const existing = listeners.get(eventName);
  if (existing) {
    return existing;
  }

  const created = new Set<AnyMessengerKernelEventListener>();
  listeners.set(eventName, created);
  return created;
}

export function emitMessengerKernelEvent<TEventName extends MessengerKernelEventName>(
  eventName: TEventName,
  payload: MessengerKernelEventMap[TEventName],
) {
  const eventListeners = listeners.get(eventName);
  if (!eventListeners || eventListeners.size === 0) {
    return;
  }

  for (const listener of eventListeners) {
    listener(payload as MessengerKernelEventMap[MessengerKernelEventName]);
  }
}

export function subscribeMessengerKernelEvent<
  TEventName extends MessengerKernelEventName,
>(
  eventName: TEventName,
  listener: MessengerKernelEventListener<TEventName>,
) {
  const eventListeners = getOrCreateListenerSet(eventName);
  eventListeners.add(listener as AnyMessengerKernelEventListener);

  return () => {
    const current = listeners.get(eventName);
    if (!current) {
      return;
    }

    current.delete(listener as AnyMessengerKernelEventListener);

    if (current.size === 0) {
      listeners.delete(eventName);
    }
  };
}

export function subscribeManyMessengerKernelEvents(
  subscriptions: {
    [TEventName in MessengerKernelEventName]?: MessengerKernelEventListener<TEventName>;
  },
) {
  const unsubs = (Object.entries(subscriptions) as Array<
    [MessengerKernelEventName, AnyMessengerKernelEventListener | undefined]
  >)
    .filter(([, listener]) => typeof listener === "function")
    .map(([eventName, listener]) =>
      subscribeMessengerKernelEvent(
        eventName,
        listener as MessengerKernelEventListener<typeof eventName>,
      ),
    );

  return () => {
    unsubs.forEach((unsubscribe) => unsubscribe());
  };
}

export function clearMessengerKernelEventBus() {
  listeners.clear();
}

export function getMessengerKernelEventListenerCount(
  eventName?: MessengerKernelEventName,
) {
  if (eventName) {
    return listeners.get(eventName)?.size ?? 0;
  }

  let total = 0;
  for (const set of listeners.values()) {
    total += set.size;
  }
  return total;
}