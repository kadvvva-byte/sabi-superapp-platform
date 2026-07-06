import { emitMessengerKernelEvent } from "../core/event-bus"
import {
  bindMessengerKernelRuntime,
  createKernelStore,
  getMessengerKernelState,
  removeMessengerKernelRooms,
  replaceMessengerKernelRooms,
  setMessengerKernelCollectionError,
  setMessengerKernelCollectionLoading,
  setMessengerKernelCollectionReady,
  upsertMessengerKernelRooms,
} from "../core/store"
import type { MessengerKernelRoomRecord } from "../core/types"
import {
  getMessengerRoomById,
  listMessengerRooms,
} from "./service"
import type {
  KernelMessengerRoom,
  KernelMessengerRoomsQuery,
  KernelMessengerRoomsResponse,
  KernelMessengerRoomsState,
} from "./types"

function nowIso() {
  return new Date().toISOString()
}

function normalizeRoomId(roomId: string) {
  return roomId.trim()
}

function createRoomsIndex(items: readonly KernelMessengerRoom[]) {
  const byId: Record<string, KernelMessengerRoom> = {}
  const roomIds: string[] = []

  for (const item of items) {
    const id = normalizeRoomId(item.id)
    if (!id) {
      continue
    }

    byId[id] = {
      ...item,
      id,
    }
    roomIds.push(id)
  }

  return {
    byId,
    roomIds,
  }
}

function mergeRooms(
  currentItems: readonly KernelMessengerRoom[],
  incomingItems: readonly KernelMessengerRoom[],
) {
  const map = new Map<string, KernelMessengerRoom>()

  currentItems.forEach((room) => {
    const id = normalizeRoomId(room.id)
    if (!id) return
    map.set(id, room)
  })

  incomingItems.forEach((room) => {
    const id = normalizeRoomId(room.id)
    if (!id) return

    const previous = map.get(id)
    map.set(id, {
      ...(previous ?? {}),
      ...room,
      id,
    })
  })

  return Array.from(map.values())
}

function normalizeErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }

  return "Messenger rooms request failed"
}

function buildStateFromItems(
  items: readonly KernelMessengerRoom[],
  current: KernelMessengerRoomsState,
  extra?: Partial<KernelMessengerRoomsState>,
): KernelMessengerRoomsState {
  const normalizedItems = items.map((item) => ({
    ...item,
    id: normalizeRoomId(item.id),
  }))
  const index = createRoomsIndex(normalizedItems)

  return {
    ...current,
    items: normalizedItems,
    byId: index.byId,
    roomIds: index.roomIds,
    isLoading: false,
    isRefreshing: false,
    isHydrated: true,
    errorMessage: null,
    lastFetchedAt: nowIso(),
    ...extra,
  }
}

const initialRoomsState: KernelMessengerRoomsState = {
  items: [],
  byId: {},
  roomIds: [],
  selectedRoomId: null,
  isLoading: false,
  isRefreshing: false,
  isHydrated: false,
  errorMessage: null,
  nextCursor: null,
  totalCount: null,
  lastFetchedAt: null,
  lastOpenedRoomId: null,
}

const roomsStore = createKernelStore<KernelMessengerRoomsState>(initialRoomsState)

export function getMessengerRoomsState() {
  return roomsStore.getState()
}

export function subscribeMessengerRoomsStore(
  listener: (state: KernelMessengerRoomsState) => void,
) {
  return roomsStore.subscribe(listener)
}

export function resetMessengerRoomsStore() {
  return roomsStore.reset()
}

function syncReplaceRoomsToKernel(
  items: readonly KernelMessengerRoom[],
) {
  replaceMessengerKernelRooms(items as readonly MessengerKernelRoomRecord[])
  setMessengerKernelCollectionReady("rooms")
  emitMessengerKernelEvent("rooms:replaced", {
    rooms: [...items],
    state: getMessengerKernelState(),
  })
}

function syncUpsertRoomsToKernel(
  items: readonly KernelMessengerRoom[],
) {
  upsertMessengerKernelRooms(items as readonly MessengerKernelRoomRecord[])
  setMessengerKernelCollectionReady("rooms")
  emitMessengerKernelEvent("rooms:upserted", {
    rooms: [...items],
    state: getMessengerKernelState(),
  })
}

export function selectMessengerRoom(roomId: string | null) {
  const normalizedRoomId = roomId?.trim() || null

  return roomsStore.patchState((prev) => ({
    selectedRoomId: normalizedRoomId,
    lastOpenedRoomId: normalizedRoomId,
    errorMessage: prev.errorMessage,
  }))
}

