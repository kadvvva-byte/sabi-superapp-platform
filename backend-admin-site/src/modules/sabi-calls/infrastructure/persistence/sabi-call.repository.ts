import type { ListSabiCallsQuery } from "../../contracts";
import type { SabiCallEntity } from "../../domain";
export type SabiCallFindManyQuery = ListSabiCallsQuery;
export interface SabiCallRepository {
  save(call: SabiCallEntity): Promise<SabiCallEntity>;
  findById(callId: string): Promise<SabiCallEntity | null>;
  findMany(query?: ListSabiCallsQuery): Promise<SabiCallEntity[]>;
}
