import type { SabiCallParticipant, SabiUserId } from "../contracts";
import type { SabiCallRepository } from "../infrastructure/persistence";
export class SabiCallParticipantService { constructor(private readonly repository: SabiCallRepository) {} async listUserParticipants(userId: SabiUserId): Promise<SabiCallParticipant[]> { const sessions = await this.repository.findMany({ userId }); return sessions.flatMap(s => s.toDto().participants.filter(p => p.userId === userId)); } }
