import { emitMessengerKernelEvent } from "../core/event-bus"
import {
  bindMessengerKernelRuntime,
  createKernelStore,
  getMessengerKernelState,
  removeMessengerKernelMessages,
  setMessengerKernelCollectionError,
  setMessengerKernelCollectionLoading,
  setMessengerKernelCollectionReady,
  upsertMessengerKernelMessages,
} from "../core/store"
import type { MessengerKernelMessageRecord } from "../core/types"
import {
  deleteMessengerMessage,
  getMessengerMessageById,
  listMessengerMessagesByRoom,
  markMessengerMessageRead,
  sendMessengerMessage,
  updateMessengerMessage,
} from "./service"
import type {
  KernelMessengerCreateMessageInput,
  KernelMessengerMessage,
  KernelMessengerMessagesQuery,
  KernelMessengerMessagesState,
  KernelMessengerUpdateMessageInput,
} from "./types"

function nowIso() {
  return new Date().toISOString()
}

function normalizeId(value: string) {
  return value.trim()
}

function normalizeRoomId(value: string) {
  return value.trim()
}

function sortMessages(messages: KernelMessengerMessage[]) {
  return [...messages].sort((left, right) => {
    const leftDate =
      Date.parse(
        left.sentAt ??
          left.createdAt ??
          left.updatedAt ??
          "1970-01-01T00:00:00.000Z",
      ) || 0
    const rightDate =
      Date.parse(
        right.sentAt ??
          right.createdAt ??
          right.updatedAt ??
          "1970-01-01T00:00:00.000Z",
      ) || 0

    if (leftDate === rightDate) {
      return left.id.localeCompare(right.id)
    }

    return leftDate - rightDate
  })
}

function createMessagesIndex(items: readonly KernelMessengerMessage[]) {
  const byId: Record<string, KernelMessengerMessage> = {}
  const messageIdsByRoomId: Record<string, string[]> = {}

  for (const message of sortMessages([...items])) {
    const id = normalizeId(message.id)
    const roomId = normalizeRoomId(message.roomId)

    if (!id || !roomId) {
      continue
    }

    byId[id] = {
      ...message,
      id,
      roomId,
    }

    if (!messageIdsByRoomId[roomId]) {
      messageIdsByRoomId[roomId] = []
    }

    messageIdsByRoomId[roomId].push(id)
  }

  return {
    byId,
    messageIdsByRoomId,
  }
}

function mergeMessages(
  currentItems: readonly KernelMessengerMessage[],
  incomingItems: readonly KernelMessengerMessage[],
) {
  const map = new Map<string, KernelMessengerMessage>()

  currentItems.forEach((message) => {
    const id = normalizeId(message.id)
    if (!id) return
    map.set(id, message)
  })

  incomingItems.forEach((message) => {
    const id = normalizeId(message.id)
    if (!id) return

    const previous = map.get(id)
    map.set(id, {
      ...(previous ?? {}),
      ...message,
      id,
      roomId: normalizeRoomId(message.roomId),
    })
  })

  return Array.from(map.values())
}

function replaceRoomMessages(
  currentItems: readonly KernelMessengerMessage[],
  roomId: string,
  roomMessages: readonly KernelMessengerMessage[],
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  const otherRoomItems = currentItems.filter(
    (message) => normalizeRoomId(message.roomId) !== normalizedRoomId,
  )

  return mergeMessages(otherRoomItems, roomMessages)
}

function normalizeErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }

  return "Messenger messages request failed"
}

function buildStateFromItems(
  items: readonly KernelMessengerMessage[],
  current: KernelMessengerMessagesState,
  extra?: Partial<KernelMessengerMessagesState>,
): KernelMessengerMessagesState {
  const normalizedItems = sortMessages(
    items.map((item) => ({
      ...item,
      id: normalizeId(item.id),
      roomId: normalizeRoomId(item.roomId),
    })),
  )

  const index = createMessagesIndex(normalizedItems)

  return {
    ...current,
    items: normalizedItems,
    byId: index.byId,
    messageIdsByRoomId: index.messageIdsByRoomId,
    isLoading: false,
    isRefreshing: false,
    isSending: false,
    isHydrated: true,
    errorMessage: null,
    ...extra,
  }
}

function getRoomMessageIds(
  state: KernelMessengerMessagesState,
  roomId: string,
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  return [...(state.messageIdsByRoomId[normalizedRoomId] ?? [])]
}

function syncUpsertMessagesToKernel(
  messages: readonly KernelMessengerMessage[],
) {
  if (messages.length === 0) {
    setMessengerKernelCollectionReady("messages")
    return
  }

  upsertMessengerKernelMessages(messages as readonly MessengerKernelMessageRecord[])
  setMessengerKernelCollectionReady("messages")

  emitMessengerKernelEvent("messages:upserted", {
    messages: [...messages],
    state: getMessengerKernelState(),
  })
}

