import {
  requireMessengerKernelSessionSnapshot,
  resetMessengerKernelSession,
} from "../session/service"
import { MessengerKernelError } from "./errors"
import type {
  MessengerKernelBaseRecord,
  MessengerKernelCallRecord,
  MessengerKernelCallsState,
  MessengerKernelCollectionKey,
  MessengerKernelCollectionState,
  MessengerKernelCollectionStatus,
  MessengerKernelMessageRecord,
  MessengerKernelParticipantRecord,
  MessengerKernelRealtimeState,
  MessengerKernelRealtimeStatus,
  MessengerKernelRoomRecord,
  MessengerKernelSessionBinding,
  MessengerKernelState,
  MessengerKernelStateUpdater,
  MessengerKernelStoreListener,
} from "./types"

type KernelStoreUpdater<TState> = TState | ((prev: TState) => TState)
type KernelStoreListener<TState> = (state: TState) => void
type KernelStorePatch<TState extends Record<string, unknown>> =
  | Partial<TState>
  | ((prev: TState) => Partial<TState>)

export function createKernelStore<TState extends Record<string, unknown>>(
  initialState: TState,
) {
  let state = initialState
  const listeners = new Set<KernelStoreListener<TState>>()

  const emit = () => {
    listeners.forEach((listener) => listener(state))
  }

  const getState = () => state

  const setState = (updater: KernelStoreUpdater<TState>) => {
    state =
      typeof updater === "function"
        ? (updater as (prev: TState) => TState)(state)
        : updater

    emit()
    return state
  }

  const patchState = (patch: KernelStorePatch<TState>) => {
    const resolvedPatch =
      typeof patch === "function"
        ? (patch as (prev: TState) => Partial<TState>)(state)
        : patch

    state = {
      ...state,
      ...resolvedPatch,
    }

    emit()
    return state
  }

  const subscribe = (listener: KernelStoreListener<TState>) => {
    listeners.add(listener)
    listener(state)

    return () => {
      listeners.delete(listener)
    }
  }

  const reset = () => {
    state = initialState
    emit()
    return state
  }

  return {
    getState,
    setState,
    patchState,
    subscribe,
    reset,
  }
}

function nowIso() {
  return new Date().toISOString()
}

function createCollectionState<
  TRecord extends MessengerKernelBaseRecord,
>(): MessengerKernelCollectionState<TRecord> {
  return {
    ids: [],
    records: {},
    status: "idle",
    error: null,
    lastSyncedAt: null,
  }
}

function createCallsState(): MessengerKernelCallsState {
  return {
    ...createCollectionState<MessengerKernelCallRecord>(),
    activeCallId: null,
    incomingCallId: null,
  }
}

function createRealtimeState(): MessengerKernelRealtimeState {
  return {
    status: "idle",
    error: null,
    lastEventAt: null,
    lastConnectedAt: null,
  }
}

export function createEmptyMessengerKernelState(): MessengerKernelState {
  return {
    initialized: false,
    runtimeStatus: "idle",
    error: null,
    updatedAt: null,
    session: null,
    rooms: createCollectionState<MessengerKernelRoomRecord>(),
    messages: createCollectionState<MessengerKernelMessageRecord>(),
    participants: createCollectionState<MessengerKernelParticipantRecord>(),
    calls: createCallsState(),
    realtime: createRealtimeState(),
  }
}

let runtimeState: MessengerKernelState = createEmptyMessengerKernelState()
const listeners = new Set<MessengerKernelStoreListener>()

function emitState() {
  for (const listener of listeners) {
    listener(runtimeState)
  }
}

function resolveNextState(
  updater: MessengerKernelStateUpdater,
): MessengerKernelState {
  return typeof updater === "function"
    ? (updater as (prev: MessengerKernelState) => MessengerKernelState)(
        runtimeState,
      )
    : updater
}

function isSameSessionBinding(
  left: MessengerKernelSessionBinding | null,
  right: MessengerKernelSessionBinding | null,
) {
  if (!left || !right) {
    return false
  }

  return (
    left.apiBaseUrl === right.apiBaseUrl &&
    left.accessToken === right.accessToken &&
    left.currentUserId === right.currentUserId
  )
}

function buildSessionBinding(input: {
  apiBaseUrl: string
  accessToken: string
  currentUserId: string
}): MessengerKernelSessionBinding {
  return {
    apiBaseUrl: input.apiBaseUrl,
    accessToken: input.accessToken,
    currentUserId: input.currentUserId,
    boundAt: nowIso(),
  }
}

