import type { SabiCallSession, SabiUserId } from "../../contracts";
import { resolveSabiCallToneForUser } from "./sabi-call-tone-state";
export function createSabiCallToneEvent(session: SabiCallSession, userId: SabiUserId) { return { callId: session.id, userId, tone: resolveSabiCallToneForUser(session, userId) }; }