function syncReplaceRoomMessagesToKernel(
  previousRoomMessageIds: readonly string[],
  nextMessages: readonly KernelMessengerMessage[],
) {
  const nextIds = new Set(nextMessages.map((message) => normalizeId(message.id)))
  const removedIds = previousRoomMessageIds.filter((id) => !nextIds.has(id))

  if (removedIds.length > 0) {
    removeMessengerKernelMessages(removedIds)
    emitMessengerKernelEvent("messages:removed", {
      ids: removedIds,
      state: getMessengerKernelState(),
    })
  }

  upsertMessengerKernelMessages(nextMessages as readonly MessengerKernelMessageRecord[])
  setMessengerKernelCollectionReady("messages")

  emitMessengerKernelEvent("messages:replaced", {
    messages: [...nextMessages],
    state: getMessengerKernelState(),
  })
}

const initialMessagesState: KernelMessengerMessagesState = {
  items: [],
  byId: {},
  messageIdsByRoomId: {},
  selectedRoomId: null,
  isLoading: false,
  isRefreshing: false,
  isSending: false,
  isHydrated: false,
  errorMessage: null,
  nextCursorByRoomId: {},
  totalCountByRoomId: {},
  lastFetchedAtByRoomId: {},
}

const messagesStore =
  createKernelStore<KernelMessengerMessagesState>(initialMessagesState)

export function getMessengerMessagesState() {
  return messagesStore.getState()
}

export function subscribeMessengerMessagesStore(
  listener: (state: KernelMessengerMessagesState) => void,
) {
  return messagesStore.subscribe(listener)
}

export function resetMessengerMessagesStore() {
  return messagesStore.reset()
}

export function selectMessengerMessagesRoom(roomId: string | null) {
  return messagesStore.patchState({
    selectedRoomId: roomId?.trim() || null,
  })
}

