import type { ListSabiCallsQuery } from "../../contracts";
import type { SabiCallEntity } from "../../domain";
import type { SabiCallRepository } from "./sabi-call.repository";
export class InMemorySabiCallRepository implements SabiCallRepository {
  protected readonly calls = new Map<string, SabiCallEntity>();
  async save(call: SabiCallEntity): Promise<SabiCallEntity> { this.calls.set(call.id, call); return call; }
  async findById(callId: string): Promise<SabiCallEntity | null> { return this.calls.get(callId) ?? null; }
  async findMany(query: ListSabiCallsQuery = {}): Promise<SabiCallEntity[]> {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    return Array.from(this.calls.values()).filter(call => {
      const dto = call.toDto();
      if (query.status && dto.status !== query.status) return false;
      if (query.contextType && dto.contextType !== query.contextType) return false;
      if (query.contextId && dto.contextId !== query.contextId) return false;
      if (query.userId && !dto.participants.some(p => p.userId === query.userId)) return false;
      return true;
    }).sort((a,b)=>Date.parse(b.toDto().createdAt)-Date.parse(a.toDto().createdAt)).slice(0, limit);
  }
}