function cloneIds(ids: string[]) {
  return [...ids]
}

function upsertCollectionState<
  TRecord extends MessengerKernelBaseRecord,
  TState extends MessengerKernelCollectionState<TRecord>,
>(source: TState, items: readonly TRecord[]): TState {
  const nextRecords = { ...source.records }
  const nextIds = cloneIds(source.ids)

  for (const item of items) {
    if (!item?.id?.trim()) {
      continue
    }

    const id = item.id.trim()
    nextRecords[id] = {
      ...(nextRecords[id] ?? {}),
      ...item,
      id,
    }

    if (!nextIds.includes(id)) {
      nextIds.push(id)
    }
  }

  return {
    ...source,
    ids: nextIds,
    records: nextRecords,
    status: "ready",
    error: null,
    lastSyncedAt: nowIso(),
  } as TState
}

function replaceCollectionState<
  TRecord extends MessengerKernelBaseRecord,
  TState extends MessengerKernelCollectionState<TRecord>,
>(source: TState, items: readonly TRecord[]): TState {
  const nextRecords: Record<string, TRecord> = {}
  const nextIds: string[] = []

  for (const item of items) {
    if (!item?.id?.trim()) {
      continue
    }

    const id = item.id.trim()
    nextRecords[id] = {
      ...item,
      id,
    }
    nextIds.push(id)
  }

  return {
    ...source,
    ids: nextIds,
    records: nextRecords,
    status: "ready",
    error: null,
    lastSyncedAt: nowIso(),
  } as TState
}

function removeFromCollectionState<
  TRecord extends MessengerKernelBaseRecord,
  TState extends MessengerKernelCollectionState<TRecord>,
>(source: TState, ids: readonly string[]): TState {
  if (ids.length === 0) {
    return source
  }

  const idsToRemove = new Set(
    ids.map((value) => value.trim()).filter(Boolean),
  )

  const nextIds = source.ids.filter((id) => !idsToRemove.has(id))
  const nextRecords = { ...source.records }

  idsToRemove.forEach((id) => {
    delete nextRecords[id]
  })

  return {
    ...source,
    ids: nextIds,
    records: nextRecords,
    lastSyncedAt: nowIso(),
  } as TState
}

function patchCollectionStatus<
  TRecord extends MessengerKernelBaseRecord,
  TState extends MessengerKernelCollectionState<TRecord>,
>(
  source: TState,
  status: MessengerKernelCollectionStatus,
  error: string | null,
): TState {
  return {
    ...source,
    status,
    error,
    lastSyncedAt:
      status === "ready" || status === "error" ? nowIso() : source.lastSyncedAt,
  } as TState
}

function assertCollectionKey(
  key: MessengerKernelCollectionKey,
): MessengerKernelCollectionKey {
  if (
    key !== "rooms" &&
    key !== "messages" &&
    key !== "participants" &&
    key !== "calls"
  ) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_INVALID_STATE",
      message: `Unsupported messenger kernel collection key: ${String(key)}`,
    })
  }

  return key
}

function setCollectionStatus(
  key: MessengerKernelCollectionKey,
  status: MessengerKernelCollectionStatus,
  error: string | null = null,
) {
  const safeKey = assertCollectionKey(key)

  return setMessengerKernelState((prev) => ({
    ...prev,
    [safeKey]: patchCollectionStatus(
      prev[safeKey],
      status,
      error,
    ) as MessengerKernelState[typeof safeKey],
  }))
}

export function getMessengerKernelState(): MessengerKernelState {
  return runtimeState
}

export function setMessengerKernelState(
  updater: MessengerKernelStateUpdater,
): MessengerKernelState {
  const nextState = resolveNextState(updater)

  runtimeState = {
    ...nextState,
    updatedAt: nowIso(),
  }

  emitState()
  return runtimeState
}

export function subscribeMessengerKernelStore(
  listener: MessengerKernelStoreListener,
) {
  listeners.add(listener)
  listener(runtimeState)

  return () => {
    listeners.delete(listener)
  }
}

export function resetMessengerKernelStore() {
  runtimeState = createEmptyMessengerKernelState()
  emitState()
  return runtimeState
}

