function normalizeSegment(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export const RealtimeChannels = {
  user: (userId: string) => `user:${normalizeSegment(userId)}`,
  authUser: (userId: string) => `auth:user:${normalizeSegment(userId)}`,
  userProfile: (userId: string) => `user-profile:${normalizeSegment(userId)}`,
  notificationUser: (userId: string) =>
    `notification:user:${normalizeSegment(userId)}`,

  walletUser: (userId: string) => `wallet-core:user:${normalizeSegment(userId)}`,
  wallet: (walletId: string) => `wallet-core:wallet:${normalizeSegment(walletId)}`,
  walletOperation: (operationId: string) =>
    `wallet-core:operation:${normalizeSegment(operationId)}`,

  chat: (chatId: string) => normalizeSegment(chatId),
  call: (roomId: string) => `call:${normalizeSegment(roomId)}`,
  webrtc: (roomId: string) => `webrtc:${normalizeSegment(roomId)}`,
  liveLocation: (chatId: string) => `location:${normalizeSegment(chatId)}`,
} as const;

export const RealtimeEvents = {
  authSessionChanged: "auth:session.changed",
  authAccountUpdated: "auth:account.updated",

  userUpdated: "user:updated",
  userProfileUpdated: "user:profile.updated",

  notificationNew: "notification:new",
  notificationRead: "notification:read",

  walletBalanceUpdated: "wallet:balance.updated",
  walletHistoryChanged: "wallet:history.changed",
  walletOperationUpdated: "wallet:operation.updated",
  walletCoreEvent: "wallet-core:event",

  realtimeEvent: "realtime:event",

  messageNew: "message:new",
  messageEdited: "message:edited",
  messageDeleted: "message:deleted",
  messageDelivered: "message:delivered",
  messageRead: "message:read",

  typingStart: "typing:start",
  typingStop: "typing:stop",

  presenceOnline: "presence:online",
  presenceOffline: "presence:offline",
  presenceSnapshot: "presence:snapshot",
  presenceState: "presence:state",

  callIncoming: "call:incoming",
  callOutgoing: "call:outgoing",
  callAccepted: "call:accepted",
  callDeclined: "call:declined",
  callMissed: "call:missed",
  callEnded: "call:ended",
  callParticipantJoined: "call:participant_joined",
  callParticipantLeft: "call:participant_left",

  webrtcPeers: "webrtc:peers",
  webrtcRoomState: "webrtc:room_state",
  webrtcPeerJoined: "webrtc:peer_joined",
  webrtcPeerLeft: "webrtc:peer_left",
  webrtcOffer: "webrtc:offer",
  webrtcAnswer: "webrtc:answer",
  webrtcIce: "webrtc:ice",

  locationUpdated: "location:updated",
  locationStopped: "location:stopped",
  locationSnapshot: "location:snapshot",
} as const;

export type RealtimeChannelFactory = typeof RealtimeChannels;
export type RealtimeEventMap = typeof RealtimeEvents;
export type RealtimeEventName = RealtimeEventMap[keyof RealtimeEventMap];