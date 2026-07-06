import type { SabiCallParticipantStatus, SabiCallStatus } from "../contracts";
export const SABI_CALL_TERMINAL_STATUSES: ReadonlySet<SabiCallStatus> = new Set<SabiCallStatus>(["declined", "cancelled", "ended", "missed", "failed"]);
export const SABI_CALL_PARTICIPANT_TERMINAL_STATUSES: ReadonlySet<SabiCallParticipantStatus> = new Set<SabiCallParticipantStatus>(["declined", "left", "missed", "removed", "failed"]);
export function isSabiCallTerminalStatus(status: SabiCallStatus): boolean { return SABI_CALL_TERMINAL_STATUSES.has(status); }
export function isSabiCallParticipantTerminalStatus(status: SabiCallParticipantStatus): boolean { return SABI_CALL_PARTICIPANT_TERMINAL_STATUSES.has(status); }