export async function bindMessengerKernelRuntime() {
  setMessengerKernelState((prev) => ({
    ...prev,
    runtimeStatus: "binding_session",
    error: null,
  }))

  try {
    const snapshot = await requireMessengerKernelSessionSnapshot()
    const nextBinding = buildSessionBinding(snapshot)
    const previousState = getMessengerKernelState()

    if (isSameSessionBinding(previousState.session, nextBinding)) {
      return setMessengerKernelState({
        ...previousState,
        initialized: true,
        runtimeStatus: "ready",
        error: null,
        session: {
          ...nextBinding,
          boundAt: previousState.session?.boundAt ?? nextBinding.boundAt,
        },
      })
    }

    const nextState = createEmptyMessengerKernelState()

    return setMessengerKernelState({
      ...nextState,
      initialized: true,
      runtimeStatus: "ready",
      error: null,
      session: nextBinding,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to bind messenger kernel runtime"

    return setMessengerKernelState((prev) => ({
      ...prev,
      initialized: false,
      runtimeStatus: "error",
      error: message,
    }))
  }
}

export function clearMessengerKernelRuntime() {
  resetMessengerKernelSession()
  return resetMessengerKernelStore()
}

export function setMessengerKernelError(message: string | null) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    runtimeStatus: message ? "error" : prev.runtimeStatus,
    error: message,
  }))
}

export function setMessengerKernelRealtimeStatus(
  status: MessengerKernelRealtimeStatus,
  error: string | null = null,
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    realtime: {
      ...prev.realtime,
      status,
      error,
      lastConnectedAt:
        status === "connected"
          ? nowIso()
          : prev.realtime.lastConnectedAt,
    },
  }))
}

export function markMessengerKernelRealtimeEvent() {
  return setMessengerKernelState((prev) => ({
    ...prev,
    realtime: {
      ...prev.realtime,
      lastEventAt: nowIso(),
      error: null,
    },
  }))
}

export function setMessengerKernelCollectionLoading(
  key: MessengerKernelCollectionKey,
) {
  return setCollectionStatus(key, "loading", null)
}

export function setMessengerKernelCollectionReady(
  key: MessengerKernelCollectionKey,
) {
  return setCollectionStatus(key, "ready", null)
}

export function setMessengerKernelCollectionError(
  key: MessengerKernelCollectionKey,
  message: string,
) {
  return setCollectionStatus(key, "error", message)
}

export function replaceMessengerKernelRooms(
  rooms: readonly MessengerKernelRoomRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    rooms: replaceCollectionState(prev.rooms, rooms),
  }))
}

export function upsertMessengerKernelRooms(
  rooms: readonly MessengerKernelRoomRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    rooms: upsertCollectionState(prev.rooms, rooms),
  }))
}

export function removeMessengerKernelRooms(ids: readonly string[]) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    rooms: removeFromCollectionState(prev.rooms, ids),
  }))
}

export function replaceMessengerKernelMessages(
  messages: readonly MessengerKernelMessageRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    messages: replaceCollectionState(prev.messages, messages),
  }))
}

export function upsertMessengerKernelMessages(
  messages: readonly MessengerKernelMessageRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    messages: upsertCollectionState(prev.messages, messages),
  }))
}

export function removeMessengerKernelMessages(ids: readonly string[]) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    messages: removeFromCollectionState(prev.messages, ids),
  }))
}

export function replaceMessengerKernelParticipants(
  participants: readonly MessengerKernelParticipantRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    participants: replaceCollectionState(prev.participants, participants),
  }))
}

export function upsertMessengerKernelParticipants(
  participants: readonly MessengerKernelParticipantRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    participants: upsertCollectionState(prev.participants, participants),
  }))
}

export function removeMessengerKernelParticipants(ids: readonly string[]) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    participants: removeFromCollectionState(prev.participants, ids),
  }))
}

export function replaceMessengerKernelCalls(
  calls: readonly MessengerKernelCallRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    calls: replaceCollectionState(prev.calls, calls),
  }))
}

export function upsertMessengerKernelCalls(
  calls: readonly MessengerKernelCallRecord[],
) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    calls: upsertCollectionState(prev.calls, calls),
  }))
}

export function removeMessengerKernelCalls(ids: readonly string[]) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    calls: removeFromCollectionState(prev.calls, ids),
  }))
}

export function setMessengerKernelActiveCallId(callId: string | null) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    calls: {
      ...prev.calls,
      activeCallId: callId?.trim() || null,
    },
  }))
}

export function setMessengerKernelIncomingCallId(callId: string | null) {
  return setMessengerKernelState((prev) => ({
    ...prev,
    calls: {
      ...prev.calls,
      incomingCallId: callId?.trim() || null,
    },
  }))
}