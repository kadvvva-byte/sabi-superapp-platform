import { emitMessengerKernelEvent } from "../core/event-bus"
import {
  bindMessengerKernelRuntime,
  createKernelStore,
  getMessengerKernelState,
  removeMessengerKernelParticipants,
  setMessengerKernelCollectionError,
  setMessengerKernelCollectionLoading,
  setMessengerKernelCollectionReady,
  upsertMessengerKernelParticipants,
} from "../core/store"
import type { MessengerKernelParticipantRecord } from "../core/types"
import {
  getMessengerParticipantById,
  listMessengerParticipantsByRoom,
} from "./service"
import type {
  KernelMessengerParticipant,
  KernelMessengerParticipantsQuery,
  KernelMessengerParticipantsState,
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

function sortParticipants(participants: KernelMessengerParticipant[]) {
  return [...participants].sort((left, right) => {
    if (left.isSelf !== right.isSelf) {
      return left.isSelf ? -1 : 1
    }

    return left.displayName.localeCompare(right.displayName)
  })
}

function createParticipantsIndex(items: readonly KernelMessengerParticipant[]) {
  const byId: Record<string, KernelMessengerParticipant> = {}
  const participantIdsByRoomId: Record<string, string[]> = {}

  for (const participant of sortParticipants([...items])) {
    const id = normalizeId(participant.id)
    const roomId = normalizeRoomId(participant.roomId)

    if (!id || !roomId) {
      continue
    }

    byId[id] = {
      ...participant,
      id,
      roomId,
    }

    if (!participantIdsByRoomId[roomId]) {
      participantIdsByRoomId[roomId] = []
    }

    participantIdsByRoomId[roomId].push(id)
  }

  return {
    byId,
    participantIdsByRoomId,
  }
}

function mergeParticipants(
  currentItems: readonly KernelMessengerParticipant[],
  incomingItems: readonly KernelMessengerParticipant[],
) {
  const map = new Map<string, KernelMessengerParticipant>()

  currentItems.forEach((participant) => {
    const id = normalizeId(participant.id)
    if (!id) return
    map.set(id, participant)
  })

  incomingItems.forEach((participant) => {
    const id = normalizeId(participant.id)
    if (!id) return

    const previous = map.get(id)
    map.set(id, {
      ...(previous ?? {}),
      ...participant,
      id,
      roomId: normalizeRoomId(participant.roomId),
    })
  })

  return Array.from(map.values())
}

function replaceRoomParticipants(
  currentItems: readonly KernelMessengerParticipant[],
  roomId: string,
  roomParticipants: readonly KernelMessengerParticipant[],
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  const otherRoomItems = currentItems.filter(
    (participant) => normalizeRoomId(participant.roomId) !== normalizedRoomId,
  )

  return mergeParticipants(otherRoomItems, roomParticipants)
}

function normalizeErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }

  return "Messenger participants request failed"
}

function buildStateFromItems(
  items: readonly KernelMessengerParticipant[],
  current: KernelMessengerParticipantsState,
  extra?: Partial<KernelMessengerParticipantsState>,
): KernelMessengerParticipantsState {
  const normalizedItems = sortParticipants(
    items.map((item) => ({
      ...item,
      id: normalizeId(item.id),
      roomId: normalizeRoomId(item.roomId),
    })),
  )

  const index = createParticipantsIndex(normalizedItems)

  return {
    ...current,
    items: normalizedItems,
    byId: index.byId,
    participantIdsByRoomId: index.participantIdsByRoomId,
    isLoading: false,
    isRefreshing: false,
    isHydrated: true,
    errorMessage: null,
    ...extra,
  }
}

function getRoomParticipantIds(
  state: KernelMessengerParticipantsState,
  roomId: string,
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  return [...(state.participantIdsByRoomId[normalizedRoomId] ?? [])]
}

function syncUpsertParticipantsToKernel(
  participants: readonly KernelMessengerParticipant[],
) {
  if (participants.length === 0) {
    setMessengerKernelCollectionReady("participants")
    return
  }

  upsertMessengerKernelParticipants(
    participants as readonly MessengerKernelParticipantRecord[],
  )
  setMessengerKernelCollectionReady("participants")

  emitMessengerKernelEvent("participants:upserted", {
    participants: [...participants],
    state: getMessengerKernelState(),
  })
}

function syncReplaceRoomParticipantsToKernel(
  previousRoomParticipantIds: readonly string[],
  nextParticipants: readonly KernelMessengerParticipant[],
) {
  const nextIds = new Set(
    nextParticipants.map((participant) => normalizeId(participant.id)),
  )
  const removedIds = previousRoomParticipantIds.filter((id) => !nextIds.has(id))

  if (removedIds.length > 0) {
    removeMessengerKernelParticipants(removedIds)
    emitMessengerKernelEvent("participants:removed", {
      ids: removedIds,
      state: getMessengerKernelState(),
    })
  }

  upsertMessengerKernelParticipants(
    nextParticipants as readonly MessengerKernelParticipantRecord[],
  )
  setMessengerKernelCollectionReady("participants")

  emitMessengerKernelEvent("participants:replaced", {
    participants: [...nextParticipants],
    state: getMessengerKernelState(),
  })
}

