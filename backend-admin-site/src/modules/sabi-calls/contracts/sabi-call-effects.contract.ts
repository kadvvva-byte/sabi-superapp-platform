import type { SabiCallEffectKind, SabiCallEffectState, SabiUserId } from "./sabi-call.types";
export type SabiCallEffectRequest = { userId: SabiUserId; kind?: SabiCallEffectKind; effectKey: string | null; enabled: boolean; config?: Record<string, string | number | boolean | null> };
export type { SabiCallEffectKind, SabiCallEffectState, SabiUserId };
