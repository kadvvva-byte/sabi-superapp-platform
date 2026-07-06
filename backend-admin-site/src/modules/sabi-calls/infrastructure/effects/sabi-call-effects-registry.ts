import type { SabiCallEffectKind } from "../../contracts";
export const SABI_CALL_EFFECTS: readonly SabiCallEffectKind[] = ["none", "beauty", "blur", "background", "voice", "light"];
export function isKnownSabiCallEffect(kind: string): kind is SabiCallEffectKind { return (SABI_CALL_EFFECTS as readonly string[]).includes(kind); }
