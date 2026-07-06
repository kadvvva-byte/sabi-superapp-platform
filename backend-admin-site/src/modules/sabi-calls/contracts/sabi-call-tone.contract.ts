import type { SabiCallToneKind, SabiCallToneState, SabiUserId } from "./sabi-call.types";
export type SabiCallToneCommand = { userId: SabiUserId | null; tone: SabiCallToneKind; reason?: string | null };
export type { SabiCallToneKind, SabiCallToneState, SabiUserId };