export async function hydrateMessengerRooms(
  query: KernelMessengerRoomsQuery = {},
) {
  await bindMessengerKernelRuntime()

  roomsStore.patchState({
    isLoading: true,
    isRefreshing: false,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("rooms")
  emitMessengerKernelEvent("collection:loading", {
    key: "rooms",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerRooms(query)
    const nextState = buildStateFromItems(
      response.items,
      roomsStore.getState(),
      {
        nextCursor: response.nextCursor,
        totalCount: response.totalCount,
      },
    )

    roomsStore.setState(nextState)
    syncReplaceRoomsToKernel(response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "rooms",
      state: getMessengerKernelState(),
    })

    return roomsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    roomsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("rooms", message)
    emitMessengerKernelEvent("collection:error", {
      key: "rooms",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function refreshMessengerRooms(
  query: KernelMessengerRoomsQuery = {},
) {
  await bindMessengerKernelRuntime()

  roomsStore.patchState({
    isLoading: false,
    isRefreshing: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("rooms")
  emitMessengerKernelEvent("collection:loading", {
    key: "rooms",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerRooms(query)
    const nextState = buildStateFromItems(
      response.items,
      roomsStore.getState(),
      {
        nextCursor: response.nextCursor,
        totalCount: response.totalCount,
      },
    )

    roomsStore.setState(nextState)
    syncReplaceRoomsToKernel(response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "rooms",
      state: getMessengerKernelState(),
    })

    return roomsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    roomsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("rooms", message)
    emitMessengerKernelEvent("collection:error", {
      key: "rooms",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMoreMessengerRooms(
  query: Omit<KernelMessengerRoomsQuery, "cursor"> = {},
) {
  await bindMessengerKernelRuntime()

  const currentState = roomsStore.getState()

  if (!currentState.nextCursor) {
    return currentState
  }

  roomsStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("rooms")
  emitMessengerKernelEvent("collection:loading", {
    key: "rooms",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerRooms({
      ...query,
      cursor: currentState.nextCursor,
    })

    const mergedItems = mergeRooms(currentState.items, response.items)
    const nextState = buildStateFromItems(
      mergedItems,
      roomsStore.getState(),
      {
        nextCursor: response.nextCursor,
        totalCount: response.totalCount ?? currentState.totalCount,
      },
    )

    roomsStore.setState(nextState)
    syncUpsertRoomsToKernel(response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "rooms",
      state: getMessengerKernelState(),
    })

    return roomsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    roomsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("rooms", message)
    emitMessengerKernelEvent("collection:error", {
      key: "rooms",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMessengerRoomById(roomId: string) {
  await bindMessengerKernelRuntime()

  roomsStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("rooms")
  emitMessengerKernelEvent("collection:loading", {
    key: "rooms",
    state: getMessengerKernelState(),
  })

  try {
    const room = await getMessengerRoomById(roomId)
    const currentState = roomsStore.getState()
    const mergedItems = mergeRooms(currentState.items, [room])

    roomsStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: room.id,
        lastOpenedRoomId: room.id,
      }),
    )

    syncUpsertRoomsToKernel([room])

    emitMessengerKernelEvent("collection:ready", {
      key: "rooms",
      state: getMessengerKernelState(),
    })

    return room
  } catch (error) {
    const message = normalizeErrorMessage(error)

    roomsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("rooms", message)
    emitMessengerKernelEvent("collection:error", {
      key: "rooms",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export function upsertLocalMessengerRooms(
  rooms: readonly KernelMessengerRoom[],
) {
  const currentState = roomsStore.getState()
  const mergedItems = mergeRooms(currentState.items, rooms)

  roomsStore.setState(
    buildStateFromItems(mergedItems, currentState, {
      nextCursor: currentState.nextCursor,
      totalCount: currentState.totalCount,
    }),
  )

  syncUpsertRoomsToKernel(rooms)
  return roomsStore.getState()
}

export function removeLocalMessengerRooms(ids: readonly string[]) {
  const idsToRemove = new Set(ids.map((id) => normalizeRoomId(id)).filter(Boolean))
  const currentState = roomsStore.getState()
  const nextItems = currentState.items.filter((room) => !idsToRemove.has(room.id))
  const selectedRoomStillExists =
    currentState.selectedRoomId && !idsToRemove.has(currentState.selectedRoomId)

  roomsStore.setState(
    buildStateFromItems(nextItems, currentState, {
      nextCursor: currentState.nextCursor,
      totalCount:
        typeof currentState.totalCount === "number"
          ? Math.max(currentState.totalCount - idsToRemove.size, 0)
          : currentState.totalCount,
      selectedRoomId: selectedRoomStillExists
        ? currentState.selectedRoomId
        : null,
    }),
  )

  removeMessengerKernelRooms([...idsToRemove])
  emitMessengerKernelEvent("rooms:removed", {
    ids: [...idsToRemove],
    state: getMessengerKernelState(),
  })

  return roomsStore.getState()
}