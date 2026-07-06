import type { SabiCallKind, SabiCallParticipantMediaState } from "../../contracts";
export function createSabiCallMediaState(kind: SabiCallKind, now = new Date()): SabiCallParticipantMediaState { return { audioEnabled: true, videoEnabled: kind === "video", speakerEnabled: kind === "video", screenShareEnabled: false, cameraFacing: "front", updatedAt: now.toISOString() }; }
