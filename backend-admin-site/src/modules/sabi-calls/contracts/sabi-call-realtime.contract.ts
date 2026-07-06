import type { SabiCallEvent, SabiCallEventName, SabiCallId, SabiUserId } from "./sabi-call.types";
export type SabiCallRealtimeTarget = { userIds: SabiUserId[]; callId: SabiCallId };
export interface SabiCallRealtimeBroadcasterPort {
  publish(event: SabiCallEvent, target: SabiCallRealtimeTarget): Promise<void> | void;
}
export interface SabiCallRealtimeBroadcaster {
  publishToUsers<TPayload>(event: { event: SabiCallEventName; callId: SabiCallId; targetUserIds: SabiUserId[]; payload: TPayload }): Promise<void> | void;
}
export type { SabiCallEvent, SabiCallEventName, SabiCallId, SabiUserId };
