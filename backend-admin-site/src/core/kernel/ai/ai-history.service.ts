import type { AiHistoryEntry, AiHistoryKind } from "./ai.types"
import { AiPersistenceService } from "./ai-persistence.service"

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export class AiHistoryService {
  private readonly history = new Map<string, AiHistoryEntry[]>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  private ensureLoaded(userId: string) {
    if (this.history.has(userId)) {
      return
    }
    const loaded = this.persistence?.getHistory(userId) ?? []
    this.history.set(userId, loaded)
  }

  log(input: {
    userId: string
    title: string
    kind: AiHistoryKind
    metadata?: Record<string, unknown>
  }): AiHistoryEntry {
    this.ensureLoaded(input.userId)
    const entry: AiHistoryEntry = {
      id: createId("aihist"),
      userId: input.userId,
      title: input.title,
      kind: input.kind,
      createdAt: new Date().toISOString(),
      metadata: input.metadata,
    }

    const existing = this.history.get(input.userId) ?? []
    existing.unshift(entry)
    this.history.set(input.userId, existing)
    this.persistence?.saveHistory(input.userId, existing)
    return entry
  }

  list(userId: string, limit = 20): AiHistoryEntry[] {
    this.ensureLoaded(userId)
    return (this.history.get(userId) ?? []).slice(0, Math.max(0, limit))
  }

  clear(userId: string) {
    this.history.delete(userId)
    this.persistence?.saveHistory(userId, [])
  }
}
