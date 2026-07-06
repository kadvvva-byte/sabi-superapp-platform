import type { Server } from "socket.io";

import { RealtimeChannels, RealtimeEvents } from "./realtime.channels";

let realtimeEmitterServer: Server | null = null;

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function configureRealtimeEmitter(io: Server) {
  realtimeEmitterServer = io;
}

export function resetRealtimeEmitter() {
  realtimeEmitterServer = null;
}

export function hasRealtimeEmitter() {
  return Boolean(realtimeEmitterServer);
}

function emitRoom(room: string, eventName: string, payload: unknown) {
  const safeRoom = normalizeString(room);
  const safeEventName = normalizeString(eventName);

  if (!realtimeEmitterServer || !safeRoom || !safeEventName) return;

  realtimeEmitterServer.to(safeRoom).emit(safeEventName, payload);
  realtimeEmitterServer.to(safeRoom).emit(RealtimeEvents.realtimeEvent, {
    room: safeRoom,
    event: safeEventName,
    payload,
  });
}

export function emitToUser(userId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.user(userId), eventName, payload);
}

export function emitAuthRealtime(userId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.authUser(userId), eventName, payload);
  emitRoom(RealtimeChannels.user(userId), eventName, payload);
}

export function emitUserRealtime(userId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.user(userId), eventName, payload);
  emitRoom(RealtimeChannels.userProfile(userId), eventName, payload);
}

export function emitNotificationRealtime(
  userId: string,
  eventName: string,
  payload: unknown,
) {
  emitRoom(RealtimeChannels.notificationUser(userId), eventName, payload);
  emitRoom(RealtimeChannels.user(userId), eventName, payload);
}

export function emitWalletUserRealtime(
  userId: string,
  eventName: string,
  payload: unknown,
) {
  emitRoom(RealtimeChannels.walletUser(userId), eventName, payload);
  emitRoom(RealtimeChannels.user(userId), eventName, payload);
}

export function emitWalletEntityRealtime(params: {
  walletId?: string;
  operationId?: string;
  eventName: string;
  payload: unknown;
}) {
  if (normalizeString(params.walletId)) {
    emitRoom(
      RealtimeChannels.wallet(params.walletId as string),
      params.eventName,
      params.payload,
    );
  }

  if (normalizeString(params.operationId)) {
    emitRoom(
      RealtimeChannels.walletOperation(params.operationId as string),
      params.eventName,
      params.payload,
    );
  }
}

export function emitChatRealtime(chatId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.chat(chatId), eventName, payload);
}

export function emitCallRealtime(roomId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.call(roomId), eventName, payload);
}

export function emitWebRtcRealtime(roomId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.webrtc(roomId), eventName, payload);
}

export function emitLiveLocationRealtime(chatId: string, eventName: string, payload: unknown) {
  emitRoom(RealtimeChannels.liveLocation(chatId), eventName, payload);
}