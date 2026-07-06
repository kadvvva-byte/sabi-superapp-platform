import type { SabiCallEffectState } from "../../contracts";
export function createDisabledSabiCallEffectState(): SabiCallEffectState { return { status: "disabled", kind: "none", effectKey: null, ownerUserId: null, config: {}, updatedAt: null, failureReason: null }; }