export async function hydrateMessengerMessagesForRoom(
  query: KernelMessengerMessagesQuery,
) {
  await bindMessengerKernelRuntime()

  const roomId = normalizeRoomId(query.roomId)
  const currentState = messagesStore.getState()
  const previousRoomMessageIds = getRoomMessageIds(currentState, roomId)

  messagesStore.patchState({
    isLoading: true,
    isRefreshing: false,
    errorMessage: null,
    selectedRoomId: roomId,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerMessagesByRoom({
      ...query,
      roomId,
    })

    const nextItems = replaceRoomMessages(currentState.items, roomId, response.items)
    const nextState = buildStateFromItems(nextItems, messagesStore.getState(), {
      selectedRoomId: roomId,
      nextCursorByRoomId: {
        ...messagesStore.getState().nextCursorByRoomId,
        [roomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...messagesStore.getState().totalCountByRoomId,
        [roomId]: response.totalCount,
      },
      lastFetchedAtByRoomId: {
        ...messagesStore.getState().lastFetchedAtByRoomId,
        [roomId]: nowIso(),
      },
    })

    messagesStore.setState(nextState)
    syncReplaceRoomMessagesToKernel(previousRoomMessageIds, response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return messagesStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function refreshMessengerMessagesForRoom(
  query: KernelMessengerMessagesQuery,
) {
  await bindMessengerKernelRuntime()

  const roomId = normalizeRoomId(query.roomId)
  const currentState = messagesStore.getState()
  const previousRoomMessageIds = getRoomMessageIds(currentState, roomId)

  messagesStore.patchState({
    isLoading: false,
    isRefreshing: true,
    errorMessage: null,
    selectedRoomId: roomId,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerMessagesByRoom({
      ...query,
      roomId,
    })

    const nextItems = replaceRoomMessages(currentState.items, roomId, response.items)
    const nextState = buildStateFromItems(nextItems, messagesStore.getState(), {
      selectedRoomId: roomId,
      nextCursorByRoomId: {
        ...messagesStore.getState().nextCursorByRoomId,
        [roomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...messagesStore.getState().totalCountByRoomId,
        [roomId]: response.totalCount,
      },
      lastFetchedAtByRoomId: {
        ...messagesStore.getState().lastFetchedAtByRoomId,
        [roomId]: nowIso(),
      },
    })

    messagesStore.setState(nextState)
    syncReplaceRoomMessagesToKernel(previousRoomMessageIds, response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return messagesStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMoreMessengerMessagesForRoom(
  roomId: string,
  query: Omit<KernelMessengerMessagesQuery, "roomId" | "cursor"> = {},
) {
  await bindMessengerKernelRuntime()

  const normalizedRoomId = normalizeRoomId(roomId)
  const currentState = messagesStore.getState()
  const nextCursor = currentState.nextCursorByRoomId[normalizedRoomId]

  if (!nextCursor) {
    return currentState
  }

  messagesStore.patchState({
    isLoading: true,
    errorMessage: null,
    selectedRoomId: normalizedRoomId,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerMessagesByRoom({
      ...query,
      roomId: normalizedRoomId,
      cursor: nextCursor,
    })

    const mergedRoomItems = mergeMessages(
      getRoomMessages(normalizedRoomId, currentState),
      response.items,
    )
    const nextItems = replaceRoomMessages(
      currentState.items,
      normalizedRoomId,
      mergedRoomItems,
    )
    const nextState = buildStateFromItems(nextItems, messagesStore.getState(), {
      selectedRoomId: normalizedRoomId,
      nextCursorByRoomId: {
        ...messagesStore.getState().nextCursorByRoomId,
        [normalizedRoomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...messagesStore.getState().totalCountByRoomId,
        [normalizedRoomId]:
          response.totalCount ??
          messagesStore.getState().totalCountByRoomId[normalizedRoomId] ??
          null,
      },
      lastFetchedAtByRoomId: {
        ...messagesStore.getState().lastFetchedAtByRoomId,
        [normalizedRoomId]: nowIso(),
      },
    })

    messagesStore.setState(nextState)
    syncUpsertMessagesToKernel(response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return messagesStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMessengerMessageById(messageId: string) {
  await bindMessengerKernelRuntime()

  messagesStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const message = await getMessengerMessageById(messageId)
    const currentState = messagesStore.getState()
    const mergedItems = mergeMessages(currentState.items, [message])

    messagesStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: message.roomId,
      }),
    )
    syncUpsertMessagesToKernel([message])

    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return message
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function sendMessengerTextMessage(
  input: KernelMessengerCreateMessageInput,
) {
  await bindMessengerKernelRuntime()

  messagesStore.patchState({
    isSending: true,
    errorMessage: null,
  })

  try {
    const message = await sendMessengerMessage({
      ...input,
      kind: input.kind ?? "text",
    })
    const currentState = messagesStore.getState()
    const mergedItems = mergeMessages(currentState.items, [message])

    messagesStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: message.roomId,
      }),
    )
    syncUpsertMessagesToKernel([message])

    return message
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isSending: false,
      errorMessage: message,
    })
    throw error
  }
}

export async function updateMessengerMessageById(
  input: KernelMessengerUpdateMessageInput,
) {
  await bindMessengerKernelRuntime()

  messagesStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const message = await updateMessengerMessage(input)
    const currentState = messagesStore.getState()
    const mergedItems = mergeMessages(currentState.items, [message])

    messagesStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: message.roomId,
      }),
    )
    syncUpsertMessagesToKernel([message])

    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return message
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function markMessengerMessageAsRead(messageId: string) {
  await bindMessengerKernelRuntime()

  try {
    const message = await markMessengerMessageRead(messageId)
    const currentState = messagesStore.getState()
    const mergedItems = mergeMessages(currentState.items, [message])

    messagesStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: message.roomId,
      }),
    )
    syncUpsertMessagesToKernel([message])

    return message
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      errorMessage: message,
    })
    throw error
  }
}

export async function deleteMessengerMessageById(messageId: string) {
  await bindMessengerKernelRuntime()

  messagesStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("messages")

  emitMessengerKernelEvent("collection:loading", {
    key: "messages",
    state: getMessengerKernelState(),
  })

  try {
    const result = await deleteMessengerMessage(messageId)
    const normalizedId = normalizeId(result.id)
    const currentState = messagesStore.getState()
    const nextItems = currentState.items.filter(
      (message) => normalizeId(message.id) !== normalizedId,
    )

    messagesStore.setState(buildStateFromItems(nextItems, currentState))
    removeMessengerKernelMessages([normalizedId])

    emitMessengerKernelEvent("messages:removed", {
      ids: [normalizedId],
      state: getMessengerKernelState(),
    })
    emitMessengerKernelEvent("collection:ready", {
      key: "messages",
      state: getMessengerKernelState(),
    })

    return result
  } catch (error) {
    const message = normalizeErrorMessage(error)

    messagesStore.patchState({
      isLoading: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("messages", message)

    emitMessengerKernelEvent("collection:error", {
      key: "messages",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export function getRoomMessages(
  roomId: string,
  state: KernelMessengerMessagesState = messagesStore.getState(),
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  const ids = state.messageIdsByRoomId[normalizedRoomId] ?? []

  return ids
    .map((id) => state.byId[id])
    .filter(Boolean)
}

export function upsertLocalMessengerMessages(
  messages: readonly KernelMessengerMessage[],
) {
  const currentState = messagesStore.getState()
  const mergedItems = mergeMessages(currentState.items, messages)

  messagesStore.setState(buildStateFromItems(mergedItems, currentState))
  syncUpsertMessagesToKernel(messages)

  return messagesStore.getState()
}

export function removeLocalMessengerMessages(ids: readonly string[]) {
  const idsToRemove = new Set(ids.map((id) => normalizeId(id)).filter(Boolean))
  const currentState = messagesStore.getState()
  const nextItems = currentState.items.filter(
    (message) => !idsToRemove.has(normalizeId(message.id)),
  )

  messagesStore.setState(buildStateFromItems(nextItems, currentState))
  removeMessengerKernelMessages([...idsToRemove])

  emitMessengerKernelEvent("messages:removed", {
    ids: [...idsToRemove],
    state: getMessengerKernelState(),
  })

  return messagesStore.getState()
}