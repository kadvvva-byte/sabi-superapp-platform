import type { CreateSabiCallSignalCommand, SabiCallId, SabiCallIceCandidatePayload, SabiCallSignalDto, SabiCallSignalKind, SabiUserId } from "./sabi-call.types";
export type SabiCallOfferPayload = { sdp: string; type: "offer" };
export type SabiCallAnswerPayload = { sdp: string; type: "answer" };
export type { CreateSabiCallSignalCommand, SabiCallId, SabiCallIceCandidatePayload, SabiCallSignalDto, SabiCallSignalKind, SabiUserId };
