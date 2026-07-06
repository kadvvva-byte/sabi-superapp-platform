import type { SabiCallKind, SabiCallMetadata, SabiCallMetadataValue, SabiCallUserId } from "../contracts";
import { SabiCallPolicyError } from "./sabi-call-errors";
export function assertSabiCallKind(kind: SabiCallKind): void { if (kind !== "audio" && kind !== "video") throw new SabiCallPolicyError("sabi_call_kind_invalid"); }
export function assertSabiUserId(userId: SabiCallUserId, code = "sabi_call_user_id_required"): void { if (!userId || !userId.trim()) throw new SabiCallPolicyError(code); }
export function normalizeSabiCallTargets(initiator: SabiCallUserId, targets: SabiCallUserId[]): SabiCallUserId[] {
  const clean = Array.from(new Set((targets ?? []).map(v => v.trim()).filter(Boolean)));
  if (clean.length === 0) throw new SabiCallPolicyError("sabi_call_target_required");
  if (clean.includes(initiator)) throw new SabiCallPolicyError("sabi_call_self_call_not_allowed");
  return clean;
}
export function normalizeSabiCallMetadata(metadata?: SabiCallMetadata): SabiCallMetadata {
  const clean: SabiCallMetadata = {};
  for (const [key, value] of Object.entries(metadata ?? {})) {
    if (!key.trim()) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) clean[key] = value as SabiCallMetadataValue;
  }
  return clean;
}
