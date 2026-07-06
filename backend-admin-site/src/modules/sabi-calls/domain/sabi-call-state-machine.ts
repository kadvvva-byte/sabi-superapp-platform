import type { SabiCallParticipantStatus, SabiCallStatus } from "../contracts";
const callTransitions: Record<SabiCallStatus, SabiCallStatus[]> = {
  created: ["ringing", "connecting", "cancelled", "failed"],
  ringing: ["connecting", "active", "declined", "cancelled", "missed", "failed"],
  connecting: ["active", "ended", "failed", "cancelled"],
  active: ["ended", "failed"],
  declined: [], cancelled: [], ended: [], missed: [], failed: [],
};
const participantTransitions: Record<SabiCallParticipantStatus, SabiCallParticipantStatus[]> = {
  invited: ["ringing", "joining", "joined", "declined", "missed", "removed", "failed"],
  ringing: ["joining", "joined", "declined", "missed", "removed", "failed"],
  joining: ["joined", "left", "failed"],
  joined: ["left", "removed", "failed"],
  declined: [], left: [], missed: [], removed: [], failed: [],
};
export function canTransitionSabiCall(from: SabiCallStatus, to: SabiCallStatus): boolean { return from === to || callTransitions[from].includes(to); }
export function canTransitionSabiCallParticipant(from: SabiCallParticipantStatus, to: SabiCallParticipantStatus): boolean { return from === to || participantTransitions[from].includes(to); }
