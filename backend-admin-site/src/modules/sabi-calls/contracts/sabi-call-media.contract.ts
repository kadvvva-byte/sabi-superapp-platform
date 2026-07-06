import type { SabiCallMediaState, SabiUserId } from "./sabi-call.types";
export type SabiCallMediaUpdate = Partial<Omit<SabiCallMediaState, "updatedAt">> & { userId: SabiUserId };
export type { SabiCallMediaState, SabiUserId };