const initialParticipantsState: KernelMessengerParticipantsState = {
  items: [],
  byId: {},
  participantIdsByRoomId: {},
  selectedRoomId: null,
  isLoading: false,
  isRefreshing: false,
  isHydrated: false,
  errorMessage: null,
  nextCursorByRoomId: {},
  totalCountByRoomId: {},
  lastFetchedAtByRoomId: {},
}

const participantsStore =
  createKernelStore<KernelMessengerParticipantsState>(initialParticipantsState)

export function getMessengerParticipantsState() {
  return participantsStore.getState()
}

export function subscribeMessengerParticipantsStore(
  listener: (state: KernelMessengerParticipantsState) => void,
) {
  return participantsStore.subscribe(listener)
}

export function resetMessengerParticipantsStore() {
  return participantsStore.reset()
}

export function selectMessengerParticipantsRoom(roomId: string | null) {
  return participantsStore.patchState({
    selectedRoomId: roomId?.trim() || null,
  })
}

export async function hydrateMessengerParticipantsForRoom(
  query: KernelMessengerParticipantsQuery,
) {
  await bindMessengerKernelRuntime()

  const roomId = normalizeRoomId(query.roomId)
  const currentState = participantsStore.getState()
  const previousRoomParticipantIds = getRoomParticipantIds(currentState, roomId)

  participantsStore.patchState({
    isLoading: true,
    isRefreshing: false,
    errorMessage: null,
    selectedRoomId: roomId,
  })
  setMessengerKernelCollectionLoading("participants")

  emitMessengerKernelEvent("collection:loading", {
    key: "participants",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerParticipantsByRoom({
      ...query,
      roomId,
    })

    const nextItems = replaceRoomParticipants(
      currentState.items,
      roomId,
      response.items,
    )
    const nextState = buildStateFromItems(nextItems, participantsStore.getState(), {
      selectedRoomId: roomId,
      nextCursorByRoomId: {
        ...participantsStore.getState().nextCursorByRoomId,
        [roomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...participantsStore.getState().totalCountByRoomId,
        [roomId]: response.totalCount,
      },
      lastFetchedAtByRoomId: {
        ...participantsStore.getState().lastFetchedAtByRoomId,
        [roomId]: nowIso(),
      },
    })

    participantsStore.setState(nextState)
    syncReplaceRoomParticipantsToKernel(
      previousRoomParticipantIds,
      response.items,
    )

    emitMessengerKernelEvent("collection:ready", {
      key: "participants",
      state: getMessengerKernelState(),
    })

    return participantsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    participantsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("participants", message)

    emitMessengerKernelEvent("collection:error", {
      key: "participants",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function refreshMessengerParticipantsForRoom(
  query: KernelMessengerParticipantsQuery,
) {
  await bindMessengerKernelRuntime()

  const roomId = normalizeRoomId(query.roomId)
  const currentState = participantsStore.getState()
  const previousRoomParticipantIds = getRoomParticipantIds(currentState, roomId)

  participantsStore.patchState({
    isLoading: false,
    isRefreshing: true,
    errorMessage: null,
    selectedRoomId: roomId,
  })
  setMessengerKernelCollectionLoading("participants")

  emitMessengerKernelEvent("collection:loading", {
    key: "participants",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerParticipantsByRoom({
      ...query,
      roomId,
    })

    const nextItems = replaceRoomParticipants(
      currentState.items,
      roomId,
      response.items,
    )
    const nextState = buildStateFromItems(nextItems, participantsStore.getState(), {
      selectedRoomId: roomId,
      nextCursorByRoomId: {
        ...participantsStore.getState().nextCursorByRoomId,
        [roomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...participantsStore.getState().totalCountByRoomId,
        [roomId]: response.totalCount,
      },
      lastFetchedAtByRoomId: {
        ...participantsStore.getState().lastFetchedAtByRoomId,
        [roomId]: nowIso(),
      },
    })

    participantsStore.setState(nextState)
    syncReplaceRoomParticipantsToKernel(
      previousRoomParticipantIds,
      response.items,
    )

    emitMessengerKernelEvent("collection:ready", {
      key: "participants",
      state: getMessengerKernelState(),
    })

    return participantsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    participantsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("participants", message)

    emitMessengerKernelEvent("collection:error", {
      key: "participants",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMoreMessengerParticipantsForRoom(
  roomId: string,
  query: Omit<KernelMessengerParticipantsQuery, "roomId" | "cursor"> = {},
) {
  await bindMessengerKernelRuntime()

  const normalizedRoomId = normalizeRoomId(roomId)
  const currentState = participantsStore.getState()
  const nextCursor = currentState.nextCursorByRoomId[normalizedRoomId]

  if (!nextCursor) {
    return currentState
  }

  participantsStore.patchState({
    isLoading: true,
    errorMessage: null,
    selectedRoomId: normalizedRoomId,
  })
  setMessengerKernelCollectionLoading("participants")

  emitMessengerKernelEvent("collection:loading", {
    key: "participants",
    state: getMessengerKernelState(),
  })

  try {
    const response = await listMessengerParticipantsByRoom({
      ...query,
      roomId: normalizedRoomId,
      cursor: nextCursor,
    })

    const mergedRoomItems = mergeParticipants(
      getRoomParticipants(normalizedRoomId, currentState),
      response.items,
    )
    const nextItems = replaceRoomParticipants(
      currentState.items,
      normalizedRoomId,
      mergedRoomItems,
    )
    const nextState = buildStateFromItems(nextItems, participantsStore.getState(), {
      selectedRoomId: normalizedRoomId,
      nextCursorByRoomId: {
        ...participantsStore.getState().nextCursorByRoomId,
        [normalizedRoomId]: response.nextCursor,
      },
      totalCountByRoomId: {
        ...participantsStore.getState().totalCountByRoomId,
        [normalizedRoomId]:
          response.totalCount ??
          participantsStore.getState().totalCountByRoomId[normalizedRoomId] ??
          null,
      },
      lastFetchedAtByRoomId: {
        ...participantsStore.getState().lastFetchedAtByRoomId,
        [normalizedRoomId]: nowIso(),
      },
    })

    participantsStore.setState(nextState)
    syncUpsertParticipantsToKernel(response.items)

    emitMessengerKernelEvent("collection:ready", {
      key: "participants",
      state: getMessengerKernelState(),
    })

    return participantsStore.getState()
  } catch (error) {
    const message = normalizeErrorMessage(error)

    participantsStore.patchState({
      isLoading: false,
      isRefreshing: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("participants", message)

    emitMessengerKernelEvent("collection:error", {
      key: "participants",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export async function loadMessengerParticipantById(participantId: string) {
  await bindMessengerKernelRuntime()

  participantsStore.patchState({
    isLoading: true,
    errorMessage: null,
  })
  setMessengerKernelCollectionLoading("participants")

  emitMessengerKernelEvent("collection:loading", {
    key: "participants",
    state: getMessengerKernelState(),
  })

  try {
    const participant = await getMessengerParticipantById(participantId)
    const currentState = participantsStore.getState()
    const mergedItems = mergeParticipants(currentState.items, [participant])

    participantsStore.setState(
      buildStateFromItems(mergedItems, currentState, {
        selectedRoomId: participant.roomId,
      }),
    )
    syncUpsertParticipantsToKernel([participant])

    emitMessengerKernelEvent("collection:ready", {
      key: "participants",
      state: getMessengerKernelState(),
    })

    return participant
  } catch (error) {
    const message = normalizeErrorMessage(error)

    participantsStore.patchState({
      isLoading: false,
      errorMessage: message,
    })
    setMessengerKernelCollectionError("participants", message)

    emitMessengerKernelEvent("collection:error", {
      key: "participants",
      message,
      state: getMessengerKernelState(),
    })

    throw error
  }
}

export function getRoomParticipants(
  roomId: string,
  state: KernelMessengerParticipantsState = participantsStore.getState(),
) {
  const normalizedRoomId = normalizeRoomId(roomId)
  const ids = state.participantIdsByRoomId[normalizedRoomId] ?? []

  return ids.map((id) => state.byId[id]).filter(Boolean)
}

export function upsertLocalMessengerParticipants(
  participants: readonly KernelMessengerParticipant[],
) {
  const currentState = participantsStore.getState()
  const mergedItems = mergeParticipants(currentState.items, participants)

  participantsStore.setState(buildStateFromItems(mergedItems, currentState))
  syncUpsertParticipantsToKernel(participants)

  return participantsStore.getState()
}

export function removeLocalMessengerParticipants(ids: readonly string[]) {
  const idsToRemove = new Set(ids.map((id) => normalizeId(id)).filter(Boolean))
  const currentState = participantsStore.getState()
  const nextItems = currentState.items.filter(
    (participant) => !idsToRemove.has(normalizeId(participant.id)),
  )

  participantsStore.setState(buildStateFromItems(nextItems, currentState))
  removeMessengerKernelParticipants([...idsToRemove])

  emitMessengerKernelEvent("participants:removed", {
    ids: [...idsToRemove],
    state: getMessengerKernelState(),
  })

  return participantsStore.getState()
}