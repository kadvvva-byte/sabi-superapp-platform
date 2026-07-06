import { InMemorySabiCallRepository } from "./in-memory-sabi-call.repository";
export class PrismaSabiCallRepository extends InMemorySabiCallRepository {
  readonly mode = "in_memory_until_prisma_calls_schema_is_enabled";
  constructor(_client?: unknown) { super(); }
}
